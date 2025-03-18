import pandas as pd
from data_miner.llm import create_model
from data_miner.db import add_log, fetch_files, fetch_columns, fetch_llm, set_file_processed, set_file_processing, update_agent_status
from data_miner.loader import load_document
from data_miner.data import extract_data, prepare_columns_prompt

# Initialize LLM
llm = create_model(fetch_llm())

# Fetch files
files = fetch_files()

# Fetch columns
columns = fetch_columns()
columns_prompt = prepare_columns_prompt(columns)

# Create output data frame
raw_columns = [col.name for col in columns]
output = pd.DataFrame(columns=raw_columns)

try:
    add_log("Agent started processing files!")

    for file in files:
        if file.processed == 2:
            continue

        add_log(f"Document is being loaded: {file.name}")

        # Set the file as processing
        set_file_processing(file.id)
        
        # Load document
        loader = load_document(file, "./files")
        doc = loader.load()
        
        full_text = " ".join([chunk.page_content for chunk in doc])  # Join the full content if needed

        add_log(f"Data is being extracted from the document: {file.name}")

        # Extract data
        response = extract_data(llm, columns_prompt, full_text)

        add_log(f"Data has been extracted from the document: {file.name}")
        add_log(f"Token usage: Input tokens: {response.input_tokens}, Output tokens: {response.output_tokens}, Total tokens: {response.total_tokens}")
        
        # Add to the output
        output = pd.concat([output, response.output], ignore_index=True)
        
        # Update the output file
        output.to_csv("./updated_data.csv", index=False)

        add_log(f"Output file has been updated!")

        # Set the file as processed
        set_file_processed(file.id)

        # Set the agent status to running
        update_agent_status(2, "", "")

except Exception as e:
    add_log(f"Error: {e.args[0]}")

    update_agent_status(0, "", f"An error occurred: {e.args[0]}")

update_agent_status(0, "The agent has finished processing files!", "")