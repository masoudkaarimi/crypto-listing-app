"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useState } from "react";

import { DataTablePagination } from "@/components/common/data-table-pagination";
import { DataTableViewOptions } from "@/components/common/data-table-view-options";
import { Input } from "@/components/ui/input";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const PAGE_SIZE = 10;
const STICKY_COL_1_WIDTH = "w-[60px]";
const STICKY_COL_2_OFFSET = "left-[50px]";
const STICKY_COL_2_WIDTH = "max-w-[180px]";

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm pl-9"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-md border relative h-148 overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isRank = header.column.id === "cmcRank";
                  const isName = header.column.id === "name";
                  const isSticky = isRank || isName;

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "sticky top-0 z-20 bg-background",
                        isSticky && "z-30",
                        isRank && `left-0 ${STICKY_COL_1_WIDTH}`,
                        isName && `${STICKY_COL_2_OFFSET} ${STICKY_COL_2_WIDTH}`
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isRank = cell.column.id === "cmcRank";
                    const isName = cell.column.id === "name";
                    const isSticky = isRank || isName;

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          isSticky && "sticky z-10 bg-background",
                          isRank && `left-0 ${STICKY_COL_1_WIDTH}`,
                          isName &&
                            `${STICKY_COL_2_OFFSET} ${STICKY_COL_2_WIDTH}`
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
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
        </table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
