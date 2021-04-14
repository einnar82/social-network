import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
require('./bootstrap');

window.Vue = require('vue');
Vue.use(Buefy)

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('index', require('./views/index.vue').default);

const app = new Vue({
    el: '#app'
});
