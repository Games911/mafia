import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/layout/Header';
import Signin from './components/auth/signin/Signin';
import Signup from './components/auth/signup/Signup';
import Home from './components/home/Home';
import HomeCabinet from './components/cabinet/home/HomeCabinet';
import { Container, Row, Col } from 'bootstrap-4-react';
import { useDispatch, useSelector } from 'react-redux';
import GuardedRoute from './guards/GuardedRoute';
import { getToken } from './redux/actions/auth/tokenAction';
import { io } from 'socket.io-client';
import CreateGame from './components/cabinet/create-game/create-game';
import Game from "./components/cabinet/game/game";

const socket = io("http://localhost:8888");
socket.on("connect", () => {
    localStorage.setItem('socketId', socket.id);
});

function App() {
    const dispatch = useDispatch();
    const countUser = 3;
    const { token } = useSelector(state => state.token);
    useEffect(() => {
        dispatch(getToken());
    }, [token]);

    return (
      <BrowserRouter>
      <div className="App">
        <Header token={token}/>
        <main>
            <Container>
                <Row>
                    <Col>
                        <Switch>
                            <GuardedRoute path='/cabinet/game/:id' component={Game} auth={token} socket={socket} countUser={countUser} />
                            <GuardedRoute path='/cabinet/create-game' component={CreateGame} auth={token} socket={socket} />
                            <GuardedRoute path='/cabinet' component={HomeCabinet} auth={token} socket={socket} countUser={countUser} />
                            <Route path="/signin">
                                <Signin />
                            </Route>
                            <Route path="/signup">
                                <Signup />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </main>
      </div>
      </BrowserRouter>
    );
}

export default App;
