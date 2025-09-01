import type { Product } from '@/api/api';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Product>[] = [
    { accessorKey: 'title', header: 'Title' },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price);
            return <div>{formatted}</div>;
        },
    },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'stock', header: 'Stock' },
];
