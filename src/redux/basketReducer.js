import { COUNT_BASKET, UPDATED_BASKET, FETCH_PRODUCTS } from "./types";

const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  count: 0,
  fetchedProducts: [],
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATED_BASKET:
      if (action.payload.length > 0) {
        localStorage.setItem("basket", JSON.stringify([...action.payload]));
        return { ...state, basket: [...action.payload] };
      } else {
        localStorage.removeItem("basket");
        return { ...state, basket: [] };
      }

    case COUNT_BASKET:
      let summa_1 = 0;
      if (action.basket.length > 0 && action.products.length > 0) {
        action.basket.map((item) => {
          summa_1 +=
            action.products.filter(
              (item1) => item1.productId == item.productId
            )[0].price * item.count;
        });
      }

      return { ...state, count: summa_1 };

    case FETCH_PRODUCTS:
      return { ...state, fetchedProducts: action.payload };

    default:
      return state;
  }
};
