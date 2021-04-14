import React from 'react'
import { Space, Button } from 'antd'
import { useObserver } from 'mobx-react'
import { omit } from 'lodash-es'
import useStore from '@/stores'
import { RequestOptions } from '@/utils/request'

interface SearchProps {
  api: Function | string
}

/**
 * 表单的 search 选项
 * 主要是给提交表单的按钮注入 loading
 * https://github.com/ant-design/pro-table/blob/master/src/Form/FormOption.tsx
 */
export function getTableSearch(props: SearchProps) {
  return {
    optionRender: (searchConfig, formProps) => {
      const { loading } = useStore()
      const { form, submit, onReset = () => {} } = formProps
      const { submitText, resetText } = searchConfig

      return useObserver(() => (
        <Space>
          <Button
            onClick={() => {
              form.resetFields()
              onReset()
            }}
          >
            {resetText}
          </Button>{' '}
          <Button
            type='primary'
            htmlType='submit'
            onClick={() => {
              submit()
            }}
            loading={loading.is(props.api)}
          >
            {submitText}
          </Button>
        </Space>
      ))
    },
  }
}

interface RequestResult {
  data: any[]
  total: number
}

interface RequestParam {
  /**
   * 请求接口
   * 如果需要传递 path 参数，请使用 bind 方法
   */
  api: Function
  /**
   * 对返回的结果做处理
   */
  getter?: (res: object) => RequestResult
  /**
   * 请求参数
   */
  params?: object
  /**
   * 请求配置项
   */
  requestOptions?: RequestOptions
}

/**
 * 表格列表的请求方法
 */
export function getTableRequest(props: RequestParam) {
  return (params, sort, filter) => {
    const payload = {
      pageNo: params.current,
      pageSize: params.pageSize,
      ...omit(params, ['current', 'pageSize']),
      ...filter,
      ...props.params,
    }
    return props.api(payload, props.requestOptions).then((res) => {
      return props.getter
        ? props.getter(res)
        : {
            data: res.records,
            total: res.total,
          }
    })
  }
}
