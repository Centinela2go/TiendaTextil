import { useEffect, useReducer, useState } from "react";

import Pagination from "../pagination/Pagination";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

function Datatable({ data, columns, pageInit }) {
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {},
    state: {
      pagination: pagination,
    },
    onPaginationChange: setPagination,
  });

  const handleChange = (value) => {
    table.setPageIndex(value - 1);
  };
  
  return (
    <div className="p-2 bg-white shadow-sm shadow-black">
      <div className="relative">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs 3xl:text-sm font-medium text-gray-500 uppercase tracking-wider"
                    style={{
                      textAlign: header.column.columnDef.textAlign,
                      width: header.column.columnDef.width,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-indigo-100 ">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm 3xl:text-lg font-medium text-gray-900"
                    style={{ textAlign: cell.column.columnDef.textAlign }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      <div className="flex justify-end">
        <div className="pt-8">
          <Pagination
            totalPages={table.getPageCount()}
            handleChange={handleChange}
            currentPageStart={pageInit}
          />
        </div>
      </div>
      <div className="h-4" />
    </div>
  );
}

export default Datatable;
