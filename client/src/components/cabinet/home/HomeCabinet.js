import React, { useEffect } from 'react';
import './HomeCabinet.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, seedDataAction, addUser } from '../../../redux/actions/game/game.action';
import { Card, Button } from 'bootstrap-4-react';
import * as types from '../../../redux/types/game/game-type';

const HomeCabinet = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const { games, visibleGames, step, perPage } = useSelector(state => state.gameReducer);
    const { userId } = useSelector(state => state.userInfoReducer);

    useEffect(() => {
        dispatch(getGames(props.socket, perPage));
    },[]);

    const moreRooms = () => {
        dispatch({
            type: types.GAME_SET_VISIBLE_GAMES,
            visibleGames: games.slice(0, step + perPage),
        });
        dispatch({
            type: types.GAME_SET_STEP,
            step: step + perPage,
        });
    };

    const seedData = () => {
        dispatch(seedDataAction(props.socket));
    }

    const addUserToGame = (gameId) => {
        dispatch(addUser(gameId, userId, props.socket, history));
    };

    return (
        <div className="games-list">
            <h1>Home Cabinet</h1>
            <Link to="/cabinet/create-game" className="link-create-game">Create game</Link>
            <Button className="seed" primary onClick={seedData}>Seed data</Button>

            {visibleGames && visibleGames.length > 0 ? (
                <div className="games-list-block">
                    {visibleGames.map(item => (
                        <div className={item.players.length === 2 ? 'games-list-disabled' : 'games-list-active'} key={item._id} onClick={() => addUserToGame(item._id)}>
                            <Card text="center">
                                <Card.Header>{item.status}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                </Card.Body>
                                <Card.Footer text="muted">{item.players.length} users</Card.Footer>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : null}
            { visibleGames.length !== games.length ? (<Button primary onClick={moreRooms}>Show more</Button>) : null}
        </div>
    )
}

export default HomeCabinet;
