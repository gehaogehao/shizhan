import index from 'pages/index/index.vue'
import sort from 'pages/sort/sort.vue'
import shop from 'pages/shop/shop.vue'
import car from 'pages/car/car.vue'
import personal from 'pages/personal/personal.vue'
import search from 'pages/search/search.vue'
export default [
    {path:'/index',component:index,meta:{isFooter:true}},
    {path:'/sort',component:sort,meta:{isFooter:true}},
    {path:'/shop',component:shop,meta:{isFooter:true}},
    {path:'/car',component:car,meta:{isFooter:true}},
    {path:'/personal',component:personal,meta:{isFooter:false}},
    {path:'/search',component:search,meta:{isFooter:false}},
    {path:'/',redirect:'/index'}
]