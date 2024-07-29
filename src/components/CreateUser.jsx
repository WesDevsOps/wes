import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './CreateUser.css';

export default function CreateUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/api/index.php')
            .then(function(response){
                if (Array.isArray(response.data)) {
                    console.log("Fetched Users:", response.data);
                    setUsers(response.data);
                } else {
                    console.error('Error: API response is not an array', response.data);
                }
            })
            .catch(function(error) {
                console.error('Error fetching users:', error);
            });
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost/api/index.php/${id}`)
            .then(function(response){
                console.log(response.data);
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(function(error) {
                console.error('Error deleting user:', error);
            });
    }

    return (
        <div className="users-container">
            <h1>Users List</h1>
            <div className="users-list">
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={index} className="user-card">
                            <p><strong>Name:</strong> <br/>{user.name}</p>
                            <p><strong>Email:</strong> <br/>{user.email}</p>
                            <p><strong>Phone:</strong> <br/>{user.phone}</p>
                            <p><strong>Password:</strong> <br/>{user.password}</p>
                            <div className="user-actions">
                                <Link to={`users/${user.id}/edit`} className="edit-button">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="delete-button">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
}
