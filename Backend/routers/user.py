from typing import List
from fastapi import APIRouter,Depends
from pwdlib import PasswordHash

from Backend.token import get_current_user
from ..database import get_db
from Backend.models import UserProductsList, UserSchema
from ..database_models import *
from sqlalchemy.orm import Session

router = APIRouter(
    prefix='/user',
    tags=['User']
)

password_hash = PasswordHash.recommended()

@router.post('/create-user' )
def create_user(request:UserSchema , db:Session=Depends(get_db)):
    hashed_password =password_hash.hash(request.password)
    new_user = User(**request.model_dump(exclude={"id","password"}), password=hashed_password)

    db.add(new_user)
    db.commit()
    return 'user created successfully'

@router.get('')
def get_user( current_user = Depends(get_current_user)):
    return current_user

@router.get('/products/',response_model=UserProductsList )
def get_user( db:Session=Depends(get_db),current_user = Depends(get_current_user)):
    user_id = current_user.id
    users_with_product = db.query(User).filter(User.id ==user_id).first()
    
    if not users_with_product:
        return {
        "status":"error",
        "message":f"No users found with given user id {user_id}",
        "data":[]}
    

    return {
        "status":"success",
        "message":"Users with products fetched successfully",
        "data":[users_with_product]}

