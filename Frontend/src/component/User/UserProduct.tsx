import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetProductData } from '../../redux/productReducer/ProductReducer';

function UserProduct() {
    const {product} = useSelector((state : any) => state.product)
    console.log(product,"product data");
const dispach = useDispatch()
    useEffect(() => {
        dispach(GetProductData())
    }, [dispach])


  return (<>
  <div style={{display:"flex", justifyContent:"space-between"}}>
{product && product.map((item : any) =>{  
  return <div className="card" style={{width:" 18rem"}}>
  <img className="card-img-top" src={item.image} alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <p className="card-text">{item.price}</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>})}</div>
  </>
  )
}

export default UserProduct