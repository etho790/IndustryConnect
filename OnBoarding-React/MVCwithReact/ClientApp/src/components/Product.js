
import React, { useEffect, useState } from 'react';
import axios from 'axios';      //for LINKING with backend
import { Table, Container, Button, Header, Modal, Icon, Form } from 'semantic-ui-react'  //added


const Product = (props) => {
   
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



    const [ProductList, setProductList] = useState([]);
    const [NewProductName, setNewProductName] = useState([]);
    const [NewProductPrice, setNewProductPrice] = useState([]);

    const searchItems = () => {
        //essentially retrieves data from the backend, the url is gotten from the swagger get function for each of the api

        axios.get("https://mvcwithreact20220405215755.azurewebsites.net/api/Products").then(response => {

            setProductList(response.data)
        });
    }

    useEffect(() => searchItems(), []   /*if [] run searchitems() once & dont run again*/);

    const handleChangeName = (ProductName, CurrentIteratorDataValue) => {
      
        let NameRef = [...ProductList];       

        const index = NameRef.findIndex((item) => item.productId === ProductName.productId);
       
        const { name, value } = CurrentIteratorDataValue.target;
       
        NameRef[index] = { ...ProductName, [name]: value };
        setProductList(NameRef);
        setSelectedCurrentElement(NameRef[index]);

       // console.log(NameRef)
    }

    const handleChangePrice = (ProductPrice, CurrentIteratorDataValue) => {
        let NameRef = [...ProductList];
        const index = NameRef.findIndex((item) => item.productId === ProductPrice.productId);
        const { name, value } = CurrentIteratorDataValue.target;

        NameRef[index] = { ...ProductPrice, [name]: value };
        setProductList(NameRef);
       
        setSelectedCurrentElement(NameRef[index]);

        //console.log(NameRef)
    }

    const handleinput = (ProductEntry) => {
        if (ProductEntry.name === null || ProductEntry.name.match(/^ *$/) !== null || ProductEntry.price === null || ProductEntry.price.toString().match(/^ *$/) !== null) {
            //the minute any of the attributes in the current entry has a null value or whitespace it wont go further
            console.log("ERROR!!!!!! EMPTY ENTRY!!!!!!!!")
        }
        else {

            console.log("SUCCESS ITS NOT AN EMPTY ENTRY, current array = ", ProductEntry)

            axios.put('https://mvcwithreact20220405215755.azurewebsites.net/api/Products/' + ProductEntry.productId, ProductEntry);
            //UPDATES!!!!!!

        }
    }

    const handleinputDelete = (ProductEntry) => {
        // the minute 'handleinput' is called, it automatically should be able to change or manipulate with the values of ParameterName
        const NameRef = [...ProductList];

        const index = NameRef.findIndex((item) => item.productId === ProductEntry.productId);

        //Removes the speceific element from the array
        NameRef.splice(index, 1);

        //updates it in the official array
        setProductList(NameRef);

        //deletes it from the api/backend. The delete function only takees the url + the id of the entry in its url
        axios.delete('https://mvcwithreact20220405215755.azurewebsites.net/api/Products/' + ProductEntry.productId);

        console.log("You have deleted this entry ->", ProductEntry)

    }

    const handleinputAdd = () => {
        //creating 2 new local vars that hold the hook variables array NameRef & PriceRef
        let NameRef = [...NewProductName];
        let PriceRef = [...NewProductPrice]

        if (PriceRef.length != 0 && NameRef.length != 0) {

            //completing the last element's Price value and storing it in the NameRef array to hold the completed array
            NameRef[NameRef.length - 1].price = PriceRef[PriceRef.length - 1].price


            //For the post request, axios only needs the name & price, as the productId is automatically generated
            //ProductEntry only holds the name & price of the current element from the Nameref array
            let ProductEntry = { "name": NameRef[NameRef.length - 1].name, "price": NameRef[NameRef.length - 1].price }
            console.log("YOU MUST ENTER INPUTS IN BOTH FIELDS, OTHERWISE THE CODE BREAKS, CURRENT ENTRY THAT WAS INPUTTED", ProductEntry)


            //adds it to the api/backend. The add function  takes the url & the current entry we are tying to add
            axios.post("https://mvcwithreact20220405215755.azurewebsites.net/api/Products", ProductEntry).then(response => {
                //ADDS!!!!!!
                //gets the productId of the current entry FROM THE BACKEND and updates it on ProductEntry
                ProductEntry = { "productId": response.data.productId, "name": NameRef[NameRef.length - 1].name, "price": NameRef[NameRef.length - 1].price }
                //updates nameref
                NameRef[NameRef.length - 1].productId = response.data.productId;
                //updates it in the official array
                setProductList(NameRef);

            });

            //CLOSE THE MODAL
            setCreateModalOpen(false);
        }
    }
    const handleAddPrice = (ProductPrice, CurrentIteratorDataValue) => {
        //ProductPrice is defined to be an empty element with productid, name & price non defined

        let NameRef = [...ProductList];
       
        //updates the value given in the input
        const { name, value } = CurrentIteratorDataValue.target;

        //updates the name in the given array
        var NewArrayEntry = { ...ProductPrice, [name]: value };

        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //NewProductPrice ends up copying local var NameRef
        setNewProductPrice(NameRef);

    }
    const handleAddName = (ProductName, CurrentIteratorDataValue) => {
        //ProductName is defined to be an empty element with productid, name & price non defined

        let NameRef = [...ProductList];
               
        //updates the value given in the input
        const { name, value } = CurrentIteratorDataValue.target;

        //updates the name in the given array
        var NewArrayEntry = { ...ProductName, [name]: value };
        //pushes the new array element into the variable that contains all the arrays elements NameRef
        NameRef.push(NewArrayEntry);

        //NewProductName ends up copying local var NameRef
        setNewProductName(NameRef)
    }




    return (
        <div >
            <p></p>
            <Modal
                onClose={() => setCreateModalOpen(false)}
                onOpen={() => setCreateModalOpen(true)}
                open={CreateModalOpen}
                trigger={<Button primary >New Product</Button>}
                size={'tiny'}>
                <Header content='Create Product' />
                <Modal.Content>
                    <Form >
                        <Form.Field>
                            <Container textAlign='justified'><div>Name </div></Container>
                            <Form.Input placeholder='Name' width={12} fluid name="name" value={ProductList.name}
                                onChange={(e) => handleAddName({ "productId": '', "name": '', "price": '' }, e)} />

                        </Form.Field>
                        <Form.Field>
                            <Container textAlign='justified'><p>Price </p></Container>
                            <Form.Input placeholder='Price' width={12} fluid name="price" value={ProductList.price}
                                onChange={(e) => handleAddPrice({ "productId": '', "name": '', "price": '' }, e)} />
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
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

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
                                                        /*the name attribute is important otherwise you cant pass values for submission*/
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
            </Table>
        </div>
    );
    }


export default Product;