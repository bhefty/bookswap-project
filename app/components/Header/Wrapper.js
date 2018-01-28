import styled from 'styled-components'

export default styled.header`
  background-color: ${props => props.theme.primary};
  height: ${props => props.expanded ? '100%' : '48px'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.18), 0 2px 3px rgba(0,0,0,0.26);
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  
  position: sticky;
  top: 0;
  z-index: 11101;
  
  /* padding: 0 10px; */

  .header {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 48px 1fr;
    grid-auto-flow: column;
    align-content: center;

    .header__logo {
      img {
        width: 100%;
      }
    }

    .header__brand {
      padding 0 10px;
      justify-self: start;
      font-size: 1.5em;

      &:hover {
        background-color: ${props => props.theme.lightAccent};
      }
    }

    .header__links {
      justify-self: end;

      display: grid;
      grid-template-columns: 1fr;
      grid-auto-flow: column;
      grid-gap: 10px;

      span {
        padding: 0 10px;
      }

      a:hover {
        background-color: ${props => props.theme.lightAccent};
      }
    }

    .header__link {
      display: grid;
      span {
        margin: auto;
      }
    }

    a, a:visited, button {
      color: ${props => props.theme.whiteMain};
      text-decoration: none;
    }

    button {
      border: none;
      font-size: 1.5em;
    }

    [aria-controls="menu-list"] {
      display: none;
    }
  }

  @media (max-width: 700px) {
    .header {
      grid-template-columns: 48px 1fr 48px;
      grid-auto-flow: row;
      grid-template-rows: 1fr;
      /* grid-auto-rows: 50px; */
      grid-gap: 0;

      [aria-controls="menu-list"] {
        display: block;
      }
    }
    
    .header__links {
      max-height: 0;
      max-width: 0;
      overflow: hidden;
      transform: translateY(-20%);
      transition: 0.3s cubic-bezier(.2, 0, 0, 1.6);
    }

    [aria-expanded='true'] ~ .header__links {
      max-height: 100%;
      max-width: 100%;
      grid-column: 1 / -1;
      background: ${props => props.theme.darkAccent};

      display: grid;
      grid-auto-flow: row;
      justify-self: stretch;
      transform: translateY(0%);

      .header__link {
        padding: 0.5em 0;
      }
    }

    [aria-expanded='false'] .close {
      display: none;
    }

    [aria-expanded='true'] .close {
      display: inline-block;
    }

    [aria-expanded='true'] .open {
      display: none;
    }
  }
`
