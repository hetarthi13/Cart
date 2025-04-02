import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCartProduct } from '../../redux/productReducer/ProductReducer';
// import { AddToCart } from '../../redux/productReducer/ProductReducer'

function UserCart() {
  const {cart} = useSelector((state : any) => state.product)
  console.log(cart,"cart data");
  

  const dispatch = useDispatch()
  useEffect(() => {
      
  },[dispatch])

//   useEffect(() => {
//       dispatch(AddToCartProduct())
//   },[])
  return (<>
     <div className="container my-5">
      <h2>Your Cart</h2>
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((item : any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between">
        <h4>Total: </h4>
        <button className="btn btn-success">Proceed to Checkout</button>
      </div>
    </div>
  </>
  )
}

export default UserCart