import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import SecondPage from '../views/SecondPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      title: 'Home page',
      path: '/',
      component: Home
    },
    {
      name: 'create',
      title: 'Create',
      path: '/second',
      component: SecondPage,
    },
      {
      name: 'second',
      path: '/second/:_id',
      component: SecondPage,
      props: {
        _id: true
       }
      },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
