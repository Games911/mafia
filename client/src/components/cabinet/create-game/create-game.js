import React, {useEffect} from 'react';
import { Form, Button, Breadcrumb } from 'bootstrap-4-react';
import * as types from "../../../redux/types/game/create-game-type";
import {createRoom, nameValidate} from "../../../redux/actions/game/create-game-action";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../../redux/actions/auth/userInfoAction";
import {Link, useHistory} from "react-router-dom";


const CreateGame = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const {
        gameId,
        name,
        errorsName,
        changedName,
        apiErrorMessage
    } = useSelector(state => state.createGameReducer);
    const { userId } = useSelector(state => state.userInfoReducer);
    const {token} = useSelector(state => state.token);

    useEffect(() => {
        dispatch(getUserData());
        if (gameId !== null) {
            history.push('/cabinet/game/' + gameId);
        }
    }, [userId, gameId]);

    const isValid = () => {
        if (changedName && errorsName.length === 0) {
            return true;
        }
        return false;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(createRoom(name, userId, token, props.socket));
        dispatch({
            type: types.CREATE_GAME_RESET_FORM
        });
    };

    const onChangeName = (event) => {
        dispatch({type: types.CREATE_GAME_CHANGE_NAME, name: event.target.value});
        dispatch(nameValidate(event.target.value));
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/cabinet/">Cabinet</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active aria-current="page">Create room</Breadcrumb.Item>
                </Breadcrumb>
            </nav>

            {apiErrorMessage ? (
                <div className="alert alert-danger" role="alert">
                <p>{apiErrorMessage}</p>
                </div>
            ): null}

            <Form type="POST" onSubmit={onSubmit} action="#">
                <Form.Group>
                    <label htmlFor="createRoomName">Name</label>
                    <Form.Input
                        name="name"
                        type="text"
                        id="createRoomName"
                        placeholder="Enter name"
                        value={name}
                        onFocus={onChangeName}
                        onChange={onChangeName}
                        className={errorsName && errorsName.length > 0 ? 'input-error' : ''}
                        />
                        {errorsName && errorsName.length > 0 ? (
                            <div>
                                {errorsName.map(item => (
                                        <Form.Text className="error-message" key={item}>{item}</Form.Text>
                        ))}
                            </div>
                        ) : null}
                </Form.Group>
                <Button primary type="submit" disabled={!isValid()}>Submit</Button>
            </Form>
    </div>
    )
}

export default CreateGame;
