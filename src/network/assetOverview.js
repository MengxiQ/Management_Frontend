import {request} from "./request";

export function getTypeOverview() {
    const config = {
        url:"/NetworkEquipment/typeOverview",
        method:"get"
    };
    return request(config)
}