import auth from "@/middleware/auth"
import admin from "@/middleware/admin"

export default [/*{
    path: "/inputs",
    name: "inputs",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
},*/ {
    path: "/outputs",
    name: "outputs",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
},{
    path: "/input-reverses",
    name: "input-reverses",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
}, {
    path: "/output-reverses",
    name: "output-reverses",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
}]
