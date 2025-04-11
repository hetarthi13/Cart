import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCartItems ,RemoveFromCart} from '../../redux/cartReducer/cartReducer';
import UserHeader from './UserHeader';
// import {  GetCartItems } from '../../redux/productReducer/ProductReducer';
// import { AddToCart } from '../../redux/productReducer/ProductReducer'

function UserCart() {
  const {cart} = useSelector((state : any) => state.cart)
  console.log(cart,"cart data");
  

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(GetCartItems())
  },[dispatch])

//   useEffect(() => {
//       dispatch(AddToCartProduct())
//   },[])

const removeFromCart = (id : any) => {
  console.log(id,"id");
  dispatch(RemoveFromCart(id))
  window.location.reload()
  
}
  return (<>
  <UserHeader />
     <div className="container my-5">
      <h2>Your Cart</h2>
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Product</th>
              {/* <th>Price</th> */}
              <th>Quantity</th>
              {/* <th>Total</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((item : any) => (
              <tr key={item.id}>
                <td>{item.productId}</td>
                {/* <td>${item.price}</td> */}
                <td>{item.quantity}</td>
                {/* <td>${item.price * item.quantity}</td> */}
                <td>
                  <button onClick={() => removeFromCart(item.productId)} className="btn btn-danger btn-sm">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between">
        <h4>Total: </h4>
        <button className="btn btn-success" onClick={() => window.location.href = "/checkout"}>Proceed to Checkout</button>
      </div>
    </div>
  </>
  )
}

export default UserCart