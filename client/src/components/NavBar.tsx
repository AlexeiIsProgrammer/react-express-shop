import {useContext} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Context} from "..";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../constants";
import {Button, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser(null);
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
    };

    return (
        <Navbar
            bg="dark"
            variant="dark">
            <Container>
                <NavLink
                    style={{color: "white"}}
                    to={SHOP_ROUTE}>
                    Express Shop
                </NavLink>
                {user.IsAuth ? (
                    <Nav
                        className="ml-auto"
                        style={{color: "white"}}>
                        <Button
                            onClick={() => navigate(ADMIN_ROUTE)}
                            variant={"outline-light"}>
                            Admin Panel
                        </Button>
                        <Button
                            onClick={() => logOut()}
                            variant={"outline-light"}
                            className="ml-2">
                            Exit
                        </Button>
                    </Nav>
                ) : (
                    <Nav
                        className="ml-auto"
                        style={{color: "white"}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(LOGIN_ROUTE)}>
                            Login
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
