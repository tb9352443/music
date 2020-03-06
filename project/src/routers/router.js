import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommand from '../components/recommand/recommand'
import Singers from '../components/singers/singers'
import Rank from '../components/rank/rank'
import Search from '../components/search/search'
import Detail from '../components/detail/detail.vue'
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        // {
        //     path:'/singer',
        //     component:Singer,
        // },
        {
            path:'/singers',
            component:Singers,
            children:[{
                path:'detail',
                name:'detail',
                component:Detail
            },
            ]
        },
        {
            path:'/search',
            component:Search
        },
        {
            path:'/rank',
            component:Rank
        },
        {
            path:'/recommand',
            component:Recommand
        },
        {
            path:'/',
            redirect:'/recommand'
        }
    ]
})
export default router