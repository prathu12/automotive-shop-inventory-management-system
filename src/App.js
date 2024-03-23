import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css'
import { useEffect, useState } from 'react';
import axios from 'axios'
function App() {

  const [addSection, setAddSection] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData)
    console.log(formData);
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.message)
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const [dataList, setDataList] = useState([])

  const getFetchData = async (e) => {
    // e.preventDefault();
    const data = await axios.get("/")
    console.log(formData);
    if (data.data.success) {
      setDataList(data.data.data)
      alert(data.data.message)
    }
  }

  useEffect(() => {
    getFetchData()
  },)

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    alert(data.data.message)
    if (data.data.success) {
      getFetchData()
    }
    window.location.reload()
  }
  return (
    <div>
      <h2 className=''>Automotive Shop Inventory Management System</h2>
      <div className="container">
        <button className="btn btn-outline-primary" onClick={() => setAddSection(true)}>Add</button>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            {addSection && (
              <div className="buttons">
                <button className="btn btn-outline-primary" onClick={() => setAddSection(false)}>Cancel</button>
              </div>
            )}

            <div>
              <label for="exampleInputEmail1">Enter Product name</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleOnChange} name='name' value={formData.name} placeholder="Enter name" />
            </div>
            <div>
              <label for="exampleInputEmail1">Enter date</label>
              <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleOnChange} name='email' value={formData.email} placeholder="Enter date" />
            </div>
            <div>
              <label for="exampleInputEmail1">Enter item number</label>
              <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleOnChange} name='mobile' value={formData.mobile} placeholder="Enter item" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary"  >Submit</button>
        </form>

        <div className="tableContainer">
          <table className='container'>
            <thead>
              <tr>
                <th>Name</th>
                <th>DATE</th>
                <th>ITEM No</th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (

                dataList.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>
                        <button className='btn btn-outline-secondary'>Edit</button>
                        <button className='btn btn-outline-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              ) : (<p>No Data Found!</p>)}

            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}
export default App;
