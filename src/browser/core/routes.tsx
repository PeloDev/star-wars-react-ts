import React from 'react';
import {
    StaticRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Main from "../pages/MainPage";
import NotFound from "../pages/NotFoundPage";

interface IRoute {
    layout: any,
    subRoutes: Array<any>
}

export default function Routes() {
    const routes: Array<IRoute> = [
        {
            layout: Main,
            subRoutes: [
                {
                    exact: true,
                    path: "/",
                    component: Main
                },
            ]
        }
    ];

    return (
        <Router>
            <Switch>
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        exact={route.subRoutes.some((r) => r.exact)}
                        path={route.subRoutes.map((r) => r.path)}
                    >
                        <route.layout>
                            {route.subRoutes.map((subRoute, i) => (
                                <Route key={i} {...subRoute} />
                            ))}
                        </route.layout>
                    </Route>
                ))}
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}