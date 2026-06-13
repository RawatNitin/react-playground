import { Table, type TColumn } from "./table";

type TableRow = {
  id: number;
  name: string;
  price: number;
  email: string;
};

const data: TableRow[] = [
  { id: 1, name: "AAPL", price: 100, email: "asd" },
  { id: 2, name: "MSFT", price: 200, email: "asds" },
  { id: 3, name: "GOOG", price: 300, email: "hghyt" },
];

const columns: TColumn<TableRow>[] = [
  {
    key: "id",
    header: "ID",
    sortable: true,
  },
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "price", header: "Created", sortable: true },
];

export const TableViewer = () => {
  return <Table data={data} columns={columns} />;
};
