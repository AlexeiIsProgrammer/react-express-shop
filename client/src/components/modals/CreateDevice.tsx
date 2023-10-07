import React, {useContext, useEffect, useState} from "react";
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../..";
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {DevicesType} from "../../store/DeviceStore";

type InfoType = {
    title: string;
    description: string;
    number: number;
};

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

    const [info, setInfo] = useState<InfoType[]>([]);

    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data));
        fetchBrands().then((data) => device.setBrands(data));
    }, []);

    const addInfoHandle = () => {
        setInfo([...info, {title: "", description: "", number: Date.now()}]);
    };
    const removeInfoHandle = (number: number) => {
        setInfo(info.filter((item) => item.number !== number));
    };

    const changeInfo = (key: string, value: string, number: number) => {
        setInfo(info.map((item) => (item.number === number ? {...item, [key]: value} : item)));
    };

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const addDevice = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", `${price}`);
        if (file) formData.append("img", file);
        if (device.SelectedBrand !== null) formData.append("brandId", `${device.SelectedBrand.id}`);
        if (device.SelectedType !== null) formData.append("typeId", `${device.SelectedType.id}`);
        formData.append("info", JSON.stringify(info));
        createDevice(formData).then(() => onHide());
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add new device</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle>{device.SelectedType?.name || "Choose the type"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.Types.map((type) => (
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedType(type)}
                                        key={type.id}>
                                        {type.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle>{device.SelectedBrand?.name || "Choose the brand"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.Brands.map((brand) => (
                                    <Dropdown.Item
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}>
                                        {brand.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            className="mt-3"
                            placeholder="Write device name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Write device cost"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(+e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            type="file"
                            onChange={selectFile}
                        />
                        <hr />
                        <Button
                            style={{width: "100%"}}
                            variant="outline-dark"
                            onClick={addInfoHandle}>
                            Add new device
                        </Button>
                        {info.map((item) => (
                            <Row
                                key={item.number}
                                style={{marginTop: "10px"}}>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Write device name"
                                        value={item.title}
                                        onChange={(e) => changeInfo("title", e.target.value, item.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Write device description"
                                        value={item.description}
                                        onChange={(e) => changeInfo("description", e.target.value, item.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant={"outline-dark"}
                                        onClick={() => removeInfoHandle(item.number)}>
                                        Remove device
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={addDevice}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
});

export default CreateDevice;
