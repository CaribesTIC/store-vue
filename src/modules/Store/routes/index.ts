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
    name: "inputs-create",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/inputs/edit/:id(\\d+)",
    name: "inputs-edit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/outputs",
    name: "outputs",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/outputs/create",
    name: "outputs-create",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/outputs/edit/:id(\\d+)",
    name: "outputs-edit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
},{
    path: "/input-reverses",
    name: "input-reverses",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/input-reverses/create",
    name: "input-reverses-create",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/input-reverses/edit/:id(\\d+)",
    name: "input-reverses-edit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/output-reverses",
    name: "output-reverses",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Index.vue").then(m => m.default)
}, {
    path: "/output-reverses/create",
    name: "output-reverses-create",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
}, {
    path: "/output-reverses/edit/:id(\\d+)",
    name: "output-reverses-edit",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Store/views/Movement/Tabs.vue").then(m => m.default),
    props: true
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
