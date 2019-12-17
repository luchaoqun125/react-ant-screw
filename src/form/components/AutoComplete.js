/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-21 09:09:32
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-12-16 20:41:20
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'

class RcAutoComplete extends Component{
  constructor(props) {
    super(props)
    this.state={
      newProps: {}
    }
  }

  componentDidMount() {
    this.didMount()
  }

  didMount() {
    const newProps = this.setOtherProps(this.props)
    this.setState({
      newProps
    })
  }

  // TODO:处理其他的参数
  setOtherProps(props) {
    let otherProps = Object.assign({}, props)
    let { onSearch=null, dataSource=null } = otherProps
    if(onSearch) {
      otherProps.onSearch = async (value) => {
        if(!value) {
          this.setState({
            dataSource:[]
          })
        } else {
          let options = await onSearch(value) || []
          if(dataSource && typeof dataSource === 'function') {
            options = dataSource(options)
          }
          this.setState({
            dataSource:options
          })
        }
      }
    }
    return otherProps
  }

  render() {
    const { value=null, onChange} = this.props
    const { dataSource=[], newProps={} } = this.state
    return(
      <AutoComplete 
        {...newProps}
        value={value}
        onChange={onChange}
        dataSource={dataSource}
      />
    )
  }
}

RcAutoComplete.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func
}

export default RcAutoComplete