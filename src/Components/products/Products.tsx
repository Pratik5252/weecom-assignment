import { useProducts } from '@/hooks/useProductQuery';
import { useState } from 'react';
import { ProductTable } from './ProductTable';
import { columns } from './columns';
import {
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    type ColumnFiltersState,
    type SortingState,
    getSortedRowModel,
} from '@tanstack/react-table';
import { ProductTablePagination } from './ProductTablePagination';
import { Input } from '../ui/input';
import AddProduct from './AddProduct';

const Products = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const { data, isLoading, error } = useProducts(0, 1, '');

    const table = useReactTable({
        data: data?.products || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search products..."
                    value={
                        (table
                            .getColumn('title')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(e) =>
                        table.getColumn('title')?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm"
                />
                <AddProduct />
            </div>

            <ProductTable columns={columns} table={table} />
            <ProductTablePagination table={table} />
        </div>
    );
};

export default Products;
