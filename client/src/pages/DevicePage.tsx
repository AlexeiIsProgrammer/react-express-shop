import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {DevicesType} from "../store/DeviceStore";
import star from "../assets/star.png";
import {fetchDevice} from "../http/deviceAPI";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function DevicePage() {
    const [device, setDevice] = useState<DevicesType>({info: []});
    const {id} = useParams();
    useEffect(() => {
        fetchDevice(id).then((data) => setDevice(data));
    }, []);

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Image
                        width={300}
                        height={300}
                        src={import.meta.env.VITE_REACT_APP_API_URL + device.img}
                    />
                </Col>
                <Col md={4}>
                    <Row>
                        <h2>{device.name}</h2>
                        <div
                            style={{background: `url(${star}) no-repeat center center`, width: 240, height: 240, backgroundSize: "cover", fontSize: 40}}
                            className="d-flex align-items-center justify-content-center">
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        style={{width: 300, height: 300, fontSize: 32, border: "2px solid gray", borderRadius: 10}}
                        className="d-flex flex-column justify-content-around align-items-center">
                        <h3>{device.price}</h3>
                        <Button variant={"outline-dark"}>Add to cart</Button>
                    </Card>
                </Col>
            </Row>

            <Row>
                {device.info.map((info, index) => (
                    <Row
                        key={info.id}
                        style={{background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                ))}
            </Row>
        </Container>
    );
}
