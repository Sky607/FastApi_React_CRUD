
from fastapi import FastAPI ,Depends
import database_models
from database import session , engine
from sqlalchemy.orm import Session
from models import Products

app = FastAPI()

database = database_models.Base.metadata.create_all(bind = engine)

def get_db():
   db = session()
   try:
       yield db
   finally:
       db.close()

@app.get("/")
def greet():
    return {"message": "Hello, World!"}


@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    db_products = db.query(database_models.Product).all()
    return {
        "sucess":"success",
        "message":"products fetched successfully",
        "data":db_products}

@app.get("/products/{product_id}")
def get_product(product_id: int , db: Session = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == product_id).first()
    if db_product:
        return db_product
    else:
        return {"no product found"}


@app.post("/products")
def add_product(product :Products, db: Session = Depends(get_db)):
    db.add(database_models.Product(**product.model_dump()))
    db.commit()
    return "Create successfully"

@app.put("/products/{product_id}")
def update_product(product_id: int, product: Products , db: Session = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == product_id).first()
    if not db_product:
        return {"no product found"}
    for key, value in product.model_dump().items():
        setattr(db_product, key, value)
    db.commit()
    
    return {"Product updated successfully"}       


@app.delete("/products/{product_id}")
def delete_product(product_id: int , db: Session = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return {"Deleted successfully"}
    else:
        return {"no product found"}
   