/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-15 21:09:10
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-30 18:01:21
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'
const CheckboxGroup = Checkbox.Group
import _ from 'lodash'
import optionsHandle from './options'

class RcCheckboxGroup extends Component{
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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(!_.isEqual(this.props, nextProps)) {
      this.didMount(nextProps)
    }
    return true
  }



  render() {
    const { options=[] } = this.state
    return(
      <CheckboxGroup 
        {...this.props} 
        options={options}
      ></CheckboxGroup>
    )
  }
}

export default RcCheckboxGroup