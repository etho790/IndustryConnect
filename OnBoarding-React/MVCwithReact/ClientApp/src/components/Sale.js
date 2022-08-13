
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
    const [Customer, setCustomer] = useState([])
    const [Product, setProduct] = useState([])
    const [Store, setStore] = useState([])

    const [NewSoldDate, setNewSoldDate] = useState([]);
    const [NewCustomer, setNewCustomer] = useState([]);
    const [NewProduct, setNewProduct] = useState([]);
    const [NewStore, setNewStore] = useState([]);
   

    const searchItems = () => {
        //essentially retrieves data from the backend, the url is gotten from the swagger get function for each of the api
        
        axios.get("https://mvcwithreact20220405215755.azurewebsites.net/api/Customers").then(response => {

             //if your hook is an array, you can populate it in the normal method without using the set function
            for (var i = 0; i < response.data.length; i++) {
                Customer.push({ key: response.data[i].customerId, text: response.data[i].name, value: response.data[i].name });

            }            
            //console.log("The Customer array is now filled", Customer)
           
        });
        axios.get("https://mvcwithreact20220405215755.azurewebsites.net/api/Stores").then(response => {

             //if your hook is an array, you can populate it in the normal method without using the set function
            for (var i = 0; i < response.data.length; i++) {
                Store.push({ key: response.data[i].storeId, text: response.data[i].name, value: response.data[i].name });

            }
            //console.log("The store array is now filled", Store)
           

        });
        axios.get("https://mvcwithreact20220405215755.azurewebsites.net/api/Products").then(response => {

            //if your hook is an array, you can populate it in the normal method without using the set function
            for (var i = 0; i < response.data.length; i++) {
                Product.push({ key: response.data[i].productId, text: response.data[i].name, value: response.data[i].name });

            }
            //console.log("The Product array is now filled", Product)

        });

        axios.get("https://mvcwithreact20220405215755.azurewebsites.net/api/Sales").then(response => {

            setSaleEntry(response.data)     //<-- has the entire array in salesentry            
        });

    }

    //useeffect enables us to run code on every render, so anytime theres a render the code in here is activated
    useEffect(() => searchItems(), []   /*if [] run searchitems() once & dont run again*/);



    const handleChangeDateSold = (CurrentElement, CurrentIteratorDataValue) => {

        let NameRef = [...SaleEntry];

        const index = NameRef.findIndex((item) => item.id === CurrentElement.id);
        
        NameRef[index] = { ...CurrentElement, 'dateSold': CurrentIteratorDataValue.target.value };
        setSaleEntry(NameRef);
        //SAVES!!!!!!!!!!

        // add the current element in the hook
        setSelectedCurrentElement(NameRef[index]);
       // console.log(SaleEntry)
    }

   
    const handleChangeProduct = (CurrentElement, CurrentIteratorDataValue) => {
      
        let NameRef = [...SaleEntry];
    
        const index = NameRef.findIndex((item) => item.id === CurrentElement.id);
     
        NameRef[index] = { ...CurrentElement, 'productId': CurrentIteratorDataValue.target.outerText };
        setSaleEntry(NameRef);
        //SAVES!!!!!!!!!!

        // add the current element in the hook
        setSelectedCurrentElement(NameRef[index]);

    }
    
    const handleChangeCustomer = (CurrentElement, CurrentIteratorDataValue) => {
        let NameRef = [...SaleEntry];
        const index = NameRef.findIndex((item) => item.id === CurrentElement.id);
        NameRef[index] = { ...CurrentElement, 'customerId': CurrentIteratorDataValue.target.outerText };
        setSaleEntry(NameRef);
        //SAVES!!!!!!!!!!

        //
        setSelectedCurrentElement(NameRef[index]);
    }

    const handleChangeStore = (CurrentElement, CurrentIteratorDataValue) => {
        let NameRef = [...SaleEntry];
        const index = NameRef.findIndex((item) => item.id === CurrentElement.id);
        NameRef[index] = { ...CurrentElement, 'storeId': CurrentIteratorDataValue.target.outerText };
        setSaleEntry(NameRef);
        //SAVES!!!!!!!!!!

        // 
        setSelectedCurrentElement(NameRef[index]);
    }



    const handleinput = (SalesEntry) => {
        // the minute 'handleinput' is called, it automatically should be able to change or manipulate with the values of ParameterName
        if (SalesEntry.productId === null || SalesEntry.productId.match(/^ *$/) !== null || SalesEntry.customerId === null || SalesEntry.customerId.match(/^ *$/) !== null || SalesEntry.storeId === null || SalesEntry.storeId.match(/^ *$/) !== null || SalesEntry.dateSold === null || SalesEntry.dateSold.toString().match(/^ *$/) !== null) {
            //the minute any of the attributes in the current entry has a null value or whitespace it wont go further
            console.log("ERROR!!!!!! EMPTY ENTRY!!!!!!!!")
        }
        else {
            console.log("SUCCESS ITS NOT AN EMPTY ENTRY, current array = ", SalesEntry)
            axios.put('https://mvcwithreact20220405215755.azurewebsites.net/api/Sales/' + SalesEntry.id, SalesEntry);
            //UPDATES!!!!!!
        }
    }

    const handleinputDelete = (CurrentEntry) => {
        // the minute 'handleinput' is called, it automatically should be able to change or manipulate with the values of ParameterName
        const NameRef = [...SaleEntry];

        const index = NameRef.findIndex((item) => item.id === CurrentEntry.id);

        //Removes the speceific element from the array
        NameRef.splice(index, 1);

        //updates it in the official array
        setSaleEntry(NameRef);

        //deletes it from the api/backend. The delete function only takees the url + the id of the entry in its url
        axios.delete('https://mvcwithreact20220405215755.azurewebsites.net/api/Sales/' + CurrentEntry.id);

        console.log("You have deleted this entry ->", CurrentEntry)
    }


    const handleinputAdd = () => {

        //creating 4 new local vars that hold the hook variables arrays 
        let ProductArray = [...NewProduct]
        let CustomerArray = [...NewCustomer]
        let StoreArray = [...NewStore]
        let DateSoldArray = [...NewSoldDate];       
              

        if (StoreArray.length != 0 && DateSoldArray.length != 0 && CustomerArray.length != 0 && ProductArray.length!=0) {
            //condition to force the user to enter something in all fields before clicking on submit

            //combining all bits in the element in each array into the ProductArray
            ProductArray[ProductArray.length - 1].customerId = CustomerArray[CustomerArray.length - 1].customerId
            ProductArray[ProductArray.length - 1].storeId = StoreArray[StoreArray.length - 1].storeId
            ProductArray[ProductArray.length - 1].dateSold = DateSoldArray[DateSoldArray.length - 1].dateSold
           
            console.log("THIS IS THE PENDING ENTRY WAITING TO BE PUSHED!!!!!!", ProductArray)
            
            
            //For the post request, axios only needs the all attributes apart from the Id as it's automatically generated
            //CurrentEntry only holds the productId, customerId, storeId & dateSold of the current element 
            let CurrentEntry = {
                "productId": ProductArray[ProductArray.length - 1].productId, "customerId": ProductArray[ProductArray.length - 1].customerId,
                "storeId": ProductArray[ProductArray.length - 1].storeId, "dateSold": ProductArray[ProductArray.length - 1].dateSold
            }

            console.log("YOU MUST ENTER INPUTS IN BOTH FIELDS, OTHERWISE THE CODE BREAKS, CURRENT ENTRY THAT WAS INPUTTED", CurrentEntry)

            //adds it to the api/backend. The add function  takes the url & the current entry we are tying to add
            axios.post("https://mvcwithreact20220405215755.azurewebsites.net/api/Sales", CurrentEntry).then(response => {
                //SINCE THIS IS AN ASYNC CALL, IT UPDATES ONLY AT ITS OWN TIME
                //response.data gives the ONLY the full current element, 
                //since the backend applies a unique id, that is what we need to get from the backend and attach it to our CurrentEntry
                //and update that to our storelist

                //gets the id of the current entry FROM THE BACKEND and updates it on SaleEntry
                CurrentEntry = {
                    "id": response.data.id, "productId": ProductArray[ProductArray.length - 1].productId, "customerId": ProductArray[ProductArray.length - 1].customerId,
                    "storeId": ProductArray[ProductArray.length - 1].storeId, "dateSold": ProductArray[ProductArray.length - 1].dateSold }
                //updates ProductArray
                ProductArray[ProductArray.length - 1].id = response.data.id;
                //updates it in the official array
                setSaleEntry(ProductArray);
            });           

            //CLOSE THE MODAL
            setCreateModalOpen(false);
        }
    }



    const handleAddDateSold = (DateEntry, CurrentIteratorDataValue) => {        
        //DateEntry is an entry that is manually defined but with empty values
        let NameRef = [...SaleEntry];

        //updates the value given in the input
        const { name, value } = CurrentIteratorDataValue.target;
       
        //updates the Date in the given array 
        var NewArrayEntry = { ...DateEntry, [name]: value };
        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //setNewSoldDate ends up copying local var NameRef
        setNewSoldDate(NameRef)

        console.log("date entry", value)
    }
    
    const handleAddCustomer = (CustomerEntry, CurrentIteratorDataValue) => {
        //CustomerEntry is an entry that is manually defined but with empty values
        let NameRef = [...SaleEntry];

        //updates the customer in the given array 
        var NewArrayEntry = { ...CustomerEntry, "customerId": CurrentIteratorDataValue.target.outerText };
        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //setNewCustomer ends up copying local var NameRef
        setNewCustomer(NameRef)
        console.log("customers entry",NameRef)
    }
    
    const handleAddProduct = (ProductEntry, CurrentIteratorDataValue) => {
        //ProductEntry is an entry that is manually defined but with empty values
        let NameRef = [...SaleEntry];

        //updates the product in the given array 
        var NewArrayEntry = { ...ProductEntry, "productId": CurrentIteratorDataValue.target.outerText };
        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //setNewProduct ends up copying local var NameRef
        setNewProduct(NameRef)
        console.log("products entry", NameRef)
    }
    
    const handleAddStore = (StoreEntry, CurrentIteratorDataValue) => {
        //DateEntry is an entry that is manually defined but with empty values
        let NameRef = [...SaleEntry];

        //updates the store in the given array 
        var NewArrayEntry = { ...StoreEntry, "storeId": CurrentIteratorDataValue.target.outerText };
        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //setNewStore ends up copying local var NameRef
        setNewStore(NameRef)
        console.log("stores entry", NameRef)
    }
    

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
                            <Container textAlign='justified'><div>Date Sold </div></Container>
                            <Form.Input placeholder='dd-mm-yyyy' width={6} fluid name="dateSold" value={SaleEntry.dateSold} type="date" data-date-format="DD MMMM YYYY"
                                onChange={(e) => handleAddDateSold({ "id": '', "productId": '', "customerId": '', "storeId": '', "dateSold": '' }, e)} />

                        </Form.Field>
                        <Form.Field>                           
                            <Container textAlign='justified'><p>Customer </p></Container>                        
                            <Dropdown
                            placeholder='John'
                            fluid
                            width={12}
                            search
                            selection                                
                            options={Customer}
                            onChange={(e) => handleAddCustomer({ "id": '', "productId": '', "customerId": '', "storeId": '', "dateSold": '' }, e)}
                              
                            />
                        </Form.Field>
                        <Form.Field>
                            <Container textAlign='justified'><p>Product </p></Container>
                            <Dropdown
                                placeholder='Pear'
                                fluid
                                width={12}
                                selection
                                options={Product}
                                onChange={(e) => handleAddProduct({ "id": '', "productId": '', "customerId": '', "storeId": '', "dateSold": '' }, e)}
                               />
                        </Form.Field>
                        <Form.Field>
                            <Container textAlign='justified'><p>Store </p></Container>
                            <Dropdown
                                placeholder='CountDown'
                                fluid
                                width={12}
                                selection
                                options={Store}
                                onChange={(e) => handleAddStore({ "id": '', "productId": '', "customerId": '', "storeId": '', "dateSold": '' }, e)}
                            />
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
                        <Table.HeaderCell col>Customer</Table.HeaderCell>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Store</Table.HeaderCell>
                        <Table.HeaderCell>Date Sold</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        
                    </Table.Row>
                </Table.Header>

                <Table.Body >
                    {SaleEntry.map(Salez => (
                        <tr key={Salez.id}>
                            <Table.Cell >{Salez.customerId}</Table.Cell>
                            <Table.Cell >{Salez.productId}</Table.Cell>
                            <Table.Cell >{Salez.storeId}</Table.Cell>
                            <Table.Cell >{Salez.dateSold}</Table.Cell>
                            <Table.Cell>
                                <Button color='yellow' onClick={() => expandModal(Salez)} ><Icon name='calendar check' /> Edit</Button>
                                <Modal
                                    open={open} //open attribute is set to the 'open' variable in the hook
                                    onClose={() => setOpen(false)}  //onClose attribute is called when a close event happens, & the hook is set to false 
                                    onOpen={() => setOpen(true)}    //onOpen attribute is called when a open event happens, & the hook is set to true
                                    size={'tiny'}>
                                    <Header content='Edit Sales' />
                                    <Modal.Content>
                                        {
                                            <Form >
                                                <Form.Field>
                                                    <Container textAlign='justified'><div>Date Sold </div></Container>                                                  
                                                    <Form.Input placeholder='dd-mm-yyyy' width={6} fluid name="dateSold" value={SelectedCurrentElement && SelectedCurrentElement.dateSold} type="date" data-date-format="DD MMMM YYYY"
                                                        onChange={handleChangeDateSold.bind(this, SelectedCurrentElement)} />

                                                </Form.Field>


                                                <Form.Field>
                                                    <Container textAlign='justified'><p>Customer </p></Container>
                                                    <Dropdown
                                                        placeholder='John'
                                                        fluid
                                                        width={12}
                                                        search
                                                        selection
                                                        options={Customer}
                                                        onChange={handleChangeCustomer.bind(this, SelectedCurrentElement)}/>
                                                </Form.Field>

                                                <Form.Field>
                                                    <Container textAlign='justified'><p>Product </p></Container>
                                                    <Dropdown
                                                        placeholder='Pear'
                                                        fluid
                                                        width={12}
                                                        selection
                                                        options={Product}
                                                        onChange={handleChangeProduct.bind(this, SelectedCurrentElement)}
                                                          />
                                                </Form.Field>

                                                <Form.Field>
                                                    <Container textAlign='justified'><p>Store </p></Container>
                                                    <Dropdown
                                                        placeholder='CountDown'
                                                        fluid
                                                        width={12}
                                                        selection
                                                        options={Store}
                                                        onChange={handleChangeStore.bind(this, SelectedCurrentElement)}                                                    />
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
                                <Button color='red' onClick={() => expandDeleteModal(Salez)}><Icon name='trash alternate' />Delete</Button>
                                <Modal open={DeleteModalOpen}
                                    onClose={() => setDeleteModalOpen(false)}
                                    onOpen={() => setDeleteModalOpen(true)}>
                                    <Header content='Delete Sales' />
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


export default Sales;




