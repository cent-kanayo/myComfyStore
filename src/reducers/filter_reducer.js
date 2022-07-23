import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => {
      return p.price;
    });
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      filtered_product: [...action.payload],
      all_product: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_product } = state;
    let tempProduct = [...filtered_product];
    if (sort === "price-lowest") {
      tempProduct = tempProduct.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProduct = tempProduct.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProduct = tempProduct.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProduct = tempProduct.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_product: tempProduct };
  }
  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_product } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_product];

    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }

    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }

    tempProducts = tempProducts.filter((product) => {
      return product.price <= price;
    });
    return { ...state, filtered_product: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
