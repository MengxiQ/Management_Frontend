import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL:'http://localhost:8082',
    timeout:60000
  })
  return instance(config);
}
