
import React, { useEffect, useState } from 'react';
import axios from 'axios';      //for LINKING with backend
import { Dropdown,Table, Container, Button, Header, Modal, Icon, Form } from 'semantic-ui-react'  //added


const Sales = (props) => {

    const [SelectedCurrentElement, setSelectedCurrentElement] = useState(null)
    const [open, setOpen] = React.useState(false)
    const [CreateModalOpen, setCreateModalOpen] = React.useState(false)
    const [DeleteModalOpen, setDeleteModalOpen] = React.useState(false)

    const expandModal = (CurrentElement) => {
        //essentially is the iterator passed in pointing to the current element
        setSelectedCurrentElement(CurrentElement);  //hook takes in the current element
        setOpen(true);          //this hook is set to true
    }

    const closeModal = () => {
        setSelectedCurrentElement(null);
        setOpen(false);
    }

    const expandDeleteModal = (CurrentElement) => {
        //essentially is the iterator passed in pointing to the current element
        setSelectedCurrentElement(CurrentElement);
        setDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setSelectedCurrentElement(null);
        setDeleteModalOpen(false);
    }


    const [SaleEntry, setSaleEntry] = useState([]);
    const [CombinedEntry, setCombinedEntry] = useState({ customerId: '', storeId: '', productId: '' });


    const searchItems = () => {
        //essentially retrieves data from the backend, the url is gotten from the swagger get function for each of the api
        
        axios.get("http://localhost:5298/api/Customers").then(response => {

            setCombinedEntry({ customerId: response.data })
            
        });
        axios.get("http://localhost:5298/api/Stores").then(response => {

            setCombinedEntry({ storeId: response.data })
            
        });
        axios.get("http://localhost:5298/api/Products").then(response => {

            setCombinedEntry({ productId: response.data })
            
        });

        axios.get("http://localhost:5298/api/Sales").then(response => {

            setSaleEntry(response.data)     //<-- has the entire array in salesentry
            //console.log([SaleEntry])
        });

    }

    //useeffect enables us to run code on every render, so anytime theres a render the code in here is activated
    useEffect(() => searchItems(), []   /*if [] run searchitems() once & dont run again*/);


    //FIGURE OUT HOW TO DYNAMICALLY POPULATE THESE ARRAYS FOR EACH OF THE OTHER CLASSES BASED ON THE AMOUNT OF ELEMENTS IN EACH OF THEM
    const Customer = [
        {
            key: 'Jenny',
            text: 'Jenny ',
            value: 'jenny'
        },
        {
            key: 'Elliot Fu',
            text: 'Elliot Fu',
            value: 'Elliot Fu'
        }
    ]
    const Product = [
        {
            key: 'apple',
            text: 'apple ',
            value: 'apple'
        },
        {
            key: 'orange',
            text: 'orange',
            value: 'orange'
        }
    ]
    const Store = [
        {
            key: 'paknsav',
            text: 'paknsav ',
            value: 'paknsav'
        },
        {
            key: 'Countdown',
            text: 'Countdown',
            value: 'Countdown'
        }
    ]
    return (
        <div >
            <p></p>
            <Modal
                onClose={() => setCreateModalOpen(false)}
                onOpen={() => setCreateModalOpen(true)}
                open={CreateModalOpen}
                trigger={<Button primary >New Sale</Button>}
                size={'tiny'}>
                <Header content='Create Sales' />
                <Modal.Content>
                    <Form >
                        <Form.Field>
                            <Container textAlign='justified'><div>Name </div></Container>
                            <Form.Input placeholder='dd-mm-yyyy' width={6} fluid name="dateSold" value={SaleEntry.dateSold}
                                /*onChange={(e) => handleAddName({ "id": '', "productId": '', "customerId": '', "storeId": '', "dateSold": '' }, e)}*/ />

                        </Form.Field>
                        <Form.Field>
                            <Container textAlign='justified'><p>Customer </p></Container>                            
                            <Dropdown
                            placeholder='John'
                            fluid
                            width={12}
                            search
                            selection
                            options={Customer} />
                        </Form.Field>
                        <Form.Field>
                            <Container textAlign='justified'><p>Product </p></Container>
                            <Dropdown
                                placeholder='Pear'
                                fluid
                                width={12}
                                selection
                                options={Product} />
                        </Form.Field>
                        <Form.Field>
                            <Container textAlign='justified'><p>Store </p></Container>
                            <Dropdown
                                placeholder='CountDown'
                                fluid
                                width={12}
                                selection
                                options={Store} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setCreateModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button icon labelPosition='right' color='green' /*onClick={(e) => handleinputAdd()}*/>
                        create
                        <Icon name='checkmark' /></Button>
                </Modal.Actions>
            </Modal>

            <Table celled fixed singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell col>Customer</Table.HeaderCell>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Store</Table.HeaderCell>
                        <Table.HeaderCell>Date Sold</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        {console.log([CombinedEntry]) }
                    </Table.Row>
                </Table.Header>
                
               

            </Table>

        </div>
    );







}


export default Sales;




/*

<Table.Body >
    {ProductList.map(Productz => (
        <tr key={Productz.productId}>
            <Table.Cell >{Productz.name}</Table.Cell>
            <Table.Cell >{Productz.price}</Table.Cell>
            <Table.Cell>
                <Button color='yellow' onClick={() => expandModal(Productz)} ><Icon name='calendar check' /> Edit</Button>
                <Modal
                    open={open} //open attribute is set to the 'open' variable in the hook
                    onClose={() => setOpen(false)}  //onClose attribute is called when a close event happens, & the hook is set to false 
                    onOpen={() => setOpen(true)}    //onOpen attribute is called when a open event happens, & the hook is set to true
                    size={'tiny'}>
                    <Header content='Edit Product' />
                    <Modal.Content>
                        {
                            <Form >
                                <Form.Field>
                                    <Container textAlign='justified'><div>Name </div></Container>
                                    <Form.Input placeholder='Name' width={12} value={SelectedCurrentElement && SelectedCurrentElement.name}
                                       
                                        name="name" onChange={handleChangeName.bind(this, SelectedCurrentElement)} />
                                </Form.Field>
                                <Form.Field>
                                    <Container textAlign='justified'><p>Price </p></Container>
                                    <Form.Input placeholder='Price' width={12} value={SelectedCurrentElement && SelectedCurrentElement.price} name="price" onChange={handleChangePrice.bind(this, SelectedCurrentElement)} />
                                </Form.Field>
                            </Form>
                        }
                    </Modal.Content>

                    <Modal.Actions>
                        <Button color='black' onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button icon labelPosition='right' color='green' onClick={() => {
                            handleinput(SelectedCurrentElement);
                            closeModal();
                        }} >
                            edit
                            <Icon name='checkmark' /></Button>
                    </Modal.Actions>
                </Modal>
            </Table.Cell>



            <Table.Cell>
                <Button color='red' onClick={() => expandDeleteModal(Productz)}><Icon name='trash alternate' />Delete</Button>
                <Modal open={DeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onOpen={() => setDeleteModalOpen(true)}>
                    <Header content='Delete Product' />
                    <Modal.Content>
                        <b>Are you Sure?</b>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={closeDeleteModal}>
                            Cancel
                        </Button>
                        <Button color='red' onClick={(e) => { handleinputDelete(SelectedCurrentElement); closeDeleteModal() }}>
                            <Icon name='close' /> delete
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Table.Cell>
        </tr>
    ))}

</Table.Body>

*/