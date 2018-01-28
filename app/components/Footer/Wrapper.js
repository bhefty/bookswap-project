import styled from 'styled-components'

const Wrapper = styled.footer`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.whiteMain};
  display: grid;
  grid-gap: 20px;
  justify-content: center;
  align-content: center;
  padding: 10px 0;

  section {
    text-align: center;

    a, a:visited {
      text-decoration: none;
    }
  }
`

export default Wrapper
