import React from 'react'
import { Spin } from 'antd'
import PropTypes from 'prop-types'

const style = {
  textAlign: 'center',
  width: '100%',
  height: '100%',
}

function ScSpin (props) {
  const { spin, children } = props
  return <div style={style}>
    <Spin
      {...spin}
    >
      {
        children
      }
    </Spin>
  </div>
}

ScSpin.propTypes = {
  spin: PropTypes.object,
  children: PropTypes.element,
}

export default ScSpin