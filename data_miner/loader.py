from langchain_core.document_loaders import BaseLoader
from langchain_community.document_loaders import PyPDFLoader, UnstructuredExcelLoader, UnstructuredWordDocumentLoader, UnstructuredMarkdownLoader, TextLoader, CSVLoader
from data_miner.model import File

def load_document(file: File, path: str) -> BaseLoader:
    match file.extension:
        case 'pdf':
            loader = PyPDFLoader(f"{path}/{file.file_name}")
            return loader
        
        case 'xls' | 'xlsx':
            loader = UnstructuredExcelLoader(f"{path}/{file.file_name}", mode="elements")
            return loader
        
        case 'doc' | 'docx':
            loader = UnstructuredWordDocumentLoader(f"{path}/{file.file_name}")
            return loader
        
        case 'md':
            loader = UnstructuredMarkdownLoader(f"{path}/{file.file_name}")
            return loader

        case 'txt':
            loader = TextLoader(f"{path}/{file.file_name}")
            return loader
        
        case 'csv':
            loader = CSVLoader(f"{path}/{file.file_name}")
            return loader