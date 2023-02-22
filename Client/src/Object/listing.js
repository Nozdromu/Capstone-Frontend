

export default class Listing {
    constructor(server) {
        this.Id = 0;    //
        this.Title = '';    //
        this.Description = '';  //
        this.Location = ''; //
        this.Date = ''; //
        this.Starttime = '';    //
        this.Endtime = '';  //
        this.Zip_code = ''; //
        this.Theme = '';
        this.Owner = '';    //
        this.Lat = '';  //
        this.Lng = '';  //
        this.Photo = '';    //
        this.Isdelete = 0;  //
        this.Servertype = server;
    }
    get jsonfile() {
        return this.Servertype ?
            {
                "gsid": this.Id,
                "uid": this.Owner,
                "title": this.Title,
                "description": this.Description,
                "location": this.Location,
                "lat": this.Lat,
                "lng": this.Lng,
                "zip_code": this.Zip_code,
                "starttime": this.Starttime,
                "endtime": this.Endtime,
                "isdelete": this.Isdelete,
                "image": this.Photo
            }
            :
            {
                "id": this.Id,
                "owner": this.Owner,
                "title": this.Title,
                "description": this.Description,
                "location": this.Location,
                "lat": this.Lat,
                "lng": this.Lng,
                "zip_code": this.Zip_code,
                "date": this.Date,
                "theme": this.Theme,
                "listing_main_photo": this.Photo
            }
    }
    ////////////////////////////////////
    // theme
    get theme() {
        return this.Theme;
    }
    set theme(theme) {
        this.Theme = theme;
    }
    ////////////////////////////////////

    ////////////////////////////////////
    // start end time

    get starttime() {
        return this.Starttime;
    }
    set starttime(starttime) {
        this.Starttime = starttime;
    }
    get endtime() {
        return this.Endtime;
    }
    set endtime(endtime) {
        this.Endtime = endtime;
    }

    ////////////////////////////////////

    ////////////////////////////////////
    // isdelete

    get isdelete() {
        return this.Isdelete;
    }
    set isdelete(isdelete) {
        this.Isdelete = isdelete;
    }

    ////////////////////////////////////

    ////////////////////////////////////
    // photo

    get image() {
        return this.Photo;
    }
    set image(image) {
        this.Photo = image;
    }
    get listing_main_photo() {
        return this.Photo;
    }
    set listing_main_photo(listing_main_photo) {
        this.Photo = listing_main_photo;
    }
    ////////////////////////////////////
    // zip code

    get zip_code() {
        return this.Zip_code;
    }
    set zip_code(zip_code) {
        this.Zip_code = zip_code;
    }

    ////////////////////////////////////

    ////////////////////////////////////
    // date
    get date() {
        return this.Date;
    }
    set date(date) {
        this.Date = date;
    }
    ////////////////////////////////////
    // owner

    get uid() {
        return this.Owner;
    }
    get owner() {
        return this.Owner;
    }
    set uid(uid) {
        this.Owner = uid;
    }
    set owner(owner) {
        this.Owner = owner;
    }

    ////////////////////////////////////

    ////////////////////////////////////
    // Id

    get listingid() {
        return this.Id;
    }
    get pk() {
        return this.Id;
    }
    get id() {
        return this.Id;
    }
    get gsid() {
        return this.Id;
    }
    set listingid(listingid) {
        this.Id = listingid;
    }
    set pk(pk) {
        this.Id = pk;
    }
    set id(id) {
        this.Id = id;
    }
    set gsid(gsid) {
        this.Id = gsid;
    }
    //////////////////////////////////

    //////////////////////////////////
    // title
    get title() {
        return this.Title;
    }
    get name() {
        return this.Title;
    }
    set title(title) {
        this.Title = title;
    }
    set name(name) {
        this.Title = name;
    }

    //////////////////////////////////

    //////////////////////////////////
    // Description

    get description() {
        return this.Description;
    }
    set description(description) {
        this.Description = description;
    }

    ///////////////////////////////////

    //////////////////////////////////
    // location 

    get location() {
        return this.Location;
    }

    set location(location) {
        this.Location = location;
    }

    //////////////////////////////////

    /////////////////////////////////
    // lat lng

    get lat() {
        return this.Lat;
    }

    get lng() {
        return this.Lng;
    }

    set lat(lat) {
        this.Lat = lat;
    }

    set lng(lng) {
        this.Lng = lng;
    }

    //////////////////////////////////
}