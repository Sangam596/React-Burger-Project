import React from 'react';
import Aux from '../../HOC/Auxillary';


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
            <ui>
                {ingredientSummary}
            </ui>
            <p>Continue To Checkout?</p>
        </Aux>
    )
}
export default OrderSummary;