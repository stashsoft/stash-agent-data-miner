import Column from '@smart-react-components/ui/Grid/Column'
import Row from '@smart-react-components/ui/Grid/Row'
import Input from '@smart-react-components/ui/Input'
import Option from '@smart-react-components/ui/Select/Option'
import SelectBox from '@smart-react-components/ui/Select/SelectBox'
import React from 'react'

interface Props {
  provider: string
  setProvider: React.Dispatch<React.SetStateAction<string>>
  modelName: string
  setModelName: React.Dispatch<React.SetStateAction<string>>
  apiKey: string
  setApiKey: React.Dispatch<React.SetStateAction<string>>
}

const FormLLM: React.FC<Props> = ({ provider, setProvider, modelName, setModelName, apiKey, setApiKey }) => (
  <>
    <p>Specify the LLM credentials you want to use:</p>
    <Row marginHorizontal={['-{length.2}', true]}>
      <Column col={12} colMd={3} paddingHorizontal={['$length.2', true]}>
        <SelectBox
          active={provider}
          label={<b>Provider:</b>}
          marginTop={16}
          setActive={setProvider}
        >
          <Option value="Openai">OpenAI</Option>
          <Option value="Anthropic">Anthropic</Option>
          <Option value="Deepseek">Deepseek</Option>
          <Option value="Ollama">Ollama</Option>
        </SelectBox>
      </Column>
      <Column col={12} colMd={3} paddingHorizontal={['$length.2', true]}>
        <Input
          label={<b>Model name:</b>}
          marginTop={16}
          setValue={setModelName}
          value={modelName}
        />
      </Column>
      <Column col={12} colMd={6} paddingHorizontal={['$length.2', true]}>
        <Input
          label={<b>API key:</b>}
          marginTop={16}
          setValue={setApiKey}
          value={apiKey}
        />
      </Column>
    </Row>
  </>
)

export default FormLLM
