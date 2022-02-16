import Vue from 'vue';
import App from './App.vue';
import store from './store';
import config from 'config';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';
import VueLazyload from 'vue-lazyload';
import routes from './router';

Vue.use(VueRouter);
Vue.use(Meta);
Vue.use(VueLazyload, {
    attempt: 2,
    preLoad: 1.5,
    error: config.imgPlaceholder,
    loading: config.imgPlaceholder,
})

Vue.filter('capitalize', (value) => {
    return value.slice(0,1).toUpperCase() + value.slice(1).toLowerCase();
});

Vue.filter('price', (value) => {
    return `${config.currencySign}${value}`;
});

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
