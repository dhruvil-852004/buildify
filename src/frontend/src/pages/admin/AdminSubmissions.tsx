import type { ContactSubmission } from "@/backend.d";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { notify } from "@/components/admin/ToastNotification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDeleteSubmission,
  useMarkSubmissionRead,
  useSubmissions,
} from "@/hooks/useQueries";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  Mail,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

// ─── CSV export ───────────────────────────────────────────────────────────────

function exportToCSV(rows: ContactSubmission[]) {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Project Type",
    "Message",
    "Date",
    "Status",
  ];
  const formatDate = (ts: bigint) =>
    new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  const csvEscape = (val: string) => `"${val.replace(/"/g, '""')}"`;
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.id.toString(),
        csvEscape(r.name),
        csvEscape(r.email),
        csvEscape(r.projectType),
        csvEscape(r.message),
        formatDate(r.submittedAt),
        r.read ? "Read" : "Unread",
      ].join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Mobile card for a single submission ─────────────────────────────────────

function SubmissionCard({
  row,
  idx,
  isSelected,
  onSelect,
  onOpen,
  onToggleRead,
  onDelete,
}: {
  row: ContactSubmission;
  idx: number;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onToggleRead: (e: React.MouseEvent) => void;
  onDelete: () => void;
}) {
  const formatDate = (ts: bigint) =>
    new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <button
      type="button"
      data-ocid={`admin.submissions.item.${idx}`}
      className={`w-full text-left rounded-md border bg-card p-4 transition-colors duration-150 cursor-pointer ${
        isSelected ? "border-brand-teal/40 bg-brand-teal/5" : "border-border"
      } ${!row.read ? "border-l-2 border-l-brand-teal" : ""}`}
      onClick={onOpen}
      aria-label={`Open submission from ${row.name}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div
          className="flex items-center gap-2 min-w-0"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            aria-label={`Select ${row.name}`}
            data-ocid={`admin.submissions.checkbox.${idx}`}
            className="border-muted-foreground/40 flex-shrink-0"
          />
        </div>
        <div
          className="flex items-center gap-1 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-brand-teal"
            onClick={onToggleRead}
            title={row.read ? "Mark as unread" : "Mark as read"}
            data-ocid={`admin.submissions.toggle_read_button.${idx}`}
          >
            {row.read ? <EyeOff size={13} /> : <Eye size={13} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={onDelete}
            title="Delete"
            data-ocid={`admin.submissions.delete_button.${idx}`}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          {!row.read && (
            <span className="w-2 h-2 rounded-full bg-brand-teal flex-shrink-0 mt-1.5 animate-pulse" />
          )}
          <div className="min-w-0">
            <p
              className={`font-medium text-foreground ${!row.read ? "font-semibold" : ""}`}
            >
              {row.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {row.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {row.projectType}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(row.submittedAt)}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${
              row.read ? "text-muted-foreground" : "text-brand-teal"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${row.read ? "bg-muted-foreground/40" : "bg-brand-teal"}`}
            />
            {row.read ? "Read" : "Unread"}
          </span>
        </div>
        {row.message && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {row.message}
          </p>
        )}
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminSubmissions() {
  const { data: submissions = [], isLoading } = useSubmissions();
  const markRead = useMarkSubmissionRead();
  const deleteSubmission = useDeleteSubmission();

  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [search, setSearch] = useState("");
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);
  const [batchDeleteOpen, setBatchDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Set<bigint>>(new Set());
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  const formatDate = (ts: bigint) =>
    new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const filtered = submissions
    .filter((s) => {
      if (filter === "unread" && s.read) return false;
      if (filter === "read" && !s.read) return false;
      if (
        search &&
        !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.email.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => Number(b.submittedAt - a.submittedAt));

  const unreadCount = submissions.filter((s) => !s.read).length;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const allFilteredIds = filtered.map((s) => s.id);
  const allChecked =
    filtered.length > 0 && allFilteredIds.every((id) => selected.has(id));
  const someChecked = allFilteredIds.some((id) => selected.has(id));

  const toggleSelectAll = () => {
    if (allChecked) {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const id of allFilteredIds) next.delete(id);
        return next;
      });
    } else {
      setSelected((prev) => new Set([...prev, ...allFilteredIds]));
    }
  };

  const toggleSelect = (id: bigint) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleToggleRead = async (
    submission: ContactSubmission,
    e?: React.MouseEvent,
  ) => {
    e?.stopPropagation();
    try {
      await markRead.mutateAsync({ id: submission.id, read: !submission.read });
      notify.info(submission.read ? "Marked as unread." : "Marked as read.");
    } catch {
      notify.error("Failed to update status.");
    }
  };

  const openDetail = async (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    if (!submission.read) {
      try {
        await markRead.mutateAsync({ id: submission.id, read: true });
      } catch {
        // non-blocking
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSubmission.mutateAsync(deleteTarget);
      notify.success("Submission deleted.");
      if (selectedSubmission?.id === deleteTarget) setSelectedSubmission(null);
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(deleteTarget);
        return next;
      });
    } catch {
      notify.error("Failed to delete.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleBatchDelete = async () => {
    const ids = [...selected];
    let failed = 0;
    for (const id of ids) {
      try {
        await deleteSubmission.mutateAsync(id);
        if (selectedSubmission?.id === id) setSelectedSubmission(null);
      } catch {
        failed++;
      }
    }
    setSelected(new Set());
    setBatchDeleteOpen(false);
    if (failed === 0) {
      notify.success(
        `${ids.length} submission${ids.length !== 1 ? "s" : ""} deleted.`,
      );
    } else {
      notify.error(`${ids.length - failed} deleted, ${failed} failed.`);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(filtered);
    notify.success(
      `Exported ${filtered.length} submission${filtered.length !== 1 ? "s" : ""} to CSV.`,
    );
  };

  return (
    <div className="space-y-5 sm:space-y-6" data-ocid="admin.submissions.page">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground font-display flex items-center gap-2 flex-wrap">
            Submissions
            {unreadCount > 0 && (
              <Badge className="bg-brand-teal text-white text-xs">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Contact form submissions from website visitors.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground min-h-[44px] sm:min-h-0"
          onClick={handleExportCSV}
          disabled={filtered.length === 0}
          data-ocid="admin.submissions.export_button"
        >
          <Download size={14} />
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <Tabs
          value={filter}
          onValueChange={(v) => {
            setFilter(v as typeof filter);
            setPage(1);
          }}
        >
          <TabsList data-ocid="admin.submissions.filter.tab">
            <TabsTrigger value="all" data-ocid="admin.submissions.filter.all">
              All ({submissions.length})
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              data-ocid="admin.submissions.filter.unread"
            >
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read" data-ocid="admin.submissions.filter.read">
              Read ({submissions.length - unreadCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-xs min-h-[44px] sm:min-h-0"
          data-ocid="admin.submissions.search_input"
        />
      </div>

      {/* Batch action bar */}
      {someChecked && (
        <div className="flex items-center gap-3 px-3 py-2 bg-brand-teal/10 border border-brand-teal/30 rounded-md flex-wrap">
          <span className="text-sm font-medium text-foreground">
            {selected.size} selected
          </span>
          <Button
            variant="destructive"
            size="sm"
            className="gap-1.5 h-8 text-xs min-h-[44px] sm:min-h-0"
            onClick={() => setBatchDeleteOpen(true)}
            data-ocid="admin.submissions.batch_delete_button"
          >
            <Trash2 size={12} />
            Delete selected
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-auto text-muted-foreground min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
            onClick={() => setSelected(new Set())}
            aria-label="Clear selection"
            data-ocid="admin.submissions.clear_selection_button"
          >
            <X size={14} />
          </Button>
        </div>
      )}

      {/* ── Desktop/tablet table ── */}
      <div
        className="hidden sm:block overflow-x-auto rounded-md border border-border bg-card"
        data-ocid="admin.submissions.table"
      >
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-border bg-muted/60">
              <th className="px-4 py-3 w-10">
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                  data-ocid="admin.submissions.select_all_checkbox"
                  className="border-muted-foreground/40"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sender
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Project Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                Message
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              (["sk0", "sk1", "sk2", "sk3", "sk4"] as const).map((sk) => (
                <tr key={sk} className="border-b border-border last:border-0">
                  {(["c0", "c1", "c2", "c3", "c4", "c5", "c6"] as const).map(
                    (ck) => (
                      <td key={`${sk}-${ck}`} className="px-4 py-3">
                        <Skeleton className="h-4 w-full max-w-[100px]" />
                      </td>
                    ),
                  )}
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-14 text-center"
                  data-ocid="admin.submissions.empty_state"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Mail size={32} className="opacity-30" />
                    <p className="font-medium">No submissions yet</p>
                    <p className="text-xs">
                      {filter !== "all"
                        ? "Try switching to a different filter."
                        : "Contact form messages will appear here."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => {
                const globalIdx = (page - 1) * PAGE_SIZE + idx + 1;
                const isRowSelected = selected.has(row.id);
                return (
                  <tr
                    key={String(row.id)}
                    data-ocid={`admin.submissions.item.${globalIdx}`}
                    className={`border-b border-border last:border-0 transition-colors duration-150 cursor-pointer hover:bg-muted/40 ${
                      isRowSelected ? "bg-brand-teal/5" : ""
                    } ${!row.read ? "font-medium" : ""}`}
                    onClick={() => openDetail(row)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openDetail(row);
                      }
                    }}
                    tabIndex={0}
                  >
                    <td
                      className="px-4 py-3 w-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(row.id);
                      }}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={isRowSelected}
                        onCheckedChange={() => toggleSelect(row.id)}
                        aria-label={`Select ${row.name}`}
                        data-ocid={`admin.submissions.checkbox.${globalIdx}`}
                        className="border-muted-foreground/40"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 min-w-0">
                        {!row.read && (
                          <span className="w-2 h-2 rounded-full bg-brand-teal flex-shrink-0 animate-pulse" />
                        )}
                        <div className="min-w-0">
                          <p
                            className={`truncate ${!row.read ? "text-foreground font-semibold" : "text-foreground"}`}
                          >
                            {row.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {row.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className="text-xs whitespace-nowrap"
                      >
                        {row.projectType}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell max-w-xs">
                      <span className="text-sm text-muted-foreground line-clamp-1 block">
                        {row.message}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                        {formatDate(row.submittedAt)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          row.read ? "text-muted-foreground" : "text-brand-teal"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            row.read
                              ? "bg-muted-foreground/40"
                              : "bg-brand-teal"
                          }`}
                        />
                        {row.read ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-brand-teal"
                          onClick={(e) => handleToggleRead(row, e)}
                          title={row.read ? "Mark as unread" : "Mark as read"}
                          data-ocid={`admin.submissions.toggle_read_button.${globalIdx}`}
                        >
                          {row.read ? <EyeOff size={13} /> : <Eye size={13} />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => setDeleteTarget(row.id)}
                          title="Delete"
                          data-ocid={`admin.submissions.delete_button.${globalIdx}`}
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile card stack ── */}
      <div
        className="sm:hidden flex flex-col gap-2"
        data-ocid="admin.submissions.table"
      >
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
        ) : paginated.length === 0 ? (
          <div
            className="rounded-md border border-border bg-card px-4 py-12 text-center"
            data-ocid="admin.submissions.empty_state"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Mail size={28} className="opacity-30" />
              <p className="font-medium text-sm">No submissions yet</p>
              <p className="text-xs">
                {filter !== "all"
                  ? "Try switching to a different filter."
                  : "Contact form messages will appear here."}
              </p>
            </div>
          </div>
        ) : (
          paginated.map((row, idx) => {
            const globalIdx = (page - 1) * PAGE_SIZE + idx + 1;
            return (
              <SubmissionCard
                key={String(row.id)}
                row={row}
                idx={globalIdx}
                isSelected={selected.has(row.id)}
                onSelect={() => toggleSelect(row.id)}
                onOpen={() => openDetail(row)}
                onToggleRead={(e) => handleToggleRead(row, e)}
                onDelete={() => setDeleteTarget(row.id)}
              />
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
          <span className="text-xs">
            {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:h-7 sm:w-7"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              data-ocid="admin.submissions.pagination_prev"
            >
              <ChevronLeft size={14} />
            </Button>
            <span className="tabular-nums text-xs px-2">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:h-7 sm:w-7"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              data-ocid="admin.submissions.pagination_next"
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog
        open={selectedSubmission !== null}
        onOpenChange={(v) => !v && setSelectedSubmission(null)}
      >
        <DialogContent
          className="max-w-lg w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto"
          data-ocid="admin.submissions.dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail size={16} className="text-brand-teal" />
              Submission Detail
            </DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">
                    Name
                  </p>
                  <p className="font-medium text-foreground">
                    {selectedSubmission.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">
                    Date
                  </p>
                  <p className="text-foreground">
                    {formatDate(selectedSubmission.submittedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">
                    Email
                  </p>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="text-brand-teal hover:underline break-all text-sm"
                  >
                    {selectedSubmission.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">
                    Project Type
                  </p>
                  <Badge variant="secondary">
                    {selectedSubmission.projectType}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1.5">
                  Message
                </p>
                <p className="text-sm text-foreground bg-muted/50 rounded-md p-3 leading-relaxed whitespace-pre-wrap">
                  {selectedSubmission.message}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubmission(null)}
                  data-ocid="admin.submissions.close_button"
                  className="min-h-[44px] sm:min-h-0"
                >
                  Close
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-foreground min-h-[44px] sm:min-h-0"
                  onClick={() => handleToggleRead(selectedSubmission)}
                  data-ocid="admin.submissions.detail_toggle_read_button"
                >
                  {selectedSubmission.read ? (
                    <>
                      <EyeOff size={13} /> Mark unread
                    </>
                  ) : (
                    <>
                      <Eye size={13} /> Mark read
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5 min-h-[44px] sm:min-h-0"
                  onClick={() => setDeleteTarget(selectedSubmission.id)}
                  data-ocid="admin.submissions.detail_delete_button"
                >
                  <Trash2 size={13} />
                  Delete
                </Button>
                <Button
                  size="sm"
                  className="admin-button-primary gap-1.5 min-h-[44px] sm:min-h-0"
                  onClick={() =>
                    window.open(`mailto:${selectedSubmission.email}`)
                  }
                  data-ocid="admin.submissions.reply_button"
                >
                  <Mail size={13} />
                  Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Submission"
        description="This will permanently remove this contact submission. This cannot be undone."
        confirmLabel="Delete"
        isLoading={deleteSubmission.isPending}
      />

      <ConfirmDialog
        open={batchDeleteOpen}
        onClose={() => setBatchDeleteOpen(false)}
        onConfirm={handleBatchDelete}
        title={`Delete ${selected.size} Submission${selected.size !== 1 ? "s" : ""}`}
        description={`This will permanently delete ${selected.size} selected submission${selected.size !== 1 ? "s" : ""}. This cannot be undone.`}
        confirmLabel="Delete All"
        isLoading={deleteSubmission.isPending}
      />
    </div>
  );
}
