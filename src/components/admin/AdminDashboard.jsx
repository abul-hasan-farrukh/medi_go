import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import defaultProfilePic from "../../assets/user.jpeg";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
//useLocation is used to fetch the value of state object attribute.

function AdminDashBoard() {

  const email = localStorage.getItem("adminEmail");
  const location = useLocation();

  const APIURL = `http://localhost:9090/admin/adminProfile/${email}`;

  const [adminData, setAdminData] = useState({ name: "", phone: "" });
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get(APIURL);

        setAdminData(response.data);

        let imageUrl = defaultProfilePic;

        //If image came from navigation (after upload)
        if (location.state?.imageURL) {
          imageUrl = location.state.imageURL;
        }

        //  If image exists in database
        else if (response.data.profilePic) {
          imageUrl = `http://localhost:9090/uploads/profileimages/${response.data.profilePic}`;
        }

        setProfilePic(imageUrl);

      } catch (error) {
        console.log("Error fetching admin data:", error);
      }

    };

    fetchData();

  }, []);

  return (
    <>
      <AdminHeader />

      <div className="main-div">
        <div className="d-flex" style={{ marginLeft: "500px", marginTop: "70px", alignItems: "center" }}>

          <img
            src={profilePic}
            alt="profile"
            width="120"
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span><i className='fas fa-user-circle'></i> Hello {adminData.name}</span>
            <span><i className='fas fa-user-circle'></i> {email}</span>
            <span><i className='fas fa-phone'></i> {adminData.phone}</span>
          </div>

        </div>
      </div>

    </>
  );
}

export default AdminDashBoard;