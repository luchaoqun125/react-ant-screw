/*
 * @Description: TODO:数据处理
 * @Author: 鲁大师
 * @Date: 2019-09-25 11:30:04
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-12-16 20:51:51
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import FormItems from './FormItems'
import { STATUS_CONST, DEFAULT_STYLE, COMPONENT_DEFAULT_STYLE } from './const'
import _ from 'lodash'

class ScForm extends Component {
  constructor(formConfig) {
    super(formConfig)
    this.$formItems = [] //更改items的数据
    this.$followArray = [] //暂存follow和inline的数据，
    this.$followIndex = null //暂存插入的开始位置
    // 实例的apis
    this.instanceApis = this.props.form
    this.state={
      formItems: this.setFormItems(formConfig)
    }
  }

  // TODO:处理items数据
  setFormItems(config={}) {
    const { items=[],  props={} } = config
    const newProps = this.setFormProps(props)
    const formSettings = config.settings || {}
    
    this.$formItems = []
    for(let i = 0; i<items.length; i++) {
      let item = null
      if(typeof items[i] === 'function') {
        item = items[i](this.instanceApis)
      } else {
        item = items[i]
      }
      this.setItemForm(formSettings, item, newProps)
    }

    this.$followArray = []
    console.log(this.$formItems, 'this.$formItems')
    return this.$formItems
  }

  /**
   * @description: 更改item的配置
   * @param {type} formSetting:form的setting，item是items中每一个元素的配置
   * @return: item
   */
  setItemForm(formSetting, item, formProps) {
    const { globalStatus='edit', wrapperWidth=null } = formSetting
    let { settings={}, props={}, component=null } = item
    const { status = globalStatus, follow=false, inline=false } = settings
    let layout = formProps.layout || 'horizontal'
    // TODO:status转化
    const itemStatus = STATUS_CONST[status]
    if(itemStatus !== 'preview') {
      props.disabled = itemStatus
    } else {
      settings.status = itemStatus
    }

    // 对按钮添加事件
    if(component === 'Button') {
      props = this.setItemButton(item)
    } else {
      if(wrapperWidth && !follow && !inline && COMPONENT_DEFAULT_STYLE.indexOf(component) < 0) {
        const { style ={} } = props
        props = {
          ...props,
          style: {
            width:wrapperWidth,
            ...style,
          }
        }
      }
    }
    // TODO:formItem转化
    let { formItem={} } = item
    const { label='', style={} } = formItem

    let newItem = {
      ...item,
      props,
      settings,
      formItem: Object.assign({}, formItem)
    }

    if(follow) {
      this.$followIndex = this.$formItems.length 
      this.$followArray=[]
      
      if(label === '' && !inline && formProps.labelCol && formProps.wrapperCol) {
        formItem.wrapperCol = { offset: formProps.labelCol.span, span: formProps.wrapperCol.span}
      }
      
      delete newItem.formItem.label && delete newItem.formItem.wrapperCol
      newItem.formItem.style = _.assign({}, style, DEFAULT_STYLE.follow)
      
      this.$followArray.push(newItem)
      this.$formItems.push({
        formItem,
        formItems:this.$followArray
      })
    } else if(inline && this.$followArray.length >= 0 && this.$followIndex >= 0) {
      newItem.formItem.style = _.assign({}, style, layout !== 'inline' ? DEFAULT_STYLE.inline : DEFAULT_STYLE.layoutInline)

      this.$followArray.push(newItem)
      if(this.$formItems[this.$followIndex]) this.$formItems[this.$followIndex].formItems = this.$followArray

    } else {
      this.$followArray = []
      this.$followIndex = null

      if(label === '' && !inline && formProps.labelCol && formProps.wrapperCol) {
        newItem.formItem.wrapperCol = { offset: formProps.labelCol.span, span: formProps.wrapperCol.span}
      }
      this.$formItems.push(newItem)
    }

  }

  /**
   * @description: 处理item = Button
   * @param {type} 
   * @return: 
   */
  setItemButton(item={}) {
    const { props={}, settings={} } = item
    const { htmlType = '' } = settings

    let onClick = () => {}
    if(htmlType === 'submit') {
      onClick = (e) => this.bindButtonClick(e, props.onClick)
    }
    else if(htmlType === 'reset') {
      onClick = (e) => {
        e.preventDefault()
        this.props.form.resetFields()
        props.onClick()
      }
    } else {
      // TODO:默认所有的点击请求
      onClick = (e) => {
        e.preventDefault()
        const values = this.props.form.getFieldsValue()
        props.onClick(values, this.instanceApis)
      }
    }
    
    return {
      ...props,
      onClick
    }
  }
 
  bindButtonClick(e, onClick) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      onClick(err, values, this.instanceApis)
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(_.isEqual(this.props, nextProps) === false) {
      const newState = this.setFormItems(nextProps)
      this.setState(newState)
      return true
    }
  }

  componentDidMount() {
    this.didMount()
  }

  didMount() {
    const { onMount=null } = this.props
    if(onMount && typeof onMount === 'function') {
      onMount(this.instanceApis)
    }
  }
  
  setFormProps(props) {
    let newProps = Object.assign({}, props)
    const { layout='horizontal' } = newProps
    if(layout === 'inline') {
      newProps.labelCol={}
      newProps.wrapperCol={}
    } else if(layout === 'horizontal') {
      newProps.labelCol = newProps.labelCol || { span: 4 }
      newProps.wrapperCol = newProps.wrapperCol || { span: 20 }
    }
    return newProps
  }

  render() {
    const { props, form } = this.props
    const newProps = this.setFormProps(props)
    const { formItems } = this.state
    return (
      <Form {...newProps} className='easy-form'>
        <FormItems items={formItems} form={form} $instance={this.instanceApis}/>
      </Form>
    )
  }
}

ScForm.propTypes = {
  props: PropTypes.object,
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]),
  create: PropTypes.object,
  form: PropTypes.object,
  onMount: PropTypes.func,
}

ScForm.defaultProps = {
  items: []
}

function ScFormWrapper(props){
  const { create={}, ...otherProps } = props
  create.onValuesChange = (props, changedValues, allValue) => {
    // console.log(props, changedValues, allValue)
  }
  create.onFieldsChange = (props, changedFields, allFields) => {
    // console.log(props, changedFields, allFields)
  }
  const Ele = Form.create()(ScForm)
  return <Ele {...otherProps}></Ele>
}
ScFormWrapper.propTypes = {
  create: PropTypes.object,
}

export default ScFormWrapper