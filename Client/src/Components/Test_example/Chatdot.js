import { Button,Card } from "react-bootstrap"
import { useState } from "react";
import ChatApp from "../Chat"
import Core from './../Core';


export default function Chatdot() {
    const [show,setshow]=useState(false)
    var onclick=()=>{
        setshow(!show);
    }
    return (
        <div className="position-absolute bottom-0 end-0 translate-middle">
            {show?<ChatApp socket={Core.getsocket()}></ChatApp>:<></>}
            <Button onClick={onclick}>
                Chat
            </Button>
        </div>

    )
}