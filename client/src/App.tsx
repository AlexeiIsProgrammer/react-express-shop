import {useContext, useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from ".";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {UserType} from "./store/UserStore";

const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then((data: UserType) => {
                user.setUser(data);
                user.setIsAuth(true);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Spinner
                animation="grow"
                style={{margin: "auto"}}
            />
        );
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
