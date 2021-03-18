import React, { Component } from 'react';
import Aux from "../../HOC/Auxillary/Auxillary";
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import Spinner from '../../Components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
export class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        console.log('hello')
        console.log(this.props)
        axios.get('https://react-burger-project-64c88-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
              this.setState({ingredients:response.data})  
            }).catch(error=>{
                this.setState({error:true})
            })
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
     purchaseContinueHandler=()=>{
        // alert('You Continue Your Order')
        
        const queryParams = [];
        for (const i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        });
    }
    purchaseCancelHandler=()=>{
        this.setState({loading:true})
        this.setState({purchasing:false})
    }
    render() {
        const desableInfo ={
            ...this.state.ingredients
        };
        for (const key in desableInfo) {
            desableInfo[key] = desableInfo[key] <=0
        }
        let orderSummary = null;
        let burger= this.state.error ? <p>Ingeredients Can't be Loaded</p> :<Spinner/>
        
        if(this.state.ingredients){
        burger = (
            <Aux>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientLessed={this.removeIngredientHandler}
                    disabled={desableInfo}
                    ordered={this.purchasingHandler}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </Aux>
        );
        orderSummary = <OrderSummary 
                        price={this.state.totalPrice.toFixed(2)}
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />
    }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return (
           <Aux>
               <Modal show={this.state.purchasing}
                 modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
               </Modal>
               {burger}
               
           </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
