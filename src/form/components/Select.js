/*
 * @Description: 更改select的组件
 * @Author: 鲁大师
 * @Date: 2019-10-15 15:07:00
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-21 09:30:41
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

class RcSelect extends Component {
  constructor(selectProps) {
    super(selectProps)
    this.state = {
      selectOptions: [],
      newOtherProps: {},
    }
  }

  componentDidMount() {
    this.didMount()
  }

  async didMount() {
    const { options=[], ...otherProps } = this.props
    const selectOptions = await this.setSelectOption(options)
    const newOtherProps = this.setOtherProps(otherProps)
    this.setState({
      selectOptions,
      newOtherProps
    })
  }

  async setSelectOption(options=[]) {
    if(typeof options === 'function') {
      return await options()
    } else {
      return options
    }
  }

  // TODO:处理其他的参数
  setOtherProps(otherProps) {
    const { onSearch=null } = otherProps
    if(onSearch) {
      otherProps.onSearch = async (value) => {
        if(!value) {
          this.setState({
            selectOptions: []
          })
        } else {
          const options = await onSearch(value) || []
          this.setState({
            selectOptions:options
          })
        }
      }
    }
    return otherProps
  }

  render() {
    const { selectOptions=[], newOtherProps } = this.state
    const { onChange, value=null } = this.props
    return(
      <Select 
        {...newOtherProps} 
        value={value}
        onChange={value => onChange(value)}
      >
        {
          selectOptions.length > 0 && 
          selectOptions.map((item, index) => {
            const { label='', value='', ...otherItem } = item
            return <Select.Option 
              key={`${label}_${index}_${value}`} 
              value={value}
              {...otherItem}
            >
              {
                label
              }
            </Select.Option>
          })
        }
      </Select>
    )
  }
}

RcSelect.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.any,
}

RcSelect.defaultProps = {
  options: []
}

export default RcSelect