
import Api from '../Api'
import { Col, Container, Tab, Tabs, Row, Stack, Button } from 'react-bootstrap';
import { useEffect, useState, useContext, useCallback } from 'react';
import { islogin } from '../../App'

import Register from './Example_register';
import Signin from './Example_Signin';
import AccountEdit from './Example_Edit_Account';
import ListingTable from './Example_Listingtable';
import ItemTable from './Example_itemtable';
import ItemEdit from './Example_Edit_item';
import ListingEdit from './Example_Edit_listing';
import Listing from '../../Object/listing';
import Item from '../../Object/item';
import Core from '../Core';
import User from '../../Object/user';
import address from '../../testFile/CreateAddressSheet'

function TestApp() {

  const { login, setlogin } = useContext(islogin)
  const [userpk, setuserpk] = useState(0)
  const [currentuser, setcurrentuser] = useState('no login');
  const [userdata, setuserdata] = useState(Core.getUser())


  const [itemdata, setitemdata] = useState([])
  const [listdata, setlistdata] = useState([])

  const [currentlist, setcurrentlist] = useState();
  const [currentitem, setcurrentitem] = useState()


  const [mount, setmount] = useState(false);

  const [addresslist, setaddress] = useState([]);







  var updatelisttable = () => {
    if (userpk > 0) {
      Api.listing.getbyowner((res) => {
        var list = []
        res.data.list.forEach(element => {
          list.push(new Listing(element, Core.check_dev()))
        });
        console.log(list)
        setlistdata(list)
        setcurrentlist(currentlist || res.data.list[0])
      })
    }
  }

  var updateitemtable = useCallback(() => {
    if (currentlist) {
      Api.item.bylisting(currentlist.json, (res) => {
        var items = [];
        res.data.items.forEach(element => {
          items.push(new Item(element, Core.check_dev()))
        })
        setitemdata(items);
        setcurrentitem(items.length > 0 ? (currentitem || res.data[0]) : new Item({ uid: userpk, gsid: currentlist.id }, true));
      })
    }
  }
    , [currentlist, currentitem, userpk])

  var updateuser = () => {
    setcurrentuser(userdata.username)
  }

  useEffect(() => {

    if (!mount && userdata.islogin) {
      setuserpk(userdata.uid);
    }
    setmount(true)
  }, [mount, userdata])


  //pass to ListingTable, use to update current list that clicked in list table.
  var changelisting = (data) => {
    setcurrentlist(currentlist => data)
  }

  // update list editer after current list has been change by click on the list table
  useEffect(() => {
    if (currentlist) {
      updateitemtable()
    }
  }, [currentlist, updateitemtable])



  // pass to ItemTable, use to update current item that clicked in item table
  var changeitem = (data) => {
    setcurrentitem(data);
  }


  //////////////////////////////////////////////////////////////////////////////////
  // user hook


  useEffect(() => {
    if (login) {
      setuserdata(Core.getUser());
    } else {
      setuserdata(new User({}, Core.check_dev()));
    }
  }, [login])

  useEffect(() => {
    if (userdata.islogin) {
      setcurrentuser(userdata.username)
      Api.listing.getbyowner((res) => {
        var list = []
        res.data.list.Listings.forEach(element => {
          list.push(new Listing(element, Core.check_dev()))
        });
        setlistdata(list)
      })
    } else {
      setcurrentuser('no login');
    }
  }, [userdata])

  var changeuser = (user) => {
    // setuserpk(user.uid)
    setlogin(user.islogin);
  }

  var logout = () => {
    setlogin(false)
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
                <Signin login={login} logout={logout} changeuser={changeuser} />
              </Col>
            </Row>
            <Row>
              <Col>
                <AccountEdit login={login} data={userdata} update={updateuser} />
              </Col>
              <Col>
              </Col>
            </Row>
          </Stack>

        </Tab>
        <Tab eventKey={'listings'} title={'Listings'} disabled={!login}>
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
              <ListingEdit updatetable={updatelisttable} data={currentlist} owner={userpk} />
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
        <Tab eventKey={'dummydata'} title={'dummydata'}>
          <Row>
            <Col>
              <Button onClick={() => {
                setaddress(address().map((e) => {
                  return <Row>{e}</Row>
                }))
              }}>
                create address list
              </Button>
            </Col>
          </Row>
          <Row>
            {addresslist}
          </Row>
        </Tab>
      </Tabs >

    </Container>

  );
}

export default TestApp;
