
import { useState } from 'react';

var AllData = (function () {

    var _isLoaded=false;
    var item={};
    var list={};
    var t=[]
    var hook=0;

    var _load=(val)=>{
        item=val.data[0];
        list=val.data[2];
        _isLoaded=true;
        for(var i=hook;i<t.length;i++){
            t[i].apply();
            hook++;
        }
    }

    var afterupdata=(callback)=>{
        t.push(callback);
    }

    var getitem=()=>{
        return item;
    }

    var getlist=()=>{
        return list;
    }
    var isLoaded=()=>{
        return _isLoaded;
    }

    return {
        item:getitem,
        list:getlist,
        load:_load,
        isLoaded:isLoaded,
        addhook:afterupdata
    };
})()

export default AllData;