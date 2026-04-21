import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  /** If true, this column is hidden on mobile card view */
  mobileHide?: boolean;
}

interface AdminTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
  onRowClick?: (row: T, index: number) => void;
  rowClassName?: (row: T, index: number) => string;
  "data-ocid"?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AdminTable<T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No records found.",
  pageSize = 10,
  onRowClick,
  rowClassName,
  "data-ocid": dataOcid,
}: AdminTableProps<T>) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const start = (page - 1) * pageSize;
  const paginatedData = data.slice(start, start + pageSize);

  // Visible columns for mobile card view (filter out utility-only cols like select checkbox)
  const visibleCols = columns.filter((c) => !c.mobileHide && c.header !== "");

  return (
    <div className="flex flex-col gap-3" data-ocid={dataOcid}>
      {/* ── Desktop / tablet: traditional table ── */}
      <div className="hidden sm:block overflow-x-auto rounded-md border border-border bg-card">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="border-b border-border bg-muted/60">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                    col.headerClassName,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              (["sk0", "sk1", "sk2", "sk3"] as const).map((sk) => (
                <tr key={sk} className="border-b border-border last:border-0">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-muted-foreground"
                  data-ocid={`${dataOcid}.empty_state`}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => {
                const globalIdx = start + idx + 1;
                return (
                  <tr
                    key={globalIdx}
                    data-ocid={`${dataOcid}.row.${globalIdx}`}
                    className={cn(
                      "border-b border-border last:border-0 transition-colors duration-150",
                      onRowClick && "cursor-pointer hover:bg-muted/40",
                      rowClassName?.(row, idx),
                    )}
                    onClick={() => onRowClick?.(row, idx)}
                    onKeyDown={(e) => {
                      if ((e.key === "Enter" || e.key === " ") && onRowClick) {
                        e.preventDefault();
                        onRowClick(row, idx);
                      }
                    }}
                    tabIndex={onRowClick ? 0 : undefined}
                    role={onRowClick ? "button" : undefined}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 py-3 text-foreground",
                          col.className,
                        )}
                      >
                        {col.render
                          ? col.render(row, idx)
                          : String(row[col.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile: card stack ── */}
      <div className="sm:hidden flex flex-col gap-2">
        {isLoading ? (
          (["csk0", "csk1", "csk2"] as const).map((sk) => (
            <div
              key={sk}
              className="rounded-md border border-border bg-card p-4 space-y-3"
            >
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))
        ) : paginatedData.length === 0 ? (
          <div
            className="rounded-md border border-border bg-card px-4 py-10 text-center text-muted-foreground text-sm"
            data-ocid={`${dataOcid}.empty_state`}
          >
            {emptyMessage}
          </div>
        ) : (
          paginatedData.map((row, idx) => {
            const globalIdx = start + idx + 1;
            // Find action column (last col with "actions" key or header)
            const actionCol = columns.find(
              (c) => c.key === "actions" || c.header === "Actions",
            );
            // Select column (first col with empty header and key 'select')
            const selectCol = columns.find(
              (c) => c.key === "select" || c.header === "",
            );
            // Primary data columns (all except actions + select)
            const dataCols = visibleCols.filter(
              (c) =>
                c.key !== "actions" && c.key !== "select" && c.header !== "",
            );

            return (
              <div
                key={globalIdx}
                data-ocid={`${dataOcid}.row.${globalIdx}`}
                className={cn(
                  "rounded-md border border-border bg-card p-4 transition-colors duration-150",
                  onRowClick && "cursor-pointer active:bg-muted/50",
                  rowClassName?.(row, idx),
                )}
                onClick={() => onRowClick?.(row, idx)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && onRowClick) {
                    e.preventDefault();
                    onRowClick(row, idx);
                  }
                }}
                tabIndex={onRowClick ? 0 : undefined}
                role={onRowClick ? "button" : undefined}
              >
                {/* Top row: select checkbox + actions */}
                {(selectCol || actionCol) && (
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      {selectCol?.render && (
                        <span
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          {selectCol.render(row, idx)}
                        </span>
                      )}
                    </div>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      {actionCol?.render?.(row, idx)}
                    </div>
                  </div>
                )}

                {/* Data fields as label: value pairs */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {dataCols.map((col) => (
                    <div
                      key={col.key}
                      className={cn(
                        "min-w-0",
                        col.key === "bio" || col.key === "description"
                          ? "col-span-2"
                          : "",
                      )}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        {col.header}
                      </p>
                      <div className="text-sm text-foreground min-w-0">
                        {col.render
                          ? col.render(row, idx)
                          : String(row[col.key] ?? "")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
          <span className="text-xs">
            {start + 1}–{Math.min(start + pageSize, data.length)} of{" "}
            {data.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:h-7 sm:w-7"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              data-ocid={`${dataOcid}.pagination_prev`}
            >
              <ChevronLeft size={14} />
            </Button>
            <span className="px-2 tabular-nums text-xs">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:h-7 sm:w-7"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              data-ocid={`${dataOcid}.pagination_next`}
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
