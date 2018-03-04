import styled from 'styled-components'

export default styled.header`
  background-color: rgb(${props => props.theme.lightBlue});
  height: ${props => props.expanded ? '100%' : '48px'};
  // box-shadow: 0 2px 4px rgba(15, 52, 88, 0.18), 0 2px 3px rgba(15, 52, 88, 0.26);
  border-bottom: 1px solid rgba(${props => props.theme.blue}, 0.3);
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
        margin: 5px;
      }
    }

    .header__brand {
      padding: 0 10px;
      justify-self: start;
      font-size: 1.5em;
      background-color: rgb(${props => props.theme.lightBlue});
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: rgba(${props => props.theme.blue}, 0.3);
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

      a, button {
        font-size: 1em;
        background-color: rgb(${props => props.theme.lightBlue});
        transition: background-color 0.3s ease-in-out;
        
        &:hover {
          background-color: rgba(${props => props.theme.blue}, 0.3);
        }
      }

    }

    .header__link {
      display: grid;
      span {
        margin: auto;
      }
    }

    a, a:visited, button {
      color: #fff;
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
      visibility: hidden;
      opacity: 0;
      z-index: -1;
      transform: translateY(-20%);
      transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
    }

    [aria-expanded='true'] ~ .header__links {
      visibility: visible;
      opacity: 1;
      z-index: 1;
      max-height: 100%;
      max-width: 100%;
      grid-column: 1 / -1;
      background: rgb(${props => props.theme.lightBlue});

      display: grid;
      grid-auto-flow: row;
      justify-self: stretch;
      transform: translateY(0%);
      transition-delay: 0s, 0s, 0.3s;

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
