import Div from '@smart-react-components/core/Element/Div'
import React from 'react'
import { API_URL } from '../constants'
import { ResultFile, ResultLog, ResultStatus } from '../types'
import Form from './Form'
import Intro from './Intro'
import Results from './Results'

const App = () => {
  const [resultFiles, setResultFiles] = React.useState<ResultFile[]>([])
  const [logs, setLogs] = React.useState<ResultLog[]>([])
  const [status, setStatus] = React.useState<{ status: ResultStatus, message: string }>({ status: ResultStatus.STAND_BY, message: '' })

  const getRunningInfo = () => {
    fetch(`${API_URL}/get-running-info`)
    .then(resp => resp.json())
    .then(resp => {
      setResultFiles(resp.files)
      setLogs(resp.logs)

      let newStatus: ResultStatus
      let message: string
      
      if (resp.successMessage) {
        newStatus = ResultStatus.SUCCESS
        message = resp.successMessage
      } else if (resp.errorMessage) {
        newStatus = ResultStatus.ERROR
        message = resp
      } else {
        newStatus = resp.status === 0 ? ResultStatus.STAND_BY : ResultStatus.PROCESSING
      }

      setStatus({
        status: newStatus,
        message,
      })

      if (newStatus === ResultStatus.PROCESSING) {
        setTimeout(getRunningInfo, 1000)
      }
    })
  }

  const handleAbort = () => {
    if (status.status !== ResultStatus.PROCESSING) {
      return
    }

    setStatus({
      status: ResultStatus.ABORTING,
      message: '',
    })

    fetch(`${API_URL}/stop`, {
      method: 'POST',
    })
  }

  const handleStart = (
    files: File[],
    columns: { name: string, description: string }[],
    provider: string,
    modelName: string,
    apiKey: string,
  ) => {
    if (!!(status.status & (ResultStatus.LOADING | ResultStatus.PROCESSING | ResultStatus.ABORTING))) {
      return
    }
  
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    columns.forEach(column => {
      if (!column.name.trim() || !column.description.trim()) {
        return
      }

      formData.append('columnNames[]', column.name)
      formData.append('columnDescriptions[]', column.description)
    })
    formData.append('provider', provider)
    formData.append('modelName', modelName)
    formData.append('apiKey', apiKey)

    setLogs([])
    setResultFiles([])
    setStatus({
      status: ResultStatus.LOADING,
      message: '',
    })

    fetch(`${API_URL}/start`, {
      method: 'POST',
      body: formData,
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.status === 'error') {
        setStatus({
          status: ResultStatus.ERROR,
          message: resp.message,
        })
      } else {
        getRunningInfo()
      }
    })
  }

  React.useEffect(() => { getRunningInfo() }, [])

  return (
    <Div
      display="flex"
      flexDirection="column"
      paddingBottom="$length.3"
    >
      <Intro />
      <Form onAbort={handleAbort} onStart={handleStart} status={status} />
      { (resultFiles.length > 0 || logs.length > 0) && <Results resultFiles={resultFiles} logs={logs} status={status.status} /> }
    </Div>
  )
}

export default App
