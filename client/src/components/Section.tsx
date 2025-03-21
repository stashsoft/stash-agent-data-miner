import Div from '@smart-react-components/core/Element/Div'
import H1 from '@smart-react-components/core/Element/H1'
import Header from '@smart-react-components/core/Element/Header'
import WaveEffect from '@smart-react-components/ui/WaveEffect'
import React from 'react'
import Section from '../elements/Section'
import CloseIcon from '../icons/Close'

interface Props {
  children: JSX.Element | JSX.Element[]
  onClose?: () => void
  title: string
}

const SectionComponent: React.FC<Props> = ({ children, onClose, title }) => (
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
      { onClose && (
        <WaveEffect palette="dark">
          <Div
            borderRadius="100%"
            display="flex"
            marginLeft={8}
            onClick={onClose}
            padding={2}
          >
            <CloseIcon
              cursor="pointer"
              flex="0 0 auto"
              iconSize={28}
            />
          </Div>
        </WaveEffect>
      ) }
    </Header>
    {children}
  </Section>
)

SectionComponent.defaultProps = {
  onClose: null,
}

export default SectionComponent
