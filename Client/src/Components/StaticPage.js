import Homepage from './Itemgrid'
import Accountpage from './Accountpage'
import Mappage from './Map'
import Chatpage from './Chat'

var StaticPage=(()=>{

    var _map=<Mappage></Mappage>
    var _account=<Accountpage></Accountpage>

    var returnpage=()=>{
        return {
            map:_map,
            account:_account
        }
    }

    return {
        pages:returnpage
    }
})()

export default StaticPage