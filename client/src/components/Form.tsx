import Alert from '@smart-react-components/ui/Alert'
import Button from '@smart-react-components/ui/Button'
import ButtonLoading from '@smart-react-components/ui/Button/ButtonLoading'
import React from 'react'
import { API_URL } from '../constants'
import Separator from '../elements/Separator'
import { Column, ResultStatus } from '../types'
import FormColumns from './FormColumns'
import FormFiles from './FormFiles'
import FormLLM from './FormLLM'
import Section from './Section'

interface Props {
  onAbort: () => void
  onStart: (
    files: File[],
    columns: { name: string, description: string }[],
    provider: string,
    modelName: string,
    apiKey: string,
  ) => void
  status: {
    status: ResultStatus
    message: string
  }
}

const Form: React.FC<Props> = ({ onAbort, onStart, status }) => {
  const [files, setFiles] = React.useState<File[]>([])
  const [columns, setColumns] = React.useState<Column[]>([{
    name: '',
    description: '',
  }])
  const [provider, setProvider] = React.useState(null)
  const [modelName, setModelName] = React.useState('')
  const [apiKey, setApiKey] = React.useState('')

  React.useEffect(() => {
    fetch(`${API_URL}/get-agent-info`)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.columns.length) {
        setColumns(columns => [...resp.columns, ...columns])
      }

      if (resp.llm.provider) {
        setProvider(resp.llm.provider)
      }

      if (resp.llm.modelName) {
        setModelName(resp.llm.modelName)
      }

      if (resp.llm.key) {
        setApiKey(resp.llm.key)
      }
    })
  }, [])

  return (
    <Section title="Agent">
      { !!(status.status & (ResultStatus.SUCCESS | ResultStatus.ERROR))  && (
        <Alert marginTop="$length.3" palette={status.status === ResultStatus.SUCCESS ? 'success' : 'danger'}>{status.message}</Alert>
      )}
      <FormFiles files={files} setFiles={setFiles} />
      <Separator />
      <FormColumns columns={columns} setColumns={setColumns} />
      <Separator />
      <FormLLM
        provider={provider}
        setProvider={setProvider}
        modelName={modelName}
        setModelName={setModelName}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
      { !!(status.status & (ResultStatus.STAND_BY | ResultStatus.LOADING | ResultStatus.SUCCESS | ResultStatus.ERROR))
        ? (
          <Button
            key="startButton"
            loading={<ButtonLoading />}
            isBlock
            isLoading={status.status === ResultStatus.LOADING}
            marginTop='$length.4'
            palette="success"
            onClick={() => onStart(files, columns, provider, modelName, apiKey)}
          >
            Start running!
          </Button>
        )
        : (
          <Button
            key="abortButton"
            loading={<ButtonLoading />}
            isBlock
            isLoading={status.status === ResultStatus.ABORTING}
            marginTop='$length.4'
            palette="danger"
            onClick={() => onAbort()}
          >
            Abort running!
          </Button>
        )
      }
    </Section>
  )
}

export default Form
