import Div from '@smart-react-components/core/Element/Div'
import React from 'react'
import Form from './Form'
import Intro from './Intro'

const App = () => {

  return (
    <Div
      display="flex"
      flexDirection="column"
    >
      <Intro />
      <Form />
    </Div>
  )
}

export default App
