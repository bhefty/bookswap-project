import styled from 'styled-components'

export default styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 2em;

  @media (max-width: 848px) {
    display: block;
  }

  .content {
    h1 {
      font-weight: 200;
    }
    
    .content-library {
      margin: 2em 0;
      display: grid;
      grid-gap: 1em;
      grid-template-columns: repeat(auto-fit, minmax(150px, 350px));
      align-items: center;
      justify-content: center;
    }
  }
`
