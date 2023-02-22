

export default class User {
    constructor(user, server) {
        this.Username = user.username;  //
        this.Id = user.id || user.uid;  //
        this.First_name = user.first_name || user.firstname;
        this.Last_name = user.last_name || user.lastname;
        this.Phone_number = user.phone_number || user.phone;
        this.Email = user.email || '';
        this.Password = user.password || '';
        this.Address_line_1 = user.address_line_1 || '';
        this.Address_line_2 = user.address_line_2 || '';
        this.City = user.city || '';
        this.State = user.state || '';
        this.Zip_code = user.zip_code || ''
        this.Registertime = user.registertime || '';
        this.Profilepicture = user.profilepicture || '';
        this.servertype = server || false;
    }

    get json() {
        return this.servertype ? {
            uid: this.Id,
            firstname: this.First_name,
            lastname: this.Last_name,
            email: this.Email,
            phone: this.Phone_number,
            password: this.Password,
            registertime: this.Registertime,
            username: this.Username,
            profilepicture: this.Profilepicture
        } : {
            id: this.Id,
            username: this.Username,
            first_name: this.First_name,
            last_name: this.Last_name,
            email: this.Email,
            password: this.Password,
            address_line_1: this.Address_line_1,
            address_line_2: this.Address_line_2,
            city: this.City,
            state: this.State,
            zip_code: this.Zip_code,
            phone_number: this.Phone_number
        }
    }


    ////////////////////////////////////////////////////
    //

    // get() {
    //     return this.
    // }
    // set(val) {
    //     this.= val;
    // }

    ///////////////////////////////////////////////////


    ////////////////////////////////////////////////////
    //
    get email() {
        return this.Email
    }
    set email(val) {
        this.Email = val;
    }

    get password() {
        return this.Password
    }
    set password(val) {
        this.Password = val;
    }

    get address_line_1() {
        return this.Address_line_1
    }
    set address_line_1(val) {
        this.Address_line_1 = val;
    }

    get address_line_2() {
        return this.Address_line_2
    }
    set address_line_2(val) {
        this.Address_line_2 = val;
    }

    get state() {
        return this.State
    }
    set state(val) {
        this.State = val;
    }

    get city() {
        return this.City
    }
    set city(val) {
        this.City = val;
    }

    get zip_code() {
        return this.Zip_code
    }
    set zip_code(val) {
        this.Zip_code = val;
    }

    get registertime() {
        return this.Registertime
    }
    set registertime(val) {
        this.Registertime = val;
    }

    get profilepicture() {
        return this.Profilepicture
    }
    set profilepicture(val) {
        this.Profilepicture = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // phone

    get phone() {
        return this.Phone_number
    }
    set phone(val) {
        this.Phone_number = val;
    }

    get phone_number() {
        return this.Phone_number
    }
    set phone_number(val) {
        this.Phone_number = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // lastname

    get last_name() {
        return this.Last_name;
    }
    set last_name(val) {
        this.Last_name = val;
    }

    get lastname() {
        return this.Last_name;
    }
    set lastname(val) {
        this.Last_name = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // firstname

    get first_name() {
        return this.First_name;
    }
    set first_name(val) {
        this.First_name = val;
    }

    get firstname() {
        return this.First_name;
    }
    set firstname(val) {
        this.First_name = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //

    get id() {
        return this.Id
    }
    set id(val) {
        this.Id = val;
    }

    get uid() {
        return this.Id
    }
    set uid(val) {
        this.Id = val;
    }

    get pk() {
        return this.Id
    }
    set pk(val) {
        this.Id = val;
    }

    ///////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // username

    get username() {
        return this.Username
    }
    set(val) {
        this.Username = val;
    }

    ///////////////////////////////////////////////////

}