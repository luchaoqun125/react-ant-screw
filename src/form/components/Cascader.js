/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-21 09:49:53
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-21 09:57:36
 */
import React, { Component } from 'react'
import { Cascader } from 'antd'
import optionsHandle from './options'

class RcCascader extends Component{
  state = {
    options:[]
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
      <Cascader 
        {...this.props}
        options={options}
      />
    )
  }
}

export default RcCascader