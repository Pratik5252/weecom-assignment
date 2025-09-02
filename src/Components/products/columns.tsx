import type { Product } from '@/api/api';
import { type ColumnDef } from '@tanstack/react-table';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import { DataTableColumnHeader } from './coloumn-header';

export const columns: ColumnDef<Product>[] = [
    { accessorKey: 'title', header: 'Title', size: 350 },
    {
        accessorKey: 'category',
        header: 'Category',
        size: 150,
        filterFn: (row, id, value) => {
            if (!value || !Array.isArray(value) || value.length === 0) {
                return true;
            }
            const rowValue = row.getValue(id) as string;
            return value.includes(rowValue);
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price);
            return <div>{formatted}</div>;
        },
        size: 100,
    },
    {
        accessorKey: 'stock',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stock" />
        ),
        size: 80,
    },
    {
        id: 'action',
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className="flex items-center gap-3">
                    <EditProduct product={product} />
                    <DeleteProduct id={product.id} />
                </div>
            );
        },
        size: 100,
    },
];
