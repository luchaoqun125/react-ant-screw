/*
 * @Description: TODO:组件展示
 * @Author: 鲁大师
 * @Date: 2019-09-28 10:59:31
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-12-16 21:57:20
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { AND_COMPONENTS } from './components'
import Settings from './components/Settings'
import { COMPONENT_STATUS } from './const'
import _ from 'lodash'

class FormItem extends Component {
  constructor(props) {
    super(props)
    this.$allValue = {}
  }

  // 渲染组件
  renderFormItems(items=[]) {
    const FormItemEle = []

    for(let i=0; i<items.length; i++) {
      const item = items[i]
      const { formItems = [], formItem={} } = item
      const { style={} } = formItem
      
      let itemEle = null
      if(formItems.length > 0) {
        formItem.style = { marginBottom: 0, ...style }
        const followFormItem = this.renderFormItems(formItems)
        itemEle = <Form.Item key={i} {...formItem}>
          {
            followFormItem
          }
        </Form.Item>
      } else {
        itemEle = this.renderComponent(item, i)
      }

      FormItemEle.push(itemEle)
    }

    return FormItemEle
  }


  renderComponent(item, index) {
    const { getFieldDecorator } = this.props.form
    
    const { settings={}, component='' } =item
    const ComponentEle = AND_COMPONENTS[component]
    const { status='', when=null} = settings
    const itemId = component+'_'+ index
    let Element = null
    if(status === 'preview' && _.indexOf(COMPONENT_STATUS, component) < 0) {
      // 显示预览的status状态
      const previewEle = <span>
        { item.formOptions && item.formOptions.initialValue || ''}
      </span>
      Element = item.id ? getFieldDecorator(item.id, item.formOptions)(
        previewEle
      ) : previewEle
    } else if(item.id) {
      // 有id，并且是ant的组件或者是自定义的组件可以获取value和onChange
      Element = getFieldDecorator(item.id, item.formOptions || {})(
        ComponentEle ? <ComponentEle {...item.props} /> : component
      )
    } else if(!item.id && ComponentEle){
      // 没有id，但是有ant提供的组件，例如button
      Element = <ComponentEle {...item.props} />
    } else if(component === 'Item' || component === 'BaseItem' || item.render){
      // 自定义的组件，Item, BaseItem, render
      if(item.render) {
        Element = item.render(this.$allValue || {}, this.props.form)
      }
    } else {
      // 不支持的组件
      Element = AND_COMPONENTS.NoSupport
    }

    const FormItem = component !== 'BaseItem' ? 
      <Form.Item key={itemId} {...item.formItem}>
        {
          this.renderFormItem(settings, Element)
        }
      </Form.Item> :
      <React.Fragment key={itemId}>
        {
          Element
        }
      </React.Fragment>
    if(when && typeof when === 'function') {
      return when(this.$allValue || {}) ? FormItem : null
    } else {
      return (
        FormItem
      )
    }
  }
  /**
   * @description: 
   * @param {type} 
   * @return: 
   */
  renderFormItem(settings, Element) {
    const { top='',suffix='', prefix='', help='' } = settings
    
    return (
      <>
        {
          Settings.top(top)
        }
        {
          Settings.suffix(suffix)
        }
        {
          Element
        }
        {
          Settings.prefix(prefix)
        }
        {
          Settings.help(help)
        }
      </>
    )
  }

  componentDidMount() {
    this.setState({
      status: 'init'
    })
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    this.getAllValue('shouldComponentUpdate')
    return true
  }
  
  getAllValue(type) {
    const value = this.props.form.getFieldsValue()
    this.$allValue = value
  }

  render() {
    const { items=[] } = this.props
    const renderItems = this.renderFormItems(items)
    return (
      <React.Fragment>
        {
          renderItems.length > 0 && renderItems.map(item => item)
        }
      </React.Fragment>
    )
  }
}


FormItem.propTypes = {
  items: PropTypes.array,
  form: PropTypes.object,
}

export default FormItem