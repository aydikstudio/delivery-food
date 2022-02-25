import {COUNT_BASKET, UPDATED_BASKET, FETCH_PRODUCTS} from './types';
import axios from "axios";
export function updatedBasket(goods) {
    
    return {
        type: UPDATED_BASKET,
        payload: goods || []
    }
}


export function countProductsBasket(basket,products) {
    
    return {
        type: COUNT_BASKET,
        products: products || [],
        basket: basket || []
    }
}


export function fetchedProducts(basket) {

  
    const formData = new FormData();
    formData.append("type", "getproductsbybasket");
    formData.append("basket", JSON.stringify(basket));
    

    return async dispatch => {
        await axios
      .post(
        "http://delivery-food/api/managedata.php", formData)
      .then((res) => {
        if (res.data != null) {
            dispatch({type: FETCH_PRODUCTS, payload: res.data});
            dispatch({type: COUNT_BASKET, basket, products: res.data});
        }
      });
    }
}