import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import TaskForm from "../components/TaskForm";
import TaskCards from "../components/TaskCards";

function HomePage(){
    const [form,setForm]=useState(false);
    const [redirect,setRedicrect]=useState(false);
    const handleLogout=()=>{
        localStorage.removeItem("id");
        setRedicrect(true);
    }
    return(
        <>
            {redirect && <Navigate to="/login" replace={true} />}
            <NavBar handleLogout={handleLogout} setForm={setForm}/>
            {form?<TaskForm setForm={setForm}/>:<TaskCards />}
        </>    
    );
}

export default HomePage;