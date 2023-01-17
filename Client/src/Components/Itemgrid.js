import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Itemcard from './Itemcard';
import axios from 'axios';

class Itemgrid extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = { data: [], list: [] };
  }



  componentDidMount() {
    this._isMounted = true;
    axios.get('/getdata').then(res => {
      if (this._isMounted) {
        var x = res.data[0].map((val) => {
          return <Col key={val.itid}><Itemcard data={val} key={val.itid} /></Col>
        })
        this.setState({
          list: (x), data: res.data[0]
        }, () => {
          console.log(this.state);
        })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (<Container>
      <Row style={{ gap: "1em" }} justify-content="space-evenly">
        {this.state.list}
      </Row>
    </Container>)
  };
}


export default Itemgrid;