import Div from '@smart-react-components/core/Element/Div'
import React from 'react'
import Form from './Form'
import Intro from './Intro'
import { ResultFile, ResultStatus } from '../types'
import Results from './Results'

const App = () => {
  const [resultFiles, setResultFiles] = React.useState<ResultFile[]>([
    { name: 'file1.pdf', status: ResultStatus.SUCCESS },
    { name: 'file2.doc', status: ResultStatus.SUCCESS },
    { name: 'file3.docx', status: ResultStatus.SUCCESS },
    { name: 'file4.xls', status: ResultStatus.SUCCESS },
    { name: 'file5.xlsx', status: ResultStatus.SUCCESS },
    { name: 'file6.md', status: ResultStatus.SUCCESS },
    { name: 'file7.txt', status: ResultStatus.ERROR },
    { name: 'file8.csv', status: ResultStatus.LOADING },
  ])
  const [logs, setLogs] = React.useState<string[]>([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ])

  return (
    <Div
      display="flex"
      flexDirection="column"
      paddingBottom="$length.3"
    >
      <Intro />
      <Form />
      { (resultFiles.length > 0 || logs.length > 0) && <Results resultFiles={resultFiles} logs={logs} /> }
    </Div>
  )
}

export default App
