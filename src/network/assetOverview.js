import {request} from "./request";

export function getTypeOverview() {
    const config = {
        url:"/NetworkEquipment/typeOverview",
        method:"get"
    };
    return request(config)
}
export  function getTypeStatusCount() {
    const config = {
        url:"/NetworkEquipment/TypeStatusCount",
        method:"get"
    };
    return request(config)
}