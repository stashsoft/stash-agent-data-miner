import Hr from '@smart-react-components/core/Element/Hr'
import styled from 'styled-components'

export default styled(Hr)(({ theme }) => `
  background: ${theme.$.color.dynamic.separator};
  border: 0;
  height: 1px;
  margin: ${theme.$.length[4]} 0;
  width: 100%;
`)
