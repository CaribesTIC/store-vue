import auth from "@/middleware/auth"
import admin from "@/middleware/admin"

export default [{
    path: "/products",
    name: "products",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/Index.vue").then(m => m.default)
}, {
    path: "/products/create",
    name: "productCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/products/edit/:id(\\d+)",
    name: "productEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/articles",
    name: "articles",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
}, {
    path: "/categories",
    name: "categories",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
}, {
    path: "/marks",
    name: "marks",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
}]
