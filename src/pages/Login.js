import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../stores/index";


const Component = observer(()=>{
  const { AuthStore } = useStores();
  return (
    <>
      <div>login...(AuthStore.values.username)</div>
    </>
  )
})

export default Component