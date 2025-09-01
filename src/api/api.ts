export type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    stock: number;
};

export type ProductResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

//All products
export const getProducts = async (
    limit: number,
    page: number,
    searchQuery: string = ""
): Promise<ProductResponse> => {
    const skip = (page - 1) * limit;
    console.log(searchQuery);

    const baseUrl = searchQuery
        ? `https://dummyjson.com/products/search?q=${searchQuery}&`
        : `https://dummyjson.com/products`;
    try {
        const response = await fetch(
            `${baseUrl}?limit=${limit}&skip=${skip}&select=title,price,category,stock`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

//Add product
export const addProduct = async (product: Partial<Product>) => {
    try {
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`Failed to add product: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

//Update a product
export const updateProduct = async (id: number, product: Partial<Product>) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`Failed to update product: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

//Delete a product
export const deleteProduct = async (id: number) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete product: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
