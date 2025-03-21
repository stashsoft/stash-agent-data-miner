import Li from '@smart-react-components/core/Element/Li'
import Span from '@smart-react-components/core/Element/Span'
import Loading from '@smart-react-components/ui/Loading'
import React from 'react'
import CheckIcon from '../icons/Check'
import CloseIcon from '../icons/Close'
import CsvIcon from '../icons/Csv'
import DocIcon from '../icons/Doc'
import MarkdownIcon from '../icons/Markdown'
import PdfIcon from '../icons/Pdf'
import TextIcon from '../icons/Text'
import XlsIcon from '../icons/Xls'
import { ResultFile, ResultStatus } from '../types'

interface Props {
  resultFile: ResultFile
}

const ResultFileComponent: React.FC<Props> = ({ resultFile }) => {
  const Icon = React.useMemo(() => {
    const extension = resultFile.name.split('.').pop().toLowerCase()
    const iconSize = 28

    switch (extension) {
      case 'csv':
        return <CsvIcon fill="!success" iconSize={iconSize} />
      case 'doc':
      case 'docx':
        return <DocIcon fill="#1B5EBE" iconSize={iconSize} />
      case 'md':
        return <MarkdownIcon fill="$color.gray500" iconSize={iconSize} />
      case 'pdf':
        return <PdfIcon fill="!danger" iconSize={iconSize} />
      case 'txt':
        return <TextIcon fill="!secondary" iconSize={iconSize} />
      case 'xls':
      case 'xlsx':
        return <XlsIcon fill="#217346" iconSize={iconSize} />
    }

    return null
  }, [resultFile.name])

  return (
    <Li
      alignItems="center"
      border="solid 1px {color.dynamic.resultBorder}"
      borderRadius={8}
      display="flex"
      marginTop={12}
      paddingHorizontal={16}
      paddingVertical={12}
      {...(resultFile.processed === 2 && {
        background: '$color.dynamic.resultBackground',
      })}
    >
      {Icon}
      <Span flex="1 1 auto" paddingHorizontal="$length.1">{resultFile.name}</Span>
      { resultFile.processed < 2
        ? <Loading color="!primary" size="medium" />
        : <CheckIcon fill="!success" iconSize={20} />
      }
    </Li>
  )
}

export default ResultFileComponent
