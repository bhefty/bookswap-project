import styled, { keyframes } from 'styled-components'

// @-webkit-keyframes pulse {
//   0% {
//     -webkit-box-shadow: 0 0 0 0 rgba(61, 150, 213, 0.4);
//   }
//   70% {
//       -webkit-box-shadow: 0 0 0 10px rgba(61, 150, 213, 0);
//   }
//   100% {
//       -webkit-box-shadow: 0 0 0 0 rgba(61, 150, 213, 0);
//   }
// }
const pulse = keyframes`
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(61, 150, 213, 0.4);
    box-shadow: 0 0 0 0 rgba(61, 150, 213, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 10px rgba(61, 150, 213, 0);
      box-shadow: 0 0 0 10px rgba(61, 150, 213, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(61, 150, 213, 0);
      box-shadow: 0 0 0 0 rgba(61, 150, 213, 0);
  }
`

export default styled.div`
  @media (min-width: 500px) {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-gap: 2em;

    #drawer-toggle, #drawer-toggle-label {
      display: none;
    }

    .sidebar {
      position: fixed;
      top: 24px;
      z-index: 1;

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
          width: 100%;
          height: 100%;
          border: none;
          border-bottom: 1px solid #fff;
          outline: 0;
          background: rgba(121, 203, 236, 1);
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
            background: rgba(61, 150, 213, 1);
          }
        }

        #sidebar-btn-add-book {
          border-top-right-radius: 8px;
        }

        #sidebar-btn-profile {
          border-bottom: none;
          border-bottom-right-radius: 8px;
        }
      }
    }
  }

  @media (max-width: 500px) {
    * {
      -webkit-box-sizing: border-box; 
      -moz-box-sizing: border-box; 
      -o-box-sizing: border-box; 
      box-sizing: border-box; 
      /* adds animation for all transitions */ 
      -webkit-transition: .25s ease-in-out; 
      -moz-transition: .25s ease-in-out; 
      -o-transition: .25s ease-in-out; 
      transition: .25s ease-in-out; 
      margin: 0; 
      padding: 0; 
      -webkit-text-size-adjust: none; 
    }
  
    #drawer-toggle {
      position: absolute;
      opacity: 0;
    }

    #drawer-toggle-label {
      -webkit-touch-callout: none; 
      -webkit-user-select: none; 
      -khtml-user-select: none; 
      -moz-user-select: none; 
      -ms-user-select: none; 
      user-select: none; 
      left: 10px; 
      height:50px; 
      width: 50px; 
      display: block; 
      position: fixed; 
      bottom: 10px;
      background: rgba(255,255,255,.0);
      z-index: 1;
      
      .dash-open {
        background-color: rgb(61, 150, 213);
        display: inline-block;
        border-radius: 50%;
        box-shadow: 0 0 0 rgba(61, 150, 213, 0.4);
        animation: ${pulse} 2s infinite;
        
        svg {
          fill: #fff;
          margin: 2px 0 0 2px;
        }
      }

      .dash-close {
        display: inline-block;
        
        svg {
          fill: #fff;
          margin: 2px 0 0 2px;
        }
      }
    }

    .sidebar-button-wrapper { 
      position: fixed;
      top: 0;
      left: -100px;
      height: 100%;
      width: 100px;
      background: #2f2f2f;
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 0;
      -webkit-overflow-scrolling: touch;
    }

    .content { 
      margin-left: 0px; 
      margin-top: 0px; 
      margin-bottom: 50px;
      width: 100%; 
      height: calc(100% - 50px); 
      overflow-x:hidden; 
      overflow-y:scroll; 
      -webkit-overflow-scrolling: touch; 
      padding: 20px; 
    }

    #drawer-toggle:checked ~ #drawer-toggle-label { 
      height: 100%; 
      width: calc(100% - 100px); 
      background: rgba(0,0,0,.6);
    } 

    #drawer-toggle:checked ~ #drawer-toggle-label { 
      left: 100px;
      top: 48px;
    } 

    #drawer-toggle:checked ~ .sidebar-button-wrapper { 
      left: 0px; 
    } 

    #drawer-toggle:checked ~ .content { 
      margin-left: 100px; 
    }

    ul {
      list-style-type: none;
    }

    .sidebar {
      position: sticky;
      top: 0;
      z-index: 1;

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
          width: 100%;
          height: 100%;
          border: none;
          border-bottom: 1px solid #fff;
          outline: 0;
          background: rgba(121, 203, 236, 1);
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
            background: rgba(61, 150, 213, 1);
          }
        }

        #sidebar-btn-profile {
          border-bottom: none;
        }
      }
    }
  }
`
