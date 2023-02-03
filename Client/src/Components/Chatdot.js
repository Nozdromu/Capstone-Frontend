import { Button, Card } from "react-bootstrap"
import { useState } from "react";
import ChatApp from "./Chat"
import Core from './Core';


export default function Chatdot() {
    const [show, setshow] = useState(false)
    var onclick = () => {
        Core.getUser()._islogin()?setshow(!show):console.log('need login');
    }
    return ( 
        <>
            {show ? <div style={{
                position: 'absolute',
                bottom: '2em',
                right: '2em',
                translate: 'middle',
                minWidth: '40em'
            }} ><ChatApp socket={Core.getsocket()} btn={<Button onClick={onclick}>hide</Button>} /></div> : <></>}
            {!show ? <Button style={{
                position: 'absolute',
                bottom: '2em',
                right: '2em',
                translate: 'middle',
            }} onClick={onclick}>
                Chat
            </Button> : <></>}
        </>
    )
}