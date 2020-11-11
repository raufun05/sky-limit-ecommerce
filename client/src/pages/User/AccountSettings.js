import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import './User.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [merchant, setMerchant] = useState("");

  
  useEffect(() => {
    const merchantCard = (
      <div className="card-body edit-profile">
        <h5 className="card-title">Selling Account</h5>
        <p className="card-text">Manage your selling account. Change items listed, details, and prices.</p>
        <button href="#" onClick={() => {window.location.href = "/sellingAccount";}} className="btn btn-primary">Selling Account</button>
      </div>
    )
  
    const userCard = (
      <div className="card-body edit-profile">
        <h5 className="card-title">Create Selling Account</h5>
        <p className="card-text">Create a selling account to sell your own products.</p>
        <button href="#" onClick={() => {window.location.href = "/postProduct";}} className="btn btn-primary">Selling Account</button>
      </div>
    )
    
    API.getUserProfile().then(res => {
      if (res.data.user) {
        setUser(res.data.user)
        if (res.data.products.length > 0) {
          setMerchant(merchantCard)
        } else {
          setMerchant(userCard);
        }
      }
    });
  }, []);

  return (
    <div>
      <h2>Account Settings for {user.name}</h2>
      <div className="row">
        <div className="col-sm-6">
          <div className="card edit-profile">
            <div className="card-body ">
              <h5 className="card-title">Profile</h5>
              <p className="card-text">Manage your personal information: name, email, payment details, default shipping address, or password.</p>
              <button href="#" onClick={() => {window.location.href = "/editProfile";}} className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card edit-profile">
            <div className="card-body ">
              <h5 className="card-title">Wishlist</h5>
              <p className="card-text">View your wishlist. Add or remove items.</p>
              <button href="#" onClick={() => {window.location.href = "/wishList";}} className="btn btn-primary">View Wishlist</button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body edit-profile">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">View current and previous order history.</p>
              <button href="#" onClick={() => {window.location.href = "/userOrders"}} className="btn btn-primary">View Orders</button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            {merchant}
          </div>
        </div>
      </div>
    </div>
  )

}

export default Profile;