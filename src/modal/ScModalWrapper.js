/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-12-16 21:08:07
 * @LastEditors  : 鲁大师
 * @LastEditTime : 2019-12-28 17:42:02
 */
import ScModal from './ScModal';
import * as ReactDOM from 'react-dom'
const IS_REACT_16 = !!ReactDOM.createPortal
const destroyFns = []

function ScModalWrapper(config) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  if(typeof config === 'function') {
    config = config()
  }
  let currentConfig = { ...config, close, visible: true }

  function close(...args) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: destroy.bind(this, ...args),
    }
    if (IS_REACT_16) {
      render(currentConfig)
    } else {
      destroy(...args)
    }
  }

  function update(newConfig) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    }
    render(currentConfig)
  }

  function destroy(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
    const triggerCancel = args.some(param => param && param.triggerCancel)
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args)
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i]
      if (fn === close) {
        destroyFns.splice(i, 1)
        break
      }
    }
  }

  function render(props) {
    ReactDOM.render(<ScModal {...props} />, div)
  }

  render(currentConfig)

  destroyFns.push(close)

  return {
    destroy: close,
    update,
  }
}

export default ScModalWrapper