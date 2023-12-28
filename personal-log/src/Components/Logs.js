import React, { useEffect, useState } from 'react';
import { BsCloudCheck } from "react-icons/bs";
import "./Logs.css";
import { fetchData, updateData } from "../firebase_init";
import { QUESTIONS } from "./Home";
import { Button } from './Home';
import { set } from 'firebase/database';

function QA({log,handleChange,i, handleUpdate}){
    const [disabled,setDisabled] = useState(true)
    const [focus,setFocus] = useState(false)

    function onBlur(){
        setDisabled(true)
        handleUpdate()
    }
    function handleMouseOver(){
        setDisabled(false)
    }
    function handleFocus(){
        setFocus(true)
    }

    function handleMouseOut(){
        if(!focus){
            setDisabled(true)
        }
        
    }

    return(
        <>
            <div>
                <div>{QUESTIONS[i]}</div>
                {/* <textarea value={log[i]} disabled={disabled} onClick={onClick} onChange={(e)=>{handleChange(e, i)}}></textarea> */}
                <textarea value={log[i]} disabled={disabled} onFocus={handleFocus} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onBlur={onBlur} onChange={(e)=>{handleChange(e, i)}}></textarea>
                
            </div>
        </>
    )
}

function Entry({ id, data, setData}) { 
    const [log, setLog] = useState(data['response'])
    const [timerId,setTimerId] = useState()
    // const [disabled, setDisabled] = useState(true)
    
    const [updated,setUpdated] = useState(false)


    async function handleUpdate(){
        setUpdated(false)
        console.log('handle update');
        const res = {
            response:log,
            timeStamp:data['timeStamp']
         }
         const result = await updateData(id,res)
         setData(result)
         setUpdated(true)
         
    }

    function handleChange(e, i){
        console.log(timerId);
        if(timerId){
            clearTimeout(timerId)
        }
        console.log('handlechange');
        setUpdated(false)
        setLog((prv) => {
            const newText = [...prv]; // Create a copy of the array
            newText[i] = e.target.value;
            return newText;
        });
        setTimerId(setTimeout(()=>{setUpdated(true)}, 1000))

    }
    return (
        <div className="post-container">
            <div className='heading'>
                {data['timeStamp'] }
                {updated && <BsCloudCheck className='colored-icon-container' />}
            </div>
            
            <QA log={log} handleChange={handleChange} handleUpdate={handleUpdate} i={0} />
            <QA log={log} handleChange={handleChange} handleUpdate={handleUpdate} i={1} />
            <QA log={log} handleChange={handleChange} handleUpdate={handleUpdate} i={2} />

            
            <Button text={'Delete'} id={id} setData={setData}/>
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
