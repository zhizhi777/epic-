import React from 'react';
import { useStores } from '../stores';
import { observer } from 'mobx-react';
import styled from "styled-components";

const Tips = styled.div`
  background-color: orange;
  padding: 10px 12px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #fff;
`
const Component= observer(( {children} )=>{
  const {UserStore} = useStores()
  return (
    <>
      {
        UserStore.currentUser ?  null : <Tips>{children}</Tips>
      }
    </>
  )
})

export default Component