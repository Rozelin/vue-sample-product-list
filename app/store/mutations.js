import * as types from './mutation-types';
import Vue from "vue";

export default {
    [types.SET_PRODUCT_LIST] (state, products = []) {
        Vue.set(state, 'productList', products);
    },
    [types.SET_CURRENT_PRODUCT_LIST] (state, products = []) {
        Vue.set(state, 'currentProductList', products);
    },
    [types.SET_PRODUCT_WISHLIST] (state, { productId, value }) {
        const product = state.productList.find(({ _id }) => _id === productId);
        const currentProduct = state.currentProductList.find(({ _id }) => _id === productId);
        product.isFav = value;
        currentProduct.isFav = value;
    },
    [types.SET_CURRENT_SORTING] (state, sortingValue) {
        state.currentSorting = sortingValue;
    },
    [types.SET_AVAILABLE_FILTERS] (state, { type, value, input = '' }) {
        if (input === 'range') {
            state.filters.available[type] = [...value];
        }
    },
    [types.SET_CURRENT_FILTERS] (state, { type, value, input }) {
        if (input === 'range') {
            // For range input - replace current array value with a new one
            state.filters.current[type] = [...value];
        } else {
            // For other filter types - check if it ia already selected
            const index = state.filters.current[type].indexOf(value);
            // If filter already in state - remove it
            if (index >= 0) {
                state.filters.current[type].splice(index, 1);
            } else {
                // Otherwise add value to state
                state.filters.current[type].push(value);
            }
        }
    }
};
