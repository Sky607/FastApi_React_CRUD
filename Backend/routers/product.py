from typing import List
from fastapi import APIRouter,Depends
from pwdlib import PasswordHash
from ..database import get_db
from Backend.models import ProductListResponse, ProductsSchema, UserProductsList, UserSchema
from Backend.database_models import *
from sqlalchemy.orm import Session

router = APIRouter(prefix='/products',tags=['Product'])

password_hash = PasswordHash.recommended()


@router.get("" ,response_model=ProductListResponse)
def get_products(db: Session = Depends(get_db)):
    db_products = db.query(Product).all()
    return {
        "status":"success",
        "message":"Product list fetched successfully",
        "data":db_products
    }

@router.get("/{product_id}",response_model= ProductListResponse)
def get_product(product_id: int , db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        return {
        "status":"success",
        "message":"Product  fetched successfully",
        "data":[db_product]
    }
    else:
        return {"no product found"}


@router.post("/products")
def add_product(product :ProductsSchema, db: Session = Depends(get_db)):
    product = db.addProduct(**product.model_dump(),user_id=2)
    db.commit()
    
    return {
        "success":"success",
        "message":"products created successfully",
        "data":product}

@router.put("/{product_id}" )
def update_product(product_id: int, product: ProductsSchema , db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        return {"no product found"}
    for key, value in product.model_dump().items():
        setattr(db_product, key, value)
    db.commit()
    
    return {"Product updated successfully"}       


@router.delete("/{product_id}")
def delete_product(product_id: int , db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return {"Deleted successfully"}
    else:
        return {"no product found"}

