import { Select, Spin, Empty } from 'antd'
import React from 'react'
import debounce from 'lodash/debounce'

const { Option } = Select

interface IProps {
  api?: Function
  valueName?: any
  displayName?: any
  value?: any
  onChange?: Function
}

interface IState {
  data?: any
  valueName?: any
  displayName?: any
  value?: any
  api?: Function
  search?: boolean
  onChange?: Function
}

class RemoteSelect extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state.api = props.api
    this.state.valueName = props.valueName
    this.state.displayName = props.displayName
    this.state.value = props.value
    this.state.onChange = props.onChange
    this.handleSearch = debounce(this.handleSearch, 500)
  }

  UNSAFE_componentWillMount() {
    this.handleSearch('')
  }

  state: IState = {
    data: [],
    value: '',
    api: null,
    search: false,
  }

  handleSearch = (value) => {
    const data = {
      text: value,
      value: this.state.value,
      limit: 10,
    }
    this.setState({
      data: [],
      search: true,
    })
    this.state
      .api(data)
      .then((res) => {
        this.setState({
          data: res.records.map((item) => ({
            value: item[this.state.valueName],
            text: item[this.state.displayName],
            item: item,
          })),
        })
      })
      .finally(() => {
        this.setState({
          search: false,
        })
      })
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    })
    if (this.state.onChange) {
      this.state.onChange(value)
    }
  }

  render() {
    const { data, valueName, displayName, value, search } = this.state
    return (
      <Select
        showSearch
        value={value}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={search ? <Spin size='small' /> : <Empty />}
      >
        {data.map((item) => (
          <Option key={item.value} value={item.value}>
            {item.text}
          </Option>
        ))}
      </Select>
    )
  }
}

export default RemoteSelect
