from typing import Annotated
from fastapi import FastAPI ,Depends,status,HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from .database_models import *
from .database import engine,get_db
from sqlalchemy.orm import Session
from .models import  LoginSchema,Token
from .routers import product,user
from .authentication import authenticate_user
from datetime import timedelta
from .token import create_access_token,ACCESS_TOKEN_EXPIRE_MINUTES

app = FastAPI()
app.include_router(product.router)
app.include_router(user.router)



Base.metadata.create_all(bind = engine)


@app.post("/login")
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],db:Session=Depends(get_db)) -> Token:
   
    user = authenticate_user(form_data.username, form_data.password,db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user.name}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.post("/user-login")
def login_for_access_token(form_data:LoginSchema,db:Session=Depends(get_db)) -> Token:
    
    user = authenticate_user(form_data.username, form_data.password,db)
    
    if isinstance(user, JSONResponse):
        return user

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user.name}, expires_delta=access_token_expires
    )
    token_data = {
        "access_token": access_token,
        "token_type": "bearer"
    }
    return  JSONResponse(content={
            "status": "success",
            "message": "User logged in successfully",
            "data": token_data
        },
        status_code=status.HTTP_200_OK)

