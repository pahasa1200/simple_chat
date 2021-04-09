import React, {useState} from 'react'
import socket from "../../socket";
import axios from "axios";
import classes from './JoinBlock.module.css'

const JoinBlock = ({onLogin}) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onEnter = async () => {
        if (!roomId || !userName){
            return alert('Field is empty!')
        }
        const obj ={
            roomId,
            userName
        }
        setLoading(true);
        await axios.post('/rooms', obj)
        onLogin(obj);
    }
    return(
        <>
            <div className={classes.joinBlock}>
                <h1>Chill chat</h1>
                <input
                    className={classes.firstInput}
                    type='text'
                    placeholder='Room ID'
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}/>
                <input
                    type='text'
                    placeholder='Your name'
                    value={userName}
                    onChange={e => setUserName(e.target.value)}/>
                <button disabled={isLoading} onClick={onEnter} className='btn btn-success'>{isLoading ? "Loading..." : "Sign in" }</button>
            </div>
        </>
    )
}
export default JoinBlock;