import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Itemcard from './Itemcard';
import Core from './Core';

class Itemgrid extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = { data: [], list: [] };
  }

  createItemCard = () => {
    var _list = Core.item().map((val) => {
      return <Col md={3} sm={6} key={val.itid} style={{ marginBottom: '1em' }} ><Itemcard data={val} key={val.itid} /></Col>
    })
    this.setState({ list: _list, data: Core.item() });
  }

  componentDidMount() {
    this._isMounted = true;
    Core.addhook(this.createItemCard);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (<Container>
      <Row justify-content="space-evenly">
        {this.state.list}
      </Row>
    </Container>)
  };
}


export default Itemgrid;