import { Button } from 'react-bootstrap'
import { useState } from 'react'
import Core from '../Core'
import Api from '../Api'

export default function TestButton(props) {
    const [show, setshow] = useState('null')
    const [name,setname] = useState('name')
    var user = Core.getUser()

    // display the data
    var display = (req) => {
        console.log(req)
        setshow(req.data.data.User.username)
        setname(req.data.data.User.first_name)
    }
    var click = () => {
        user.username = 'abdcc'
        //  1.  use user object
        //user.update(display)
        // same as next

        //  2.  use api object
        //Api.user.update(display)
        // same as next

        //  3.  call directly
        // var update_data={
        //     id: user.id,
        //     username: 'abdccd',
        //     first_name: user.first_name,
        //     last_name: user.last_name,
        //     email: user.email,
        //     password: user.password,
        //     address_line_1: user.address_line_1,
        //     address_line_2: user.address_line_2,
        //     city: user.city,
        //     state: user.state,
        //     zip_code: user.zip_code,
        //     phone_number: user.phone_number,
        //     re_password: user.re_password
        // }
        // Api.request.put('/users/' + update_data.id + '/', update_data).then((res) => { display(res) })
        // or
        Api.request.get('/google_vision').then((res) => { display(res) })
    }
    return (
        <div>
            {/* data will display here */}
            <div>{show}</div>
            <div>{name}</div>
            <Button onClick={click}>
                submit
            </Button>
        </div>
    )
}