import auth from "@/middleware/auth"
import admin from "@/middleware/admin"

export default [{
    path: "/products",
    name: "products",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/Product/Index.vue").then(m => m.default)
}, {
    path: "/products/create",
    name: "productCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/Product/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/products/edit/:id(\\d+)",
    name: "productEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/Product/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/categories",
    name: "categories",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/Category/Index.vue").then(m => m.default)
},{
    path: "/marks",
    name: "marks",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/Mark/Index.vue").then(m => m.default)
}, {
    path: "/marks/create",
    name: "marksCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/Mark/CreateOrEdit.vue").then(m => m.default),
    props: true
}, {
    path: "/marks/edit/:id(\\d+)",
    name: "marksEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Product/views/Mark/CreateOrEdit.vue").then(m => m.default),
    props: true
}]
