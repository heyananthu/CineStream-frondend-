import React, { useEffect, useState } from "react";
import axiosInstance from "../Constants/BaseUrl";
import { Link } from "react-router-dom";

function SupportViewComplaints() {
  const [complaint, setComplaint] = useState("");

  useEffect(() => {
    axiosInstance
      .post(`/viewAllcomplaints`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setComplaint(res.data.data);
          console.log(res.data.data);
          
        } else {
          console.log("Failed to fetch cast data");
        }
      })
      .catch(() => {
        console.log("Failed to fetch cast data");
      });
  }, []);

  return (
    <div>
      {complaint.length > 0 ? (
        <table class="table table-dark table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Contact</th>
              <th scope="col">Date</th>
              <th scope="col">Complaint</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
                complaint.map((e)=>{
                    return(
                       <tr>
              <th>{e.userId.name}</th>
              <td>{e.userId.email}</td>
              <td>{e.userId.contact}</td>
              <td>{e.date.slice(0,10)}</td>
              <td>{e.complaint}</td>
              <td><Link to={`/support_chat/${e.userId._id}`}><button type="submit" className="btn bg_red">Chat</button></Link>
              </td>
            </tr> 
                    )
                })
            }
            
          </tbody>
        </table>
      ) : (
        <div className="no_data_found">
          <p>No Complaints Found</p>
        </div>
      )}
    </div>
  );
}

export default SupportViewComplaints;
