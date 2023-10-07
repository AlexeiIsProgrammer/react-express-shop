import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "..";
import {useContext, useEffect} from "react";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
        console.log("effect 1");
        fetchTypes().then((data) => device.setTypes(data));
        fetchBrands().then((data) => device.setBrands(data));
        fetchDevices(null, null, 1, 2).then((data) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, []);

    useEffect(() => {
        console.log("effect 2", device.Page, device.SelectedType?.id, device.SelectedBrand?.id);

        fetchDevices(device.SelectedType?.id, device.SelectedBrand?.id, device.Page || 1, 2).then((data) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.Page, device.SelectedType, device.SelectedBrand]);
    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
