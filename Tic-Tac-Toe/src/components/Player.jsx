import { useState } from "react"

export default function Player({ name, symbol, isActive, onChangePlayerName }) {
    const [isEditing, setIsEditing] = useState(true);
    const [Player1, setPlayer1] = useState(name);
    const handleEditClick = () => {
        setIsEditing((editing) => !editing);
        if(!isEditing){
            onChangePlayerName(symbol, Player1);
        }
    }
    return <li className={isActive?'active':undefined}>
        <span className="player">
            {isEditing?
            <span className="player-name">{Player1}</span>:
            <input value={Player1} type="text" onChange={(event) =>{ setPlayer1(event.target.value)}}/>}       
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing?"Edit":"Save"}</button>
    </li>

}