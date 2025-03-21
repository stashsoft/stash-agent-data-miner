import Span from '@smart-react-components/core/Element/Span'
import InputAddon from '@smart-react-components/ui/Input/InputAddon'
import InputFile from '@smart-react-components/ui/Input/InputFile'
import React from 'react'

interface Props {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  files: File[]
}

const FormFile: React.FC<Props> = ({ setFiles, files }) => (
  <>
    <InputFile
      accept=".pdf,.doc,.docx,.xls,.xlsx,.md,.txt,.csv"
      label="Select the files you want to extract data from:"
      marginTop="$length.3"
      rightAddon={(
        <InputAddon palette="primary" isOutline={false}>Browse</InputAddon>
      )}
      setValue={setFiles}
      value={files}
    />
    <Span
      display="block"
      fontSize="$fontSize.3"
      marginTop={12}
    >
      Supported file extensions: *.pdf, *.doc, *.docx, *.xls, *.xlsx, *.md, *.txt, *.csv.
    </Span>
  </>
)

export default FormFile
