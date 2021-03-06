import React, { Component } from 'react';
import { connect } from "react-redux";
import Button, {  } from "../../../Components/UI/Button/Button";
import  classes from "./Contact.module.css";
import axios from "../../../axios-orders";
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';



 class ContactData extends Component {
     state = {
        orderForm : {
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                } ,
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipcode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value:'',
                    validation: {
                        required:true,
                        minLength:6,
                        maxLength:6
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your E-mail'
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    value:'',
                    validation:{},
                    valid:true
                }
        },
        formIsValid:false,
         loading:false
     }
     orderHandler = (event) => {
         this.setState({loading:true})
         const formData = {}
         for(let formID in this.state.orderForm){
             formData[formID] = this.state.orderForm[formID].value
         }
        const order ={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData
            
        }
        axios.post('/orders.json', order)
        .then(response=>{
            this.setState({loading:false});
            this.props.history.push('/')
        })
        .catch(err=>{
            this.setState({loading:false})

        });
     }
     inputChangedHandler = (event, inputID) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement= updatedOrderForm[inputID]
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched=true;
        updatedOrderForm[inputID] = updatedFormElement;

        let formIsValid = true;
        for(let inputID in updatedOrderForm){
            formIsValid =  updatedOrderForm[inputID].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
     }
     checkValidity (value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid
        }
        if(rules.minLength){
            isValid = value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length<=rules.maxLength && isValid;
        }
        return isValid
     }
    render() {
        let formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        console.log(formElementsArray)
        let form = ( 
        <form onSubmit={this.orderHandler} >
            
            {formElementsArray.map(formElement=>(
                <Input key={formElement.id}
                 elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)} />
            ))}
            <Button btnType='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
        </form>
        );
        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData} >
                <h1>Enter your contact data</h1>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings:state.ingredients,
        price:state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);
