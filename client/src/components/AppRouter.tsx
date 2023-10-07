import {authRoutes, publicRoutes} from "../routes";
import {Route, Routes} from "react-router-dom";
import AuthRoute from "./auth-route";
import PublicRoute from "./public-route";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<AuthRoute />}>
                {authRoutes.map(({path, Component}) => (
                    <Route
                        key={path}
                        path={path}
                        element={<Component />}
                    />
                ))}
            </Route>
            <Route element={<PublicRoute />}>
                {publicRoutes.map(({path, Component}) => (
                    <Route
                        key={path}
                        path={path}
                        element={<Component />}
                    />
                ))}
            </Route>
            <Route
                path="/*"
                element={<h1>Not founded</h1>}
            />
        </Routes>
    );
}
