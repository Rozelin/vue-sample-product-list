export default {
    baseUrl: 'http://localhost:8080/',
    imgPlaceholder: 'assets/placeholder.svg',
    currencySign: '$',
    filter_attributes: [
        {
            type: 'size',
            value:  ['xlarge', 'large', 'medium', 'small'],
            label: 'Size',
            input_type: 'checkbox',
            option_labels: {
                xlarge: 'XL - Extra large',
                large: 'L - Large',
                medium: 'M - Medium',
                small: 'S - Small'
            }
        },
        {
            type: 'price',
            value: [0, 0],
            label: 'Price',
            input_type: 'range',
            option_labels: {
                min: 'Minimum',
                max: 'Maximum'
            }
        }
    ],
    sorting_attributes: [
        {
            value: 'price:asc',
            label: 'Price Ascending'
        },
        {
            value: 'price:dsc',
            label: 'Price Descending'
        },
        {
            value: 'name:asc',
            label: 'Name Ascending'
        }
    ]
};
