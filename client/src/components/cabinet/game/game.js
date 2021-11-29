import React, { useEffect } from 'react';
import './game.css';
import { Breadcrumb } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import { gameInitialize } from '../../../redux/actions/game/game.action';
import { useDispatch, useSelector } from 'react-redux';
import * as messageTypes from '../../../redux/types/message/message-type';
import Message from './message/message';
import Player from './player/player';

const Game = (props) => {
    const dispatch = useDispatch();
    const { currentGame } = useSelector(state => state.gameReducer);

    useEffect(() => {
        const currentLocation = window.location.pathname.split('/');
        dispatch(gameInitialize(props.socket, currentLocation.slice(-1)[0]), props.countUser);
    },[]);

    props.socket.on("on-game-process", (response) => {
        console.log(response);
        const game = response.game;
        if (response.message) {
            dispatch({
                type: messageTypes.MESSAGE_SET,
                message: response.message,
            });
        }
    });

    return (
        <div className="game">
            <Message />
            <div className="navigation">
                <nav aria-label="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/cabinet/">Cabinet</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active aria-current="page">Game</Breadcrumb.Item>
                    </Breadcrumb>
                </nav>
            </div>
            {currentGame && currentGame.players.length > 0 ? (
                <div className="players">
                    {currentGame.players.map(item => (
                        <div key={item.number}>
                            <Player item={item}/>
                        </div>
                    ))}
                </div>
            ) : null}
            <div className="table">

            </div>
        </div>
    )
}

export default Game;
