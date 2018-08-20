import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './Button.scss'


const Button = ({ isPrimary, title, onClick, ...rest }) => {
  const buttonStyleName = cx('button', {
    'primary': isPrimary,
  })

  return (
    <button className={buttonStyleName} onClick={onClick} {...rest}>{title}</button>
  )
}

Button.propTypes = {
  isPrimary: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
