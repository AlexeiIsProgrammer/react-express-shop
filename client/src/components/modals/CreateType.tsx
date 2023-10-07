import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/deviceAPI";
import {useState} from "react";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState("");
    const addType = () => {
        createType({name: value}).then(() => {
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
                    <Modal.Title>Add new type</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Control
                            placeholder="Write type name"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={addType}
                        variant="primary">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
};

export default CreateType;
