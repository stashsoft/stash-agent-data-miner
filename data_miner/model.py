from pandas import DataFrame
from dataclasses import dataclass
from typing import Optional

@dataclass
class Column:
    id: int
    name: str
    description: str

@dataclass
class File:
    id: int
    name: str
    processed: int
    extension: str

@dataclass
class LLM:
    id: int
    provider: str
    model_name: str
    key: Optional[str]

@dataclass
class LLMResponse:
    output: DataFrame
    input_tokens: int
    output_tokens: int
    total_tokens: int
