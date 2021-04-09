import React, {useEffect, useRef, useState} from "react";
import socket from "../../socket";
import classes from './Chat.module.css'

const Chat = React.memo(({users, messages, userName, roomId}) => {
    const [messageValue, setMessageValue] = useState('');
    const messageRef = useRef(null);

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue
        })
        setMessageValue('');
    }

    useEffect(() => {
        messageRef.current.scrollTo(0, 9999);
    }, [messages])

    return (
        <>
            <div className={classes.wraper}>
                <div className={classes.chat}>
                    <div className={classes.chatUsers}>
                        <div className={classes.chatB}>
                            <h6>Комната: {roomId}</h6>
                            <hr/>
                            <b className={'text-center'}>Online ({users.length}):</b>
                        </div>
                        <ul>
                            {users.map((name, index) => (
                                <li key={name + index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={classes.chatMessages}>
                    <div ref={messageRef} className={classes.messages}>
                        {messages.map((message) => (
                            <div className={classes.message}>
                                <span>{message.text}</span>
                                <div className={classes.userNameDiv}>
                                    <span>{message.userName}</span>
                                </div>
                                {/*<hr/>*/}
                            </div>
                        ))}

                    </div>
                    <form>
                <textarea value={messageValue}
                          onChange={e => setMessageValue(e.target.value)}
                          className={'form-control'}
                          rows={'3'}/>
                        <button onClick={onSendMessage} type={"button"} className={'btn btn-primary'}>Send</button>
                    </form>
                </div>
            </div>
        </>
    )
})


export default Chat;