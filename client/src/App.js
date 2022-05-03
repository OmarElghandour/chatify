import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Account from "./components/account";
import Contacts from "./components/contacts";
import Groups from "./components/groups";
import Layout from "./components/layout";
import Messaging from "./components/messaging";
import Settings from "./components/settings";
import Login from "./components/Login";
import Register from './components/register';
import { UserProvider } from './context/userProvider';

function App() {
  const [token, setToken] = useState()

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Account />} />
            <Route path="account" element={<Account />} />
            <Route path="messaging" element={<Messaging />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="groups" element={<Groups />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));

