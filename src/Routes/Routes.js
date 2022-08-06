import AdminAuth from "../Pages/Auth/AdminAuth";
import UserAuth from "../Pages/Auth/UserAuth";
import Cart from "../Pages/Cart";
import Error from "../Pages/Error";
import { Home } from "../Pages/Home";
import AddProduct from "../components/AddProduct";
import AdminProducts from "../Pages/AdminProducts";
import AddPromoCode from "../components/AddPromoCode";
import PromoCodes from "../Pages/PromoCode";
import EditPromoCode from "../components/EditPromoCode";
import AdminOrder from "../Pages/AdminOrder";
export const userRoutes = [
    { id: 0, path: "/", component: Home },
    { id: 1, path: "/cart", component: Cart },
    { id: 2, path: "/user-auth", component: UserAuth },
    { id: 3, path: "/admin-auth", component: AdminAuth },
];
export const adminRoutes = [
    { id: 0, path: "/admin-products", component: AdminProducts },
    { id: 1, path: "/add-product", component: AddProduct },
    { id: 2, path: "/add-promo-codes", component: AddPromoCode },
    { id: 3, path: "/promo-codes", component: PromoCodes },
    { id: 4, path: "/edit-promo-code/:id", component: EditPromoCode },
    { id: 5, path: "/orders", component: AdminOrder },
];
export const errorRoute = [{ id: 0, path: "*", component: Error }];