import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import ListUser from "./components/ListUser";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";

function App(){
  return (
    <div className="App">
      

      <BrowserRouter>
        <nav>
            <ul>
                <li>
                  <Link to="/">Create Users</Link>
                </li>
                <li>
                  <Link to="user/create">List User</Link>
                </li>
            </ul>
        </nav>
        



        <div className="body-c">
          <div className="body-c1">
                <div className="dot"></div>
                <h5>React CRUD Operations using PHP API and MySQL</h5>
          </div>
          <div className="body-c2">
              <Routes>
                <Route index element = {<ListUser/>}/>
                <Route path="user/create" element={<CreateUser/>}/>
                <Route path="/user/create/users/:id/edit" element={<EditUser/>}/>
              </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;