export default {
    getAllProducts: state => state.productList,
    getCurrentProductList: state => state.currentProductList,
    getCurrentSorting: state => state.currentSorting,
    getAvailableFilters: state => state.filters.available,
    getCurrentFilters: state => state.filters.current,
};
