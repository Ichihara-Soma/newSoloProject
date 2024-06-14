import './Target.css'
import {useState, useEffect} from 'react'
import {ContinuePage} from './ContinuePage'

export const Target = ({score, setScore, highScore, setHighScore, name, time, targetSize}) => {
    const [randomNum, setRandomNum] = useState(null);
    const [element, setElement] = useState(null);
    const [boolean, setBoolean] = useState(true);
    const [newBoolean, setNewBoolean] = useState(false);
    const [conti, setConti] = useState(true);
    const [scoreUpdate, setScoreUpdate] = useState(false);

    useEffect( () => {
        fetch(`/api/highScore?name=${name}`)
            .then((res) => res.json())
            .then((data) => {
                if(score > data[0].score){
                    setScoreUpdate(true);
                    setHighScore(score);
                    const body = {"score": score}
                    fetch(`/api/update?name=${name}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                            },
                        body: JSON.stringify(body)
                        })
                    }else {
                        setHighScore(data[0].score)
                        }
                })
        }, [newBoolean])

    useEffect(() => {
        for (let i = 1; i < 21; i++){
            const ele = document.getElementById(i);
            ele.style.width = `${targetSize}px`
            ele.style.height = `${targetSize}px`
            }
        },[targetSize])

    const timer = () => {
        setTimeout(() => {
            console.log("終了")
            setNewBoolean(true)
            setBoolean(false);
            setConti(false);
            }, time)
        }

    const changeColor = (idNum) => {
        if(boolean === true){
            if (idNum === randomNum || idNum === 0) {
                if(idNum !== 0){
                    element.style.backgroundColor = "#FFFFCC"
                    score += 10 * (60 / (time / 1000));
                    setScore(score);
                    }
                const num = Math.floor(Math.random() * 20 + 1)
                setRandomNum(num);
                const ele = document.getElementById(num);
                setElement(ele);
                ele.style.backgroundColor = "#FF9900"
            }}
        }

    const reload = () => {
        element.style.backgroundColor = "#FFFFCC"
        setScore(0);
        setRandomNum(null);
        setElement(null);
        setBoolean(true);
        setNewBoolean(false);
        setScoreUpdate(false);
        }



    return (
    conti === true ? (
    <div className="target">
        <button className="startBtn" onClick={() => {
            changeColor(0);
            timer();
            }} id="0">START</button>
        <div className="target-zone">
            <button onClick={() => changeColor(1)} id="1" className="target-button">1</button>
            <button onClick={() => changeColor(2)} id="2" className="target-button">2</button>
            <button onClick={() => changeColor(3)} id="3" className="target-button">3</button>
            <button onClick={() => changeColor(4)} id="4" className="target-button">4</button>
            <button onClick={() => changeColor(5)} id="5" className="target-button">5</button>
            <button onClick={() => changeColor(6)} id="6" className="target-button">6</button>
            <button onClick={() => changeColor(7)} id="7" className="target-button">7</button>
            <button onClick={() => changeColor(8)} id="8" className="target-button">8</button>
            <button onClick={() => changeColor(9)} id="9" className="target-button">9</button>
            <button onClick={() => changeColor(10)} id="10" className="target-button">10</button>
            <button onClick={() => changeColor(11)} id="11" className="target-button">11</button>
            <button onClick={() => changeColor(12)} id="12" className="target-button">12</button>
            <button onClick={() => changeColor(13)} id="13" className="target-button">13</button>
            <button onClick={() => changeColor(14)} id="14" className="target-button">14</button>
            <button onClick={() => changeColor(15)} id="15" className="target-button">15</button>
            <button onClick={() => changeColor(16)} id="16" className="target-button">16</button>
            <button onClick={() => changeColor(17)} id="17" className="target-button">17</button>
            <button onClick={() => changeColor(18)} id="18" className="target-button">18</button>
            <button onClick={() => changeColor(19)} id="19" className="target-button">19</button>
            <button onClick={() => changeColor(20)} id="20" className="target-button">20</button>
        </div>
    </div>
        ) : (
    <ContinuePage setConti={setConti} reload={reload} scoreUpdate={scoreUpdate} />
            )
    )
    }