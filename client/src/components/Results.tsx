import H2 from '@smart-react-components/core/Element/H2'
import Ul from '@smart-react-components/core/Element/Ul'
import Button from '@smart-react-components/ui/Button'
import React from 'react'
import { ResultFile } from '../types'
import ResultFileComponent from './ResultFile'
import Section from './Section'
import Li from '@smart-react-components/core/Element/Li'

interface Props {
  resultFiles: ResultFile[]
  logs: string[]
}

const Results: React.FC<Props> = ({ resultFiles, logs }) => (
  <Section
    rightElement={<Button palette="info">Download</Button>}
    title="Results"
  >
    <Ul paddingTop={12}>
      { resultFiles.map((resultFile, idx) => <ResultFileComponent key={idx} resultFile={resultFile} />) }
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
      { logs.map((log, idx) => (
        <Li
          key={idx}
          color="$color.dynamic.text"
          fontSize={14}
          paddingHorizontal={8}
          paddingVertical={3}
        >
          { log }
        </Li>
      )) }
    </Ul>
  </Section>
)

export default Results
