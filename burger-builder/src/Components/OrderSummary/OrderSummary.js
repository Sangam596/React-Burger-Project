import React from 'react';
import Aux from '../../HOC/Auxillary/Auxillary';
import Button from "../UI/Button/Button";


 const OrderSummary = props => {
     const ingredientSummary = Object.keys(props.ingredients)
     .map(igkey=>{
         return <li key={igkey}>
             <span style={{textTransform:'capitalize'}} >{igkey}</span>: {props.ingredients[igkey]}
             </li>
     })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue To Checkout?</p>
            <Button btnType='Success'
             clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button 
            btnType='Danger' 
            clicked={props.purchaseContinued } >CONTINUE</Button>
        </Aux>
    )
}
export default OrderSummary;