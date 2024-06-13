import './Navbar.css';
import {useState} from 'react';

export const Navbar = ({score, highScore, setTime, setTargetSize}) => {


    return (
        <div className="navbar">
            <h1>カーソルシューティングゲーム</h1>
            <div className="navbar-changer">
                <div className="selection">
                    <h4>難易度を選択</h4>
                    <button onClick={() => setTargetSize(50)}>易しい</button>
                    <button onClick={() => setTargetSize(40)}>普通</button>
                    <button onClick={() => setTargetSize(30)}>難しい</button>
                    <h4>時間を選択</h4>
                    <button onClick={() => setTime(1000)}>30秒</button>
                    <button onClick={() => setTime(2000)}>60秒</button>
                    <button onClick={() => setTime(3000)}>120秒</button>
                </div>
                <div className="score">
                    <h2>最高点: {highScore}/m</h2>
                    <h1>点数: {score}/m</h1>
                </div>
            </div>
        </div>
        )
    }
