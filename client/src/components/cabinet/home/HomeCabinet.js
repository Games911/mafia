import React, { useEffect } from 'react';
import './HomeCabinet.css';
import { Link } from 'react-router-dom';

const HomeCabinet = (props) => {

    useEffect(() => {
        props.socket.emit('add-user', {id: 'tt'});

        props.socket.on("user-event", (data) => {
            console.log(data);
        });

        props.socket.on("room-process", (data) => {
            console.log(data);
        });
    },[]);

    return (
        <div className="rooms-list">
            <h1>Home Cabinet</h1>
            <Link to="/cabinet/create-game" className="link-create-room">Create game</Link>
        </div>
    )
}

export default HomeCabinet;
