
import React, { useEffect, useState } from 'react';
import axios from 'axios';      //for LINKING with backend
import { Table, Container, Button, Header, Modal, Icon, Form } from 'semantic-ui-react'  //added

const Store = (props) => {

   

    // NEW ADD 
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
    //use state is the hook that is stored in the variable storeList.
    //setStoreList is the function that automatically changes the value in the hook
    //the minute a value is passed in it via function call, thereby the value in storeList
    //LIST STORE
    const [storeList, setStoreList] = useState([]);
    const [NewStoreName, setNewStoreName] = useState([]);
    const [NewStoreAddress, setNewStoreAddress] = useState([]);

    const searchItems = () => {
        //essentially retrieves data from the backend, the url is gotten from the swagger get function for each of the api

        axios.get("https://onboardingtalent.azurewebsites.net/api/Stores").then(response => {

            setStoreList(response.data)
        });
    }

    //useeffect enables us to run code on every render, so anytime theres a render the code in here is activated
    useEffect(() => searchItems(), []   /*if [] run searchitems() once & dont run again*/);

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

        // add the current element in the hook
        setSelectedCurrentElement(NameRef[index]);

       
    }

    const handleChangeAddress = (StoreAddress, CurrentIteratorDataValue) => {
        let NameRef = [...storeList];
        const index = NameRef.findIndex((item) => item.storeId === StoreAddress.storeId);
        const { name, value } = CurrentIteratorDataValue.target;      

        NameRef[index] = { ...StoreAddress, [name]: value };
        setStoreList(NameRef);

        // NEW ADD 
        setSelectedCurrentElement(NameRef[index]);       
    }

    const handleinput = (StoreEntry) => {
        // the minute 'handleinput' is called, it automatically should be able to change or manipulate with the values of ParameterName
        if (StoreEntry.name === null || StoreEntry.name.match(/^ *$/) !== null || StoreEntry.address === null || StoreEntry.address.match(/^ *$/) !== null) {
            //the minute any of the attributes in the current entry has a null value or whitespace it wont go further
            console.log("ERROR!!!!!! EMPTY ENTRY!!!!!!!!")
        }
        else {
            console.log("SUCCESS ITS NOT AN EMPTY ENTRY, current array = ", StoreEntry)

            axios.put('https://onboardingtalent.azurewebsites.net/api/Stores/' + StoreEntry.storeId, StoreEntry);
             //UPDATES!!!!!!
        }
    }

    const handleinputDelete = (StoreEntry) => {
        // the minute 'handleinput' is called, it automatically should be able to change or manipulate with the values of ParameterName
        const NameRef = [...storeList];

        const index = NameRef.findIndex((item) => item.storeId === StoreEntry.storeId);

        //Removes the speceific element from the array
        NameRef.splice(index, 1);

        //updates it in the official array
        setStoreList(NameRef);

        //deletes it from the api/backend. The delete function only takees the url + the id of the entry in its url
        axios.delete('https://onboardingtalent.azurewebsites.net/api/Stores/' + StoreEntry.storeId);

        console.log("You have deleted this entry ->", StoreEntry)
               
    }

   
    const handleinputAdd = () => {
                
        //creating 2 new local vars that hold the hook variables array AddressRef & NameRef
        let NameRef = [...NewStoreName];
        let AddressRef = [...NewStoreAddress]
            

        if (AddressRef.length != 0 && NameRef.length != 0) {
            //condition to force the user to enter something in both fields before clicking on submit
        
            //completing the last element's address value and storing it in the NameRef array to hold the completed array
            NameRef[NameRef.length - 1].address = AddressRef[AddressRef.length - 1].address


            //For the post request, axios only needs the name & address, as the storeId is automatically generated
            //StoreEntry only holds the name & address of the current element from the Nameref array
            let StoreEntry = { "name": NameRef[NameRef.length - 1].name, "address": NameRef[NameRef.length - 1].address }

            console.log("YOU MUST ENTER INPUTS IN BOTH FIELDS, OTHERWISE THE CODE BREAKS, CURRENT ENTRY THAT WAS INPUTTED", StoreEntry)
            
            //adds it to the api/backend. The add function  takes the url & the current entry we are tying to add
            axios.post("https://onboardingtalent.azurewebsites.net/api/Stores", StoreEntry).then(response => {
                 //SINCE THIS IS AN ASYNC CALL, IT UPDATES ONLY AT ITS OWN TIME
                 //response.data gives the ONLY the full current element, 
                 //since the backend applies a unique id, that is what we need to get from the backend and attach it to our StoreEntry
                 //and update that to our storelist

                 //gets the storeid of the current entry FROM THE BACKEND and updates it on storeentry
                 StoreEntry = { "storeId": response.data.storeId, "name": NameRef[NameRef.length - 1].name, "address": NameRef[NameRef.length - 1].address }
                 //updates nameref
                 NameRef[NameRef.length - 1].storeId = response.data.storeId;
                 //updates it in the official array
                 setStoreList(NameRef);
            });
            
                //CLOSE THE MODAL
                setCreateModalOpen(false);


        }
        
    }

    const handleAddAddress = (StoreAddress, CurrentIteratorDataValue) => {
        //storename is defined to be an empty element with storeid, name & address non defined
        
        let NameRef = [...storeList];
              
        //updates the value given in the input
        const { name, value } = CurrentIteratorDataValue.target;

        //updates the name in the given array 
        var NewArrayEntry = { ...StoreAddress, [name]: value };

        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //NewStoreAddress ends up copying local var NameRef
        setNewStoreAddress(NameRef);

       
    }
    const handleAddName = (StoreName, CurrentIteratorDataValue) => {
        //storename is defined to be an empty element with storeid, name & address non defined
        
        let NameRef = [...storeList];
               
        //updates the value given in the input
        const { name, value } = CurrentIteratorDataValue.target;

        //updates the name  in the given array 
        var NewArrayEntry = { ...StoreName,  [name]: value };
        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //NewStoreName ends up copying local var NameRef
        setNewStoreName(NameRef)
              
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
                                onChange={(e) => handleAddName({ "storeId": '', "name": '', "address": ''}, e)} />

                        </Form.Field>
                        <Form.Field>
                            <Container textAlign='justified'><p>Address </p></Container>
                            <Form.Input placeholder='Address' width={12} fluid name="address" value={storeList.address}
                                onChange={(e) => handleAddAddress({ "storeId": '', "name": '', "address": ''}, e)} />
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
                                    open={open} //open attribute is set to the 'open' variable in the hook
                                    onClose={() => setOpen(false)}  //onClose attribute is called when a close event happens, & the hook is set to false 
                                    onOpen={() => setOpen(true)}    //onOpen attribute is called when a open event happens, & the hook is set to true
                                size={'tiny'}>
                                <Header content='Edit Store' />
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
                                <Button color='red' onClick={() => expandDeleteModal(Storez)}><Icon name='trash alternate' />Delete</Button>
                                <Modal open={DeleteModalOpen}
                                    onClose={() => setDeleteModalOpen(false)}
                                    onOpen={() => setDeleteModalOpen(true)}>
                                <Header content='Delete Store' />
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
            </Table>






        </div>
    );

}

export default Store;
