import AdminHeader from './AdminHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'
import WorkerDetail from './WorkerDetail'
import { useNavigate } from 'react-router-dom'

function AllWorkers() {

    const navigate = useNavigate();

    const email = localStorage.getItem("adminEmail");
    
    //code to redirect the admin to login page if this page is directly accessed from url bar - 17 April, 2026
      useEffect(()=> {
        
        if(email === null){
          navigate("/admin/admin-login")
        } 
      },[])

    const APIURL = "http://localhost:9090/admin/allWorkers"

    const [workerdata, setWorkerData] = useState([{}]) 

    useEffect(()=> {
        const fetchData = async() => {
        try {
            const serverResponse = await axios.get(APIURL)
            console.log(serverResponse.data);

            setWorkerData(serverResponse.data); //update the worker data state variable


            
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
<h3 style={{textAlign: "center", marginTop: "-50px"}}  className="mb-4 fw-bold">📞 Worker Details 📞</h3>

{/* Passing worker array in workerdata */}
<WorkerDetail workerArray={workerdata}/> 
    </div>
    </>
  )
}
export default AllWorkers