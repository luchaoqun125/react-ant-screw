/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-22 09:29:46
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-22 10:41:26
 */
import React from 'react'
import './style.less'

// 当settings.follow 和settings.inline为true时尽可能使用help和top,
// 当有suffix, prefix使用时，应有formItem中的style设置宽度，或者全局设置宽度

// help: '提示信息',
// top: 'top内容',
// suffix: 'suffix前缀内容',
// prefix: 'prefix后缀内容',
const Settings = {
  help: (props) => props ? <div className='setting-help'>{props}</div> : null,
  top: (props) => props ? <div className='setting-top'>{props}</div> : null,
  suffix: (props) => props ? <div className='setting-suffix'>{props}</div> : null,
  prefix: (props) => props ? <div className='setting-prefix'>{props}</div> : null,
}

export default Settings