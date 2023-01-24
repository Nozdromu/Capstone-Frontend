import Homepage from './Itemgrid'
import Accountpage from './Accountpage'
import Mappage from './Map'
import Chatpage from './Chat'

var StaticPage=(()=>{
    var _home=<Homepage></Homepage>
    var _map=<Mappage></Mappage>
    var _chat=<Chatpage></Chatpage>
    var _account=<Accountpage></Accountpage>

    var returnpage=()=>{
        return {
            home:_home,
            map:_map,
            chat:_chat,
            account:_account
        }
    }

    return {
        pages:returnpage
    }
})()

export default StaticPage