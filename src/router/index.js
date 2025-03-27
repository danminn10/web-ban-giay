import ComAbout from "@/components/pages/ComAbout.vue";
import ComCart from "@/components/pages/ComCart.vue";
import ComContact from "@/components/pages/ComContact.vue";
import ComHome from "@/components/pages/ComHome.vue";
import ComLogin from "@/components/pages/ComLogin.vue";
import ComProductDetail from "@/components/pages/ComProductDetail.vue";
import ComRegister from "@/components/pages/ComRegister.vue";
import ComShoes from "@/components/pages/ComShoes.vue";
import ComThanhToan from "@/components/pages/ComThanhToan.vue";
import ComTinTuc from "@/components/pages/ComTinTuc.vue";
import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        name: "Home",
        component: ComHome
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