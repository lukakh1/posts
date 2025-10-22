"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

interface HeroTableProps {
  columns: string[];
  data: Record<string, string>[];
}

export default function HeroTable({ columns, data }: HeroTableProps) {
  return (
    <Table
      aria-label="Data table"
      className="bg-transparent border border-slate-800 rounded-b-lg"
    >
      <TableHeader>
        {columns.map((column, index) => (
          <TableColumn
            key={index}
            className="text-white font-semibold bg-slate-800"
          >
            {column}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="border-b border-slate-800">
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex} className="text-slate-800">
                {row[column]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
