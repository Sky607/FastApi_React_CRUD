
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url = 'postgresql://postgres:shashi@localhost:5432/demo'

engine = create_engine(db_url)

session = sessionmaker(autoflush=False , autocommit = False , bind=engine)