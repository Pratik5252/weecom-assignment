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
import { Skeleton } from '../ui/skeleton';
import { Bug } from 'lucide-react';
// import { PriceRangeFilter } from './filters/PriceRangeFilter';

const Products = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const { data, isLoading, error } = useProducts(0, 1);

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

    if (isLoading)
        return (
            <div className="w-full h-fit py-2 px-6 space-y-4">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-1/3" />
                    {/* <Skeleton className="h-8 w-1/6" /> */}
                </div>
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-10 w-1/2" />
            </div>
        );
    if (error)
        return (
            <div className="flex flex-col items-center justify-center py-10">
                <Bug size={44} className="text-destructive mb-2" />
                <span className="text-lg font-semibold text-destructive">
                    Failed to load products.
                </span>
                <span className="text-sm text-muted-foreground">
                    {error?.message || 'An unexpected error occurred.'}
                </span>
            </div>
        );

    return (
        <div className="w-full h-fit py-2 px-6">
            <div className="mt-1 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-semibold">Welcome!</h1>
                    <h3 className="text-md font-medium mt-1 text-muted-foreground">
                        Browse and manage your products below
                    </h3>
                </div>
                {/* <div className="">Total Product</div> */}
            </div>
            <div className="h-fit flex-col items-center py-4">
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
                        <div className="sm:hidden flex gap-2">
                            <CategoryFilter
                                column={table.getColumn('category')!}
                            />
                            {/* <PriceRangeFilter
                                column={table.getColumn('price')!}
                            /> */}
                        </div>
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
