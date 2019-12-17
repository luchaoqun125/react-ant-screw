/*
 * @Description: 组件的配置环境
 * @Author: 鲁大师
 * @Date: 2019-12-16 14:26:25
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-12-17 14:39:18
 */

export default {
  cjs: {
    type: 'rollup',
    minify: true,
  },
  esm: {
    type: 'rollup',
    minify: true
  },
  extraExternals: [ 'react', 'antd', 'lodash', 'prop-types', 'react-dom' ]
}
