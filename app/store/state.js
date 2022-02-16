export default {
    productList: [],
    currentProductList: [],
    filters: {
        available: {
            price: [0, 0],
            size: ['small', 'medium', 'large', 'xlarge']
        },
        current: {
            price: [],
            size: []
        }
    },
    currentSorting: null,
}
