import { Link, useLoaderData, ActionFunctionArgs } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
    const products = await getProducts()
    
    return products
}

export async function action({request} : ActionFunctionArgs) { //Se llama desde dentro de ProductDetails.tsx. es la accion que se ejecuta cuando se hace click en el boton de actualizar. El la del type submit

    const data = Object.fromEntries(await request.formData())
    await updateAvailability(+data.id)
    return {}
}

const Products = () => {

    const data = useLoaderData() as Product[]
    
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Products
                </h2>
                <Link 
                    to="/products/new"
                    className="rounded-md bg-indigo-600 p-3 text-sn font-bold text-white hover:bg-indigo-500"
                >
                    Add New Product
                </Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(product => (
                            <ProductDetails
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Products;
