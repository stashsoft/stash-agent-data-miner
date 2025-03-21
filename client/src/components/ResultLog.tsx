import Li from '@smart-react-components/core/Element/Li'
import React from 'react'
import { ResultLog } from '../types'

interface Props {
  log: ResultLog
}

const ResultLogComponent: React.FC<Props> = ({ log }) => (
  <Li
    color="$color.dynamic.text"
    fontSize={14}
    paddingHorizontal={8}
    paddingVertical={3}
  >
    { log.createdAt } - { log.message }
  </Li>
)

export default ResultLogComponent
