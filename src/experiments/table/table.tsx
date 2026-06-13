// { id: 1, name: "AAPL", price: 100, email: "asd" }
// [{key: id, header: 'ID', sortable: true}]

import type React from "react";

export type TColumn<T, K extends keyof T = keyof T> = {
  key: K;
  header: string;
  sortable: boolean;
  renderColumn?: (value: T[K], row: T) => React.ReactNode;
};

type TProps<T> = {
  columns: TColumn<T>[];
  data: T[];
  rowId: (row: T) => React.Key;
};

const Table = <T,>({ data, columns, rowId }: TProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <td>{col.header}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={rowId(row)}>
              {columns.map((col) => {
                const { renderColumn } = col;
                return (
                  <td>
                    {renderColumn
                      ? renderColumn(row[col.key], row)
                      : String(row[col.key])}
                  </td>
                );
              })}{" "}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { Table };
