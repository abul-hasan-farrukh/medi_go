import AdminHeader from './AdminHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'
import UserDetail from './UserDetail'

function AllUsers() {

    const APIURL = "http://localhost:9090/admin/allUsers"

    const [userdata, setUserData] = useState([{}]) 

    useEffect(()=> {
        const fetchData = async() => {
        try {
            const serverResponse = await axios.get(APIURL)
            console.log(serverResponse.data);

            setUserData(serverResponse.data); //update the contact data state variable


            
        } catch (error) {
            console.log(error);
            
        }

    } //function close
    fetchData()
}, [])

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
<h3 style={{textAlign: "center", marginTop: "-50px"}}  className="mb-4 fw-bold">📞 User Details 📞</h3>

{/* Passing user array in userdata */}
<UserDetail userArray={userdata}/> 
    </div>
    </>
  )
}

export default AllUsers