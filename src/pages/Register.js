import React from "react";
import { Form, Input, Button } from 'antd';
import styled from "styled-components";
import { useStores } from "../stores";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 500px;
  margin: 30px auto;
  padding: 30px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);
  border-radius: 4px;
  background-color: #fff;
`
const Title = styled.h2`
  text-align:center;
`

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};


const Component = () => {
  const { AuthStore } = useStores()
  const history = useHistory()

  const onFinish = values => {
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password)
    AuthStore.register()
    .then(()=>{
      history.push('/')
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const validateUsername = (rule, value) =>{
    if(/\W/.test(value)) return Promise.reject('只可以输入字母数字、下划线！')
    if(value.length < 4 || value.length > 10) return Promise.reject('长度为4~10个字符！')
    return Promise.resolve()
  }
  const validateConfirm = ({getFieldValue}) => ({
    validator(rule, value){
      if(getFieldValue('password') === value) return Promise.resolve()
      return Promise.reject('两次密码不一致！')
    }
  })

  
  return (
    <Wrapper>
    <Title>注册</Title>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          { 
            required: true, 
            message: '请输入你的用户名！' 
          },
          {
            validator: validateUsername
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
            { 
              required: true, 
              message: '请输入你的密码！' 
            },
            {
              min: 4,
              message: '密码不能少于4个字符！' 
            },
            {
              max: 10,
              message: '密码不能多于10个字符！' 
            }
          ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="确认密码"
        name="confirmPassword"
        rules={[
          { 
            required: true, 
            message: '请再次输入你的密码！' 
          },
            validateConfirm
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    </Wrapper>
  );
}


export default Component