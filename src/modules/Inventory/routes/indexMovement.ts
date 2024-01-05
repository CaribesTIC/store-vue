import auth from "@/middleware/auth"
import admin from "@/middleware/admin"

export default [{
    path: "/movements",
    name: "movements",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Inventory/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/movements/create",
    name: "movementCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Inventory/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/movements/edit/:id(\\d+)",
    name: "movementEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Inventory/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}]
