import React, { Component } from 'react'
import { connect } from "react-redux";
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route  } from "react-router-dom";
import ContactData from './ContactData/ContactData';


 class Checkout extends Component {
     CheckoutCancelledHandler = () =>{
        this.props.history.goBack()
     }
     CheckoutContinuedHandler = () =>{
         this.props.history.replace('/checkout/contact-data')
    }
  
    render() {
        return (
            <div>
                <CheckoutSummary 
                CheckoutCancelled={this.CheckoutCancelledHandler} 
                CheckoutContinued={this.CheckoutContinuedHandler}
                ingredients={this.props.ings}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData}/>
                
            </div>
        )
    }
}
const mapStateToProps = state => {
   return {
    ings:state.ingredients
   }
}
export default connect(mapStateToProps)(Checkout);
