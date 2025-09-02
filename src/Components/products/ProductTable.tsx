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
        <div className="overflow-hidden rounded ">
            <ScrollArea className="h-[520px] w-full border rounded">
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
                    <TableHeader className="sticky top-0 z-10 bg-white z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
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
            </ScrollArea>
        </div>
    );
}
