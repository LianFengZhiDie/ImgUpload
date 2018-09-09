import routerView1 from '@/layout/index1.vue'
import Test from '@/pages/Test/index.vue'
export default [
    {
        path: '/demo',
        name: 'demo',
        component: routerView1,
        redirect: '/demo/components',
        meta: {
          breadTitle: 'demo'
        },
        children: [
          {
            path: 'components',
            name: 'components',
            component: Test,
            meta: {
              breadTitle: '组件'
            }
          }
        ]
    }
]

