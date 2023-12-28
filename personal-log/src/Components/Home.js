import { useState, useEffect } from "react"
import { writeUserData,deleteData, updateData, fetchData } from "../firebase_init";

export function getFormattedDate(currentDateAndTime){
    const formattedDateAndTime =
    `${currentDateAndTime.getDate().toString().padStart(2, '0')}-${(currentDateAndTime.getMonth() + 1)
        .toString().padStart(2, '0')}-${currentDateAndTime.getFullYear()} ${currentDateAndTime.getHours()
            .toString().padStart(2, '0')}:${currentDateAndTime.getMinutes()
            .toString().padStart(2, '0')}`
    return formattedDateAndTime
}
export function Button({text, id, log, onClick, setData,setDisabled, data}){
    async function handleClick(){

            await deleteData(id);
            const result = await fetchData()
            setData(result);

    }
    if(text==='Delete'){
        return(
            <button onClick={handleClick}>{text}</button> 
        )
    }
    return(
        <button onClick={onClick}>{text}</button> 
    )
}

function Prompt({text, question, i, setText}){
    return(
        <div>
            <textarea
                    value={text[i]}
                    placeholder={question}
                    onChange={(e) => {
                    setText((prv) => {
                        const newText = [...prv]; // Create a copy of the array
                        newText[i] = e.target.value;
                        return newText;
                    });
                    }}
                ></textarea>
        </div>
    )
}

export const QUESTIONS =["What are the good things you did today", "What are some things you want to improve", "Plan for tommorow"]
export default function Home(){
    const [text,setText] = useState(['','',''])
    function onClick(){
        console.log('submit');
        const formattedDateAndTime = getFormattedDate(new Date())
        console.log(formattedDateAndTime);
        const res ={
            response: text,
            timeStamp:formattedDateAndTime
        }
        writeUserData(res)
        setText(['','',''])


    }
    return(
        <>
            <Prompt text={text} setText={setText} question={QUESTIONS[0]} i={0}></Prompt>
            <Prompt text={text} setText={setText} question={QUESTIONS[1]} i={1}> </Prompt>
            <Prompt text={text} setText={setText} question={QUESTIONS[2]} i={2}> </Prompt>
            <Button onClick={onClick} text={'Submit'}/>
        </>

    )
}