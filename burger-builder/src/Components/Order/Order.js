import React from 'react';
import classes from "./Order.module.css";

const Order = props => {
    const ingredients = [];
    for(let ingredientName in props.ingredients ){
        ingredients.push({
            name:ingredientName,
           amount: props.ingredients[ingredientName]
        }
        );
    }
    const ingeredientsOutput = ingredients.map(ig => {
        return <span 
                style={{
                    display:'inline-block',
                    textTransform:'capitalize',
                    marginLeft:'30px ',
                    border:'1px solid #ccc',
                    padding:'5px'
                    
                }}        
        key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingeredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}
export default Order;