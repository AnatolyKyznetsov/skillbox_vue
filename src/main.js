import Vue from 'vue';
import App from './App.vue';

import { hello, bye } from './messages';
import showMessage from './showMessage';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

showMessage(hello);
showMessage(bye);
