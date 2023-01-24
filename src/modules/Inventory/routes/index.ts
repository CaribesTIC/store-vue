import auth from "@/middleware/auth"
import admin from "@/middleware/admin"

export default [{
    path: "/movements",
    name: "movements",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
}, {
    path: "/summary",
    name: "summary",
    meta: { middleware: [auth, admin] },
    component: () => import("@/modules/Auth/components/InConstruction.vue").then(m => m.default),
}]
