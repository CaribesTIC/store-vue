import auth from "@/middleware/auth"
import admin from "@/middleware/admin"

export default [{
    path: "/articles",
    name: "articles",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Article/views/Article/Index.vue").then(m => m.default)
}, {
    path: "/articles/create",
    name: "articleCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Article/views/Article/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/articles/edit/:id(\\d+)",
    name: "articleEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Article/views/Article/Tabs.vue").then(m => m.default),
    props: true
}]
