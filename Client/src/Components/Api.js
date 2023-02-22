import axios from "axios";

var Api = (function Api() {
    var axiosApi = axios;
    axiosApi.defaults.xsrfCookieName = 'csrftoken';
    axiosApi.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    var test_server = true;

    /**
     * @param {data type of data} param name - description of param.
     */
    var user_register = async (data, callback) => {
        return axiosApi.post('/users/register/', data).then(res => { callback(res) })
    }

    var user_login = async (data, callback) => {
        return axiosApi.post('/users/login/', data).then(res => {
            if (res.data.status === "success")
                axiosApi.get('/users/' + res.data.user.id + '/').then(res => { callback(res) })
        })
    }
    var user_logout = async (callback) => {
        return axiosApi.post('/users/logout/').then(res => { callback(res) })
    }
    /**
     * @param {data type of data} param User-.
     */
    var user_change = async (USer) => {
        return axiosApi.put('/users/', {})
    }

    var user_read = async (pk, callback) => {
        return axiosApi.get('/users/' + pk + '/').then(res => callback(res));
    }


    ////////////////////////////////////////////////////
    // listings
    var listings_create = async (data, callback) => {
        return axiosApi.post('/listings/create/', data).then(res => { callback(res) })
    }

    var listings_delete = async (listingsPK, callback) => {
        return axiosApi.delete('/listings/' + listingsPK + '/delete').then(res => callback(res))
    }

    var listings_update = async (data, callback) => {

        return axiosApi.put('/listings/' + data.id + '/update/', data).then(res => callback(res))
    }

    var listings_read = async (_owner, callback) => {
        var data = {
            owner: _owner
        }
        return axiosApi.post('/listings/owner/', data).then(res => callback(res));
    }


    ////////////////////////////////////////////////////
    // item
    var item_read = async (listPK, itemPK) => {

    }

    var item_create = async (_item, listingspk, callback) => {
        return axiosApi.post('/listings/' + listingspk + '/createitem', _item).then(res => callback(res))
    }

    var item_delete = async (listingspk, itempk, callback) => {
        return axiosApi.delete('/listings/' + listingspk + '/' + itempk + '/delete')
    }
    var item_update = async (item, listingspk, itempk) => {
        // var data = {
        //     name: _item.name,
        //     description: _item.description,
        //     quantity: _item.quantity,
        //     price: _item.price
        // }
        return axiosApi.put('/listings/' + listingspk + '/' + itempk + '/update/', item)
    }


    /////////////////////////////////////////////

    var _getlist = async (callback) => {
        return axiosApi.get('/data/listings').then(res => { callback(res) })
    }

    var _getitems = (callback) => {
        return axiosApi.get('/data/items').then(res => { callback(res) })
    }

    var _getuser = (callback) => {
        return axiosApi.get('/users/').then(res => callback(res))
    }

    var _checklogin = (callback) => {
        return axiosApi.get('/users/authenticated/').then(res => {
            if (res.data.isAuthenticated === 'success')
                axiosApi.get('/users/' + res.data.user.id + '/').then(res => { callback(res) })
        })
    }




    ///////////////////////////////////////////////////////////////////////
    // test api
    var getdata = async () => {
        return axiosApi.get('/getdata')
    }
    // test user api
    var test_login = async (data, callback) => {
        return axiosApi.get('/user/login', { params: data }).then(res => callback(res))
    }
    var test_logout = async (callback) => {
        return axiosApi.get('/user/logout').then(res => callback(res))
    }
    var test_register = async (data, callback) => {
        return axiosApi.get('/user/register', { params: data }).then(res => callback(res))
    }
    var test_user_edit = async (data, callback) => {
        return axiosApi.get('/user/edit', { params: data }).then(res => callback(res))
    }

    var test_user_read = async (callback) => {
        return axiosApi.get('/user/read').then(res => callback(res))
    }
    // test listing api
    var test_listing_create = async (data, callback) => {
        return axiosApi.get('/listing/create', { params: data }).then(res => callback(res))
    }
    var test_listing_update = async (data, callback) => {
        return axiosApi.get('/listing/edit', { params: data }).then(res => callback(res))
    }
    var test_listing_delete = async (data, callback) => {
        return axiosApi.get('/listing/delete', { params: data }).then(res => callback(res))
    }
    var test_listing_read = async (data, callback) => {
        return axiosApi.get('/listing/read', { params: data }).then(res => callback(res))
    }
    var test_listing_owner = async (callback) => {
        return axiosApi.get('/listing/owner').then(res => callback(res))
    }
    // test item api
    var test_item_create = async (data, callback) => {
        return axiosApi.get('/item/create', { params: data }).then(res => callback(res))
    }
    var test_item_update = async (data, callback) => {
        return axiosApi.get('/item/edit', { params: data }).then(res => callback(res))
    }
    var test_item_delete = async (data, callback) => {
        return axiosApi.get('/item/delete', { params: data }).then(res => callback(res))
    }
    var test_item_read = async (data, callback) => {
        return axiosApi.get('/item/read', { params: data }).then(res => callback(res))
    }
    var test_item_list = async (data, callback) => {
        return axiosApi.get('/item/listing', { params: data }).then(res => callback(res))
    }

    // test chat api

    var test_chat_startchat = async (user, callback) => {
        return axios.get('/create_room', { params: { user } }).then(res => callback(res))
    }

    ////////////////////////////////////////////////////////////////////////
    // map
    var getgeo = async (path, data, callback) => {
        return axiosApi.get(path, { params: data }).then(res => { callback(res) })
    }

    /////////////////////////////////////////////////////////////////////
    var Api = {
        testserver: true,
        user: {
            checklogin: test_server ? test_user_read : _checklogin,
            register: test_server ? test_register : user_register,
            sign_in: test_server ? test_login : user_login,
            sign_out: test_server ? test_logout : user_logout,
            update: test_server ? test_user_edit : user_change,
            get: test_server ? test_user_read : user_read
        },
        listing: {
            create: test_server ? test_listing_create : listings_create,
            update: test_server ? test_listing_update : listings_update,
            delete: test_server ? test_listing_delete : listings_delete,
            getbyowner: test_server ? test_listing_owner : listings_read
        },
        item: {
            create: test_server ? test_item_create : item_create,
            update: test_server ? test_item_update : item_update,
            delete: test_server ? test_item_delete : item_delete,
            get: test_server ? test_item_read : item_read,
            bylisting: test_server ? test_item_list : {},
        },
        // data: {
        //     getlist: test_server ? _getlist,
        //     getitems: test_server ? _getitems,
        //     getuser: test_server ? _getuser,
        //     checklogin: test_server ? _checklogin
        // },
        data: {
            getlodingdata: getdata,
        },
        map: {
            getgeo: getgeo
        },
        chat: {
            startchat: test_chat_startchat
        }
    }

    return Api;
})()

export default Api;