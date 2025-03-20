import Section from '@smart-react-components/core/Element/Section'
import styled from 'styled-components'

export default styled(Section)(({ theme }) => `
  background: ${theme.$.color.dynamic.background};
  border-radius: ${theme.$.radius.generic};
  margin-left: ${theme.$.length.genericSpace};
  margin-right: ${theme.$.length.genericSpace};
  margin-top: ${theme.$.length.genericSpace};
  padding: ${theme.$.length[3]};

  > p {
    margin-top: 16px; 
  }
`)
