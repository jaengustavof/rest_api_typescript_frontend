import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { Product } from '../types';
import { updateProduct, getProductById } from '../services/ProductService';
import ProductForm from '../components/ProductForm';

export const loader = async ({params} : LoaderFunctionArgs) => {
    
    if(params.id !== undefined) {
        const product = await getProductById(+params.id);
        if(!product) {
            return redirect('/')
           // throw new Response('', {status: 404, statusText: 'Product not found'})
        }

        return product
    }
 
}

//Esta es la accion del FORM. La accion se ejecuta cuando se envia el formulario. Se importa desde el router.tsx y se asigna a la vista /products/new

//siempre que tengamos un action, el request es de tipo ActionFunctionArgs
export const action = async ({request, params} : ActionFunctionArgs) => {

    const data = Object.fromEntries(await request.formData());

    let error = '';

    if(Object.values(data).includes('')){
        error = 'All fields are required';
    }

    if(error.length) {
        return error
    }

    if(params.id !== undefined) {
        await updateProduct(+params.id, data);
    }
    

    return redirect('/')
}

const availabilityOptions = [
    { name: 'Available', value: true},
    { name: 'Not Available', value: false}
]

const EditProduct = () => {
    const product = useLoaderData() as Product;
    const error = useActionData() as string;

    return (
        <>
        <div className="flex justify-between">
            <h2 className="text-4xl font-black text-slate-500">
                Edit Product
            </h2>
            <Link 
                to="/"
                className="rounded-md bg-indigo-600 p-3 text-sn font-bold text-white hover:bg-indigo-500"
            >
                Back to Products
            </Link>
        </div>

        {/*Si error es verdadero, se muestra el mensaje de error*/}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form
            className="mt-10"    
            method='POST'   
        >
            <ProductForm
                product={product}
            />

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="availability"
                >Availability:</label>
                <select 
                    id="availability"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="availability"
                    defaultValue={product?.availability.toString()}
                >
                    {availabilityOptions.map(option => (
                    <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
            </div>

            <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                value="Edit Product"
                />
        </Form>
    </>
    );
}

export default EditProduct;
