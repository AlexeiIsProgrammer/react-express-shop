import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Card, Stack} from "react-bootstrap";
import {Context} from "..";

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    return (
        <Stack
            className="flex-wrap"
            direction="horizontal"
            gap={1}>
            {device.Brands.map((brand) => (
                <Card
                    style={{cursor: "pointer"}}
                    border={brand.id === device.SelectedBrand?.id ? "danger" : "light"}
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                    className="p-3">
                    {brand.name}
                </Card>
            ))}
        </Stack>
    );
});

export default BrandBar;
