import re
import io
import pandas as pd
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import SystemMessage, HumanMessage
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from data_miner.model import Column, LLMResponse

# Messages
system_message_content = f"""You are an AI assistant that extracts information from files based on user requirements. All data you extract from the files are later saved into a CSV file. User will give you the names of the columns that will be placed in the CSV file and which data each column should contain.
Your responsibility is to extract the data from the files and return the data in CSV format based on the columns provided by the user. You must extract the relevant data and place them under corresponding columns.

Therefore, you must return CSV data based on the columns given by the user. Always answer by returning CSV data. Do not return anything else other than the CSV data based on the columns.

- Always wrap each item with quotes.
- Always return CSV columns as header.
"""

user_message_content = """
I want you to extract information according to the requirements below and place them under corresponding columns. The list of the columns and the explanation for each column for you to understand how to map the extracted data to columns are given below.

{columns}

The file content:

{file_content}
"""

user_message_template = ChatPromptTemplate.from_messages([
    HumanMessagePromptTemplate.from_template(user_message_content)
])

def prepare_columns_prompt(columns: list[Column]) -> LLMResponse:
    return "\n\n".join([f"{column.name}: {column.description}" for column in columns])

def extract_data(llm: BaseChatModel, columns: str, file_content: str) -> LLMResponse:
    # Query LLM
    try:
        response = llm.invoke([
            SystemMessage(content=system_message_content),
            HumanMessage(content=user_message_template.format(columns=columns, file_content=file_content))
        ])
    except Exception as e:
        message = e.body.get('message')

        if message is None:
            message = e.body['error']['message']

        raise Exception(message)

    response_data = response.content

    # Clean the response and convert it to the data frame
    clean_csv_data = re.sub(r"```(?:csv)?\n?|```", "", response_data).strip()
    df = pd.read_csv(io.StringIO(clean_csv_data))

    # Return the data frame
    return LLMResponse(
        output=df,
        input_tokens=response.usage_metadata['input_tokens'],
        output_tokens=response.usage_metadata['output_tokens'],
        total_tokens=response.usage_metadata['total_tokens']
    )