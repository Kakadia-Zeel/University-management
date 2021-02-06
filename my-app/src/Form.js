import React from 'react';
import axios from 'axios';
import { useState } from "react";

function StudentForm() {

    const[sname, setName] =useState("");
    const[coursename, setCoursename] =useState("");
    const[coursetype, setCoursetype] =useState("");
    const[qualification, setQualification] =useState("");


 
 

    function fetchRecords(){
        axios.get('http://localhost:8080/students')
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }


    function saveStudent(){
        const value = {
            sname: sname,
            coursename : coursename,
            coursetype : coursetype,
            qualification : qualification
            
        };

        axios.post('http://localhost:8080/create/',value)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }





    return (

        <div>
             <h1 style={{color: "crimson"}}>WELCOME TO UNIVERSITY OF WEST LONDON</h1>

             <h3 style={{color:"darkblue"}}>****PLEASE ENTER YOUR NAME AND GRADES BELOW****</h3>

            <input type="text" placeholder='Student Name'  onChange ={e => setName(e.target.value) }/>
            <br/>
            <input type="text" placeholder='Course Name'  onChange ={e => setCoursename(e.target.value) }/>
            <br/>
            <input type="text" placeholder='Course Type'  onChange ={e => setCoursetype(e.target.value) }/>
            <br/>
            <input type="text" placeholder='Qualification' onChange ={e => setQualification(e.target.value) }/>
            <br/>
            <button onClick={saveStudent}><h4 style={{color: "teal"}}>Save Student Details</h4></button> 
            <br/>
            <br/><h3 style={{color:"crimson"}}>Show Courses:</h3>
            <button onClick={fetchRecords}><h4 style={{color: "teal"}}> Display Students</h4></button>
           
    </div>
);
    }
export default StudentForm;
