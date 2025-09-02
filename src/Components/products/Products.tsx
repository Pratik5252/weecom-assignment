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
    getFacetedUniqueValues,
    getFacetedRowModel,
    getFacetedMinMaxValues,
} from '@tanstack/react-table';
import { ProductTablePagination } from './ProductTablePagination';
import { Input } from '../ui/input';
import AddProduct from './AddProduct';
import CategoryFilter from './filters/CategoryFilter';

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
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
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

    const priceRange = table.getColumn('price')?.getFacetedMinMaxValues();
    console.log(priceRange);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;

    return (
        <div className="w-full h-fit py-2 px-6">
            <div className="mt-2">
                <div>
                    <h1 className="text-4xl font-semibold">Welcome!</h1>
                    <h3 className="text-md font-medium mt-1 text-muted-foreground">
                        Browse and manage your products below
                    </h3>
                </div>
                <div className="">Total Product</div>
            </div>
            <div className="h-fit lex flex-col items-center py-4">
                <div className="flex items-center justify-between gap-2 w-full mb-2">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search products..."
                            value={
                                (table
                                    .getColumn('title')
                                    ?.getFilterValue() as string) ?? ''
                            }
                            onChange={(e) =>
                                table
                                    .getColumn('title')
                                    ?.setFilterValue(e.target.value)
                            }
                            className="max-w-sm"
                        />
                        <CategoryFilter column={table.getColumn('category')!} />
                    </div>
                    <AddProduct />
                </div>
                <ProductTable columns={columns} table={table} />
                <ProductTablePagination table={table} />
            </div>
        </div>
    );
};

export default Products;
