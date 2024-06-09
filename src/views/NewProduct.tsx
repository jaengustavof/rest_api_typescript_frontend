import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { addProduct } from '../services/ProductService';
import ProductForm from '../components/ProductForm';

//Esta es la accion del FORM. La accion se ejecuta cuando se envia el formulario. Se importa desde el router.tsx y se asigna a la vista /products/new

//siempre que tengamos un action, el request es de tipo ActionFunctionArgs
export const action = async ({request} : ActionFunctionArgs) => {

    const data = Object.fromEntries(await request.formData());

    let error = '';

    if(Object.values(data).includes('')){
        error = 'All fields are required';
    }

    if(error.length) {
        return error
    }

    await addProduct(data);

    return redirect('/')
}

const NewProduct = () => {

    const error = useActionData() as string;

    return (
        <>
        <div className="flex justify-between">
            <h2 className="text-4xl font-black text-slate-500">
                Add New Product
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
            <ProductForm />

            <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                value="Add Product"
                />
        </Form>
    </>
    );
}

export default NewProduct;