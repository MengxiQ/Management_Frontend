import {request} from "@/network/request";

export function getNetEquipList() {
  const config = {
    url:"/NetworkEquipment/NetEquip",
    method:"get"
  };
  return request(config)
}
export function finAllstatus_type() {
  const config = {
    url:"/NetworkEquipment/status_type",
    method:"get"
  };
  return request(config)
}
export function deleteStatus(neid,status_name) {
  const config ={
    url:"/NetworkEquipment/nEstatus",
    method:"delete",
    params:{
      neid,
      status_name
    }
  }
  return request(config)

}
export function addStatus(data) {
  const config ={
    url:"/NetworkEquipment/nEstatus",
    method:"post",
    data
  }
  return request(config)
}
export function updateStatus(data) {
  const config = {
    url:'/NetworkEquipment/nEstatus',
    method:'put',
    data
  }
  return request(config)
}
