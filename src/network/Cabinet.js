import {request} from "./request";

export function getCabines() {
    const config  = {
        url :"/CabinetList/Cabinet",
        method:"get"
    }
    return request(config);
}
//返回地址树
export function getSpanningTree() {
    const config  = {
        url :"/CabinetList/SpanningTree",
        method:"get"
    }
    return request(config);
}
