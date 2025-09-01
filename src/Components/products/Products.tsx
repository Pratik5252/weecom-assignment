import { useProducts } from '@/hooks/useProductQuery';
import { useState } from 'react';
import { ProductTable } from './ProductTable';
import { columns } from './columns';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ProductTablePagination } from './ProductTablePagination';
import { Input } from '../ui/input';

const Products = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const limit = pagination?.pageSize;
    const page = pagination?.pageIndex;

    const [searchQuery, setSearchQuery] = useState('');

    const { data, isLoading, error } = useProducts(limit, page, searchQuery);

    const totalProduct: number = data?.total ?? 0;

    const table = useReactTable({
        data: data?.products,
        columns,
        rowCount: totalProduct,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page
    };

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <ProductTable columns={columns} table={table} />
            <ProductTablePagination table={table} />
        </div>
    );
};

export default Products;
