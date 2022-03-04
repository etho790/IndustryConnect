
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';      //for LINKING with backend
import { Table, Container, Button, Header, Modal, Icon, Checkbox, Form, View, StyleSheet } from 'semantic-ui-react'  //added

const Store = (props) => {



    // NEW ADD CHRIS
    const [selectedProject, setSelectedProject] = useState(null)   
    const [open, setOpen] = React.useState(false)
    const [CreateModalOpen, setCreateModalOpen] = React.useState(false)

    const expandModal = (project) => {
        setSelectedProject(project);
        setOpen(true);
    }

    const closeModal = () => {
        setSelectedProject(null);
        setOpen(false);
    }


    /*
    const expandCreateModal = (project) => {
        setCreateModalOpen(project);
        setOpen(true);
    }

    const closeCreateModal = () => {
        setCreateModalOpen(null);
        setOpen(false);
    }*/
    
   
    //SEARCH
    //use state is the hook that is stored in the variable storeList.
    //setStoreList is the function that automatically changes the value in the hook
    //the minute a value is passed in it via function call, thereby the value in storeList
    //LIST STORE
    const [storeList, setStoreList] = useState([]);
    const [NewStoreName, setNewStoreName] = useState([]);
    const [NewStoreAddress, setNewStoreAddress] = useState([]);

    const searchItems = () => {
        //essentially retrieves data from the backend, the url is gotten from the swagger get function for each of the api

        axios.get("http://localhost:5298/api/Stores").then(response => {

            setStoreList(response.data)
        });
    }

    useEffect(() => searchItems() /*if [] run searchitems() once & dont run again*/ , []);

    const handleChangeName = (StoreName, CurrentIteratorDataValue) => {
        //'StoreName' or 'this' thats passed into the function call essentially is the current element in the array
        //'CurrentIteratorDataValue' or 'Storez' thats passed into the function call essentially contains comprehensive data info about the current element in the array that the iterator points to

        let NameRef = [...storeList];
        // [...] is called the spread operator, and all it does is spreads items in an array 
        //into individual components and grants you the ability to treats them individually
        //whereas if we just let  NameRef = [storeList]; <-- this would contain the entire array as whole in NameRef
        //not individual elements within  the array


        const index = NameRef.findIndex((item) => item.storeId === StoreName.storeId);
        //only give us the index if the element with the storeid within NameRef exactly matches the storeid of the current element in StoreName
        

        const { name, value } = CurrentIteratorDataValue.target;
        //essentially CurrentEntry.target consists of input placeholder, name, type & value tags that are updated.
        //and as we type its the value tag that is constantly updated.
        //moreover  [const { name, value } = CurrentEntry.target;] essentially is called object destructuring
        //name & value here are already predefinied variables in the object CurrentEntry.target 
        //AND captures its respective values. the 'value' variable captures the value in "CurrentEntry.target"
        
        NameRef[index] = { ...StoreName ,[name]: value  };
        // This syntax above is unique, in the sense it updates the array.
        //first argument passes in 'StoreName' but using the spread operator which enables us to get the elements
        //second argument updates the pre-existing element in the {...StoreName} array which is 'name'
        //[name]: value essentially goes to the corresponding element string in the array which is name here and updates the inputted value
        //this is important because the name string must match exactly with the respective name of the value in the string
        //otherwise it wont update
       //so that updates all the values in NameRef array at the [index] element
        setStoreList(NameRef);
        //SAVES!!!!!!!!!!



        // NEW ADD CHRIS
        setSelectedProject(NameRef[index]);

        console.log(NameRef)
    }

    const handleChangeAddress = (StoreAddress, CurrentIteratorDataValue) => {
        let NameRef = [...storeList];
        const index = NameRef.findIndex((item) => item.storeId === StoreAddress.storeId);
        const { name, value } = CurrentIteratorDataValue.target;
      

        NameRef[index] = { ...StoreAddress, [name]: value };
        setStoreList(NameRef);


        // NEW ADD CHRIS
        setSelectedProject(NameRef[index]);

        console.log(NameRef)
    }

    const handleinput = (StoreEntry) => {
        // the minute 'handleinput' is called, it automatically should be able to change or manipulate with the values of ParameterName

        axios.put('http://localhost:5298/api/Stores/' + StoreEntry.storeId, StoreEntry);
        //UPDATES!!!!!!
    }

    const handleinputDelete = (StoreEntry) => {
        // the minute 'handleinput' is called, it automatically should be able to change or manipulate with the values of ParameterName
        const NameRef = [...storeList];

        const index = NameRef.findIndex((item) => item.storeId === StoreEntry.storeId);

        //Removes the speceific element from the array
        NameRef.splice(index, 1);

        //updates it in the official array
        setStoreList(NameRef);
        //deletes it from the api/backend
        axios.delete('http://localhost:5298/api/Stores/' + StoreEntry.storeId, StoreEntry);
      
    }

    const handleinputAdd = () => {
        //creating 2 new local vars that hold the hook variables array AddressRef & NameRef
        let AddressRef = [...NewStoreAddress]
        let NameRef = [...NewStoreName];

        //completing the last element's address value and storing it in the NameRef array to hold the completed array
        NameRef[NameRef.length - 1].address = AddressRef[AddressRef.length - 1].address
        //updates it in the official array
        setStoreList(NameRef);

        //For the post request, axios only needs the name & address, as the storeId is automatically generated
        //StoreEntry only holds the name & address of the current element from the Nameref array
        const StoreEntry = { "name": NameRef[NameRef.length - 1].name, "address": NameRef[NameRef.length - 1].address }
            console.log(StoreEntry)
        axios.post("http://localhost:5298/api/Stores", StoreEntry); 
        //ADDS!!!!!!

        setCreateModalOpen(false);
    }
    const handleAddAddress = (StoreAddress, CurrentIteratorDataValue) => {
        //storename is defined to be an empty element with storeid, name & address non defined
        
        let NameRef = [...storeList];
        //initialize new array for sole reason to find max storeid
        let arr = []

        for (var x = 0; x < NameRef.length; x++) {
            arr[x] = NameRef[x].storeId
        }
        //you have the storeid 
        var maxStoreId = Math.max(...arr);
        //new sotreid must be one higher
        var NewStoreId = maxStoreId + 1;

        //updates the value given in the input
        const { name, value } = CurrentIteratorDataValue.target;

        //updates the name & storeid in the given array
        var NewArrayEntry = { ...StoreAddress, ["storeId"]: NewStoreId, [name]: value };

        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //NewStoreAddress ends up copying local var NameRef
        setNewStoreAddress(NameRef);
        //console.log([...NewStoreAddress])
        
    }
    const handleAddName = (StoreName, CurrentIteratorDataValue) => {
        //storename is defined to be an empty element with storeid, name & address non defined
        
        let NameRef = [...storeList];

        //initialize new array for sole reason to find max storeid
        let arr = []

        for (var x = 0; x < NameRef.length; x++) {
            arr[x] = NameRef[x].storeId
        }
        //you have the storeid 
        var maxStoreId = Math.max(...arr);
        //new sotreid must be one higher
        var NewStoreId = maxStoreId + 1;

        //updates the value given in the input
        const { name, value } = CurrentIteratorDataValue.target;

        //updates the name & storeid in the given array
        var NewArrayEntry = { ...StoreName, ["storeId"]: NewStoreId, [name]: value };
        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //NewStoreName ends up copying local var NameRef
        setNewStoreName(NameRef)
        //console.log([...NewStoreName])
        
    }



    


    return (
        <div >
            <p></p>           
            <Modal
                onClose={() => setCreateModalOpen(false)}
                onOpen={() => setCreateModalOpen(true)}
                open={CreateModalOpen}
                trigger={<Button primary >New Store</Button>}
                size={'tiny'}>
                <Header content='Create Store' />
                <Modal.Content>
                    <Form >
                        <Form.Field>
                            <Container textAlign='justified'><div>Name </div></Container>
                            <Form.Input placeholder='Name' width={12} fluid name="name" value={storeList.name}
                                onChange={(e) => handleAddName({"storeId": '', "name": '', "address": ''}, e)} />

                        </Form.Field>
                        <Form.Field>
                            <Container textAlign='justified'><p>Address </p></Container>
                            <Form.Input placeholder='Address' width={12} fluid name="address" value={storeList.address}
                                onChange={(e) => handleAddAddress({"storeId": '', "name": '', "address": ''}, e)} />
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
                    {storeList.map(Storez => (
                        <tr key={Storez.storeId}>
                            <Table.Cell >{Storez.name}</Table.Cell>
                            <Table.Cell >{Storez.address}</Table.Cell>
                            <Table.Cell>
                                <Button color='yellow' onClick={() => expandModal(Storez)} ><Icon name='calendar check' /> Edit</Button>
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                size={'tiny'}>
                                <Header content='Edit Store' />
                                <Modal.Content>
                                    {
                                        <Form >
                                            <Form.Field>
                                                <Container textAlign='justified'><div>Name </div></Container>
                                                    <Form.Input placeholder='Name' width={12} value={selectedProject && selectedProject.storeName}
                                                    /*the name attribute is important otherwise you cant pass values for submission*/
                                                        name="name" onChange={handleChangeName.bind(this, selectedProject)} />
                                            </Form.Field>
                                            <Form.Field>
                                                <Container textAlign='justified'><p>Address </p></Container>
                                                    <Form.Input placeholder='Address' width={12} value={selectedProject && selectedProject.storeAddress} name="address" onChange={handleChangeAddress.bind(this, selectedProject)} />
                                            </Form.Field>
                                        </Form>
                                    }
                                </Modal.Content>

                                <Modal.Actions>
                                        <Button color='black' onClick={closeModal}>
                                        Cancel
                                    </Button>
                                        <Button icon labelPosition='right' color='green' onClick={() => {
                                            handleinput(Storez);
                                            closeModal();
                                        }} >
                                        edit
                                        <Icon name='checkmark' /></Button>
                                </Modal.Actions>
                            </Modal>
                            </Table.Cell>



                            <Table.Cell>
                               
                                <Modal /*open={openDeleteModal}
                                    onClose={() => setOpenDeleteModal(false)}
                                    onOpen={() => setOpenDeleteModal(true)}*/
                                    trigger={<Button color='red' ><Icon name='trash alternate' />Delete</Button>}                                >
                                <Header content='Delete Store' />
                                <Modal.Content>
                                    <b>Are you Sure?</b>
                                </Modal.Content>
                                <Modal.Actions>
                                        <Button color='black' /*onClick={closeDeleteModal}*/>
                                        Cancel
                                    </Button>
                                    <Button color='red' onClick={(e) => handleinputDelete(Storez)}>
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

    //onChange={(e) => setSearchParameterName(e.target.value)}, essentially dynamically plugs in the dynamic values 'e.target.value'
    //in
}

export default Store;
