import { type Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';


interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn('flex items-end gap-2', className)}>
            <div
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
                className="!p-0 hover:bg-none flex cursor-pointer select-none items-center gap-1.5 rounded-md transition-colors"
            >
                {title}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
        </div>
    );
}
