import { Divider } from 'antd';
import React from 'react';
const formConfig = {
  settings: {
    // globalStatus: 'disabled',
    wrapperWidth: 200,
  },
  props: {
    // FIXME:默认horizontal：labelCol: { span: 4 },wrapperCol: { span: 20 }, 
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }, 
    // FIXME:当inline时labelCol和wrapperCol无用
    // layout: 'inline', 
    labelAlign: 'right',
    // form: {},
    colon: true
  },
  create: {
    name: '1122',
  },
  items: [
    {
      component: 'Input',
      id: 'name',
      settings: {
        // status: 'disabled',
        follow: true, // 开启跟随模式，其后的行内元素会与本元素同行显示
        when: (values) => {
          return true
        },
        // TODO: 待添加
        // help: '提示信息',
        // top: 'top内容',
        // suffix: 'suffix前缀内容',
        // prefix: 'prefix后缀内容',
      },
      // Form.Item
      formItem: {
        label: '姓名',
        required: true,
      },
      // getFieldDecorator(id, options)
      formOptions: {
        initialValue: '12',
        rules: [
          {
            required: true,
            message: '必填'
          },
          {
            max: 3,
            message: '字段长度为3'
          }
        ]
      },
      // component:默认参数
      props: {
        placeholder: '请输入内容',
      },
    },
    {
      component: 'Input',
      id: 'sex',
      formItem: {
        // label: '性别',
        help: '提示信息',
        style:{
          width: 200,
        },
      },
      settings: {
        inline: true, // 开启跟随模式，其后的行内元素会与本元素同行显示
        when: (values) => {
          // console.log(values)
          return values.age > 2 ? false : true
        },
      },
      formOptions: {
        initialValue: '男',
        rules: [
          {
            required: true,
            message: '必填'
          },
          {
            max: 2,
            message: '字段长度为3'
          }
        ]
      },
      props: {
        placeholder: '请输入内容',
        maxLength: 1,
      },
    },
    {
      component: 'InputNumber',
      id: 'age',
      formItem: {
        label: '年龄',
        required: true,
      },
      settings: {
        prefix: 'prefix后缀内容',
      },
      formOptions: {
        initialValue: 2,
        rules: [
          {
            required: true,
            message: '必填'
          }
        ]
      },
      props: {
        placeholder: '请输入年龄',
        style:{
          // width: 400,
        },
        max: 10,
        min: 1,
        step: 1,
      },
    },
    {
      component: 'TextArea',
      id: 'TextArea1',
      formItem: {
        label: 'TextArea',
      },
      props: {
        placeholder: 'TextArea',
      }
    },
    {
      component: 'Select',
      id: 'country1',
      formOptions: {
        initialValue: '1',
        rules: [
          {
            required: true,
            message: '必填'
          }
        ]
      },
      props: {
        placeholder: '请输入国家',
        allowClear: true,
        options: [
          {
            label: '中国',
            value: '1'
          },
          {
            label: '香港',
            value: '2'
          },
        ]
      },
    },
    {
      component: 'Checkbox',
      id: 'checkbox1',
      formItem: {
        label: 'checkbox',
        required: true,
      },
      formOptions: {
        initialValue: false,
        valuePropName: 'checked',
        rules: [
          {
            required: true,
            message: '必填'
          }
        ]
      },
      props: {
        children: 'Checkbox',
        indeterminate: false,
        disabled: true,
      }
    },
    {
      component: 'CheckboxGroup',
      id: 'CheckboxGroup1',
      formItem: {
        label: 'CheckboxGroup',
        required: true,
      },
      formOptions: {
        initialValue: ['Apple1'],
        rules: [
          {
            required: true,
            message: '必填'
          }
        ]
      },
      props: {
        style:{
          width: 'auto'
        },
        options:() => {
          return [{
            label: 'AppleLabel',
            value: 'Apple1', 
          }, {
            label: 'bearLabel',
            value: 'bear1', 
          }]
        }
      }
    },
    (scForm) => ({
      component: 'RadioGroup',
      id: 'RadioGroup1',
      formItem: {
        label: 'RadioGroup',
        required: true,
      },
      props: {
        options:[{
          label: '是',
          value: 1, 
        }, {
          label: '否',
          value: 0, 
          disabled: scForm.getFieldValue('checkbox1') ? true : false
        }]
      }
    }),
    {
      component: 'Switch',
      id: 'switch1',
      formItem: {
        label: 'Switch',
      },
      formOptions: {
        initialValue: true,
        valuePropName: 'checked',
      },
    },
    {
      component: 'Slider',
      id: 'Slider1',
      formItem: {
        label: 'Slider',
      },
      props: {
        marks: {
          0: 'A',
          20: 'B',
          40: 'C',
          60: 'D',
          80: 'E',
          100: 'F',
        }
      }
    },
    {
      component: 'Rate',
      id: 'Rate1',
      formItem: {
        label: 'Rate'
      },
      formOptions: {
        initialValue: 2
      },
      props: {
        allowClear: false,
        children:'信息'
      }
    },
    {
      component: 'Cascader',
      id: 'Cascader1',
      formItem: {
        label: 'Cascader'
      },
      props: {
        fieldNames:{ label: 'name', value: 'code', children: 'items' },
        options: [
          {
            code: 'zhejiang',
            name: 'Zhejiang',
            items: [
              {
                code: 'hangzhou',
                name: 'Hangzhou',
                items: [
                  {
                    code: 'xihu',
                    name: 'West Lake',
                  },
                ],
              },
            ],
          },
        ]
      }
    },
    {
      component: 'AutoComplete',
      id: 'AutoComplete1',
      formItem: {
        label: 'AutoComplete'
      },
      props: {
        dataSource: [],
        placeholder:'AutoComplete here',
        onSearch:value => {
          let result
          if (!value || value.indexOf('@') >= 0) {
            result = []
          } else {
            result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`)
          }
          return result
        },
      }
    },
    {
      component: 'DatePicker',
      id: 'DatePicker1',
      formItem: {
        label: 'DatePicker'
      },
      props: {
        placeholder: 'DatePicker'
      }
    },
    {
      component: 'MonthPicker',
      id: 'MonthPicker1',
      formItem: {
        label: 'MonthPicker'
      },
      props: {
        placeholder: 'MonthPicker'
      }
    },
    {
      component: 'WeekPicker',
      id: 'WeekPicker1',
      formItem: {
        label: 'WeekPicker'
      },
      props: {
        placeholder: 'WeekPicker'
      }
    },
    {
      component: 'RangePicker',
      id: 'RangePicker1',
      formItem: {
        label: 'RangePicker'
      },
      props: {
        placeholder: ['RangePicker-start', 'RangePicker-end']
      }
    },
    {
      component: 'TimePicker',
      id: 'TimePicker1',
      formItem: {
        label: 'TimePicker'
      },
      props: {
        placeholder: 'TimePicker'
      }
    },
    {
      component: <div>MyTimePicker</div>,
      id: 'MyTimePicker',
      formItem: {
        label: 'MyTimePicker'
      },
      // props: {
      //   placeholder: 'TimePicker'
      // }
    },
    {
      component: 'Mentions',
      id: 'Mention1',
      formItem: {
        label: 'Mention',
      },
      props: {
        
      }
    },
    {
      component: 'Item',
      id: 'itemId',
      formItem: {
        label: 'Item',
      },
      render: (values, scForm) => {
        // console.log(values, scForm)
        return <div>内容信息</div>
      }
    },
    {
      component: 'BaseItem',
      render: (values, scForm) => {
        // console.log(values, scForm)
        return <div>内容信息
          <Divider />
        </div>
      }
    },
    {
      component: 'Upload',
      id: 'upload1',
      formItem: {
        label: 'Upload',
      },
      formOptions: {
        // initialValue: [],
        valuePropName: 'fileList',
        getValueFromEvent: (e) => {
          // console.log('Upload event:', e)
          if (Array.isArray(e)) {
            return e
          }
          return e && e.fileList
        }
      },
      props: {
        name:'logo',
        action:'/upload.do',
        listType:'picture',
        children: <span>上传按钮</span>,
      }
    },
    {
      component: 'Button',
      formItem: {
        style: {
          display: 'block',
          // textAlign: 'center'
        }
      },
      settings: {
        // status: '',
        htmlType: 'submit', // 提交信息
        follow: true,
      },
      props: {
        type: 'primary',
        children: '确认点击',
        onClick: (error, values, scForm) => {
          console.log(error, values, scForm)
          // console.log(scForm.getValues())
        }
      },
    },
    {
      component: 'Button',
      settings: {
        htmlType: 'reset', // 提交信息
        inline: true,
      },
      props: {
        type: 'primary',
        children: '确认重置',
        onClick: (e) => {
          // console.log(e)
        }
      },
    }
  ],
}

export {
  formConfig
}