import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Shops from '@/components/Shops';
import Stocks from '@/components/Stocks';
import Goods from '@/components/Goods';
import GoodsInStock from '@/components/GoodsInStock';

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
      path: '/stock',
      name: 'Stocks',
      component: Stocks,
    },
  {
      path: '/good',
      name: 'Goods',
      component: Goods,
    },
  {
      path: '/goods_in_stock',
      name: 'GoodsInStock',
      component: GoodsInStock,
    },
  ],
mode: 'history',
});
