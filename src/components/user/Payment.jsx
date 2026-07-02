import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../../config";

function Payment() {

  const location = useLocation();
    
  const userEmail = localStorage.getItem("userEmail")
  const APIURL=`${BASE_URL}/user/payNow`


  const totalAmount = location.state.totalAmount;
  const [paymentData,setPaymentData]=useState({userEmail:userEmail, transactionNo:"", amount: totalAmount })

 const fetchData = (e) => {
    e.preventDefault();

    setPaymentData({...paymentData,[e.target.name]: e.target.value})
 }

 const payNow = async() => {
     try {
       const serverResponse = await axios.post(APIURL, paymentData)
console.log(serverResponse.data);



     } catch (error) {
      console.log(error);
      
     }
 }

  return (
    <>
      <h2>Total Amount: ₹{totalAmount}</h2>



      <input type="text" name="transactionNo" id="" onChange={fetchData} value={paymentData.transactionNo}/>
      <button onClick={payNow}>
        Pay Now
      </button>
    </>
  );
}

export default Payment;