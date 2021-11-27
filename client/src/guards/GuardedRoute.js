import React from 'react';
import { Route } from "react-router-dom";
import NotAllowed from "../components/home/NotAllowed";


const GuardedRoute = ({ component: Component, auth, socket, countUser }) => {

    return (
        <Route render={() => (
            auth !== null
                ? <Component socket={socket} countUser={countUser}/>
                : <NotAllowed />
                )
        }/>
    );

};

export default GuardedRoute;
