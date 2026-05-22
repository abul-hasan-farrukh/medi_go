function ContactDetail({ contactArray, deleteById }) {
  return (
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark text-center">
            <tr>
              <th>Serial No:</th>
              <th>Name</th>
              <th>Email</th>  
              <th>Phone</th>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactArray.map((cobj) => (
              <tr key={cobj.id} className="text-center">
                <td>{cobj.id}</td>
                <td>{cobj.name}</td>
                <td>{cobj.email}</td>
                <td>{cobj.phone}</td>
                <td>{cobj.question}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteById(cobj.id)} 
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactDetail;