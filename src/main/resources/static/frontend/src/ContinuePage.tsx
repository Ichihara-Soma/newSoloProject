import React, {useState} from "react"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './ContinuePage.css'

export const ContinuePage = ({setConti, reload, scoreUpdate}) => {
    const [rankBoolean, setRankBoolean] = useState(false);
    const { width, height } = useWindowSize()
    return (
        <div className="continuePage">
            {rankBoolean === false ? (
                <div>
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
                        )}
                    <button className="continueBtn" onClick={() => {
                        setConti(true)
                        reload()
                        }}>CONTINUE</button>
                    <button className="rankingBtn" onClick={() => setRankBoolean(true)}>
                        ランキング一覧画面
                    </button>
                </div>
                ) : (
                <div>
                    <h1>ランキング一覧</h1>
                    <button onClick={() => setRankBoolean(false)}>
                    CONTINUE画面に戻る
                    </button>
                </div>
                )}
            </div>
        )
    }