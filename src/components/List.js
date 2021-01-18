import React,{ useEffect } from 'react';
import { useStores } from '../stores';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin, Button, message } from 'antd';
import styled from 'styled-components';

const Img = styled.img`
width: 140px;
height: 80px;
object-fit: contain;

cursor: pointer;
transition: all 0.6s;
@media (min-width: 768px){
  &:hover{
    transform: scale(1.2);
  }
}
@media (max-width: 768px){
  width: 100%;
  height: auto;
  max-height: 200px;
}
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`

const Name = styled.div`
@media (min-width: 768px){
  flex: 1;
  word-break:break-all;
}
@media (max-width: 768px){
  width: 100%;
  padding: 10px 0;
  margin: 0 auto;
}
`

const H5 = styled.h5`
padding: 0 30px;
@media (max-width: 768px){
  padding:0;
  text-align: center;
}
`

const Component = observer(() => {
  const { HistoryStore } = useStores() 

  useEffect(()=>{
    return ()=>{
      HistoryStore.reset()
    }
  }, [])

  const loadMore = () => {
    HistoryStore.find()
  }

  const deleteImg = (item) =>{
    HistoryStore.delete(item)
  }

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

  return (
    <>
      <InfiniteScroll
      initialLoad={true}
      pageStart={0}
      loadMore={loadMore}
      hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
      useWindow={true}>
        <List
        dataSource={HistoryStore.list}
        renderItem={
          item => (
            <List.Item key={item.id}>
              <div >
              <a target="_blank" href={item.attributes.url.attributes.url}><Img src={item.attributes.url.attributes.url} /></a>
              </div>
              <Name>
                <H5>{item.attributes.filename}</H5>
              </Name>
              <div>
                <a target="_blank" href={item.attributes.url.attributes.url}><Button type='link'>在线预览</Button></a>
              </div>
              <div>
                <Button type="dashed" onClick={bundleCopy.bind(null, item.attributes.url.attributes.url)}>
                  复制链接
                </Button>
              </div>
              <div>
                <StyledButton type='primary' onClick={deleteImg.bind(null, item.id)}>删除</StyledButton>
              </div>
            </List.Item>
          )
        }>
          {HistoryStore.isLoading && HistoryStore.hasMore && (
              <div className="demo-loading-container">
                <Spin tip="加载中"/>
              </div>
            )}
        </List>
      </InfiniteScroll>
    </>
  )
})

export default Component