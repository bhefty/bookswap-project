import styled from 'styled-components'

export default styled.div`
  .sidebar {
    position: sticky;
    top: 0;
  }

  .sidebar-button-wrapper {
      display: grid;
      grid-template-rows: 100px;
      grid-auto-flow: row;
      grid-auto-rows: 100px;
      margin: 0;
      padding: 0;
      align-content: center;
      height: 100vh;

      @media (max-width: 848px) {
        grid-template-columns: 100px;
        grid-auto-flow: column;
        grid-auto-columns: 100px;
        height: 100%;
        justify-content: center;
      }

      button {
        border: none;
        border-bottom: 1px solid #fff;
        @media (max-width: 848px) {
          border-bottom: none;
          border-right: 1px solid #fff;
        }
        outline: 0;
        background: rgba(59, 171, 221, 0.5);
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
          background: rgba(59, 171, 221, 1);
        }
      }
      button:first-child {
        border-top-right-radius: 8px;
        @media (max-width: 848px) {
          border-top-right-radius: 0;
          border-bottom-left-radius: 8px;
        }
      }

      button:last-child {
        border-bottom: none;
        border-bottom-right-radius: 8px;
        @media (max-width: 848px) {
          border-right: none;
          border-bottom-right-radius: 8px;
        }
      }
    }
`
