import H2 from '@smart-react-components/core/Element/H2'
import Ul from '@smart-react-components/core/Element/Ul'
import Button from '@smart-react-components/ui/Button'
import React from 'react'
import { ResultFile, ResultLog, ResultStatus } from '../types'
import ResultFileComponent from './ResultFile'
import ResultLogComponent from './ResultLog'
import Section from './Section'
import { API_URL } from '../constants'

interface Props {
  resultFiles: ResultFile[]
  logs: ResultLog[]
  status: ResultStatus
}

const Results: React.FC<Props> = ({ resultFiles, logs, status }) => {
  const handleDownload = () => {
    fetch(`${API_URL}/download`)
    .then(resp => resp.blob())
    .then(resp => {
      const url = URL.createObjectURL(resp)
      const a = document.createElement('a')
      a.href = url
      a.download = `output.csv`
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <Section
      rightElement={status === ResultStatus.SUCCESS ? <Button onClick={handleDownload} palette="info">Download</Button> : null}
      title="Results"
    >
      <Ul paddingTop={12}>
        { resultFiles.map(resultFile => <ResultFileComponent key={resultFile.id} resultFile={resultFile} />) }
      </Ul>
      <H2 fontSize={19} marginTop={48}>Running logs:</H2>
      <Ul
        background="$color.dynamic.resultBackground"
        border="solid 1px $color.dynamic.resultBorder"
        borderRadius={8}
        height={300}
        marginTop={16}
        paddingVertical={12}
        overflow="auto"
      >
        { logs.map(log => <ResultLogComponent key={log.id} log={log} />) }
      </Ul>
    </Section>
  )
}

export default Results
