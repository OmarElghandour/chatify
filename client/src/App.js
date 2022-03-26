import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Account from "./components/account";
import Contacts from "./components/contacts";
import Groups from "./components/groups";
import Layout from "./components/layout";
import Messaging from "./components/messaging";
import Nav from "./components/nav";
import Settings from "./components/settings";
function App() {

const URL = 'ws://127.0.0.1:8080';
const [user, setUser] = useState('John');
const [message, setMessage] = useState([]);
const [messages, setMessages] = useState([]);
const [ws, setWs] = useState(new WebSocket(URL));


  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket Connected');
    }
  
    ws.onmessage = (e) => {
      console.log('------------------');
      console.log(e);

      const message = JSON.parse(e.data);
      setMessages([message, ...messages]);
    }
  
    return () => {
      ws.onclose = () => {
        console.log('WebSocket Disconnected');
        setWs(new WebSocket(URL));
      }
    }
  }, [ws.onmessage, ws.onopen, ws.onclose, messages]);
  
  const submitMessage = (usr, msg) => {
    const message = { user: usr, message: msg };
    ws.send(JSON.stringify(message));

    console.log(message);
    setMessages([message, ...messages]);
  }
  
  return (
    
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
      </Routes>
    </BrowserRouter>






     
     /* <div>
	        <label htmlFor="user">
	          Name :
	          <input
	            type="text"
	            id="user"
	            placeholder="User"
	            value={user}
	            onChange={e => setUser(e.target.value)}
	          />
	        </label>

	        <ul>
	          {messages.reverse().map((message, index) =>
	            <li key={index}>
	              <b>{message.user}</b>: <em>{message.message}</em>
	            </li>
	          )}
	        </ul>

	        <form
	          action=""
	          onSubmit={e => {
	            e.preventDefault();
              console.log(message);
	            submitMessage(user, message);
	            setMessage([]);
	          }}
	        >
	          <input
	            type="text"
	            placeholder={'Type a message ...'}
	            value={message}
	            onChange={e => setMessage(e.target.value)}
	          />
	          <input type="submit" value={'Send'} />
	        </form>
	    </div> */


    // </div>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));

