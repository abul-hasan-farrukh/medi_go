
function FeedbackDetail({ feedbackArray, deleteById }) { //receiving props
    return (
        <>
            <div className="container-fluid">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark text-center">
                            <tr>
                                <th scope="col">Serial No:</th>
                                <th scope="col">Email</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Review</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                feedbackArray.map((fobj) => { //fobj stands for feedback object
                                    return (

                                        //Displaying data in tabular form
                                        <tr key={fobj.id} className="text-center">
                                            <td> {fobj.id} </td>
                                            <td> {fobj.email} </td>
                                            <td> {fobj.rating} </td>
                                            <td> {fobj.review} </td>
                                            <th> <button className="btn btn-danger btn-sm" onClick={() => deleteById(fobj.id)}>Delete</button> </th>
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

export default FeedbackDetail