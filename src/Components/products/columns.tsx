import type { Product } from '@/api/api';
import { type ColumnDef } from '@tanstack/react-table';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import { DataTableColumnHeader } from './coloumn-header';
import CategoryFilter from './filters/CategoryFilter';
import { PriceRangeFilter } from './filters/PriceRangeFilter';

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        size: 350,
        cell: ({ row }) => {
            const title = row.getValue('title') as string;
            return <div className="rounded-md text-xs">{title}</div>;
        },
    },
    {
        accessorKey: 'category',
        header: ({ column }) => {
            return (
                <div className='flex items-center'>
                    Category <CategoryFilter column={column} />
                </div>
            );
        },
        size: 150,
        filterFn: (row, id, value) => {
            if (!value || !Array.isArray(value) || value.length === 0) {
                return true;
            }
            const rowValue = row.getValue(id) as string;
            return value.includes(rowValue);
        },
        cell: ({ row }) => {
            const category = row.getValue('category') as string;
            return (
                <div className="border w-fit py-0.5 px-1 rounded-md text-xs bg-accent text-primary">
                    {category}
                </div>
            );
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <div className="flex items-center">
                <DataTableColumnHeader column={column} title="Price" />
                <PriceRangeFilter column={column} />
            </div>
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price);
            return <div className="rounded-md text-xs">{formatted}</div>;
        },
        filterFn: (row, id, value) => {
            // Handle price range filtering
            if (!value || !Array.isArray(value) || value.length !== 2) {
                return true;
            }
            const price = parseFloat(row.getValue(id));
            return price >= value[0] && price <= value[1];
        },
        size: 100,
    },
    {
        accessorKey: 'stock',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stock" />
        ),
        size: 80,
        cell: ({ row }) => {
            const stock = row.getValue('stock') as number;
            return <div className="rounded-md text-xs">{stock}</div>;
        },
    },
    {
        id: 'action',
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className="flex items-center gap-3 ">
                    <EditProduct product={product} />
                    <DeleteProduct id={product.id} />
                </div>
            );
        },
        size: 100,
    },
];
