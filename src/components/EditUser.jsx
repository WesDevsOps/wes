import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './ListUsers.css';
import aa from'./aa.png'
export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputs, setInputs] = useState({ id: id }); // Ensure id is included in initial state

    const getUser = useCallback(() => {
        axios.get(`http://localhost/api/index.php/${id}`)
            .then(response => {
                if (response.data) {
                    console.log("Fetched User:", response.data);
                    setInputs(values => ({ ...values, ...response.data })); // Ensure id is included in the state
                } else {
                    console.error('Error: No user found with the given ID', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, [id]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost/api/index.php`, inputs)
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }

    return (
        <div className="form-c">
            <div className="form-c1">
                    <h1>Edit User</h1>
                    <form onSubmit={handleSubmit}>
                    <label>Name: </label>
                    <input type="text" name="name" value={inputs.name || ''} onChange={handleChange} placeholder="Enter name" />
                    <br />
                    <label>Password: </label>
                    <input type="password" name="password" value={inputs.password || ''} onChange={handleChange} placeholder="Enter password" />
                    <br />
                    <label>Email: </label>
                    <input type="email" name="email" value={inputs.email || ''} onChange={handleChange} placeholder="Enter email" />
                    <br />
                    <label>Phone No: </label>
                    <input type="phone" name="phone" value={inputs.phone || ''} onChange={handleChange} placeholder="Enter phone no" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="form-c2">
         
         <img src={aa} />
       </div>
            
        </div>
    );
}
