import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import './ListUsers.css';
import aa from'./aa.png'


export default function ListUser(){
    const Navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:/api/user/save', inputs).then(function(response){
          console.log(response.data);
          Navigate('/');
        });
        console.log(inputs);
    }
    return(
      <div className="form-c">
        <div className="form-c1">
        <h1>ADD NEW USER</h1>
        <form onSubmit={handleSubit}>
            <lable>Name: </lable>
            <input type="text" name="name" onChange={handleChange} placeholder="Eneter name"/>
            <br/>
            <lable>Password: </lable>
            <input type="password" name="password" onChange={handleChange} placeholder="Eneter Password"/>
            <br/>
            <lable>Email: </lable>
            <input type="email" name="email" onChange={handleChange} placeholder="Eneter email"/>
            <br/>
            <lable>Phone No: </lable>
            <input type="phone" name="phone"  onChange={handleChange} placeholder="Eneter Phone No"/>
            <br/>
            <button>Submit</button>
        </form>
        </div>
        <div className="form-c2">
         
          <img src={aa} />
        </div>
      </div>
    )
}