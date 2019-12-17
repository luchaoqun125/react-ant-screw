/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-15 14:31:08
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-11-06 11:06:43
 */
// TODO:处理样式显示格式
const STATUS_CONST = {
  preview: 'preview',
  edit: false,
  disabled: true
}
// TODO:follow和inline的样式解决
const DEFAULT_STYLE = {
  follow: {
    display: 'inline-block',
  },
  inline: {
    display: 'inline-block',
    marginLeft: 20
  },
  layoutInline: {
    display: 'inline-block',
  }
}
// TODO:status=preview时，显示默认样式
const COMPONENT_STATUS = ['Button']

// 默认样式,不使用wrapperWidth的属性
const COMPONENT_DEFAULT_STYLE = [
  'Switch',
  'DatePicker',
  'MonthPicker',
  'WeekPicker',
  'RangePicker',
  'TimePicker',
]

export {
  STATUS_CONST,
  DEFAULT_STYLE,
  COMPONENT_STATUS,
  COMPONENT_DEFAULT_STYLE
}