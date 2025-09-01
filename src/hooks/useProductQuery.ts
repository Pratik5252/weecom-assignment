import {
    addProduct,
    deleteProduct,
    getProducts,
    updateProduct,
    type Product,
    type ProductResponse,
} from '@/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProducts = (
    limit: number,
    page: number,
    searchQuery: string = ''
) => {
    return useQuery<ProductResponse>({
        queryKey: ['products', limit, page],
        queryFn: () => getProducts(limit, page, searchQuery),
    });
};

export const useAddProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product: Partial<Product>) => addProduct(product),
        onSuccess: (newProduct) => {
            queryClient.setQueriesData(
                { queryKey: ['products'] },
                (oldData: ProductResponse) => {
                    if (!oldData) return oldData;
                    const totalProduct = oldData.total;
                    return {
                        ...oldData,
                        products: [
                            { ...newProduct, id: totalProduct + 1 },
                            ...oldData.products,
                        ],
                        total: totalProduct + 1,
                    };
                }
            );
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            id,
            product,
        }: {
            id: number;
            product: Partial<Product>;
        }) => updateProduct(id, product),
        onSuccess: (updatedProduct) => {
            queryClient.setQueriesData(
                { queryKey: ['products'] },
                (oldData: ProductResponse) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        products: oldData.products.map((p) =>
                            p.id === updatedProduct.id ? updatedProduct : p
                        ),
                    };
                }
            );
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: (_, id) => {
            queryClient.setQueriesData(
                { queryKey: ['products'] },
                (oldData: ProductResponse) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        products: oldData.products.filter((p) => p.id !== id),
                        total: oldData.total - 1,
                    };
                }
            );
        },
    });
};
