import { type ColumnDef, flexRender } from '@tanstack/react-table';
import { type Table as TableProps } from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { ScrollArea } from '@/Components/ui/scroll-area';

interface ProductTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    table: TableProps<TData>;
}

export function ProductTable<TData, TValue>({
    columns,
    table,
}: ProductTableProps<TData, TValue>) {
    return (
        <>
            <ScrollArea className="h-[528px] w-full md:border rounded hidden md:block">
                <div className="hidden md:block overflow-hidden">
                    <Table>
                        <colgroup>
                            {columns.map((column, index) => (
                                <col
                                    key={index}
                                    style={{
                                        width: column.size
                                            ? `${column.size}px`
                                            : 'auto',
                                    }}
                                />
                            ))}
                        </colgroup>
                        <TableHeader className="bg-white z-10">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </ScrollArea>

            <div className="block md:hidden space-y-4">
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => {
                        const product = row.original as any;

                        return (
                            <div
                                key={row.id}
                                className="border rounded-lg p-4 shadow-md space-y-3 bg-card"
                            >
                                <div className="font-medium text-lg leading-tight text-card-foreground">
                                    {product.title}
                                </div>

                                <div className="grid grid-cols-1 gap-2 text-sm">
                                    <div className="flex gap-3 flex-wrap">
                                        <div className="flex gap-1">
                                            <span className="text-muted-foreground">
                                                Category:
                                            </span>
                                            <div className="border h-fit w-fit py-0.5 px-1 rounded-md text-xs bg-accent text-primary capitalize">
                                                {product.category}
                                            </div>
                                        </div>

                                        <div className="flex gap-1">
                                            <span className="text-muted-foreground">
                                                Price:
                                            </span>
                                            <div className="font-medium text-green-600">
                                                ${product.price}
                                            </div>
                                        </div>

                                        <div className="flex gap-1">
                                            <span className="text-muted-foreground">
                                                Stock:
                                            </span>
                                            <div className="font-medium">
                                                {product.stock} units
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        {(() => {
                                            const actionsCell = row
                                                .getVisibleCells()
                                                .find(
                                                    (cell) =>
                                                        cell.column.id ===
                                                        'action'
                                                );
                                            return actionsCell &&
                                                actionsCell.column.columnDef
                                                    .cell ? (
                                                <div>
                                                    {flexRender(
                                                        actionsCell.column
                                                            .columnDef.cell,
                                                        actionsCell.getContext()
                                                    )}
                                                </div>
                                            ) : null;
                                        })()}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        No results found.
                    </div>
                )}
            </div>
        </>
    );
}
