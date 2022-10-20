import React from 'react';
import {Route, Switch} from "react-router-dom";
import {routes} from "./index";

const AppRouter = () => {
    return (
        <Switch>
            {routes.map(route =>
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
        </Switch>
    );
};

export default AppRouter;