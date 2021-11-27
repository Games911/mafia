import React, { useEffect } from 'react';
import './game.css';
import {Breadcrumb, Card} from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import { gameInitialize } from '../../../redux/actions/game/game.action';
import {useDispatch, useSelector} from 'react-redux';

const Game = (props) => {
    const dispatch = useDispatch();
    const { currentGame } = useSelector(state => state.gameReducer);

    useEffect(() => {
        const currentLocation = window.location.pathname.split('/');
        dispatch(gameInitialize(props.socket, currentLocation.slice(-1)[0]), props.countUser);
    },[]);

    return (
        <div className="game">
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
                        <div className={item._id ? 'player' : 'player inactive'} key={item.number}>
                            <div className={item._id ? 'number' : 'number inactive'}>{item.number}</div>
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
