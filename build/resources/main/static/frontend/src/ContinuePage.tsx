import React from "react"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './ContinuePage.css'

export const ContinuePage = ({setConti, reload, scoreUpdate}) => {
    const { width, height } = useWindowSize()
    return (
        <div className="continuePage">
            <h1>コンティニューしますか</h1>
            {scoreUpdate === true ? (
                <div>
                    <Confetti
                            width={width}
                            height={height}
                            recycle={true}
                          />
                    <h1>新記録更新しました!!</h1>
                    <h1>おめでとうございます!!</h1>
                </div>
                ) : (
                null
                )
                }
            <button className="continueBtn" onClick={() => {
                setConti(true)
                reload()
                }}>CONTINUE</button>
            </div>
        )
    }