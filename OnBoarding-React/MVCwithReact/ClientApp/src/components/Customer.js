
import React, { Component } from 'react';
import { Table, Container, Button, Header, Modal,Icon, Checkbox, Form, View, StyleSheet } from 'semantic-ui-react'  //added



export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);

        this.state = {      //just setting a few made up variables in regards to our data we want displayed
            loading: true,
            person: null        //person is an object created to recieve attributes from our data that we get
        }
    }

    async componentDidMount()//fetches data here
    {
        const url = "https://dummyjson.com/users/";   //this is the data we are getting
        const response = await fetch(url);            //fetches data here
        const data = await response.json();             //this call returns us the JSON data
        this.setState({ person: data.users, loading: false, open: false, setOpen: false})      //here person will be filled by the first element in the data var 
        //and so this person object is stored in state


        //enables us to see the variables in the url in our console on our browser, easier way to seeing data
        //in the log you see arrays in the first array (result), 
        //in order to output anything it has to be the specific variable in each array that you're calling
        console.log(data);

    }

    static RenderTableDynamically(input) {//The map function dynamically creates rows for each customer created
       

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

                    {input.map(Custmer => (
                        <tr key={Custmer.id}>
                            <Table.Cell >{Custmer.firstName}</Table.Cell>
                            <Table.Cell >{Custmer.address.address}</Table.Cell>
                            <Table.Cell><Modal
                                trigger={<Button color='yellow'><Icon name='calendar check' />Edit</Button>}
                                size={'tiny'}>
                                <Header content='Edit Customer' />
                                <Modal.Content>
                                    {
                                        <Form >
                                            <Form.Field>
                                                <Container textAlign='justified'><div>Name </div></Container>
                                                <Form.Input placeholder='Name' width={12} fluid />

                                            </Form.Field>
                                            <Form.Field>
                                                <Container textAlign='justified'><p>Address </p></Container>
                                                <Form.Input placeholder='Address' width={12} fluid />
                                            </Form.Field>
                                        </Form>
                                    }
                                </Modal.Content>
                                
                                    <Modal.Actions>
                                    <Button color='black'/* onClick={() => this.setOpen(false)}*/>
                                        Cancel
                                    </Button>
                                    <Button  icon labelPosition='right' color='green' /*onClick={() => this.setOpen(false)}*/>
                                         edit
                                         <Icon name='checkmark'/></Button>                                   
                                    </Modal.Actions>
                                </Modal>
                            </Table.Cell>



                            <Table.Cell><Modal
                                trigger={<Button color='red'><Icon name='trash alternate' />Delete</Button>}>                                
                                <Header content='Delete Customer' />
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
        //if this state is loading or is person is null execute the first div in brackets,
        // ':' <--otherwise execute the next bit of code which is showing the persons first name
        if (this.state.loading) {
            return <div> loading.........</div>
        }


        return (

            <div>
                <p></p>

                <Modal
                     trigger={<Button primary>New Customer</Button>}
                     size={'tiny'}>                                
                     <Header content='Create Customer' />
                     <Modal.Content>
                        <Form >
                            <Form.Field>
                                <Container textAlign='justified'><div>Name </div></Container>
                                <Form.Input placeholder='Name' width={12} fluid />

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
                         <Button  icon labelPosition='right' color='green' /*onClick={() => this.setOpen(false)}*/>
                                         create
                            <Icon name='checkmark'/></Button>    
                     </Modal.Actions>
                </Modal>

                {Customer.RenderTableDynamically(this.state.person)}
            </div >
        );
    }



}