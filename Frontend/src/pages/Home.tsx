import React, { useEffect } from 'react'
import Header from '../component/Header'
import Product from '../component/Product'

function Home() {
const Token = localStorage.getItem("token")
useEffect(()=> {
  if(Token === null){ 
    window.location.href = "/login"
  } 
},[])
  return (
    <>
<Header />
<Product />
    </>
  )
  
}

export default Home