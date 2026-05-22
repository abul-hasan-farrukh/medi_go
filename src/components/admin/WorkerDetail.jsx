import React from 'react'

function WorkerDetail({workerArray}) {
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
                        <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        workerArray.map((wobj) => { //wobj stands for worker object
                            return (

                                //Displaying data in tabular form
                                <tr key={wobj.id} className='text-center'>
                                    <td> {wobj.email} </td>
                                    <td> {wobj.name} </td>
                                    <td> {wobj.phone} </td>
                                    <td> {wobj.city} </td>
                                    <td> {wobj.type} </td>
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
export default WorkerDetail