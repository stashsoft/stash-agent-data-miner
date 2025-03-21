import Div from '@smart-react-components/core/Element/Div'
import Li from '@smart-react-components/core/Element/Li'
import P from '@smart-react-components/core/Element/P'
import Ul from '@smart-react-components/core/Element/Ul'
import Alert from '@smart-react-components/ui/Alert'
import React from 'react'
import InfoIcon from '../icons/Info'
import { Column } from '../types'
import FormColumn from './FormColumn'
import { AlertIcon } from '@smart-react-components/ui'

interface Props {
  columns: Column[]
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
}

const FormColumns: React.FC<Props> = ({ columns, setColumns }) => (
  <>
    <p>Add the columns that will be placed as the header of the CSV file and descriptions of what data in the files these columns will contain:</p>
    <Ul>
      <Li
        display="flex"
        marginTop={18}
      >
        <Div
          flex="0 0 40%"
          width="40%"
        >
          <b>Column name:</b>
        </Div>
        <Div
          flex="0 0 60%"
          paddingLeft="$length.3"
          width="60%"
        >
          <b>Description:</b>
        </Div>
      </Li>
      { columns.map((column, idx) => <FormColumn key={idx} idx={idx} column={column} setColumns={setColumns} />) }
      <Alert marginTop="$length.3" palette="dynamic">
        <AlertIcon>
          <InfoIcon fill="$color.blue" flex="0 0 auto" iconSize={[24, true]} />
        </AlertIcon>
        The AI reads both the column names and descriptions, then extracts the necessary information from the files based on those descriptions. Therefore, please ensure that you clearly specify which data must be extracted and how it should be mapped to the corresponding columns.
      </Alert>
    </Ul>
  </>
)

export default FormColumns
