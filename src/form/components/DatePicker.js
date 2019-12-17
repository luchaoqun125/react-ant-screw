/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-20 17:09:32
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-21 10:20:09
 */
import React, { Component } from 'react'
import { DatePicker, TimePicker } from 'antd'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker
import moment from 'moment'

// 默认参数
const DEFAULT_PROPS = {
  format: 'YYYY-MM-DD HH:mm:ss',
  TimePicker: 'HH:mm:ss',
  showTime:{
    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
  }
}

class RcDatePicker extends Component{
  render() {
    const newProps = changeProps(this.props)
    return <DatePicker 
      {...newProps}
    />
  }
}

export class RcMonthPicker extends Component{
  render() {
    const newProps = changeProps(this.props)
    return(
      <MonthPicker {...newProps}/>
    )
  }
}
export class RcWeekPicker extends Component{
  render() {
    const newProps = changeProps(this.props)
    return(
      <WeekPicker {...newProps}/>
    )
  }
}

export class RcRangePicker extends Component{
  constructor(props){
    super(props)
    this.$showTime = this.showTime(props)
  }
  showTime(props) {
    const { showTime= true } = props
    let newShowTime = showTime
    if(typeof showTime === 'object' || showTime === true) {
      newShowTime = {...DEFAULT_PROPS.showTime, ...showTime}
    }
    return newShowTime
  }

  render() {
    const newProps = changeProps(this.props)
    return(
      <RangePicker 
        {...newProps} 
        showTime={this.$showTime}
      />
    )
  }
}

export class RcTimePicker extends Component{
  render() {
    const newProps = changeProps(this.props, 'TimePicker')
    return(
      <TimePicker {...newProps}/>
    )
  }
} 

function changeValue(value=null, format) {
  let newValue = null
  if(value && typeof value === 'string') {
    newValue = moment(value, format)
  } else if(value && typeof value === 'object' && value.length !== 0) {
    newValue = [moment(value[0], format), moment(value[1], format)]
  }
  return newValue 
}

function changeProps(props, formatType='format') {
  let newProps = Object.assign({}, props)
  const { value=null, onChange, format=DEFAULT_PROPS[formatType], ...otherProps} = newProps
  return {
    value: changeValue(value, format),
    onChange: (dates, dataString) => onChange(dataString),
    format,
    ...otherProps
  }
}

export default RcDatePicker