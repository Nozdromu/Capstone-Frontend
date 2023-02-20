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
        return axiosApi.post('/users/login', { email: email, password: password })
    }
    var user_logout = async () => {
        return axiosApi.post('/users/logout', {})
    }
    /**
     * @param {data type of data} param User-.
     */
    var user_change = async (USer) => {
        return axiosApi.put('/users/', {})

    }
    ////////////////////////////////////////////////////
    // listings
    var listings_create = async (_data) => {
        var data = {
            title: _data.title,
            description: _data.description,
            location: _data.location,
            lat: _data.lat,
            lng: _data.lng
        }
        return axiosApi.post('/listings/create', data)
    }

    var listings_delete = async (listingsPK) => {
        return axiosApi.delete('/listings/' + listingsPK + '/delete')
    }

    var listings_update = async (_data) => {
        var data = {
            title: _data.title,
            description: _data.description,
            location: _data.location,
            lat: _data.lat,
            lng: _data.lng
        }
        return axiosApi.put('/listings/' + data.pk + '/update', {})
    }

    var listings_read = async () => {
        return axiosApi.get('/users/', {})
    }


    ////////////////////////////////////////////////////
    // item
    var item_read = async (listPK, itemPK) => {

    }

    var item_create = async (_item, listingspk) => {
        var data = {
            name: _item.name,
            description: _item.description,
            quantity: _item.quantity,
            price: _item.price
        }
        return axiosApi.post('/listings/' + listingspk + '/createitem', data)
    }

    var item_delete = async (listingspk, itempk) => {
        return axiosApi.delete('/listings/' + listingspk + '/' + itempk + '/delete')
    }
    var item_update = async (_item, listingspk, itempk) => {
        var data = {
            name: _item.name,
            description: _item.description,
            quantity: _item.quantity,
            price: _item.price
        }
        return axiosApi.put('/listings/' + listingspk + '/' + itempk + '/update', data)
    }


    /////////////////////////////////////////////

    var _getdata = () => {
        return axiosApi.get('/data')
    }






    ///////////////////////////////////////////////////////////////////////
    // test api
    var getdata = async () => {
        return axiosApi.get('/getdata')
    }

    var testlogin = async (data) => {
        return axiosApi.get('/login', data)
    }
    var testlogout = async () => {
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
        homepage:{
            getdata:_getdata
        },
        test: {
            getlodingdata: getdata,
            login: testlogin,
            logout: testlogout
        }
    }

    return Api;
}