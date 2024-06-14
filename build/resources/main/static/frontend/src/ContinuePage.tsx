import React, {useState} from "react"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './ContinuePage.css'

export const ContinuePage = ({setConti, reload, scoreUpdate}) => {
    const [rankBoolean, setRankBoolean] = useState(false);
    const [dataList, setDataList] = useState([])
    const { width, height } = useWindowSize()
    let rank = 0;

    const ranking = async () => {
        const res = await fetch("/api/games")
        const data = await res.json()
        data.sort((a,b) => b.score - a.score)
        setDataList(data);
        }



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
                    <button className="rankingBtn" onClick={() => {
                        setRankBoolean(true)
                        ranking()}}>
                        ランキング一覧画面
                    </button>
                </div>
                ) : (
                <div>
                    <button className="continueButton" onClick={() => {setRankBoolean(false)}}>
                                        CONTINUE画面に戻る
                                    </button>
                    <h1>ランキング一覧</h1>
                    <h3>  ID ユーザー名 点数</h3>
                    <ul>
                        {dataList.map((obj, index) => (
                            <h3>
                               {index + 1}位 {obj.id} {obj.name} {obj.score}
                            </h3>
                            ))}
                    </ul>
                </div>
                )}
            </div>
        )
    }