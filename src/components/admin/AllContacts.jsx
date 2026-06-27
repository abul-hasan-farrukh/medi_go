import AdminHeader from './AdminHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ContactDetail from './ContactDetail'
import Swal from "sweetalert2";
import { BASE_URL } from "../../config";

function AllContacts() {

const APIURL = `${BASE_URL}/admin/allContacts`



const [contactdata, setContactData] = useState([])


useEffect(()=> {
        const fetchData = async() => {
        try {
            const serverResponse = await axios.get(APIURL)
            console.log(serverResponse.data);
            setContactData(serverResponse.data); //update the contact data state variable
        } catch (error) {
            console.log(error);
            
        }
    } //function close
    fetchData()
}, [])



//Function to pass as props to delete contact by id.
const deleteContact = async(id) => {
// alert(id)

 const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This record will be deleted",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete it"
  });

  if(!confirm.isConfirmed) return;

  const DELETEAPIURL = `${BASE_URL}/admin/deleteContact/${id}`;

    try {
        const serverResponse = await axios.delete(DELETEAPIURL)
        console.log(serverResponse);

        //filtering the deleted id from contactdata array.
        const updatedArray = contactdata.filter((cobj)=> {
            return cobj.id !== id;
        })

        setContactData(updatedArray) //modify the state variable

        Swal.fire("Deleted!", "Contact has been deleted.", "success");
        
    } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to delete contact", "error");
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
      <h3 style={{textAlign: "center", marginTop: "-50px"}}  className="mb-4 fw-bold">📞 Contact Details 📞</h3>
{/* Passing contact array in contactdata */}
<ContactDetail contactArray={contactdata}
                deleteById = {deleteContact}
/>
</div> 



    </>
  )
}

export default AllContacts