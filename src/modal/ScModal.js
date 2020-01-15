/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-12-16 21:05:08
 * @LastEditors  : 鲁大师
 * @LastEditTime : 2019-12-28 17:42:17
 */
import React, { Component } from 'react'
import { Modal } from 'antd'

class ScModal extends Component {
  constructor(props) {
    super(props)
    this.state={
      loading: false
    }
  }

  onOk(onOk, close) {
    let actionFn = onOk
    let closeModal = close

    if (actionFn) {
      let ret
      if (actionFn.length) {
        ret = actionFn(closeModal)
      } else {
        ret = actionFn()
        if (!ret) {
          closeModal()
        }
      }
      if (ret && ret.then) {
        this.setState({ loading: true })
        ret.then(
          (...args) => {
            // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
            // this.setState({ loading: false });
            closeModal(...args)
          },
          (e) => {
            // Emit error when catch promise reject
            console.error(e)
            // See: https://github.com/ant-design/ant-design/issues/6183
            this.setState({ loading: false })
          },
        )
      }
    } else {
      closeModal()
    }
  }

  render() {
    const { props } = this
    let { content, onOk, close, ...otherProps } = props
    const { loading=false } = this.state
    if(typeof content === 'function') {
      content = content()
    }
    return(
      <Modal 
        {...otherProps}
        confirmLoading={loading}
        onCancel={close}
        onOk={() => this.onOk(onOk, close)}
      >
        {
          content
        }
      </Modal>
    )
  }
}

export default ScModal