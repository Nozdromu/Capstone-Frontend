import axios from "axios";
import { FormGroup } from 'react-bootstrap';

export default function Api() {
    var axiosApi = axios;
    axiosApi.defaults.xsrfCookieName = 'csrftoken';
    axiosApi.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    var DjangoApi = {

    }
    /**
     * @param {data type of data} param name - description of param.
     */
    var user_register = async (email, password, re_password) => {
        return axiosApi.post('/users/register', { email: email, password: password, re_password: re_password })
    }

    var user_login = async (email, password) => {
        return axiosApi.post('/users/login', {email: email, password: password})
    }
    var user_logout = async () => {
        return axiosApi.post('/users/logout', {})
    }
    /**
     * @param {data type of data} param name - description of param.
     */
    var user_change = async (data) => {
        return axiosApi.put('/users/', {})

    }

    var listings_create = async () => {
        return axiosApi.post('/users/', {})
    }

    var listings_delete = async () => {
        return axiosApi.delete('/users/', {})
    }

    var listings_update = async () => {
        return axiosApi.post('/users/', {})
    }

    var listings_read = async () => {
        return axiosApi.get('/users/', {})
    }

    var item_read = async (listPK, itemPK) => {

    }

    var item_create = async (newitem) => {

    }

    var item_delete = async (listPK, itemPK) => {

    }
    var item_update = async (item) => {

    }
///////////////////////////////////////////////////////////////////////
// test api
    var getdata=async()=>{
        return axiosApi.get('/getdata')
    }

    var testlogin=async(data)=>{
        return axiosApi.get('/login',data)
    }
    var testlogout=async()=>{
        return axiosApi.get('/logout')
    }

    var Api = {
        user: {
            register: user_register,
            signin: user_login,
            signout: user_logout,
            update: user_change
        },
        listing: {
            create: listings_create,
            update: listings_update,
            delete: listings_delete,
            get: listings_read
        },
        item: {
            create: item_create,
            update: item_update,
            delete: item_delete,
            get: item_read
        },
        test:{
            getlodingdata:getdata,
            login:testlogin,
            logout:testlogout
        }
    }

    return Api;
}