import React, { useRef } from "react";
import { useStores } from '../stores';
import { observer, useLocalStore } from 'mobx-react';
import { Upload, message, Spin, Descriptions, Button  } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components'

const { Dragger } = Upload;

const Result = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`
const H2 = styled.h2`
  margin: 20px 0;
  text-align: center;
`
const Image = styled.img`
  max-width: 300px;
`
const A = styled.a`
  margin-top: 6px;
`
const Input = styled.input`
@media (min-width: 768px){
  margin-left: 6px;
}
@media (max-width: 768px){
  display: block;
  margin: 10px 0;
}
`

const Component = observer(()=>{
  const { ImageStore, UserStore } = useStores()
  const ref1 = useRef()
  const ref2 = useRef()
  const store = useLocalStore(()=>({
    width: null,
    height: null,
    setWidth(width){
      store.width = width
    },
    setHeight(height){
      store.height = height
    },
    get widthStr(){
      return store.width? `/w/${store.width}`:''
    },
    get heightStr(){
      return store.height? `/h/${store.height}`:''
    },
    get fullStr(){
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
    }
  }))
  const bundleCopy = (url) => {
    let input = document.createElement('textarea')
    input.value = url
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.focus()
    input.select()
    if(document.execCommand('Copy')){
      document.execCommand('Copy')
      message.success('复制成功')
    }else{
      message.error('复制失败,请通过在线预览手动复制')
      
    }
    document.body.removeChild(input);

  }
  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)

      if(UserStore.currentUser === null){
        message.warning('请先登录在上传！')
        return false
      }

      if(!/(jpg$)|(svg$)|(jpeg$)|(png$)|(gif$)/ig.test(file.type)){
        message.error('仅可上传jpg、svg、jpeg、png和gif类型的图片！')
        return false
      }

      if(file.size > 1024*1024){
        message.error('图片不能超过1M！')
        return false
      }

      ImageStore.upload()
        .then((serverFile)=>{

        }).catch(err=>{
          
        })
      return false;
    }
  };

  const bindWidth = () => {
    store.setWidth(ref1.current.value)
  }
  const bindHeight = () => {
    store.setHeight(ref2.current.value)
  }

  return (
    <div>
      <Spin spinning={ImageStore.isUploading} tip="加载中...">
      <Dragger {...props} tip="上传中...">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽上传图片</p>
        <p className="ant-upload-hint">
          仅支持.png/.jpg/.svg/.jpeg/.gif格式的图片, 图片最大1M
        </p>
      </Dragger>
      </Spin>
      <div>
        {
          ImageStore.serverFile ? 
            <Result>
              <Descriptions title="上传结果" layout="vertical" bordered size='middle'>
                <Descriptions.Item label="完整路径" span={3}>
                  <a target='_blank' href={ ImageStore.serverFile.attributes.url.attributes.url }><Button type='link'>在线预览</Button></a>
                  <Button type="dashed" onClick={bundleCopy.bind(null, ImageStore.serverFile.attributes.url.attributes.url)}>复制链接</Button>
                </Descriptions.Item>
                <Descriptions.Item label="文件名" span={3}>{ ImageStore.serverFile.attributes.filename }</Descriptions.Item>
                <Descriptions.Item label="图片预览" span={3}><Image src={ ImageStore.serverFile.attributes.url.attributes.url } /></Descriptions.Item>
                <Descriptions.Item label="更多尺寸" span={3} row={2}><input ref={ref1} onChange={bindWidth} placeholder='最大宽度（可选）' />
                      <Input ref={ref2} onChange={bindHeight} placeholder='最大高度（可选）'  />
                      <A target='_blank' href={ store.fullStr }><Button type='link'>在线预览</Button></A>
                      <Button type="dashed" onClick={bundleCopy.bind(null, store.fullStr)}>复制链接</Button>
                </Descriptions.Item>
              </Descriptions>
            </Result> : null
        }
         
      </div>
    </div>
  )
})

export default Component