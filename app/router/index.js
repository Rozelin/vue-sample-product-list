import ProductList from '@app/pages/ProductList';
import ContactForm from '@app/pages/ContactForm';

const routes = [
    { path: '*', redirect: '/' },
    { name: 'productList', path: '/', component: ProductList },
    { name: 'contactForm', path: '/contact-form', component: ContactForm },
];

export default routes;
