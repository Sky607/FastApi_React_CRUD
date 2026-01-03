from fastapi import status
from pwdlib import PasswordHash
from .database_models import User
from fastapi.responses import JSONResponse


password_hash = PasswordHash.recommended()

def authenticate_user(username , password,db):
  
   if not username or not password:
      return JSONResponse(content={
                "status": "error",
                "message": "Please provide username and password",
                "data": None
            },status_code=status.HTTP_400_BAD_REQUEST)
    
   user = db.query(User).filter(User.name == username).first()
    
   if not user:
      return JSONResponse(content={
                "status": "error",
                "message": "User not found with the given username",
                "data": None
            },status_code=status.HTTP_404_NOT_FOUND)
   
   verify_password = password_hash.verify(password , user.password)

   if not verify_password:
      return JSONResponse(content={
                "status": "error",
                "message": "Entered password is incorrect",
                "data": None
            },status_code=status.HTTP_404_NOT_FOUND)
      
   
   return user

