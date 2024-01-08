import auth from "@/middleware/auth"
import admin from "@/middleware/admin"

export default [{
    path: "/inputs",
    name: "inputs",
    meta: { middleware: [auth, admin] },    
    component: () => import("@/modules/Store/views/Movement/Index.vue").then(m => m.default),
    props: true
}, {
    path: "/inputs/create",
    name: "inputsCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/inputs/edit/:id(\\d+)",
    name: "inputsEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/outputs",
    name: "outputs",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Index.vue").then(m => m.default)
},{
    path: "/input",
    name: "input-reverses",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/output",
    name: "output-reverses",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/movements",
    name: "movements",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/movements/create",
    name: "movementCreate",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/movements/edit/:id(\\d+)",
    name: "movementEdit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/summary",
    name: "summary",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
}]
