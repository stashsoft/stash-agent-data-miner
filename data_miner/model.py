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
    file_name: str
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

@dataclass
class Log:
    id: int
    createdAt: str
    message: str

@dataclass
class AgentInfo:
    columns: list[Column]
    llm: dict[str, str]

@dataclass
class RunningInfo:
    logs: list[Log]
    files: list[dict[str, str]]
    status: str
    statusMessage: str