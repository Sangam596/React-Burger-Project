import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import Aux from "../../HOC/Auxillary/Auxillary";
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import Spinner from '../../Components/UI/Spinner/Spinner';


export class BurgerBuilder extends Component {
    state = {
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        // console.log('hello')
        // console.log(this.props)
        // axios.get('https://react-burger-project-64c88-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //       this.setState({ingredients:response.data})  
        //     }).catch(error=>{
        //         this.setState({error:true})
        //     })
    }
    
    
    updatePurchasableState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey]
        })
        .reduce((sum, el)=>{
            return sum+el;
        },0)
        return sum >0;
    }
   
    purchasingHandler =() =>{
        this.setState({purchasing:true})
    }
     purchaseContinueHandler=()=>{
        this.props.history.push('./checkout');
    }
    purchaseCancelHandler=()=>{
        this.setState({loading:true})
        this.setState({purchasing:false})
    }
    render() {
        const desableInfo ={
            ...this.props.ings
        };
        for (const key in desableInfo) {
            desableInfo[key] = desableInfo[key] <=0
        }
        let orderSummary = null;
        let burger= this.state.error ? <p>Ingeredients Can't be Loaded</p> :<Spinner/>
        
        if( this.props.ings ){
        burger = (
            <Aux>
               <Burger ingredients={this.props.ings} />
               <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientLessed={this.props.onIngredientRemoved}
                    disabled={desableInfo}
                    ordered={this.purchasingHandler}
                    price={this.props.price}
                    purchasable={this.updatePurchasableState(this.props.ings)}
                />
            </Aux>
        );
        orderSummary = <OrderSummary 
                        price={this.props.price.toFixed(2)}
                        ingredients={this.props.ings}
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

const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price:state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded:(ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved:(ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
