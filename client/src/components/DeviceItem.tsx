import React from "react";
import {Card, Col, Image} from "react-bootstrap";
import {DevicesType} from "../store/DeviceStore";
import {FaStar} from "react-icons/fa";
import {DEVICE_ROUTE} from "../constants";
import {useNavigate} from "react-router-dom";

type DeviceType = {
    device: DevicesType;
};

const DeviceItem = ({device}: DeviceType) => {
    const navigate = useNavigate();
    return (
        <Col
            onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
            md={3}
            className="mt-3">
            <Card
                style={{width: 150, cursor: "pointer"}}
                border={"light"}>
                <Image
                    width={150}
                    height={150}
                    src={import.meta.env.VITE_REACT_APP_API_URL + device.img}
                />
                <div className="d-flex justify-content-between align-items-center">
                    <div style={{color: "gray"}}>Phone</div>
                    <div className="d-flex align-items-center">
                        {device.rating}
                        <FaStar />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
