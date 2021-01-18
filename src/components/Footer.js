import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  text-align: center;
  font-size: 12px;
  color: #aaa;
  padding: 6px 10px;
  background-color: rgba(255,255,255,.1);
`

function Component(){
  return (
    <Footer>
      <div>请勿上传违反中国大陆和香港法律的图片，违者后果自负.</div>
    </Footer>
  )
}

export default Component