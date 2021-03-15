import React, { Component } from 'react';
import Aux from "../../HOC/Auxillary";
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from "../../Components/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
export class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }
    updatePurchasableState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey]
        })
        .reduce((sum, el)=>{
            return sum+el;
        },0)
        this.setState({purchasable: sum >0});
    }
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const  updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
    }
    removeIngredientHandler =(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0)
        {
            return;
        }
        const updatedCount = oldCount - 1;
        const  updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
        this.updatePurchasableState(updatedIngredients); 
    }
    purchasingHandler =() =>{
        this.setState({purchasing:true})
    }
    render() {
        const desableInfo ={
            ...this.state.ingredients
        };
        for (const key in desableInfo) {
            desableInfo[key] = desableInfo[key] <=0
                
            }
        
        return (
           <Aux>
               <Modal show={this.state.purchasing}>
                   <OrderSummary ingredients={this.state.ingredients}/>
               </Modal>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls 
               ingredientAdded={this.addIngredientHandler}
               ingredientLessed={this.removeIngredientHandler}
               disabled={desableInfo}
               ordered={this.purchasingHandler}
               price={this.state.totalPrice}
               purchasable={this.state.purchasable}/>
           </Aux>
        )
    }
}

export default BurgerBuilder;