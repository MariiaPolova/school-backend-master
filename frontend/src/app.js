import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import router from './router'
import mixin from './mixin'
import App from './components/App'


import 'regenerator-runtime/runtime';

Vue.use(ElementUI, { locale });

 export const eventBus = new Vue();

Vue.mixin(mixin);

const app = new Vue({
  router,
  ...App
});

export { app, router };