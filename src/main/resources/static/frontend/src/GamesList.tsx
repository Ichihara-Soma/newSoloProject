import { useNavigate } from "react-router-dom";

export const GamesList = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>ゲーム一覧</h1>
            <button onClick={() => navigate('/game/contents')}>カーソルシューティングゲーム</button>
            <button>トランプ</button>
            <button>将棋</button>
        </div>
        )
    }