

class Listing {
    constructor(server) {
        this.Id = 0;
        this.Title = '';
        this.description = '';
        this.location = '';
        this.date = '';
        this.starttime = '';
        this.endtime = '';
        this.zip_code = '';
        this.theme = '';
        this.owner = '';
        this.lat = '';
        this.lng = '';
        this.photo = '';
        this.isdelete = 0;
        this.servertype = server;
    }
    ////////////////////////////////////
    // Id

    get listingid(){
        return this.Id;
    }
    get pk(){
        return this.Id;
    }
    get id(){
        return this.Id;
    }
    set listingid(listingid){
        this.Id=listingid;
    }
    set pk(pk){
        this.Id=pk;
    }
    set id(id){
        this.Id=id;
    }

    //////////////////////////////////
}