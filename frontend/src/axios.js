import axios from 'axios'

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_DATABASE,
})

export default instance
