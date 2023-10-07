import {observer} from "mobx-react-lite";
import React from "react";
import {Context} from "..";
import {useContext} from "react";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {device} = useContext(Context);

    const pageCount = Math.ceil(device.TotalCount / device.Limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination>
            {pages.map((page) => (
                <Pagination.Item
                    key={page}
                    active={device.Page === page}
                    onClick={() => device.setPage(page)}>
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    );
});

export default Pages;
