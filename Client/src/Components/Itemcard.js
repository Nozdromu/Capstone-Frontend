import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function Itemcard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.description}</Card.Title>
                <Card.Text>
                    {props.detial}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}