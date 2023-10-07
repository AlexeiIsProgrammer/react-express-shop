import {useContext} from "react";
import {Navigate, Outlet} from "react-router";
import {LOGIN_ROUTE} from "../constants";
import {Context} from "..";

export default function AuthRoute() {
    const {user} = useContext(Context);

    return user.IsAuth ? <Outlet /> : <Navigate to={LOGIN_ROUTE} />;
}
