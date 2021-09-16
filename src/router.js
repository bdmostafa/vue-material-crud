import Vue from 'vue';
import Router from 'vue-router';
import Category from './components/Categories.vue';
import Posts from './components/Posts.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'posts',
            component: Posts
        },
        {
            path: '/category',
            name: 'category',
            component: Category
        }
    ]
})