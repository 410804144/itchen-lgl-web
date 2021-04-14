import React, { Fragment, useState } from 'react'
import { Editor as TinyMce } from '@tinymce/tinymce-react'
import request from '@/utils/request'
import Loading from '../loading'

interface Props {
  value?: string
  initialValue?: string
  onChange: (value: string) => void
  height?: number
}

/** 富文本编辑器 */
export default function Editor(props: Props) {
  const [loaded, setLoaded] = useState(false)

  // TODO 上传
  return (
    <Fragment>
      {!loaded && <Loading text='编辑器加载中' />}
      <TinyMce
        apiKey='uo2hbxw0pmfwqevumbzuz8f81eliu0bfqq0cvilyfd7gx5e7'
        init={{
          plugins: 'link table lists advlist image',
          images_upload_url: '/admin/api/upload',
          images_upload_handler: function(blobInfo, success, failure) {
            const formData = new FormData()
            formData.append('files', blobInfo.blob(), blobInfo.filename())

            request({
              url: '/admin/api/upload',
              method: 'post',
              data: formData,
            })
              .then((res) => {
                success(res.data[0])
              })
              .catch((err) => {
                failure(err.message)
              })
          },
          height: props.height || 400,
          table_toolbar:
            'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
          language: 'zh_CN',
        }}
        onInit={setLoaded.bind(this, true)}
        value={props.value}
        initialValue={props.initialValue}
        onEditorChange={props.onChange}
      />
    </Fragment>
  )
}
