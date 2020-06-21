import {request} from "@/network/request";

export function getNetEquipList() {
  const config = {
    url:"/NetworkEquipment/NetEquip",
    method:"get"
  };
  return request(config)
}
// export function updateNetworkEquipment(data) {
//   const config = {
//     url:"/NetworkEquipment/NetEquip",
//     method:"put",
//     data
//   }
//   return request(config)
// }

//添加设备 || 删除设备
// put:更新，post：添加
export function NetworkEquipmentAction(data,action) {
  const config = {
    url:"/NetworkEquipment/NetEquip",
    method:action,
    data
  }
  console.log(config)
  return request(config);
}
//
export function deleteNetworkEquipment(neid) {
  const config ={
    url:"/NetworkEquipment/NetEquip",
    method:"delete",
    params:{
      neid
    }
  }
  return request(config)

}

/**
 * 设备状态相关
 * */
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

// 获取所有的设备状态
export function getAllNEtype() {
  const config = {
    url:'/NetworkEquipment/NEtype',
    method:'get'
  }
  return request(config)
}