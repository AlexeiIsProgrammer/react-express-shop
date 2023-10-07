import {makeAutoObservable} from "mobx";

export type UserType = {
    id: number;
    email: string;
    role: string;
    exp: number;
    iat: number;
} | null;

export default class UserStore {
    private isAuth: boolean;
    private user: UserType;

    constructor() {
        this.isAuth = false;
        this.user = null;
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean) {
        this.isAuth = bool;
    }
    setUser(user: UserType) {
        this.user = user;
    }

    get IsAuth() {
        return this.isAuth;
    }
    get User() {
        return this.user;
    }
}
