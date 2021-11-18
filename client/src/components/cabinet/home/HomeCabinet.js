import React, { useEffect } from 'react';
import './HomeCabinet.css';

const HomeCabinet = (props) => {

    useEffect(() => {
        props.socket.emit('add-user', {id: 'tt'});

        props.socket.on("user-event", (data) => {
            console.log(data);
        });

        props.socket.on("game-process", (data) => {
            console.log(data);
        });
    },[]);

    return (
        <div className="rooms-list">
            <h1>Home Cabinet</h1>
        </div>
    )
}

export default HomeCabinet;
