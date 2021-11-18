import React, { useEffect } from 'react';
import { Button, Form } from 'bootstrap-4-react';
import * as types from '../../../redux/types/auth/authType';
import { useDispatch, useSelector } from 'react-redux';
import { emailValidate, nicknameValidate, passwordValidate, signup } from '../../../redux/actions/auth/authAction';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const {
        email,
        nickname,
        password,
        errorsEmail,
        errorsNickname,
        errorsPassword,
        changedEmail,
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

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(signup(email, nickname, password));
        dispatch({
            type: types.AUTH_RESET_FORM
        });
    };

    const isValid = () => {
        if (changedNickname && changedPassword && changedEmail && errorsNickname.length === 0 && errorsPassword.length === 0 && errorsEmail.length === 0) {
            return true;
        }
        return false;
    }

    const onChangeEmail = (event) => {
        dispatch({type: types.AUTH_CHANGE_EMAIL, email: event.target.value});
        dispatch(emailValidate(event.target.value));
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
            <h1>Signup</h1>

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
                    <label htmlFor="signinEmail">Email address</label>
                    <Form.Input
                        name="email"
                        type="text"
                        id="signinEmail"
                        placeholder="Enter email"
                        value={email}
                        onFocus={onChangeEmail}
                        onChange={onChangeEmail}
                        className={errorsEmail && errorsEmail.length > 0 ? 'input-error' : ''}
                    />
                    {errorsEmail && errorsEmail.length > 0 ? (
                        <div>
                            {errorsEmail.map(item => (
                                <Form.Text className="error-message" key={item}>{item}</Form.Text>
                            ))}
                        </div>
                    ) : null}

                </Form.Group>
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
            </Form>
        </div>
    )
}

export default Signup;
