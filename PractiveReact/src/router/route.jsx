// import Home from "../views/index.js"
import Order from "../views/order.js"
import Evaluate from "../views/evaluate.js"
import Merchant from "../views/merchant.js"
import Detail from "../components/detail.js"

const Route = [
    {
        path: "/index/order",
        component: Order
    },
    {
    path: "/index",
    component: Home,
    children: [{
        path: "/index/order",
        component: Order
    }, {
        path: "/index/evaluate",
        component: Evaluate
    }, {
        path: "/index/merchant",
        component: Merchant
    }]
}, {
    path: "/detail",
    component: Detail
}]

export default Route