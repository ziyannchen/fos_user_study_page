// import { Component } from "react";

export default [
    {
      path: '/',
      component: '@/layouts',
      routes: [
        { path: '/', redirect: '/login'},
        {
          path: '/login', Name: 'Login',
          component: '@/pages/home/components/Login',
        },
        { path: '/home', name: 'Home',
          component: '@/pages/home/index',
        },
        { path: '/tutorial', name: 'Tutorial', 
          component: '@/pages/tutorial/index',
        },

        { path: '/eval', redirect: '/eval/demo'},
        { path: '/eval/demo', name: 'Demo', test: true,
          component: '@/pages/eval/index',
        },
        // { path: '/eval/full', name: 'Evaluation', test: false,
        //   component: '@/pages/eval/index',
        // },
        {
          component: '@/pages/404',
        },
      ],
    },
    {
      component: '@/pages/404',
    },
  ];