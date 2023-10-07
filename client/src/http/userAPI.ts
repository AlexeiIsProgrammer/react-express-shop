import {$authHost, $host} from ".";

import jwt_decode from "jwt-decode";
import {UserType} from "../store/UserStore";

export const registration = async (email: string, password: string): Promise<UserType> => {
    const {data} = await $host.post("api/user/registration", {email, password, role: "ADMIN"});
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
export const login = async (email: string, password: string): Promise<UserType> => {
    const {data} = await $host.post("api/user/login", {email, password});
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
export const check = async (): Promise<UserType> => {
    const {data} = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
