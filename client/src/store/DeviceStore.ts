import {makeAutoObservable} from "mobx";

export type TypesType = {
    id: number;
    name: string;
};
export type BrandsType = {
    id: number;
    name: string;
};
export type DevicesType = {
    id: number;
    name: string;
    price: number;
    rating: number;
    img: string;
};

export default class DeviceStore {
    private types: TypesType[];
    private brands: BrandsType[];
    private devices: DevicesType[];

    private selectedType: TypesType | null;
    private selectedBrand: BrandsType | null;

    private page: number;
    private totalCount: number;
    private limit: number;

    constructor() {
        this.types = [];
        this.brands = [];
        this.devices = [];
        this.selectedType = null;
        this.selectedBrand = null;

        this.page = 0;
        this.totalCount = 0;
        this.limit = 3;

        makeAutoObservable(this);
    }

    setTypes(types: TypesType[]) {
        this.types = types;
    }
    setBrands(brands: BrandsType[]) {
        this.brands = brands;
    }
    setDevices(devices: DevicesType[]) {
        this.devices = devices;
    }
    setSelectedType(selectedType: TypesType) {
        this.setPage(1);
        this.selectedType = selectedType;
    }
    setSelectedBrand(selectedBrand: BrandsType) {
        this.setPage(1);
        this.selectedBrand = selectedBrand;
    }
    setPage(page: number) {
        this.page = page;
    }
    setTotalCount(totalCount: number) {
        this.totalCount = totalCount;
    }
    setLimit(limit: number) {
        this.limit = limit;
    }

    get Types() {
        return this.types;
    }
    get Brands() {
        return this.brands;
    }
    get Devices() {
        return this.devices;
    }
    get SelectedType() {
        return this.selectedType;
    }
    get SelectedBrand() {
        return this.selectedBrand;
    }
    get Page() {
        return this.page;
    }
    get TotalCount() {
        return this.totalCount;
    }
    get Limit() {
        return this.limit;
    }
}
