import Div from '@smart-react-components/core/Element/Div'
import H1 from '@smart-react-components/core/Element/H1'
import Header from '@smart-react-components/core/Element/Header'
import WaveEffect from '@smart-react-components/ui/WaveEffect'
import React from 'react'
import Section from '../elements/Section'
import CloseIcon from '../icons/Close'

interface Props {
  children: JSX.Element | JSX.Element[]
  rightElement?: JSX.Element
  title: string
}

const SectionComponent: React.FC<Props> = ({ children, rightElement, title }) => (
  <Section>
    <Header
      alignItems="center"
      display="flex"
      justifyContent="space-between"
    >
      <H1
        flex="1 1 auto"
        fontSize={25}
        minHeight={1}
      >
        {title}
      </H1>
      { rightElement && rightElement }
    </Header>
    {children}
  </Section>
)

SectionComponent.defaultProps = {
  rightElement: null,
}

export default SectionComponent
