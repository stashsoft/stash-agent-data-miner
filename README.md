# Stash Data Miner

AI Data Miner is an AI agent that extracts specific information from various files, transforms it, and compiles the data into a single CSV file. Most AI agents on the internet can only work with a small amount of data or a single file, which is practically useless since, in the real world, you usually need to work with multiple files or large volumes of data. Stash Data Miner is designed to extract data that matches specific criteria from multiple files based on natural language commands. It processes each file you provide, parses and extracts the necessary information, and compiles all of it into a single CSV file.

For example, you can provide candidates' CVs for a position at your company, and Stash Data Miner will generate a single CSV file containing information on all applicants, with each row corresponding to a candidate.

Another example, you can provide invoice files, and Stash Data Miner will generate a CSV file listing all invoice numbers, products, and total amounts paid.

## How to use?

You must provide the following data to the agent to run it:

- **Files:** You must select files.
- **Columns:** You must list the columns for the output CSV file along with descriptions of how the data will be mapped. This section accepts multiple rows, each containing two fields: Column Name and Description. The Column Name specifies the name of the column in the CSV header, while the Description explains which data will be placed under this column.
- **LLM Provider:** You must select an LLM provider. Options are:
  - OpenAI
  - Anthropic
  - Deepseek
  - Ollama
- **LLM:** You must type the name of the AI model that you want to use like `gpt-4o-mini`.
- **API Key:** You must set an API Key. This option isn't available for Ollama.

When you start the agent, it either uploads the files or moves them into the sandbox depending on whether it runs on web or on [Stash](https://stashsoftware.com). Then, it reads each file one by one and queries LLM to extract information from your files. As the agent extracts the required information from a file, it updates the output file accordingly. You can download the output CSV file at any time.

When you run the agent, it keeps running until it completes scanning all files that you uploaded.

The following file types are supported:

- `*.pdf`
- `*.doc` / `*.docx`
- `*.xls` / `*.xlsx`

- `.md`
- `.txt`
- `*.csv`

## UI / Workflow

This section includes detailed information on how Stash Data Miner works. If you do not plan to update the source code or customize the agent for your own purposes, you can skip this section.

The UI consists of three parts:

- Introduction
- Agent
- Results

### Introduction

This section provides information about how to use the agent with examples.

The close button navigates back to the Get Started screen in Stash.

If the agent is running independently of Stash, the close button will not be displayed.

### Agent Form

This section contains a form that accepts input from user (See: "How to use?" section). The form also contains a button that allows you to start / stop the agent.

The columns section within the Agent Form section accepts columns and descriptions. When you type something in the "Column name" or "Description" fields in the last row, a new row is automatically added below the last row in the list. If you delete the text from both fields in a row, that row is automatically removed.

### Results

This section includes the following sub-sections.

**Output file:** It displays the output file in a spreadsheet view. The file is updated real time. You can download the file at any time while agent is running. When the file is updated, the scoll bar scrolls to the bottom of the content. When you click the "Download" button, the file is downloaded.

**File list:** All files given by the user are listed on this section. The purpose of this section is to display the status of files in the list. There are three statuses:

- Completed
- Processing
- Pending

The scroll bar is automatically moved to display the currently processing file. 

**Running logs:** All logs kept during the running session are displayed here. Logs also include total number of used input and output token information. When a new log iadded, the scroll bar scholls to the bottom.

## Workflow

When you click the start button, it sends a request to `/start` endpoint. The endpoint saves the provided information about the agent and starts the agent by running `agent.py` file as a subprocess. If the provided information is wrong, the endpoint returns an error. Otherwise, it returns a message stating that the agent is preparing to run. By default, `agent_status.status` is `0`. It is set to `1` by the endpoint, which means the agent is preparing to run.

The agent (`agent.py`) sets `agent_status.status` is `2`, which means the agent is running when it completes processing the first file. We do this because it is not possible for us to make sure that all given LLM credentials are correct until the LLM is queried for the first time. When the agent completes running successfully, it is set to `0` and a success message is also set in the `agent_status` table. If the agent fails, the status is set to `0` with an error message.

Meaning of the values of `status` field on the `agent_status` table:

- Not Running: `0`
- Preparing: `1`
- Running: `2`

When you click the stop button, it calls the `/stop` endpoint. It terminates the agent process and sets `agent_status.status` to `0`.

The `/get-agent-info` endpoint returns the previously saved agent data. It is used to populate the Agent Form with the previously saved data. When you open the agent, that endpoint is queried once to populate the agent form.

The `/get-running-info` endpoint is queried periodically when the agent starts running. It returns the data that we display in the Results section alongside agent's running status.

## API

### `/get-agent-info`

Returns the agent information.

**Method:** GET

**Response:**

```json
{
	"columns": [
    	{
        "id": number,
        "name": string,
        "description": string
      }
  ],
  "llm": {
    "provider": string,
    "modelName": string,
    "key": string
  }
}
```

### `/start`

Starts the agent.

**Method:** POST

**Enctype:** `multipart/form-data`

**Payload:**

| Name                 | Value                        |
| -------------------- | ---------------------------- |
| files                | File                         |
| columnNames[]        | Array of column names        |
| columnDescriptions[] | Array of column descriptions |
| provider             | LLM provider name            |
| modelName            | LLM name                     |
| apiKey               | LLM API key                  |

**Response:**

```
{
	"status": "error" | "success",
	"message": string
}
```

### `/stop`

Stops the agent.

**Method:** POST

**Response**: No response!

### `/get-running-info`

Returns the agent's running information.

**Method:** GET

**Response:**

```
{
	"logs": [
		{
			"id": number,
			"createdAt": string,
			"message": string
		}
	],
	"files": [
		{
			"id": number,
			"name": string,
			"processed": number
		}
	],
	"status": number,
	"errorMessage": string | null,
	"successMessage": string | null
}
```

### `/download`

Downloads the output file.

