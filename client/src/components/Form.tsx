import Button from '@smart-react-components/ui/Button'
import React from 'react'
import Separator from '../elements/Separator'
import { Column } from '../types'
import FormColumns from './FormColumns'
import FormFiles from './FormFiles'
import FormLLM from './FormLLM'
import Section from './Section'

const Form = () => {
  const [files, setFiles] = React.useState<File[]>([])
  const [columns, setColumns] = React.useState<Column[]>([{
    name: '',
    description: '',
  }])
  const [provider, setProvider] = React.useState('openai')
  const [modelName, setModelName] = React.useState('gpt-4o-mini')
  const [apiKey, setApiKey] = React.useState('')

  return (
    <Section title="Agent">
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
      <Button isBlock marginTop='$length.4' palette="success">Start running!</Button>
    </Section>
  )
}

export default Form
