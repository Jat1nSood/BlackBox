import "./App.css";
import Addproduct from "./components/Addproduct";
import Inventory from "./components/Inventory";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import Sidebar from "./components/Sidebar";
import UpdateProduct from "./components/UpdateProduct";
import { UserProvider } from "./components/userContext"; // Import your UserProvider

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Navbar />

          <Routes>
            <Route path="/signup" element={<Registration />} />
            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <div className="container">
                  <Sidebar />

                  <Inventory />
                </div>
              }
            />

            <Route
              path="/addproduct"
              element={
                <div className="container">
                  <Sidebar />

                  <Addproduct />
                </div>
              }
            />

            <Route
              path="/update/:id"
              element={
                <div className="container">
                  <Sidebar />

                  <UpdateProduct />
                </div>
              }
            />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
