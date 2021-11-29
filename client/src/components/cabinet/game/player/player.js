import React from 'react';

const Player = (props) => {

    return (
        <div className={props.item._id ? 'player' : 'player inactive'}>
            <div className={props.item._id ? 'number' : 'number inactive'}>{props.item.number}</div>
        </div>
    )
}

export default Player;
