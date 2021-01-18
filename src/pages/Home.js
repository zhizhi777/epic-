import React from "react";
import Uploader from "../components/Uploader";
import Tips from "../components/Tips";

function Home(){
  return (
    <>
      <Tips>请先登录！</Tips>
      <Uploader />
    </>
  )
}

export default Home