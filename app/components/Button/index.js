/**
*
* Button
*
* Common button, if passed a prop "route" it will render a link to react-router route
* else it will render a link with onClick
*/

import React, { Children } from 'react'
import PropTypes from 'prop-types'

import A from './A'
import StyledButton from './StyledButton'
import Wrapper from './Wrapper'

function Button (props) {
  // Render anchor tag
  let button = (
    <A href={props.href} onClick={props.onClick}>
      {Children.toArray(props.children)}
    </A>
  )

  // If Button has handleRoute prop, we render a button
  if (props.handleRoute) {
    button = (
      <StyledButton onClick={props.handleRoute}>
        {Children.toArray(props.children)}
      </StyledButton>
    )
  }

  return (
    <Wrapper>
      {button}
    </Wrapper>
  )
}

Button.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default Button
