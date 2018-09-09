import routerView from '@/layout/index.vue'
import {
    Index
} from '@/pages/ImgUpload'

export default [
    {
        path: '/imgUpload',
        name: 'imgUpload',
        component: routerView,
        redirect: '/imgUpload/index',
        meta: {
          breadTitle: '图片上传'
        },
        children: [
            {
                path: 'index',
                name: 'index',
                component: Index,
                meta: {
                  breadTitle: '图片上传'
                }
            }
        ]
    }
]
