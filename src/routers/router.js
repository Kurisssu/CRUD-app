import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        alias: "/products",
        name: "products",
        component: () => import("../components/ProductsList.vue")
    },
    {
        path: "/products/:id",
        name: "product-details",
        component: () => import("../components/Product.vue")
    },
    {
        path: "/add",
        name: "add",
        component: () => import("../components/addProduct.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;