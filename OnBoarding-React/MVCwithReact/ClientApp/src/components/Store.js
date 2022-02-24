
import React, { Component, useState } from 'react';
import axios from 'axios';      //for LINKING with backend
import { Table, Container, Button, Header, Modal, Icon, Checkbox, Form, View, StyleSheet } from 'semantic-ui-react'  //added

export class Store extends Component{
    static displayName = Store.name;

    constructor(props) {
        super(props);

        this.state = {      //just setting a few made up variables in regards to our data we want displayed

            Stores: [],       //person is an object created to recieve attributes from our data that we get
            name: '', email: '', id: 0
        }

       
    }

   



       

    componentDidMount()//fetches data here
    {
        let url = "http://localhost:5298/api/Stores";   //this is the data we are getting,
       // fetch(url).then((response) => response.json()).then((data) => { this.setState({ Stores: data }) })
        // the fetch function gets the json file and stores it in the Stores object 

        axios.get(url).then(response => { const Stores = response.data; this.setState({ Stores }); });

        //here Stores will be filled by the first element 
        //and so this Stores object is stored in state
         //IMPORTANT THAT DATA.{NAME OF THE ARRAY}<-- IS SPECIFIED

        //enables us to see the variables in the url in our console on our browser, easier way to seeing data
        //in the log you see arrays in the first array (result), 
        //in order to output anything it has to be the specific variable in each array that you're calling

       
    }

    static RenderTableDynamically(input, Name, Email, store) {//The map function dynamically creates rows for each customer created

      
        function handleChangeName(event){

            Name = event.target.value
            
            //console.log(Name);

        }
        function handleChangeAddress(event){

            Email = event.target.value
          // console.log(Email);

        }
       
        function update(event, id){       
            store.storeId = id;
            store.name = Name;
            store.address = Email;
            
           
            let lnk = 'http://localhost:5298/api/Stores/' + id;
            axios.put(lnk, store);
           
        }
        
        //NOTE: the attributes for the customer should be copied from the JSON file exactly as written
        return (
            <Table celled fixed singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell col>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>                        
                    </Table.Row>
                </Table.Header>

                <Table.Body >
                    {input.map(Storez => (
                        <tr key={Storez.storeId}>
                            <Table.Cell >{Storez.name}</Table.Cell>
                            <Table.Cell >{Storez.address}</Table.Cell>
                            <Table.Cell><Modal
                                trigger={<Button color='yellow'><Icon name='calendar check' />Edit</Button>}
                                size={'tiny'}>
                                <Header content='Edit Store' />
                                <Modal.Content>
                                    {
                                        <Form >
                                            <Form.Field>
                                                <Container textAlign='justified'><div>Name </div></Container>
                                                <Form.Input placeholder='Name' width={12} onChange={handleChangeName}/>
                                            </Form.Field>
                                            <Form.Field>
                                                <Container textAlign='justified'><p>Address </p></Container>
                                                <Form.Input placeholder='Address' width={12} onChange={handleChangeAddress } />
                                            </Form.Field>
                                        </Form>
                                    }
                                </Modal.Content>

                                <Modal.Actions>
                                    <Button color='black'/* onClick={console.log('hi')}*/>
                                        Cancel
                                    </Button>
                                    <Button icon labelPosition='right' color='green' onClick={(e) => update(e,Storez.storeId)}>
                                        edit
                                        <Icon name='checkmark' /></Button>
                                </Modal.Actions>
                            </Modal>
                            </Table.Cell>



                            <Table.Cell><Modal
                                trigger={<Button color='red'><Icon name='trash alternate' />Delete</Button>}>
                                <Header content='Delete Store' />
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


        

        const { name } = this.state.name;
        const {  email } = this.state.email;
        const store = {
            storeId: 0,
            name,
            email

        };


        return (
          
            <div >
                <p></p>

                <Modal
                    trigger={<Button primary>New Store</Button>}
                    size={'tiny'}>
                    <Header content='Create Store' />
                    <Modal.Content>
                        <Form >
                            <Form.Field>
                                <Container textAlign='justified'><div>Name </div></Container>
                                <Form.Input placeholder='Name' width={12}  fluid />

                            </Form.Field>
                            <Form.Field>
                                <Container textAlign='justified'><p>Address </p></Container>
                                <Form.Input placeholder='Address' width={12} fluid />
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

                {Store.RenderTableDynamically(this.state.Stores, name, email, store)},
                {() => (this.setState({ [name]: name, [email]: email }))}
            </div >
        );
    }



























 }

