import sqlalchemy
from datetime import datetime
from data_miner.model import Column, File, LLM

engine = sqlalchemy.create_engine(f'sqlite:///db.sqlite')

def add_log(message: str):
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    with engine.connect() as conn:
        conn.execute(sqlalchemy.text('INSERT INTO log (createdAt, message) VALUES (:createdAt, :message)'), {"createdAt": current_time, "message": message})
        conn.commit()

def fetch_files() -> list[File]:
    with engine.connect() as conn:
        result = conn.execute(sqlalchemy.text("SELECT id, name, processed, extension FROM file"))

        return [File(id=row['id'], name=row['name'], processed=row['processed'], extension=row['extension']) for row in result.mappings().all()]

def fetch_columns() -> list[Column]:
    with engine.connect() as conn:
        result = conn.execute(sqlalchemy.text("SELECT id, name, description FROM column"))

        return [Column(id=row['id'], name=row['name'], description=row['description']) for row in result.mappings().all()]

def fetch_llm():
    with engine.connect() as conn:
        result = conn.execute(sqlalchemy.text("SELECT id, provider, model_name, key FROM llm"))
        row = result.mappings().first()

        return LLM(id=row['id'], provider=row['provider'], model_name=row['model_name'], key=row['key'])

def set_file_processed(id: int):
    with engine.connect() as conn:
        conn.execute(sqlalchemy.text("UPDATE file SET processed = 2 WHERE id = :id"), {"id": id})
        conn.commit()

def set_file_processing(id: int):
    with engine.connect() as conn:
        conn.execute(sqlalchemy.text("UPDATE file SET processed = 1 WHERE id = :id"), {"id": id})
        conn.commit()
