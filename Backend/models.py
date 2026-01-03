from typing import List,Dict,Optional
from pydantic import BaseModel
from typing import Generic, TypeVar
from pydantic import BaseModel
from pydantic.generics import GenericModel

T = TypeVar("T")



class ProductsSchema(BaseModel):
    name:str
    price:float
    quantity:float
    description:str

    model_config = {"from_attributes": True}


class UserSchema(BaseModel):
    name:str
    mobile_no:str
    password:str

class ProductResponse(BaseModel):
    name:str
    price:float
    quantity:float
    description:str
    creator:UserSchema
    
    model_config = {"from_attributes": True}

class ProductListResponse(BaseModel):
    status: str
    message: str
    data: List[ProductResponse]

    model_config = {"from_attributes": True}


class LoginSchema(BaseModel):
    username:str
    password:str

class UserSchemaWithProduct(BaseModel):
    name:str
    mobile_no:str
    product:List[ProductsSchema]

    model_config = {"from_attributes": True}

class UserProductsList(BaseModel):
    status: str
    message: str
    data: List[UserSchemaWithProduct]

    model_config = {"from_attributes": True}

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None

