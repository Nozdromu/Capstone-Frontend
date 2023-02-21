
import Api from '../Api'
import { Button, Col, Container, Tab, Tabs, Row, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Usertable from './Example_usertable';
import Register from './Example_register';
import Signin from './Example_Signin';
import Core from '../Core';
import AccountEdit from './Example_Edit_Account';
import ListingTable from './Example_Listingtable';

import ItemTable from './Example_itemtable';
import ItemEdit from './Example_Edit_item';

import ListingEdit from './Example_Edit_listing';
function TestApp() {

  const [islogin, setlogin] = useState(false)
  const [userpk, setuserpk] = useState(0)
  const [userdata, setuserdata] = useState()

  // const [usertable, setusetable] = useState(<></>)
  // const [itemtable, setitemtable] = useState(<></>)
  // const [table, settable] = useState(<></>);


  const [itemdata, setitemdata] = useState([])
  const [listdata, setlistdata] = useState([])

  const [currentlist, setcurrentlist] = useState();
  const [currentitem, setcurrentitem] = useState()


  // const [itemediter, setitemediter] = useState(<></>)
  // const [listediter, setlistediter] = useState(<></>)

  const [mount, setmount] = useState(false);
  // const [result, setresult] = useState('null')

  const [currentuser, setcurrentuser] = useState('no login');


  var updatelisttable = () => {
    if (userpk > 0)
      Api.listing.getbyowner((res) => {
        setlistdata(res.data.list)
        setcurrentlist(currentlist === undefined ? res.data.list[0] : currentlist)
      })
  }
  var updateitemtable = () => {
    if (currentlist !== undefined) {
      console.log(currentlist.gsid)
      Api.item.bylisting(currentlist.gsid, (res) => {
        console.log(res);
        setitemdata(res.data.items);
        setcurrentitem(currentitem === undefined ? res.data[0] : currentitem)
      })
    }

  }

  useEffect(() => {
    if (!mount) {
      Api.user.checklogin((res) => {
        if (res.data.result) {
          setuserdata(res.data.user)
          setcurrentuser(res.data.user.username)
          setuserpk(res.data.user.uid);

        }
      })
      setmount(true);
    }
  })


  //pass to ListingTable, use to update current list that clicked in list table.
  var changelisting = (data) => {
    setcurrentlist(currentlist => data)
  }

  // update list editer after current list has been change by click on the list table
  useEffect(() => {
    if (currentlist !== undefined) {
      updateitemtable()
    }
  }, [currentlist])




  //when the list of itemdata updated, update item table
  // useEffect(() => {
  //   if (itemdata.length > 0)
  // }, [itemdata])

  // pass to ItemTable, use to update current item that clicked in item table
  var changeitem = (data) => {
    setcurrentitem(data);
  }

  // update item editer after current item has been change by click on the item table
  // useEffect(() => {
  //   if (currentitem !== undefined)
  //     setitemediter(<ItemEdit data={currentitem} updatetable={updateitemtable} />)
  // }, [currentitem])

  //////////////////////////////////////////////////////////////////////////////////
  // user hook

  useEffect(() => {
    if (userpk > 0) {
      Api.listing.getbyowner((res) => {
        setlistdata(res.data.list)
      })
      setlogin(true)
    }
    if (userpk === 0) {
      setlogin(false)
    }
  }, [userpk])

  useEffect(() => {
    if (islogin) {

    } else {
      setcurrentuser('no login');
    }
  }, [islogin])


  useEffect(() => {
  }, [currentuser])


  var changeuser = (user) => {
    console.log(user)
    setcurrentuser(user.username)
    setuserdata(user)
    setuserpk(user.uid)
  }

  var logout = () => {
    setuserpk(0)
  }

  // end of user hook
  /////////////////////////////////////////////////////////////////////////
  return (
    <Container>
      <Tabs style={{ marginBottom: '1vh' }}>
        <Tab eventKey={'user'} title={'User'}>
          <Stack gap={3}>
            <Row>
              {/* {usertable} */}
              <Col>{currentuser}</Col>
            </Row>
            <Row>
              <Col>
                <Register />
              </Col>
              <Col>
                <Signin login={islogin} logout={logout} changeuser={changeuser} />
              </Col>
            </Row>
            <Row>
              <Col>
                <AccountEdit login={islogin} data={userdata} />
              </Col>
              <Col>
              </Col>
            </Row>
          </Stack>

        </Tab>
        <Tab eventKey={'listings'} title={'Listings'} disabled={!islogin}>
          <Row>
            <Col>
              <ListingTable setlisting={changelisting} data={listdata} />
            </Col>
          </Row>
          <Row>
            <Col>

            </Col>
          </Row>
          <Row>
            <Col>
              <ListingEdit updatetable={updatelisttable} data={currentlist} />
            </Col>
            <Col>
              {/* {currentitem === undefined ? <></> : <ItemEdit listingid={currentlist.id} data={currentitem} updatetable={updateitemtable} />} */}
            </Col>
          </Row>
        </Tab>
        <Tab disabled={currentlist === undefined} eventKey={'item'} title={'item'}>
          <Row>
            <ItemTable setitem={changeitem} data={itemdata} />
          </Row>
          <Row>
            <Col>
              <ItemEdit data={currentitem} userid={userpk} listing={currentlist} updatetable={updateitemtable} />
            </Col>
            <Col>
            </Col>
          </Row>
        </Tab>
      </Tabs>

    </Container>

  );
}

export default TestApp;
