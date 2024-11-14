import { createWebHistory, createRouter } from "vue-router";
import ComHome from "@/components/ComHome.vue";
import ComShoes from "@/components/ComShoes.vue";
import ComTinTuc from "@/components/ComTinTuc.vue";
import ComAbout from "@/components/ComAbout.vue";
import ComLogin from "@/components/ComLogin.vue";
import ComRegister from "@/components/ComRegister.vue";
import ComContact from "@/components/ComContact.vue";
import ComProductDetail from "@/components/ComProductDetail.vue";
import ComCart from "@/components/ComCart.vue";
import ComThanhToan from "@/components/ComThanhToan.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: ComHome,
    },
    {
        path: "/shoes",
        name: "Shoes",
        component: ComShoes,
    },
    {
        path: "/news",
        name: "News",
        component: ComTinTuc,
    },
    {
        path: "/about",
        name: "About",
        component: ComAbout,
    },
    {
        path: "/login",
        name: "Login",
        component: ComLogin,
    },
    {
        path: "/register",
        name: "Register",
        component: ComRegister,
    },
    {
        path: "/contact",
        name: "Contact",
        component: ComContact,
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ComProductDetail,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: ComCart,
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: ComThanhToan
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;