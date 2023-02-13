function a() {
    var t;
    return {
        sett: (a) => {
            t = a;
        },
        gett: ()=>{
            return t;
        }
    }
}
export default a;