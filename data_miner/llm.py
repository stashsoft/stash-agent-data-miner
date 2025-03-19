import os
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_anthropic import ChatAnthropic
from langchain_deepseek import ChatDeepSeek
from langchain_openai import ChatOpenAI
from langchain_ollama import ChatOllama
from data_miner.model import LLM

# Initialize LLM
def create_model(llm: LLM) -> BaseChatModel:
    match llm.provider:
        case "Anthropic":
            os.environ["ANTHROPIC_API_KEY"] = llm.key

            llm = ChatAnthropic(model_name=llm.model_name)

            return llm

        case "Deepseek":
            os.environ["DEEPSEEK_API_KEY"] = llm.key

            llm = ChatDeepSeek(model_name=llm.model_name)

            return llm

        case "OpenAI":
            os.environ["OPENAI_API_KEY"] = llm.key

            llm = ChatOpenAI(model_name=llm.model_name)

            return llm

        case "Ollama":
            llm = ChatOllama(model=llm.model_name, temperature=0)

            return llm
