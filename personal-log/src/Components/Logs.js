import React, { useEffect, useState } from 'react';
import "./Logs.css";
import { fetchData, updateData } from "../firebase_init";
import { QUESTIONS } from "./Home";
import { Button } from './Home';
import { set } from 'firebase/database';

function QA({log,handleChange,i, handleUpdate}){
    const [readOnly, setReadOnly] = useState(true)
    const [disabled,setDisabled] = useState(true)
    function handleMouseOver(){
        setDisabled(false)
    }

    return(
        <>
            <div>
                <div>{QUESTIONS[i]}</div>
                {/* <textarea value={log[i]} disabled={disabled} onClick={onClick} onChange={(e)=>{handleChange(e, i)}}></textarea> */}
                <textarea value={log[i]} disabled={disabled} onMouseOver={handleMouseOver} onBlur={handleUpdate} onChange={(e)=>{handleChange(e, i)}}></textarea>
            </div>
        </>
    )
}

function Entry({ id, data, setData}) { 
    const [log, setLog] = useState(data['response'])
    const [disabled, setDisabled] = useState(true)
    // function handleUpdate(){
    //     console.log(disabled);
    //     disabled===false?setDisabled(true):setDisabled(false)

    // }

    // function save(id,log){
    //     updateData(id,log)
    // }
    async function handleUpdate(){
        console.log('handle update');
        const res = {
            response:log,
            timeStamp:data['timeStamp']
         }
         const result = await updateData(id,res)
         setData(result)
         setDisabled(true)
    }
    function handleChange(e, i){
        console.log('handlechange');
        setLog((prv) => {
            const newText = [...prv]; // Create a copy of the array
            newText[i] = e.target.value;
            return newText;
        });
    }
    return (
        <div className="post-container">
            <div>{data['timeStamp']}</div>
            <QA log={log} disabled={disabled} handleChange={handleChange} handleUpdate={handleUpdate} i={0}/>
            <QA log={log} disabled={disabled} handleChange={handleChange} handleUpdate={handleUpdate} i={1}/>
            <QA log={log} disabled={disabled} handleChange={handleChange} handleUpdate={handleUpdate} i={2}/>

            <Button text={'Update'} onClick={handleUpdate} id={id} log={log} setData={setData} setDisabled={setDisabled}  data={data}/>
            <Button text={'Save'} id={id} log={log} setData={setData} setDisabled={setDisabled} data={data}/>
            <Button text={'Delete'} id={id} log={log} setData={setData} setDisabled={setDisabled} data={data}/>
        </div>
    );
}

export default function Logs() {
    const [data, setData] = useState(null);
 
    useEffect(() => {
        const fetchDataAsync = async () => {
            const result = await fetchData();
            setData(result);
        };

        fetchDataAsync();
    }, []); // Empty dependency array ensures the effect runs only once

    if(!data){
        return <></>
    }
    // if (!data && Object.keys(data).length!=0) {
    //     // Data is still loading
    //     return <div>Loading...</div>;
    // }
    

    const res = Object.keys(data).reverse().map((key) => (
        <Entry key={key} id={key} data={data[key]} setData={setData}/>
    ));

    console.log(data);

    return <>{res}</>;
}
