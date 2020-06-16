import {request} from "@/network/request";

export function getEmplist() {
  const config ={
    url:'/emp',
    method:"get"
  };

  return request(config);
}
// http://localhost:8081/department
export function getDepartment() {
  const config = {
    url:"department",
    method:"get"
  }
  return request(config);
}
export function Emp(method,data) {
  //post:添加
  //put:修改
  const config = {
    url:'/emp',
    method,
    data
  }
  return request(config)
}
export function deleteEmp(id) {
  const config = {
    url:'/emp/'+id,
    method:"delete",
  }
  return request(config);
}
0