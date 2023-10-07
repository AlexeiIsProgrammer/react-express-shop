import {useContext, useState} from "react";
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../constants";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "..";
import {UserType} from "../store/UserStore";

const Auth = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const click = async () => {
        try {
            let data: UserType;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            console.log("user", data);

            user.setUser(data);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card
                style={{width: 600}}
                className="p-5">
                <h2 className="m-auto">{isLogin ? "Authorization" : "Registation"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-3"
                        placeholder="Write your email"
                    />
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-3"
                        placeholder="Write your password"
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? (
                            <div>
                                Don't have account ? <NavLink to={REGISTRATION_ROUTE}>Register now</NavLink>
                            </div>
                        ) : (
                            <div>
                                Have an account ? <NavLink to={LOGIN_ROUTE}>Join now</NavLink>
                            </div>
                        )}
                        <Button
                            onClick={click}
                            variant={"outline-success"}>
                            {isLogin ? "Join" : "Register"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
