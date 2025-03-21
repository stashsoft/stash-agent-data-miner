import Div from '@smart-react-components/core/Element/Div'
import Li from '@smart-react-components/core/Element/Li'
import Input from '@smart-react-components/ui/Input'
import React from 'react'
import { Column } from '../types'

interface Props {
  idx: number
  column: Column
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
}

const FormColumn: React.FC<Props> = ({ idx, column, setColumns }) => {
  const handleChange = (key: string, value: string) => {
    setColumns(curColumns => {
      const columns = curColumns.map((curCol, curIdx) => {
        if (idx === curIdx) {
          return {
            ...curCol,
            [key]: value,
          }
        }

        return curCol
      })

      if (columns.length === idx + 1 && value.trim()) {
        columns.push({
          name: '',
          description: '',
        })
      }

      return columns
    })
  }

  return (
    <Li
      display="flex"
      marginTop={12}
    >
      <Div
        flex="0 0 40%"
        width="40%"
      >
        <Input
          placeholder="Full name"
          setValue={value => handleChange('name', value)}
          value={column.name}
        />
      </Div>
      <Div
        flex="0 0 60%"
        paddingLeft="$length.3"
        width="60%"
      >
        <Input
          placeholder="Extract the names from the First Name and Last Name columns and add them to this column by combining them."
          setValue={value => handleChange('description', value)}
          value={column.description}
        />
      </Div>
    </Li>
  )
}

export default FormColumn
