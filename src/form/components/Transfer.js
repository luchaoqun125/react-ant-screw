/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-20 11:19:29
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-24 14:59:02
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transfer } from 'antd'

class RcTransfer extends Component{
  
  onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys: ', nextTargetKeys)
    console.log('direction: ', direction)
    console.log('moveKeys: ', moveKeys)
    this.props.onChange && this.props.onChange(nextTargetKeys)
  }

  onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    // this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    // selectedKeys
    console.log('sourceSelectedKeys: ', sourceSelectedKeys)
    console.log('targetSelectedKeys: ', targetSelectedKeys)
  };


  render() {
    const { props } = this
    return(
      <Transfer
        {...props}
        value={props.value}
        onChange={this.onChange}
        onSelectChange={this.onSelectChange}
      />
    )
  }
}

RcTransfer.propTypes = {
  onChange: PropTypes.func
}

export default RcTransfer