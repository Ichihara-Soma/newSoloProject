import { useNavigate } from "react-router-dom";
import { useRef } from 'react';

export const Top = ({setName}) => {
    const navigate = useNavigate();
    const nameRef = useRef();

    const postName = async (name) => {
        const res = await fetch(`/api/highScore?name=${nameRef.current.value}`)
        const data = await res.json()
        if(data.length === 0){
            console.log("から配列")
            setName(name)
            const body = {"name": name};
            fetch("/api/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify(body)
            })} else {
                setName(name)
            }
        navigate(`/game/contents`)
    }

     return (
         <div>
         <h1>ニックネームを決めてね！</h1>
         <input placeholder="ニックネーム" ref={nameRef} />
         <button onClick={() => {
             postName(nameRef.current.value)
         }}>ゲームを選ぶ</button>

         </div>
     );
     }