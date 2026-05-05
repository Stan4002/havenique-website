import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}
interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  emptyMessage?: string;
}
export function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = 'No records found.'
}: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          color: 'var(--admin-text-light)',
          border: '1px dashed var(--admin-border)',
          borderRadius: '8px'
        }}>
        
        {emptyMessage}
      </div>);

  }
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col, i) =>
            <th key={i}>{col.label}</th>
            )}
            {(onEdit || onDelete) &&
            <th
              style={{
                width: '100px',
                textAlign: 'right'
              }}>
              
                Actions
              </th>
            }
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) =>
          <tr key={row.id || i}>
              {columns.map((col, j) =>
            <td key={j}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
            )}
              {(onEdit || onDelete) &&
            <td
              style={{
                textAlign: 'right'
              }}>
              
                  <div
                className="admin-table-actions"
                style={{
                  justifyContent: 'flex-end'
                }}>
                
                    {onEdit &&
                <button
                  onClick={() => onEdit(row)}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  title="Edit">
                  
                        <Edit size={16} />
                      </button>
                }
                    {onDelete &&
                <button
                  onClick={() => onDelete(row)}
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  title="Delete">
                  
                        <Trash2 size={16} />
                      </button>
                }
                  </div>
                </td>
            }
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}