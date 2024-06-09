import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {loader as editProductLoader, action as editProductAction } from "./views/EditProduct";
import { action as deleteProductAction} from "./components/ProductDetails"; //otra forma de importar la acción



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: "/products/new",
                element: <NewProduct />,
                action: newProductAction 
            },
            {
                path: "/products/:id/edit", //ROA Pattern (Resource Oriented Architecture)
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: "/products/:id/delete",
                action: deleteProductAction
            }

        ]
    },
    {
        path: "/ecommerce",

    },
    {
        path: "/contact",

    }
])