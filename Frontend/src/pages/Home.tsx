import React, { useEffect } from 'react'
import Header from '../component/Header'
import Product from '../component/Product'

function Home() {
const Token = localStorage.getItem("token")
const Role = localStorage.getItem("role")
console.log(Token);

useEffect(()=> {
  if(Token === null && Role !== "Admin"){
    window.location.href = "/"
  } 
   
},[])
  return (
    <>
{(Token&& Role == "Admin") &&(<>
{/* <div style={{width:"100%", height:"100vh"}}> */}
<Header />

<Product /></>)}
    </>
  )
  
}

export default Home