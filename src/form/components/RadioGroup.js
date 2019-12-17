/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-15 21:09:10
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-21 09:50:52
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'antd'
const RadioGroup = Radio.Group
import optionsHandle from './options'

class RcRadioGroup extends Component{
  constructor(props) {
    super(props)
    this.state={
      options: []
    }
  }

  componentDidMount(){
    this.didMount(this.props)
  }

  async didMount(props) {
    const { options = [] } = props
    let newOptions = await optionsHandle(options)
    this.setState({
      options: newOptions
    })
  }

  render() {
    const { options=[] } = this.state
    return(
      <RadioGroup 
        {...this.props} 
        options={options}
      ></RadioGroup>
    )
  }
}

RcRadioGroup.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
}

export default RcRadioGroup