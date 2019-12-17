/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-09-25 14:23:03
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-12-16 21:53:30
 */
import React from 'react'

import {
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  // Cascader,
  // DatePicker,
  // Transfer,
  // TimePicker,
  Mention,
  Mentions,
} from 'antd'

import RcSelect from './Select'
import RcCheckboxGroup from './CheckboxGroup'
import RcRadioGroup from './RadioGroup'
import RcTransfer from './Transfer'
import RcDatePicker, { RcMonthPicker, RcWeekPicker, RcRangePicker, RcTimePicker} from './DatePicker'
import RcCascader from './Cascader'
import RcAutoComplete from './AutoComplete'

// TODO:  不支持使用的组件
const NO_USE_COMPONENT = <span>this component does not support! you can use render or click it <a href=''>使用方法</a></span>

export const AND_COMPONENTS = {
  Select: RcSelect,
  Input,
  TextArea: Input.TextArea,
  Password: Input.Password, //未验证
  InputSearch: Input.Search,//未验证
  InputGroup: Input.Group,  //未验证
  // Radio,
  RadioGroup: Radio.Group,
  // RadioGroup: RcRadioGroup,
  RadioButton: NO_USE_COMPONENT,
  InputNumber,
  Checkbox,
  CheckboxGroup: RcCheckboxGroup,
  Switch,
  Slider,
  Button,
  Rate,
  AutoComplete: RcAutoComplete, // 未实现
  Cascader: RcCascader,
  DatePicker: RcDatePicker,
  MonthPicker: RcMonthPicker,
  RangePicker: RcRangePicker,
  WeekPicker: RcWeekPicker,
  Transfer: RcTransfer,   // 未实行
  TimePicker: RcTimePicker,
  Mention,    // 未验证
  Mentions,    // 未验证
  Upload,
  NoSupport: NO_USE_COMPONENT
}