import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {createBrand} from "../../http/deviceAPI";
const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState("");
    const addBrand = () => {
        createBrand({name: value}).then(() => {
            setValue("");
            onHide();
        });
    };
    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add new brand</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Control
                            placeholder="Write type name"
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                        />
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={addBrand}
                        variant="primary">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
};

export default CreateBrand;
