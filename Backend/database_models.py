
from sqlalchemy import Column, ForeignKey , Integer , String , Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
Base = declarative_base()

class Product(Base):
    
    __tablename__ = "product"

    id = Column(Integer , primary_key=True , index = True)
    name = Column(String)
    price = Column(Float)
    quantity = Column(Float)
    description = Column(String)
    user_id = Column(Integer,ForeignKey("user.id"))

    creator = relationship("User" , back_populates='product')

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer , primary_key=True ,index =True)
    name = Column(String )
    mobile_no = Column(String)
    password = Column(String)

    product = relationship("Product" , back_populates='creator')