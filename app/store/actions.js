import * as types from './mutation-types';
import config from 'config';

const sortList = (sortValue, productList) => {
    if (!sortValue) return productList;
    sortValue = sortValue.split(':');
    const sortAttribute = sortValue[0];
    let sortedList = [];
    if (sortAttribute === 'name') {
        sortedList = productList.sort((a,b) => {
            if(a[sortAttribute] < b[sortAttribute]) { return -1; }
            if(a[sortAttribute] > b[sortAttribute]) { return 1; }
            return 0;
        })
    } else {
        sortedList = productList.sort((a,b) => {
            if (sortValue[1] === 'asc') return a[sortAttribute] - b[sortAttribute];
            return b[sortAttribute] - a[sortAttribute];
        });
    }
    return sortedList;
}

export default {
    async setProductList({ state, commit, dispatch }) {
        // Fetch and set product list only once
        if (state.productList.length) return;
        let products = []
        await fetch('/src/data/products.json')
            .then(resp => resp.json())
            .then(data => {
                data.forEach(item => {
                    // Strip price data from currency sign for better data operation
                    item.price = item.price.replace('$', '');
                    if (item.oldPrice) item.oldPrice = item.oldPrice.replace('$', '');
                    if (item.savings) item.savings = item.savings.replace('$', '');
                    return item;
                })
                products = data
            });

        // Set fetched data to a product list
        // TODO: Implement data caching on browser level
        commit(types.SET_PRODUCT_LIST, products);
        // Initially current product list includes all products, so just assign them
        commit(types.SET_CURRENT_PRODUCT_LIST, products);

        // Set initial values for range type filters
        dispatch('setRangeInitialValues', config.filter_attributes)
    },

    updateProductList({ commit }, products) {
        commit(types.SET_CURRENT_PRODUCT_LIST, products);
    },

    addToWishlist({ commit }, payload) {
        commit(types.SET_PRODUCT_WISHLIST, payload);
    },

    sortProducts({ commit, getters }, sortValue) {
        commit(types.SET_CURRENT_SORTING, sortValue)
        const sortedList = sortList(sortValue, getters.getCurrentProductList);
        commit(types.SET_CURRENT_PRODUCT_LIST, sortedList);
    },

    setRangeInitialValues({ commit, getters }, filters) {
        filters.map(filter => {
            if (filter.input_type === 'range') {
                // Get initial range values - the lowest and the highest value from product list
                const attrName = filter.type;
                // Assumed that range filters include Number or stripped numeric String values
                // So it is safe to convert string to number
                const sortedValues = getters.getAllProducts
                    .map(product => product[attrName])
                    .sort((a,b) => a - b);
                // Assign first and last value of an array as new range filter value
                filter.value = [+sortedValues[0], +sortedValues[sortedValues.length - 1]];
                filter.input = filter.input_type;
                commit(types.SET_AVAILABLE_FILTERS, filter);
                // Initially current value of range filter is identical to it's range value
                commit(types.SET_CURRENT_FILTERS, filter);
            }
        });
    },

    filterProducts({ state, commit, getters, dispatch }, filter) {
        // Set filters to current filters
        commit(types.SET_CURRENT_FILTERS, filter);

        // Apply every current filter to initial product list
        // TODO: Use Lodash _.cloneDeep instead
        let filteredProducts = JSON.parse(JSON.stringify(getters.getAllProducts));

        for (let filterKey of Object.keys(getters.getCurrentFilters)) {
            const filterOptions = config.filter_attributes.find(({ type }) => type === filterKey);
            const currentFilter = state.filters.current[filterKey];
            if (filterOptions.input_type === 'range') {
                filteredProducts = filteredProducts.filter(product => {
                    return +product[filterOptions.type] >= currentFilter[0] && +product[filterOptions.type] <= currentFilter[1];
                });
            }
            if (filterOptions.input_type === 'checkbox') {
                if (!currentFilter.length) return filteredProducts;
                filteredProducts = filteredProducts.filter(product => {
                    return currentFilter.some(filterKey => {
                        return filterOptions.option_labels[filterKey] === product[filterOptions.type];
                    })
                });
            }

            // Sort if sorting value is set
            const sortedResult =  sortList(getters.getCurrentSorting, filteredProducts);
            // Commit updated product list
            commit(types.SET_CURRENT_PRODUCT_LIST, sortedResult);
        }
    }
}
