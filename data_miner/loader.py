from langchain_core.document_loaders import BaseLoader
from langchain_community.document_loaders import PyPDFLoader, UnstructuredExcelLoader, UnstructuredWordDocumentLoader, UnstructuredMarkdownLoader, TextLoader, CSVLoader
from data_miner.model import File

def load_document(file: File, path: str) -> BaseLoader:
    supported_types = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'md', 'txt', 'csv']

    if file.extension not in supported_types:
        raise ValueError(f"Unsupported file type for the file {file.name}")

    match file.extension:
        case 'pdf':
            loader = PyPDFLoader(f"{path}/{file.id}.{file.extension}")
            return loader
        
        case 'xls' | 'xlsx':
            loader = UnstructuredExcelLoader(f"{path}/{file.id}.{file.extension}", mode="elements")
            return loader
        
        case 'doc' | 'docx':
            loader = UnstructuredWordDocumentLoader(f"{path}/{file.id}.{file.extension}")
            return loader
        
        case 'md':
            loader = UnstructuredMarkdownLoader(f"{path}/{file.id}.{file.extension}")
            return loader

        case 'txt':
            loader = TextLoader(f"{path}/{file.id}.{file.extension}")
            return loader
        
        case 'csv':
            loader = CSVLoader(f"{path}/{file.id}.{file.extension}")
            return loader