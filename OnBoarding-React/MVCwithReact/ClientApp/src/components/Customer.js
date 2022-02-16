
import React, { Component } from 'react';

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
        const url = "https://api.randomuser.me/";   //this is the data we are getting
        const response = await fetch(url);            //fetches data here
        const data = await response.json();             //this call returns us the JSON data
        this.setState({ person: data.results[0], loading: false })      //here person will be filled by the first element in the data var 
                                                         //and so this person object is stored in state


        //enables us to see the variables in the url in our console on our browser, easier way to seeing data
        //in the log you see arrays in the first array (result), 
        //in order to output anything it has to be the specific variable in each array that you're calling
        console.log(data.results);                      

    }

    render() {
        return(
            <div>
                {  //if this state is loading or is person is null execute the first div in brackets,
                    // ':' <--otherwise execute the next bit of code which is showing the persons first name
                        this.state.loading || !this.state.person ?
                            (
                                <div> loading.........</div>
                            ) :     
                            <div>
                                <div>{this.state.person.name.first}</div>
                                <img src={this.state.person.picture.large} />
                                <div>{this.state.person.registered.age}</div>
                            </div>


                }                
            </div>
            );
    }



}