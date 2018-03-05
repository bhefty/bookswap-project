/**
 * Custom checkbox styling inspired by:
 * https://codepen.io/mallendeo/pen/eLIiG
 */

import styled from 'styled-components'

export default styled.div`
  margin-bottom: 50px;

  .filter-input-wrapper {
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    padding: 0 0.5em;
    background-color: rgb(${props => props.theme.lightBlue});
    max-width: 300px;

    span {
      margin: 1em;
      color: #fff;
    }

    .filter-owned-books {
      display: none;

      &,
      &:after,
      &:before,
      & *,
      & *:after,
      & *:before,
      & * + .toggle-button {
        box-sizing: border-box;
        &::selection {
          background: none;
        }
      }

      + .toggle-button {
        outline: 0;
        display: block;
        width: 4em;
        height: 2em;
        position: relative;
        cursor: pointer;
        user-select: none;
        &:after,
        &:before {
          position: relative;
          display: block;
          content: "";
          width: 50%;
          height: 100%;
        }
        
        &:after {
          left: 0;
        }
        
        &:before {
          display: none;
        }
      }
      
      &:checked + .tgl-btn:after {
        left: 50%;
      }
    }

    .toggle-checkbox {
      + .toggle-button {
        padding: 2px;
        transition: all .2s ease;
        background: #fff;
        border: 4px solid #f2f2f2;
        border-radius: 2em;
        &:after {
          transition: all .2s ease;
          background: #f2f2f2;
          content: "";
          border-radius: 1em;
        }
      }
    
      &:checked + .toggle-button {
        border: 4px solid #7FC6A6;
        &:after {
          left: 50%;
          background: #7FC6A6;
        }
      }
    }
  }
`
