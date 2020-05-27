import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Shops from '@/components/Shops';
import Employees from '@/components/Employees';
import Goods from '@/components/Goods';
import Prices from '@/components/Prices';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  {
      path: '/shop',
      name: 'Shops',
      component: Shops,
    },
  {
      path: '/employee',
      name: 'Employees',
      component: Employees,
    },
  {
      path: '/good',
      name: 'Goods',
      component: Goods,
    },
  {
      path: '/price',
      name: 'Prices',
      component: Prices,
    },
  ],
mode: 'history',
});
