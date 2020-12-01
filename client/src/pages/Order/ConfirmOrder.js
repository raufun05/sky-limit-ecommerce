import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import LoadingIcon from "../../components/SmallLoadingIcon/SmallLoadingIcon"
import OrderDetails from "../../components/Order/OrderDetail"
import API from "../../utils/API"

const UserOrder = () => {
  const [order, setOrder] = useState(LoadingIcon);
  let { id } = useParams();

  useEffect(() => {
    API.getOrder(id).then(res => {
      if (res.data === 401) {
        window.location.href = "/login/confirmOrder/" + id
      } else if (res.data === 404 || res.data === null) {
        window.location.href = "/404"
      } else if (res.data.products) {
        setOrder(<OrderDetails order={res.data}/>)
      }
    })
  }, [id])


  return (
    <div className="card">
      <div className="card-header">
        <h2>Your order has been placed.</h2>
        <h5>Order #{id}</h5>
      </div>
      {order}
      <div className="card-body">
        <button className="btn btn-primary" onClick={() => {
            window.location.href = "/"
        }}>Continue Shopping</button>
      </div>
    </div>
  )

}

export default UserOrder;