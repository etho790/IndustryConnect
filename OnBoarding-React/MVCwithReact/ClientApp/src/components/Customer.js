
import React, { useEffect, useState } from 'react';
import axios from 'axios';      //for LINKING with backend
import { Table, Container, Button, Header, Modal,Icon,  Form } from 'semantic-ui-react'  //added



const Customer = (props) => {


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

    //SEARCH
    //use state is the hook that is stored in the variable CustomerList.
    //setCustomerList is the function that automatically changes the value in the hook
    //the minute a value is passed in it via function call, thereby the value in CustomerList
    //LIST STORE
    const [CustomerList, setCustomerList] = useState([]);
    const [NewCustomerName, setNewCustomerName] = useState([]);
    const [NewCustomerAddress, setNewCustomerAddress] = useState([]);


    const searchItems = () => {
        //essentially retrieves data from the backend, the url is gotten from the swagger get function for each of the api

        axios.get("http://localhost:5298/api/Customers").then(response => {

            setCustomerList(response.data)
        });
    }


    //useeffect enables us to run code on every render, so anytime theres a render the code in here is activated
    useEffect(() => searchItems(), []   /*if [] run searchitems() once & dont run again*/);

    const handleChangeName = (customerName, CurrentIteratorDataValue) => {
       
        let NameRef = [...CustomerList];
      
        const index = NameRef.findIndex((item) => item.customerId === customerName.customerId);
        //only give us the index if the element with the storeid within NameRef exactly matches the storeid of the current element in customerName

        const { name, value } = CurrentIteratorDataValue.target;
     

        NameRef[index] = { ...customerName, [name]: value };
   
        //so that updates all the values in NameRef array at the [index] element
        setCustomerList(NameRef);
        //SAVES!!!!!!!!!!       
        setSelectedCurrentElement(NameRef[index]);

       // console.log(NameRef)
    }

    const handleChangeAddress = (CustomerAddress, CurrentIteratorDataValue) => {
        let NameRef = [...CustomerList];
        const index = NameRef.findIndex((item) => item.customerId === CustomerAddress.customerId);
        const { name, value } = CurrentIteratorDataValue.target;

        NameRef[index] = { ...CustomerAddress, [name]: value };
        setCustomerList(NameRef);

        setSelectedCurrentElement(NameRef[index]);

       // console.log(NameRef)
    }

    const handleinput = (CustomerEntry) => {
        // the minute 'handleinput' is called, it automatically should be able to change or manipulate with the values of ParameterName
        if (CustomerEntry.name === null || CustomerEntry.name.match(/^ *$/) !== null || CustomerEntry.address === null || CustomerEntry.address.match(/^ *$/) !== null) {
            //the minute any of the attributes in the current entry has a null value or whitespace it wont go further
            console.log("ERROR!!!!!! EMPTY ENTRY!!!!!!!!")
        }
        else {
            console.log("SUCCESS ITS NOT AN EMPTY ENTRY, current array = ", CustomerEntry)
            axios.put('http://localhost:5298/api/Customers/' + CustomerEntry.customerId, CustomerEntry);
            //UPDATES!!!!!!
        }
        
    }

    const handleinputDelete = (CustomerEntry) => {
        // the minute 'handleinput' is called, it automatically should be able to change or manipulate with the values of ParameterName
        const NameRef = [...CustomerList];

        const index = NameRef.findIndex((item) => item.customerId === CustomerEntry.customerId);

        //Removes the speceific element from the array
        NameRef.splice(index, 1);

        //updates it in the official array
        setCustomerList(NameRef);

        //deletes it from the api/backend. The delete function only takees the url + the id of the entry in its url
        axios.delete('http://localhost:5298/api/Customers/' + CustomerEntry.customerId);

        console.log("You have deleted this entry ->", CustomerEntry)

    }

    const handleinputAdd = () => {
        //creating 2 new local vars that hold the hook variables array AddressRef & NameRef
        let NameRef = [...NewCustomerName];
        let AddressRef = [...NewCustomerAddress]       

        if (AddressRef.length != 0 && NameRef.length != 0) {

            //completing the last element's address value and storing it in the NameRef array to hold the completed array
            NameRef[NameRef.length - 1].address = AddressRef[AddressRef.length - 1].address


            //For the post request, axios only needs the name & address, as the customerId is automatically generated
            //CustomerEntry only holds the name & address of the current element from the Nameref array
            let CustomerEntry = { "name": NameRef[NameRef.length - 1].name, "address": NameRef[NameRef.length - 1].address }

            console.log("YOU MUST ENTER INPUTS IN BOTH FIELDS, OTHERWISE THE CODE BREAKS, CURRENT ENTRY THAT WAS INPUTTED", CustomerEntry)
            //adds it to the api/backend. The add function  takes the url & the current entry we are tying to add
            axios.post("http://localhost:5298/api/Customers", CustomerEntry).then(response => { 
                 //ADDS!!!!!!

                //gets the customerId of the current entry FROM THE BACKEND and updates it on CustomerEntry
                CustomerEntry = { "customerId": response.data.customerId, "name": NameRef[NameRef.length - 1].name, "address": NameRef[NameRef.length - 1].address }
                //updates nameref
                NameRef[NameRef.length - 1].customerId = response.data.customerId;
                //updates it in the official array
                setCustomerList(NameRef);

            })            
            //CLOSE THE MODAL
            setCreateModalOpen(false);
        }
    }

    const handleAddAddress = (CustomerAddress, CurrentIteratorDataValue) => {
        //CustomerAddress is defined to be an empty element with customerId, name & address non defined

        let NameRef = [...CustomerList];
        
        //updates the value given in the input
        const { name, value } = CurrentIteratorDataValue.target;

        //updates the name  in the given array
        var NewArrayEntry = { ...CustomerAddress, [name]: value };

        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //NewCustomerAddress ends up copying local var NameRef
        setNewCustomerAddress(NameRef);

    }
    const handleAddName = (CustomerName, CurrentIteratorDataValue) => {
        //CustomerName is defined to be an empty element with customerId, name & address non defined

        let NameRef = [...CustomerList];
               
        //updates the value given in the input
        const { name, value } = CurrentIteratorDataValue.target;

        //updates the name  in the given array
        var NewArrayEntry = { ...CustomerName, [name]: value };
        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //NewCustomerName ends up copying local var NameRef
        setNewCustomerName(NameRef)
    }




    return (
        <div>
            <p></p>
            <Modal
                onClose={() => setCreateModalOpen(false)}
                onOpen={() => setCreateModalOpen(true)}
                open={CreateModalOpen}
                trigger={<Button primary >New Customer</Button>}
                size={'tiny'}>
                <Header content='Create Customer' />
                <Modal.Content>
                    <Form >
                        <Form.Field>
                            <Container textAlign='justified'><div>Name </div></Container>
                            <Form.Input placeholder='Name' width={12} fluid name="name" value={CustomerList.name}
                                onChange={(e) => handleAddName({ "customerId": '', "name": '', "address": '' }, e)} />

                        </Form.Field>
                        <Form.Field>
                            <Container textAlign='justified'><p>Address </p></Container>
                            <Form.Input placeholder='Address' width={12} fluid name="address" value={CustomerList.address}
                                onChange={(e) => handleAddAddress({ "customerId": '', "name": '', "address": '' }, e)} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setCreateModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button icon labelPosition='right' color='green' onClick={(e) => handleinputAdd()}>
                        create
                        <Icon name='checkmark' /></Button>
                </Modal.Actions>
            </Modal>

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
                    {CustomerList.map(Customerz => (
                        <tr key={Customerz.customerId}>
                            <Table.Cell >{Customerz.name}</Table.Cell>
                            <Table.Cell >{Customerz.address}</Table.Cell>
                            <Table.Cell>
                                <Button color='yellow' onClick={() => expandModal(Customerz)} ><Icon name='calendar check' /> Edit</Button>
                                <Modal
                                    open={open} //open attribute is set to the 'open' variable in the hook
                                    onClose={() => setOpen(false)}  //onClose attribute is called when a close event happens, & the hook is set to false 
                                    onOpen={() => setOpen(true)}    //onOpen attribute is called when a open event happens, & the hook is set to true
                                    size={'tiny'}>
                                    <Header content='Edit Customer' />
                                    <Modal.Content>
                                        {
                                            <Form >
                                                <Form.Field>
                                                    <Container textAlign='justified'><div>Name </div></Container>
                                                    <Form.Input placeholder='Name' width={12} value={SelectedCurrentElement && SelectedCurrentElement.name}
                                                        /*the name attribute is important otherwise you cant pass values for submission*/
                                                        name="name" onChange={handleChangeName.bind(this, SelectedCurrentElement)} />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Container textAlign='justified'><p>Address </p></Container>
                                                    <Form.Input placeholder='Address' width={12} value={SelectedCurrentElement && SelectedCurrentElement.address} name="address" onChange={handleChangeAddress.bind(this, SelectedCurrentElement)} />
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
                                <Button color='red' onClick={() => expandDeleteModal(Customerz)}><Icon name='trash alternate' />Delete</Button>
                                <Modal open={DeleteModalOpen}
                                    onClose={() => setDeleteModalOpen(false)}
                                    onOpen={() => setDeleteModalOpen(true)}>
                                    <Header content='Delete Customer' />
                                    <Modal.Content>
                                        <b>Are you Sure?</b>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='black' onClick={closeDeleteModal}>
                                            Cancel
                                        </Button>
                                        <Button color='red' onClick={(e) => { handleinputDelete(SelectedCurrentElement); closeDeleteModal()}}>
                                            <Icon name='close' /> delete
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </Table.Cell>
                        </tr>
                    ))}
                </Table.Body>
            </Table>

        </div>
    );

}

export default Customer;
