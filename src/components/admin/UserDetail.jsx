import React from 'react'

function UserDetail({userArray}) {
  return (
    <>
    <div className="container-fluid">
                <div className="table-responsive">
    <table className="table table-bordered table-striped">
                        <thead className="table-dark text-center">
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">City</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        userArray.map((uobj) => { //uobj stands for user object
                            return (

                                //Displaying data in tabular form
                                <tr key={uobj.id} className='text-center'>
                                    <td> {uobj.email} </td>
                                    <td> {uobj.name} </td>
                                    <td> {uobj.phone} </td>
                                    <td> {uobj.city} </td>
                                </tr>




                                // <div key={cobj.id}>
                                //     <p style={{ marginLeft: "150px" }}>{cobj.name}</p>
                                // </div>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
            </div>
  </>
  )
}

export default UserDetail