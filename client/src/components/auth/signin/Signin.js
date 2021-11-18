import React, { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { Form, Button } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import './Signin.css';
import * as types from '../../../redux/types/auth/authType';
import {
    nicknameValidate,
    passwordValidate,
    signin
} from '../../../redux/actions/auth/authAction';
import { useHistory } from 'react-router-dom';

const Signin = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const {
        nickname,
        password,
        errorsNickname,
        errorsPassword,
        changedNickname,
        changedPassword,
        apiSuccessMessage,
        apiErrorMessage
    } = useSelector(state => state.auth);
    const { token } = useSelector(state => state.token);

    useEffect(() => {
        dispatch({
            type: types.AUTH_RESET_FORM,
            message: '',
        });
        if (token) {
            history.push('/cabinet');
        }
    }, [token]);

    const isValid = () => {
        if (changedNickname && changedPassword && errorsNickname.length === 0 && errorsPassword.length === 0) {
            return true;
        }
        return false;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(signin(nickname, password));
        dispatch({
            type: types.AUTH_RESET_FORM
        });
    };

    const onChangeNickname = (event) => {
        dispatch({type: types.AUTH_CHANGE_NICKNAME, nickname: event.target.value});
        dispatch(nicknameValidate(event.target.value));
    };
    const onChangePassword = (event) => {
        dispatch({type: types.AUTH_CHANGE_PASSWORD, password: event.target.value});
        dispatch(passwordValidate(event.target.value));
    };

    return (
        <div>
            <h1>Signin</h1>

            {apiSuccessMessage ? (
                <div className="alert alert-success" role="alert">
                    <p>{apiSuccessMessage}</p>
                </div>
            ): null}

            {apiErrorMessage ? (
                <div className="alert alert-danger" role="alert">
                    <p>{apiErrorMessage}</p>
                </div>
            ): null}

            <Form type="POST" onSubmit={onSubmit} action="#">
                <Form.Group>
                    <label htmlFor="signinNickname">Nickname</label>
                    <Form.Input
                        name="nickname"
                        type="text"
                        id="signinNickname"
                        placeholder="Enter nickname"
                        value={nickname}
                        onFocus={onChangeNickname}
                        onChange={onChangeNickname}
                        className={errorsNickname && errorsNickname.length > 0 ? 'input-error' : ''}
                    />
                    {errorsNickname && errorsNickname.length > 0 ? (
                        <div>
                            {errorsNickname.map(item => (
                                <Form.Text className="error-message" key={item}>{item}</Form.Text>
                            ))}
                        </div>
                    ) : null}
                </Form.Group>
                <Form.Group>
                    <label htmlFor="signinPassword">Password</label>
                    <Form.Input
                        name="password"
                        type="password"
                        id="signinPassword"
                        placeholder="Password"
                        value={password}
                        onFocus={onChangePassword}
                        onChange={onChangePassword}
                        className={errorsPassword && errorsPassword.length > 0 ? 'input-error' : ''}
                    />
                    {errorsPassword && errorsPassword.length > 0 ? (
                        <div>
                            {errorsPassword.map(item => (
                                <Form.Text className="error-message" key={item}>{item}</Form.Text>
                            ))}
                        </div>
                    ) : null}
                </Form.Group>
                <Button primary type="submit" disabled={!isValid()}>Submit</Button>
                <div className="refer-signup">
                    <Form.Text text="muted">If you haven't registered, please do it.<Link to="/signup">Signup</Link></Form.Text>
                </div>
            </Form>
        </div>
    )
}

export default Signin;
