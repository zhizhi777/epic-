import React, {useState} from "react";
import Epic from "../epic.png";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from 'antd';
import { useStores } from '../stores';
import { observer } from "mobx-react";
import device from '../media'

const Header = styled.header`
  background-color: rgba(0,0,0,0.1);
  color: #fff;
`
const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
  max-width: 68%;
  
  @media (max-width: 1440px){ 
    max-width: 72%;
  }
  @media (max-width: 1024px) { 
    max-width: 84%;
  }
  @media (max-width: 767px) { 
    max-width: 100%;
    display: block;
  }
`

const Logo = styled.img`
  height: 30px;
`
const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 20px;
  font-size: 14px;

  &.active{
    color:#1890ff;
  }

`
const PhoneLink = styled(NavLink)`
  display: block;

`
const IconBox =styled.div`
  display: flex;
  align-items: center;
`
const Icon = styled.div`
  margin-left: auto;
  padding:0 4px;
  color: rgba(255,255,255,.8);
  border: 1px solid rgba(255,255,255,.1);
`
const Usertit = styled.div`
  margin-left: auto;
  padding:0 4px;
  color: rgba(255,255,255,.9);
`
const Login = styled.div`
  @media (min-width: 767px) { 
    margin-left: auto;
  }
`
const StyledButton = styled(Button)`
  margin-left: 10px;

`

const Component = observer(() => {
  const { UserStore, AuthStore } = useStores()
  const history = useHistory()
  const handleLogOut = () => {
    AuthStore.logOut()
  }
  const handleLogIn = () => {
    history.push('/login')
  }
  const handleRegister = () => {
    history.push('/register')
  }
  let click = true
  
  const handleToggle =() => {
    let collapse = document.querySelector('.collapse')
    let colbox = document.querySelector('.colbox')
    if(click){
      colbox.style.height = collapse.offsetHeight + 50 + 'px'
      click = false
    }else{
      colbox.style.height =  50 + 'px'
      click = true
    }
  }

  return (
    <Header>
      {
       window.screen.width >= 768 ? 
        <HeaderBox>
        <Logo src={Epic} />
        <nav>
          <StyledLink to='/' activeClassName='active' exact>首页</StyledLink>
          <StyledLink to='/history' activeClassName='active'>上传历史</StyledLink>
          <StyledLink to='/about' activeClassName='active'>关于我</StyledLink>
        </nav>
        <Login>
          {
            UserStore.currentUser ? <>
              { UserStore.currentUser.attributes.username }
              <StyledButton type="primary" onClick={handleLogOut}>注销</StyledButton>
            </>:
            <>
              <StyledButton type="primary" onClick={handleLogIn}>登录</StyledButton>
              <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
            </>
          }
        </Login>
        </HeaderBox> : <HeaderBox className='colbox'>
          <IconBox>
            <Logo src={Epic} />
            {
              UserStore.currentUser ? <>
                <Usertit>{ UserStore.currentUser.attributes.username }</Usertit>
              </>:<></>
            }
            <Icon onClick={handleToggle}>三</Icon>
          </IconBox>
          <nav className = 'collapse' onClick={handleToggle}>
            <PhoneLink to='/' exact>首页</PhoneLink>
            <PhoneLink to='/history'>上传历史</PhoneLink>
            <PhoneLink to='/about'>关于我</PhoneLink>
            {
              UserStore.currentUser ? <>
                {/* <div>{ UserStore.currentUser.attributes.username }</div> */}
                <div className='danger' onClick={handleLogOut}>注销</div>
              </>:
              <>
                <div onClick={handleLogIn}>登录</div>
                <div onClick={handleRegister}>注册</div>
              </>
            }
        </nav>
        </HeaderBox>
      }
      
    </Header>
  )
})

export default Component