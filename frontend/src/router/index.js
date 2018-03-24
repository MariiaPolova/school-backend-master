import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import CreateUser from '../views/CreateUser';
import CreateProduct from '../views/CreateProduct';
import CreateOrder from '../views/CreateOrder';
import UserTable from '../views/UserTable';
import ProductTable from '../views/ProductTable';
import OrderTable from '../views/OrderTable';
import OrderSummary from '../views/OrderSummary';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      title: 'Home',
      path: '/',
      component: Home
    },

      // Users routes
    {
      name: 'users',
      title: 'Users',
      path: '/users',
      component: UserTable,
    },
    {
      name: 'createUser',
      path: '/users/create',
      component: CreateUser,
    },
    {
      name: 'updateUser',
      path: '/users/create/:_id',
      component: CreateUser,
      props: {
          _id: true
      }
    },

      // Product routes
    {
      name: 'products',
      title: 'Products',
      path: '/products',
      component: ProductTable,
    },
    {
      name: 'createProduct',
      path: '/create',
      component: CreateProduct,
    },
    {
      name: 'updateProduct',
      path: '/create/:_id',
      component: CreateProduct,
      props: {
          _id: true
      }
    },
      // Order routes
    {
      name: 'orders',
      title: 'Orders',
      path: '/orders',
      component: OrderTable,
    },
    {
      name: 'updateOrder',
      path: '/create/:_id',
      component: CreateOrder,
      props: {
          _id: true
        }
    },
    {
      name: 'createOrder',
      path: '/create',
      component: CreateOrder,
    },
    {
        name: 'viewOrder',
        path: '/view',
        component: OrderSummary,
        props: {
            id: true,
            products: true
        }
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
