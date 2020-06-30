import {request} from "@/network/request";

export function addNEtype(data) {
  const config = {
    url:"/AssetType/NEtype",
    method:'post',
    data
  }
  return request(config)
}

export function deleteNEtype(tid) {
  const config = {
    url:"/AssetType/NEtype",
    method:'delete',
    params:{
      tid
    }
  }
  return request(config)

}
export function updateNEtype(data) {
  const config = {
    url:"/AssetType/NEtype",
    method:'put',
    data
  }
  return request(config)

}
/**
 * 状态类型
 * */
export function findAllStatus_type(data) {
  const config = {
    url:"/AssetType/status_type",
    method:'get',
    data
  }
  return request(config)
}
export function addStatus_type(data) {
  const config = {
    url:"/AssetType/status_type",
    method:'post',
    data
  }
  return request(config)
}

export function deleteStatus_type(status_id) {
  const config = {
    url:"/AssetType/status_type",
    method:'delete',
    params:{
      status_id
    }
  }
  return request(config)

}
export function updateStatus_type(data) {
  const config = {
    url:"/AssetType/status_type",
    method:'put',
    data
  }
  return request(config)

}