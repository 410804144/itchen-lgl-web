import React, {useEffect, useState} from 'react'
import useStore from '@/stores'
import {Button, Card, Col, Input, message, Modal, Popconfirm, Row, Spin, Upload} from 'antd'
import history from '@/utils/history'
import { observer } from 'mobx-react'
import * as itemSvc from '@/services/item'
import * as comSvc from '@/services/com'
import './style.scss'
import { Form } from 'antd'

function Home() {

  const { user } = useStore()
  const { Search } = Input
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<itemSvc.ListRes>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [modifyId, setModifyId] = useState<any>()
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [uploadImage, setUploadImage] = useState<boolean>(false)
  const [itemImage, setItemImage] = useState<string>('')
  const [defaultFileList, setDefaultFileList] = useState<any[]>([])
  const [initData, setInitData] = useState<any>({})

  useEffect(() => {
    handleSearch()
  }, [])

  /** 登陆 */
  const handleLogin = () => {
    history.push('/login')
  }

  /** 退出登陆 */
  const handleLogout = () => {
    user.logout()
  }

  /** 新增数据 */
  const handleAdd = () => {
    setModifyId(null)
    setInitData({})
    setDefaultFileList([])
    setVisible(true)
  }

  /** 修改数据 */
  const handleModify = (item: itemSvc.ListResItem) => {
    setModifyId(item.id)
    setItemImage(item.itemImage)
    setInitData({
      itemName: item.itemName,
      price: item.price,
      unit: item.unit,
    })
    if (item.itemImage) {
      console.log('exists')
      setDefaultFileList([
        {
          name: 'img',
          url: '/web_api/com/image/' + item.itemImage
        }
      ])
    } else {
      setDefaultFileList([])
    }
    setVisible(true)
  }

  /** 删除数据 */
  const handleDelete = (item: itemSvc.ListResItem) => {
    itemSvc.del(item.id)
      .then(() => {
        message.success('删除成功').then()
        handleSearch()
      })
  }

  /** 点击搜索 */
  const handleSearch = () => {
    setLoading(true)
    itemSvc.list({
      itemNames: text
    }).then((res) => {
      setData(res)
    }).finally(() => {
      setLoading(false)
    })
  }

  /** 提交数据 */
  const handleSubmit = (formData: any) => {
    if (uploadImage) {
      message.info('上传图片中，请稍后').then()
      return
    }
    if (!modifyId) {
      setSubmitLoading(true)
      itemSvc.create({
        itemName: formData.itemName,
        price: formData.price,
        unit: formData.unit,
        itemImage: itemImage
      }).then(() => {
        message.success('保存成功').then()
        setVisible(false)
        handleSearch()
      }).finally(() => {
        setSubmitLoading(false)
      })
    } else {
      setSubmitLoading(true)
      itemSvc.modify({
        itemId: modifyId,
        itemName: formData.itemName,
        price: formData.price,
        unit: formData.unit,
        itemImage: itemImage
      }).then(() => {
        message.success('保存成功').then()
        setVisible(false)
        handleSearch()
      }).finally(() => {
        setSubmitLoading(false)
      })
    }
  }

  return (
    <div className={'container'}>
      <div className={'header'}>
        <div>{!user.isLogin ? (
          <Button type='link' onClick={handleLogin}>登陆</Button>
        ) : (
          <div>
            {user.info.nickname}
            <Button type='link' onClick={handleLogout}>退出登陆</Button>
          </div>
        )}</div>
      </div>
      <div className={'search'}>
        <Search value={text} onChange={(e) => setText(e.target.value)} placeholder="商品名称，多个关键词使用空格分开" onSearch={handleSearch} enterButton />
      </div>
      <div className={'body'}>
        {loading ? (
          <div className={'spin'}><Spin size="large" /></div>
        ) : (
          <Row gutter={[16, 16]}>
            {data.map((item, index) => (
              <Col key={index} className={'item'} xs={24} sm={12} md={8} lg={6} xl={4} xxl={2}>
                <Card cover={<img alt="" src={'/web_api/com/image/' + item.itemImage} />}>
                  <div className={'card-body'}>
                    <div className={'item-name'}>{item.itemName}</div>
                    <div className={'item-row'}>
                      <div className={'item-price'}>{item.price}</div>
                      {!!item.unit && <div className={'item-unit'}>{item.unit}</div>}
                      {user.isLogin && <div className={'item-tool'}>
                        <a className={'tool-item'} onClick={() => handleModify(item)}>修改</a>
                        <Popconfirm
                          placement="topRight"
                          title={'确定删除吗?'}
                          onConfirm={() => handleDelete(item)}
                          okText="删除"
                          cancelText="取消"
                        >
                          <a className={'tool-item'}>{'删除'}</a>
                        </Popconfirm>
                      </div>}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      {user.isLogin && (
        <div className={'footer'}>
          <Button type="primary" onClick={handleAdd}>{'新增商品'}</Button>
        </div>
      )}
      {visible && <Modal
        title="商品信息"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          name="form"
          labelCol={{span: 6}}
          wrapperCol={{span: 14}}
          onFinish={handleSubmit}
          initialValues={initData}
        >
          <Form.Item
            label="商品名称"
            name="itemName"
            rules={[
              { required: true, message: '请输入商品名称' },
              { max: 32, message: '商品名称不能超过32个字符' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="price"
            rules={[
              { required: true, message: '请输入商品价格' },
              { pattern: /^\d+(\.\d+)?$/, message: '请输入正确的商品价格' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品单位"
            name="unit"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="itemImage"
            label="商品图片"
          >
            <Upload
              name="file"
              listType="picture-card"
              maxCount={1}
              defaultFileList={defaultFileList}
              beforeUpload={(file) => {
                const formData = new FormData()
                formData.append('file', file)
                setUploadImage(true)
                comSvc.upload({
                  data: formData,
                  timeout: 120 * 1000
                }).then((res) => {
                  setItemImage(res)
                }).finally(() => {
                  setUploadImage(false)
                })
                return false
              }}
            >
              {'上传图片'}
            </Upload>
          </Form.Item>
          <div className={'submit'}>
            <Button loading={submitLoading} type="primary" htmlType="submit">{'保存'}</Button>
          </div>
        </Form>
      </Modal>}
    </div>
  )
}

export default observer(Home)
