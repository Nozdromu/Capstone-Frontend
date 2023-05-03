import data from "./address.json"

export default function dummyAddress() {
    var address = []
    data.data.forEach(element => {
        address.push(element.Street + ',' + element.City + ',' + element.State + ',' + element.Zip + ',' + element.Country)
    });
    console.log(address)
    return address
}