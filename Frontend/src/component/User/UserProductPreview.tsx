import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  getProductById } from '../../redux/productReducer/ProductReducer';
import UserHeader from './UserHeader';
import { AddToCartProduct } from '../../redux/cartReducer/cartReducer';

function UserProductPreview() {
  const {id} = useParams();
  console.log(id,"id");
  const {product} = useSelector((state : any) => state.product)
  console.log(product,"product data");
  
const dispach = useDispatch()
  useEffect(() => {
    console.log(id,"id");
dispach(getProductById(id))
  }, [id])
  
  const AddToCart = () => {
    if(product){
      console.log(product,"product cart");
      // const UserData = localStorage.getItem("userId")
      // console.log(  UserData,"UserData")
      
      // const addToCartData = {
      //   productId : product._id,
      //   customerId : UserData
      // }
      dispach(AddToCartProduct(product._id))
    }
    // dispach()
  }
  return (<>
  <UserHeader />
  <div style={{display:"flex", justifyContent:"space-between",width:"800px",margin:" auto"}}>
  <img src={product?.image ?? ""}  alt='image' width={300} height={300}/>
  <div>
    <h1>{product?.name ?? ""}</h1>
    <h6>{product?.price ?? ""}</h6>
    <button className='btn btn-primary' onClick={AddToCart}>Add to Cart</button>
  </div>
  </div>
  </>
  )
}

export default UserProductPreview