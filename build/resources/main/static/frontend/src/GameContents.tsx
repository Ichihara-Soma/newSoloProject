import {useState} from 'react'
import {Navbar} from './Navbar'
import {Target} from './Target'
import {Score} from './Score'

export const GameContents = ({name}) => {
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0);
    const [time, setTime] = useState(30000)
    const [targetSize, setTargetSize] = useState(50)

    return (
        <div>
            <Navbar score={score} highScore={highScore} setTime={setTime} setTargetSize={setTargetSize}/>
            <Target score={score} setScore={setScore} highScore={highScore} setHighScore={setHighScore} name={name} time={time} targetSize={targetSize}/>
        </div>
        )
    }
