import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "./modal"; // Import modal for adding students
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { CaretSortIcon, ChevronDownIcon, EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteStudent } from "@/app/api/delete-student";
import UpdateStudent from "@/app/api/update-student";
import Link from "next/link";

// Type for students
export type Student = {
  id: string;
  name: string;
  surname: string;
  sexe: string;
  birthday: string;
  classeId: string;
  parentId: string;
};

// Columns for the table
export const createColumns = (deleteStudentMutation: any, handleUpdateClick: (id: string) => void): ColumnDef<Student>[] => [
  { id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nomEl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Noms
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nomEl")}</div>,
  },
  {
    accessorKey: "prenomEl",
    header: "Prénoms",
    cell: ({ row }) => <div>{row.getValue("prenomEl")}</div>,
  },
  {
    accessorKey: "sexe",
    header: "Sexe",
    cell: ({ row }) => <div>{row.getValue("sexe")}</div>,
  },
  {
    accessorKey: "classe.nomCl", // Access path to class name
    header: "Classe",
    cell: ({ row }) => <div>{row.original.classe?.nomCl || "N/A"}</div>, // Using the class relation
  },
  {
    accessorKey: "parents.nomPar", // Access path to parent's name
    header: "Parent",
    cell: ({ row }) => <div>{row.original.parents?.nomPar || "N/A"}</div>, // Using the parent relation
  },
  {
    accessorKey: "Action", // Column for actions
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {/* Icon to view student */}
        <Link href={`/student/detailStudent/${row.original.id}`} passHref>
          <Button variant="ghost" size="icon">
            <EyeOpenIcon className="w-4 h-4 text-blue-600" />
          </Button>
        </Link>
        {/* Icon to edit student */}
        <Button variant="ghost" size="icon" onClick={() => handleUpdateClick(row.original.id)}>
          <Pencil1Icon className="w-4 h-4 text-yellow-500" />
        </Button>
        {/* Icon to delete student */}
        <Button variant="ghost" size="icon" onClick={() => deleteStudentMutation.mutate(row.original.id)}>
          <TrashIcon className="w-4 h-4 text-red-600" />
        </Button>
      </div>
    ),
  },
];

interface TableStudProps {
  onAddEleve: (newEleve: Student) => Promise<void>
}

export function TableStud({ onAddEleve }: TableStudProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  
  const deleteStudentMutation = useDeleteStudent(); // Hook for deleting students

  // Fetch student data using useQuery
  const { data: students = [], isLoading, error, refetch } = useQuery({
    queryKey: ['students'], // Query key
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/create-student'); // Replace with your API URL
        return response.data; // Return data
      } catch (err) {
        throw new Error('Erreur de chargement des étudiants'); // Throw error on failure
      }
    },
  });

  // Modal for editing a class
  const [selectedStudentId, setSelectedStudentId] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleUpdateClick = (studentId) => {
    setSelectedStudentId(studentId); // Store the selected student's ID
    setIsModalOpen(true);        // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);       // Close the modal
  };

  const columns = React.useMemo(() => createColumns(deleteStudentMutation, handleUpdateClick), [deleteStudentMutation]);

  const table = useReactTable({
    data: students,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer les noms..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mx-5"
        />
        {/* Modal for adding a student */}
        <Modal onAddEleve={onAddEleve} refetch={refetch} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Student table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun étudiant trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
