import React, { Component, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Itemcard from './Itemcard';
import Core from './Core';
import S_chat from './S_chat'

export default function Itemgrid() {
  const [list, setlist] = useState();
  const [isload, setload] = useState(false)
  const [schat, setschat] = useState(<></>);

  var startchat = (chat) => {
    setschat(chat)
  }

  var createItemCard = () => {
    var _list = Core.item().map((val) => {
      console.log(val);
      return <Col md={3} sm={6} key={val.itid} style={{ marginBottom: '1em' }} ><Itemcard data={val} key={val.itid} startchat={startchat} /></Col>
    })
    // this.setState({ list: _list, data: Core.item() });
    setlist(list => _list);
    setload(true);
  }
  if (!list)
    Core.addhook(createItemCard);


  return isload ? (<Container style={{ height: '90vh' }}>
    <Row justify-content="space-evenly" >
      {list}
    </Row>
    {schat}
  </Container>) : (<></>)
}
