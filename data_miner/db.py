import sqlalchemy
from datetime import datetime
from data_miner.model import AgentInfo, Column, File, LLM, Log, RunningInfo

engine = sqlalchemy.create_engine(f'sqlite:///db.sqlite')

def add_log(message: str):
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    with engine.connect() as conn:
        conn.execute(sqlalchemy.text('INSERT INTO log (createdAt, message) VALUES (:createdAt, :message)'), {"createdAt": current_time, "message": message})
        conn.commit()

def fetch_agent_info():
    with engine.connect() as conn:
        result_columns = conn.execute(sqlalchemy.text("SELECT id, name, description FROM column"))
        columns = [Column(id=row['id'], name=row['name'], description=row['description']) for row in result_columns.mappings().all()]

        result_llm = conn.execute(sqlalchemy.text("SELECT id, provider, model_name, key FROM llm"))
        llm = result_llm.mappings().first()

        return AgentInfo(columns=columns, llm={"provider": llm['provider'], "modelName": llm['model_name'], "key": llm['key']})

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

def fetch_running_info():
    with engine.connect() as conn:
        result_logs = conn.execute(sqlalchemy.text("SELECT id, createdAt, message FROM log"))
        logs = [Log(id=row['id'], createdAt=row['createdAt'], message=row['message']) for row in result_logs.mappings().all()]

        result_files = conn.execute(sqlalchemy.text("SELECT id, name, processed FROM file"))
        files = [{"id": row['id'], "name": row['name'], "processed": row["processed"]} for row in result_files.mappings().all()]

        result_status = conn.execute(sqlalchemy.text("SELECT status, message FROM agent_status"))
        status = result_status.mappings().first()

        return RunningInfo(logs=logs, files=files, status=status['status'], statusMessage=status['message'])

def set_file_processed(id: int):
    with engine.connect() as conn:
        conn.execute(sqlalchemy.text("UPDATE file SET processed = 2 WHERE id = :id"), {"id": id})
        conn.commit()

def set_file_processing(id: int):
    with engine.connect() as conn:
        conn.execute(sqlalchemy.text("UPDATE file SET processed = 1 WHERE id = :id"), {"id": id})
        conn.commit()

def update_agent_info(files: list[dict[str, str]], columns: list[dict[str, str]], provider: str, model_name: str, key: str):
    with engine.connect() as conn:
        conn.execute(sqlalchemy.text("DELETE FROM file"))
        conn.execute(sqlalchemy.text("DELETE FROM column"))
        conn.execute(sqlalchemy.text("DELETE FROM log"))

        conn.execute(sqlalchemy.text("INSERT INTO file (name, file_name, processed, extension) VALUES (:name, :file_name, 0, :extension)"), files)
        conn.execute(sqlalchemy.text("INSERT INTO column (name, description) VALUES (:name, :description)"), columns)
        conn.execute(sqlalchemy.text("UPDATE llm SET provider = :provider, model_name = :model_name, key = :key"), {"provider": provider, "model_name": model_name, "key": key})
        conn.execute(sqlalchemy.text("UPDATE agent_status SET status = 1, message = ''"))
        conn.commit()

def update_agent_status(status: int, message: str):
    with engine.connect() as conn:
        conn.execute(sqlalchemy.text("UPDATE agent_status SET status = :status, message = :message"), {"status": status, "message": message})
        conn.commit()