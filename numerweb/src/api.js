import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.56.100:8000/api',
})

export const getbisection = () => api.get(`/bisections/`)
export const getfalseposition = () => api.get(`/falsepositions/`)
export const getonepoint = () => api.get(`/onepoints/`)
export const getnewton = () => api.get(`/newtons/`)
export const getsecant = () => api.get(`/secants/`)
export const getcramer = () => api.get(`/cramers/`)
export const getinterpo = () => api.get(`/interpos/`)
export const getinter = () => api.get(`/inters/`)
export const getdiff = () => api.get(`/diffs/`)
export const getpolyreg = () => api.get(`/polyregs/`)
const apis = {
    getbisection,
    getfalseposition,
    getonepoint,
    getnewton,
    getsecant,
    getcramer,
    getinterpo,
    getinter,
    getdiff,
    getpolyreg,
    
};

export default apis