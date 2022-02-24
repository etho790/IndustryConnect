
import React, { Component } from 'react';
import axios from 'axios';      //for LINKING with backend
import { Table, Container, Button, Header, Modal, Icon, Checkbox, Form, View, StyleSheet } from 'semantic-ui-react'  //added


export class Product extends Component{
    static displayName = Product.name;

    constructor(props) {
        super(props);

        this.state = {      //just setting a few made up variables in regards to our data we want displayed           
            Products: []        //Products is an object created to recieve attributes from our data that we get
        }

    }

    componentDidMount()//fetches data here
    {
        let url = "http://localhost:5298/api/Products";   //this is the data we are getting

        //fetch(url).then((response) => response.json()).then((data) => { this.setState({ Products: data }) })
        // the fetch function gets the json file and stores it in the Products object 

        axios.get(url).then(response => { const Products = response.data; this.setState({ Products }); });

        //here Products will be filled by the first element 
        //and so this Products object is stored in state
         //IMPORTANT THAT DATA.{NAME OF THE ARRAY}<-- IS SPECIFIED

        //enables us to see the variables in the url in our console on our browser, easier way to seeing data
        //in the log you see arrays in the first array (result), 
        //in order to output anything it has to be the specific variable in each array that you're calling
     
    }


    static RenderTableDynamically(input) {//The map function dynamically creates rows for each Products created



         //NOTE: the attributes for the Products should be copied from the JSON file exactly as written
        return (
            <Table celled fixed singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell col>Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                
                <Table.Body >
                   
                    {input.map(Prducts => (
                        <tr key={Prducts.ProductId}>
                            <Table.Cell >{Prducts.name}</Table.Cell>        
                            <Table.Cell >{Prducts.price}</Table.Cell>
                            <Table.Cell><Modal
                                trigger={<Button color='yellow'><Icon name='calendar check' />Edit</Button>}
                                size={'tiny'}>
                                <Header content='Edit Product' />
                                <Modal.Content>
                                    {
                                        <Form >
                                            <Form.Field>
                                                <Container textAlign='justified'><div>Name </div></Container>
                                                <Form.Input placeholder='Name' width={12} fluid />

                                            </Form.Field>
                                            <Form.Field>
                                                <Container textAlign='justified'><p>Price </p></Container>
                                                <Form.Input placeholder='Price' width={12} fluid />
                                            </Form.Field>
                                        </Form>
                                    }
                                </Modal.Content>

                                <Modal.Actions>
                                    <Button color='black'/* onClick={() => this.setOpen(false)}*/>
                                        Cancel
                                    </Button>
                                    <Button icon labelPosition='right' color='green' /*onClick={() => this.setOpen(false)}*/>
                                        edit
                                        <Icon name='checkmark' /></Button>
                                </Modal.Actions>
                            </Modal>
                            </Table.Cell>


                            <Table.Cell><Modal
                                trigger={<Button color='red'><Icon name='trash alternate' />Delete</Button>}>
                                <Header content='Delete Product' />
                                <Modal.Content>
                                    <b>Are you Sure?</b>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='black' /*onClick={() => this.setOpen(false)}*/>
                                        Cancel
                                    </Button>
                                    <Button color='red' /*onClick={() => this.setOpen(false)}*/>
                                        <Icon name='close' /> delete
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            </Table.Cell>
                        </tr>
                    ))}

                </Table.Body>
            </Table>
        );


    }

    render() {
        //if this state is loading  execute the first div in brackets,
       

        return (

            <div>
                <p></p>

                <Modal
                    trigger={<Button primary>New Product</Button>}
                    size={'tiny'}>
                    <Header content='Create Product' />
                    <Modal.Content>
                        <Form >
                            <Form.Field>
                                <Container textAlign='justified'><div>Name </div></Container>
                                <Form.Input placeholder='Name' width={12} fluid />

                            </Form.Field>
                            <Form.Field>
                                <Container textAlign='justified'><p>Price </p></Container>
                                <Form.Input placeholder='Price' width={12} fluid />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' /*onClick={() => this.setOpen(false)}*/>
                            Cancel
                        </Button>
                        <Button icon labelPosition='right' color='green' /*onClick={() => this.setOpen(false)}*/>
                            create
                            <Icon name='checkmark' /></Button>
                    </Modal.Actions>
                </Modal>

                {Product.RenderTableDynamically(this.state.Products)}
            </div >
        );
    }




}

