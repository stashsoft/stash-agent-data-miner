from fastapi import APIRouter, Request
from data_miner.db import fetch_agent_info, update_agent_info, update_agent_status, fetch_running_info
from data_miner.model import AgentInfo, RunningInfo
import time
import random

router = APIRouter()

@router.get("/")
def root() -> AgentInfo:
    agent_info = fetch_agent_info()

    return agent_info

@router.post("/start")
async def start(request: Request):
    form = await request.form()
    files = form.getlist("files")

    # Check if any files have been uploaded
    if len(files) == 0:
        return {"message": "No files were uploaded!", "status": "error"}
    
    # Check if all files have valid types
    supported_types = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'md', 'txt', 'csv']

    if file.extension not in supported_types:
        return {"message": f"Unsupported file type for the file {file.name}", "status": "error"}

    # Check if all column names are valid
    column_names = form.getlist("columnNames[]")

    if len(column_names) == 0 or any(name == "" for name in column_names):
        return {"message": "No columns were added or some column names are empty!", "status": "error"}  

    # Check if all column descriptions are valid
    column_descriptions = form.getlist("columnDescriptions[]")

    if len(column_descriptions) == 0 or any(name == "" for name in column_descriptions):
        return {"message": "No columns were added or some column descriptions are empty!", "status": "error"}

    # Check if a provider has been selected
    provider = form.get("provider")

    if provider == "":
        return {"message": "No provider was selected!", "status": "error"}

    # Check if a model name has been provided
    model_name = form.get("modelName")

    if model_name == "":
        return {"message": "No model name was provided!", "status": "error"}

    # Check if an API key has been provided
    api_key = form.get("apiKey")

    if api_key == "":
        return {"message": "No API key was provided!", "status": "error"}
    
    # List column names and descriptions
    columns = [{"name": column_names[i], "description": column_descriptions[i]} for i in range(len(column_names))]

    # Create a list to store the names of uploaded files
    uploaded_files: list[dict[str, str]] = []

    # Iterate through each uploaded file
    try:
        for file in files:
            # Check the file
            if file.size == 0:
                continue

            # Read the file content
            contents = await file.read()
            
            # Get the file extension
            file_extension = file.filename.split('.')[-1]

            # Generate a new file name with timestamp and random number
            timestamp = int(time.time())
            random_number = random.randint(100_000_000, 999_999_999)
            new_filename = f"{timestamp}_{random_number}.{file_extension}"

            # Save the file with the new name
            with open(f"uploads/{new_filename}", "wb") as f:
                f.write(contents)

            # Add the new filename to the list of uploaded files
            uploaded_files.append(
                {"name": file.filename, "file_name": new_filename, "extension": file_extension}
            )

        # Update the agent information
        update_agent_info(uploaded_files, columns, provider, model_name, api_key)

        return {"message": "The agent is preparing to run. Please wait!", "status": "success"}
        
    except Exception as e:
        return {"message": f"An error occurred during file upload: {str(e)}", "status": "error"}

@router.post("/stop")
def stop():
    update_agent_status(0, "", "")

    return {}

@router.get("/get-running-info")
def get_running_info() -> RunningInfo:
    return fetch_running_info()