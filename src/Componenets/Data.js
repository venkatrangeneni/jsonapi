// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Data() {
//     const [dataa, setDataa] = useState([]); 
//     const [id, setid] = useState(""); 
//     const [firstname,setfirstname]= useState("");
//     const [lastname,setlastname]=useState("");
//     const [email,setemail]=useState("");
//     const [phone,setphone]=useState("");
//     const [username,setusername]=useState("");
//     const [dob,setdob]=useState("");
//     const [age,setage]=useState("");





//     useEffect(() => {
//         // Replace "" with your API endpoint
//       var res = axios.get("localhost:8081/api/users/v1.0/getUsers")
    
//             .then((res) => setDataa(res.data))
//             console.log(res)
//             .catch((error) => console.error("Error fetching data:", error));
//     }, []); // Add an empty dependency array to run this effect only once, on component mount
//      const deleteBatch = (batchId) =>{
//            axios.delete (`localhost:8081/api/users/v1.0/deleteUser/65f95f596b1836bd4c315ffa${batchId}`)
//            .then(()=>alert("Delete succefully"))
//      }
//      const editBatch=(batchId)=>{
//         axios.get(`localhost:8081/api/users/v1.0/getUsersById/65f95f596b1836bd4c315ffa${batchId}`)
//         .then((res)=>{
//             setid(res.data.id)
//             setfirstname(res.data.firstname)
//             setlastname(res.data.lastname)
//             setemail(res.data.email)
//             setphone(res.data.phone)
//             setusername(res.data.username)
//             setdob(res.data.dob)
//             setage(res.data.age)
            
//         })
//      }
//     return (
//         <>
//             <table className="table table-bordered table-hover">
//                 <thead className="table-dark">
//                     <tr>
//                         <th>Id</th>
//                         <th>FistName</th>
//                         <th>LastName</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                         <th>Username</th>
//                         <th>DOB</th>
//                         <th>Age</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {dataa.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.Id}</td>
//                             <td>{item.FistName}</td>
//                             <td>{item.LastName}</td>
//                             <td>{item.Email}</td>
//                             <td>{item.Phone}</td>
//                             <td>{item.Username}</td>
//                             <td>{item.DOB}</td>
//                             <td>{item.age}</td>
//                             <td>
//                                 <button className="btn btn-primary" onClick={()=>editBatch(item.id)} data-bs-target="#updateBatch" data-bs-toggle="modal">EDIT</button>
//                                 <button className="btn btn-danger" onClick={deleteBatch(item.id)}>DELETE</button>
//                             </td>
//                         </tr>
//                     ))}
                 
//                 </tbody>
//             </table>
//             <div className="modal fade" id='updateBatch'>
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                           <h4 className="modal-title">
                              
//                           </h4>
//                           <button className="btn-close" data-bs-dismiss="modal"></button>
//                         </div>
//                            <div className="modal-body">
//                             <form>
//                                 <input type="text" name='id' className="form-control mb-3" placeholder="Enter course" value={id} onChange={(e)=>setid(e.target.value)}/>
//                                 <input type="text" name='firstname' className="form-control mb-3" placeholder="Enter course" value={firstname} onChange={(e)=>setfirstname(e.target.value)}/>
//                                 <input type="text" name='lastname' className="form-control mb-3" placeholder="Enter course" value={lastname} onChange={(e)=>setlastname(e.target.value)}/>
//                                 <input type="text" name='email' className="form-control mb-3" placeholder="Enter course" value={email} onChange={(e)=>setemail(e.target.value)}/>
//                                 <input type="text" name='phone' className="form-control mb-3" placeholder="Enter course" value={phone} onChange={(e)=>setphone(e.target.value)}/>
//                                 <input type="text" name='username' className="form-control mb-3" placeholder="Enter course" value={username} onChange={(e)=>setusername(e.target.value)}/>
//                                 <input type="text" name='dob' className="form-control mb-3" placeholder="Enter course" value={dob} onChange={(e)=>setdob(e.target.value)}/>
//                                 <input type="text" name='age' className="form-control mb-3" placeholder="Enter course" value={age} onChange={(e)=>setage(e.target.value)}/>
//                                 <input type="submit" value="add Batch" className="btn btn-danger"/>
//                             </form>
//                            </div>
//                     </div>

//                 </div>

//             </div>
//         </>
//     );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
const { ObjectId } = require("mongoose").Types;
export default function Data() {
    const [dataa, setDataa] = useState([]); 
    const [id, setId] = useState(""); 
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
      axios.get("http://localhost:8081/api/users/v1.0/getUsers")
       
            .then((res) => setDataa(res.data))
            
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const deleteBatch = (batchId) => {
        axios.delete(`http://localhost:8081/api/users/v1.0/deleteUser${batchId}`)
            .then(() => {
                alert("Delete successfully");
               
                fetchData();
            })
            .catch((error) => console.error("Error deleting data:", error));
    }

    const editBatch = (batchId) => {
        axios.get(`http://localhost:8081/api/users/v1.0/getUsersById/65f95f596b1836bd4c315ffa${batchId}`)
            .then((res) => {
                setId(res.data.id);
                setFirstname(res.data.firstname);
                setLastname(res.data.lastname);
                setEmail(res.data.email);
                setPhone(res.data.phone);
                setUsername(res.data.username);
                setDob(res.data.dob);
                setAge(res.data.age);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { id, firstname, lastname, email, phone, username, dob, age };
        // You can send the new data to your backend for updating or adding
        // Example:
        axios.post("http://localhost:8081/api/users/v1.0/updateUser", newData)
            .then(() => {
                alert("Data updated successfully");
                // Refresh data after update
                fetchData();
            })
            .catch((error) => console.error("Error updating data:", error));
    }

    const fetchData = () => {
        axios.get("http://localhost:8081/api/users/v1.0/getUsers")
            .then((res) => setDataa(res.data))
            .catch((error) => console.error("Error fetching data:", error));
    }

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Username</th>
                        <th>DOB</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dataa.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.username}</td>
                            <td>{item.dob}</td>
                            <td>{item.age}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => editBatch(item.id)} data-bs-target="#updateBatch" data-bs-toggle="modal">EDIT</button>
                                <button className="btn btn-danger" onClick={() => deleteBatch(item.id)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="modal fade" id="updateBatch">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title">Edit User</h4>
                          <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                           <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="id" className="form-control mb-3" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} />
                                <input type="text" name="firstname" className="form-control mb-3" placeholder="Enter First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                <input type="text" name="lastname" className="form-control mb-3" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                <input type="email" name="email" className="form-control mb-3" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" name="phone" className="form-control mb-3" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                <input type="text" name="username" className="form-control mb-3" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <input type="text" name="dob" className="form-control mb-3" placeholder="Enter Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
                                <input type="text" name="age" className="form-control mb-3" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
                                <input type="submit" value="Update User" className="btn btn-primary" />
                            </form>
                           </div>
                    </div>
                </div>
            </div>
        </>
    );
}
