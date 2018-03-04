import styled from 'styled-components'

export default styled.div`
  .sidebar {
    position: sticky;
    top: 0;

    .sidebar-button-wrapper {
      display: grid;
      grid-template-rows: 100px;
      grid-auto-flow: row;
      grid-auto-rows: 100px;
      margin: 0;
      padding: 0;
      align-content: center;
      height: 100vh;

      button {
        border: none;
        border-bottom: 1px solid #fff;
        outline: 0;
        background: rgba(${props => props.theme.lightBlue}, 1);
        transition: background 0.3s ease-in-out;
        color: #fff;
        cursor: pointer;

        .sidebar-context {
          
          svg {
            height: 30px;
            width: 30px;
          }
        }
        &:hover {
          background: rgba(${props => props.theme.blue}, 1);
        }
      }
      button:first-child {
        border-top-right-radius: 8px;
      }

      button:last-child {
        border-bottom: none;
        border-bottom-right-radius: 8px;
      }
    }

    [aria-controls="dash-list"] {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .sidebar {
      position: fixed;
      top: -100px;
      z-index: 1;
      [aria-controls="dash-list"] {
        display: block;
        position: relative;
        top: calc(50vh + 48px);
        color: #fff;
        border: none;
        border-radius: 0 50px 50px 0;
        background-color: rgb(${props => props.theme.lightBlue});
        width: 50px;
        height: 100px;
        outline: 0;

        svg {
          margin-left: -10px;
        }
      }
    }

    [aria-expanded='false'] ~ .sidebar-button-wrapper {
      max-height: 0;
      max-width: 0;
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      z-index: -1;
      transform: translateX(-20%);
      transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;      
    }

    [aria-expanded='true'] ~ .sidebar-button-wrapper {
      visibility: visible;
      opacity: 1;
      z-index: 1;
      max-height: 100%;
      max-width: 100px;

      display: grid;
      grid-template-rows: 100px;
      grid-auto-flow: row;
      grid-auto-rows: 100px;
      margin: 0;
      padding: 0;
      align-content: center;
      height: 100vh;
      transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s; 
      transform: translateX(0%);
      transition-delay: 0s, 0s, 0.3s;
    }

    [aria-expanded='false'] .dash-close {
      display: none;
    }

    [aria-expanded='true'] .dash-close {
      display: inline-block;
      position: relative;
      left: 88px;
      color: #fff;
      border: none;
      border-radius: 0 50px 50px 0;
      background-color: rgb(${props => props.theme.blue});
      width: 50px;
      height: 100px;
      line-height: 100px;
      outline: 0;

      svg {
        margin-left: -10px;
      }
    }

    [aria-expanded='true'] .dash-open {
      display: none;
    }
  }
`
