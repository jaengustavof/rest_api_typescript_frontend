import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types";
import { coerce, safeParse, number, parse } from "valibot";
import { toBoolean } from "../utils";
import axios from "axios";

/*Es el tipo de dato que tenemos en NewProduct.tsx. 
    const data = Object.fromEntries(await request.formData());
    Si pasamoe el mouse encima de "data" en la línea 10, veremos que es de tipo "ProductData"  
*/
type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data : ProductData) => {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        
        });
        
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            });
            
        } else {
            throw new Error('Invalid Data')
        }
   } catch (error) {
        console.log(error)
   }
}

export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)//En este es el esquema que represenata un array de productos Product_s_Schema
        if(result.success) {
            return result.output
        } else {
            throw new Error('There was an error fetching the data')
        }
    } catch (error) {
        console.log(error)
    }
}

//Hacemos referencia a la interfaz Product que se encuentra en types/index.ts.  La función getProductById recibe un id de tipo number y retorna un objeto de tipo Product
export const getProductById = async (id : Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data) //En este caso es el esquema que representa un producto ProductSchema

        if(result.success) {
            return result.output
        } else {
            throw new Error('There was an error fetching the data')
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (id : Product['id'], data : ProductData) => {
    try {
        const NumberSchema = coerce(number(), Number); //Coerce es una función que convierte un tipo de dato a otro. En este caso, convierte un string a un número
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        });

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id : Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async (id : Product['id']) => {
   
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}