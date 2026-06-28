import AdminHeader from './AdminHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FeedbackDetail from './FeedbackDetail'
import Swal from "sweetalert2";
import { BASE_URL } from "../../config";


function AllFeedbacks() {

    const APIURL = `${BASE_URL}/admin/allFeedbacks`

    const [feedbackdata, setFeedbackData] = useState([]) 

    useEffect(()=> {
        const fetchData = async() => {
        try {
            const serverResponse = await axios.get(APIURL)
            console.log(serverResponse.data);

            setFeedbackData(serverResponse.data); //update the contact data state variable


            
        } catch (error) {
            console.log(error);
            
        }

    } //function close
    fetchData()
}, [])


//Function to pass as props to delete contact by id.
const deleteFeedback = async (id) => {

    const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This record will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it"
      });

      if(!confirm.isConfirmed) return;

const DELETEAPIURL = `${BASE_URL}/admin/deleteFeedback/${id}`

    try {
        const serverResponse = await axios.delete(DELETEAPIURL)
        console.log(serverResponse);

        //filtering the deleted id from contactdata array.
        const updatedArray = feedbackdata.filter((fobj)=> {
            return fobj.id != id;
        })

        setFeedbackData(updatedArray) //modify the state variable
        
    } catch (error) {
        console.log(error);
    }
}

  return (
    <>
    <AdminHeader/>
    <div
    style={{
        marginLeft: "240px",
        marginTop: "70px",
        padding: "20px",
        fontFamily: "poppins"
    }}
    >
<h3 style={{textAlign: "center", marginTop: "-50px"}}  className="mb-4 fw-bold">📞 Feedback Details 📞</h3>

{/* Passing user array in userdata */}
<FeedbackDetail feedbackArray={feedbackdata}
                deleteById = {deleteFeedback}
/>
</div>  
    </>
  )
}

export default AllFeedbacks