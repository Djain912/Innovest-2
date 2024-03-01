import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Contact from './components/Contact.js';
import News from './components/News.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Signup from './components/Signup.js';
import Error from './components/Error.js';
import Profile from './components/Profile.js';
import CreatePost from "./components/Createpost.js"
import Getpost from "./components/Getpost.js"
import Userprofile from './components/Userprofile.js';
import Live from "./components/Live.js"
import Room from "./components/Room.js"
import Liveget from "./components/Liveget.js"
import Product from "./components/Product.js"
import Getproducts from "./components/Getproducts.js"
import Plus from "./components/PlusBtn.js"
import Record from "./components/ScreenRecord.js"
import TestForm from './components/TestForm.js';
import Chat from './components/Chatpage.js';
import Collab from "./components/Collabform.js"
import VcRoom from "./components/Vcroom.js"
import VcHome from "./components/VcHome.js"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/createpost" element={<CreatePost/>} />
        <Route path="/getpost" element={<Getpost/>} />
        <Route path="/showprofile/:id" element={<Userprofile/>} />
        <Route path="/Live" element={<Live/>} />
        <Route path='/live' element={<Live />}></Route>
        <Route path='/room/:roomId' element={<Room />}></Route>
        <Route path='/liveshow' element={<Liveget />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/testform' element={<TestForm />}></Route>
        <Route path='/getproduct' element={<Getproducts />}></Route>
        <Route path='/record' element={<Record />}></Route>
        <Route path='/collab' element={<Collab  />}></Route>
        <Route path="/vc" element={<VcHome/>} />
        <Route path='/vcroom/:roomId' element={<VcRoom/>}/>
        <Route path='/chat' element={<Chat />}></Route>
        <Route path='/*' element={<Error />} />
      </Routes>
     
    </>
  );
}

export default App;
