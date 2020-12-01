import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import ConvertImage from '../../ConvertImage'
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon"
import Error from "../../components/Error/Error"
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState("");
  const [orderBtn, setOrderBtn] = useState("");
  const [cartTotal, setCartTotal] = useState("");
  const [load, setLoad] = useState(LoadingIcon);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const LoadCart = () => {
      API.loadCart().then(res => {
        if (res.data === 401) {
          window.location.href = "/login/cart"
        }
        if (res.data.products) {
          if (res.data.products.length === 0) {
            setLoad("")
            setCart("");
            setOrderBtn(<h5>Your cart is currently empty.</h5>);
          } else {
            const currentCartTotal = res.data.products.map(product => product.price).reduce((x, y) => x + y, 0);
            setCartTotal(currentCartTotal.toString());

            setOrderBtn(<button className="btn btn-primary" onClick={() => {
              API.placeOrder(currentCartTotal).then(res => {
                if (!res.data.orderStatus) {
                  setError(<Error message={res.data.message}/>)
                  LoadCart()
                } else if (res.data.orderStatus) {
                  window.location.href = "/confirmOrder/" + res.data.id;
                }
              })
            }}>Place Order</button>);
  
            const cartList = res.data.products.map((product) => {
              let productImg = "";
              if (product.image === undefined) {
                productImg = "/Default.jpg";
              } else {
                productImg = "data:image/jpeg;base64," + ConvertImage(product.image.data.data);
              }
          
              return (
                <div className="card mb-3" key={product._id}>
                  <div className="row no-gutters">
                    <div className="col-sm-12 col-md-12 col-lg-4">
                    <div className="imageDiv"><img src={productImg} className="card-img cartListImg" alt="..."></img></div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                      <div className="card-body  cartListBodyMiddle">
                        <h5 className="card-title">{product.name}</h5>
                        <button className="btn btn-danger" onClick={() => {
                          API.removeCart(product._id).then(() => {
                            LoadCart();
                          })
                        }}>Remove from Cart</button>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                    <div className="card-body cartListBody">
                        <h5 className="card-title">${product.price}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              )
            });
            setLoad("")
            setCart(cartList);
          }
        } 
      });
    }

    LoadCart();

  }, [])

  return (
    <div className="container">
      <h2>Cart</h2>
      {error}
      {load}
      {cart}
      <h5>Cart Total: ${cartTotal}</h5>
      {orderBtn}
    </div>
  )

}

export default Cart;