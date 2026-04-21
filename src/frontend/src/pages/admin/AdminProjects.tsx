import {
  type CreateProjectInput,
  type Project,
  ProjectCategory,
  type UpdateProjectInput,
} from "@/backend.d";
import AdminTable, { type ColumnDef } from "@/components/admin/AdminTable";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useBatchDeleteProjects,
  useCreateProject,
  useDeleteProject,
  useProjects,
  useToggleProjectStatus,
  useUpdateProject,
} from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import {
  Edit2,
  Image,
  Plus,
  Star,
  StarOff,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<ProjectCategory, string> = {
  [ProjectCategory.SiteRegrading]: "bg-teal-50 text-teal-700 border-teal-200",
  [ProjectCategory.Drainage]: "bg-blue-50 text-blue-700 border-blue-200",
  [ProjectCategory.Foundation]: "bg-slate-100 text-slate-700 border-slate-200",
  [ProjectCategory.Commercial]:
    "bg-orange-50 text-orange-700 border-orange-200",
  [ProjectCategory.Residential]: "bg-amber-50 text-amber-700 border-amber-200",
};

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  [ProjectCategory.SiteRegrading]: "Site Regrading",
  [ProjectCategory.Drainage]: "Drainage",
  [ProjectCategory.Foundation]: "Foundation",
  [ProjectCategory.Commercial]: "Commercial",
  [ProjectCategory.Residential]: "Residential",
};

function CategoryBadge({ category }: { category: ProjectCategory }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium whitespace-nowrap",
        CATEGORY_STYLES[category] ??
          "bg-muted text-muted-foreground border-border",
      )}
    >
      {CATEGORY_LABELS[category] ?? String(category)}
    </Badge>
  );
}

// ─── Status pill ──────────────────────────────────────────────────────────────

function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap",
        active
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-muted text-muted-foreground border-border",
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full flex-shrink-0",
          active ? "bg-emerald-500" : "bg-muted-foreground/40",
        )}
      />
      {active ? "Active" : "Completed"}
    </span>
  );
}

// ─── Image Upload Field ───────────────────────────────────────────────────────

interface ImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  uploading: boolean;
  onUpload: (file: File) => void;
}

function ImageUploadField({
  value,
  onChange,
  uploading,
  onUpload,
}: ImageFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="flex-1 min-w-0"
          data-ocid="admin.projects.image_url.input"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 gap-1.5 min-h-[44px] sm:min-h-0"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          data-ocid="admin.projects.upload_button"
        >
          <Upload size={13} />
          {uploading ? "Uploading…" : "Upload"}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      {value ? (
        <div className="relative w-full h-28 rounded-md overflow-hidden border border-border bg-muted/40 group">
          <img
            src={value}
            alt="Project preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 bg-foreground/70 text-background rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 h-20 rounded-md border-2 border-dashed border-border hover:border-primary/40 transition-colors text-muted-foreground text-sm"
          disabled={uploading}
          data-ocid="admin.projects.dropzone"
        >
          <Image size={16} />
          Click to upload image
        </button>
      )}
    </div>
  );
}

// ─── Form type ────────────────────────────────────────────────────────────────

type ProjectForm = {
  title: string;
  description: string;
  imageUrl: string;
  category: ProjectCategory;
  location: string;
  featured: boolean;
  active: boolean;
};

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  imageUrl: "",
  category: ProjectCategory.SiteRegrading,
  location: "",
  featured: false,
  active: true,
};

const formatDate = (ts: bigint) =>
  new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminProjects() {
  const { data: projects = [], isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const batchDelete = useBatchDeleteProjects();
  const toggleStatus = useToggleProjectStatus();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [imageUploading, setImageUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);
  const [batchConfirmOpen, setBatchConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<Set<bigint>>(new Set());
  const [search, setSearch] = useState("");

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()),
  );

  const allSelected =
    filtered.length > 0 && filtered.every((p) => selected.has(p.id));
  const someSelected = selected.size > 0;

  const toggleSelect = (id: bigint) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  };

  const openCreate = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      category: project.category,
      location: project.location,
      featured: project.featured,
      active: project.active,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      setForm((prev) => ({ ...prev, imageUrl: dataUrl }));
    } catch {
      notify.error("Failed to read image file.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      notify.error("Title is required.");
      return;
    }
    if (!form.description.trim()) {
      notify.error("Description is required.");
      return;
    }
    try {
      if (editingProject) {
        const input: UpdateProjectInput = {
          id: editingProject.id,
          title: form.title,
          description: form.description,
          imageUrl: form.imageUrl,
          category: form.category,
          location: form.location,
          featured: form.featured,
          active: form.active,
        };
        await updateProject.mutateAsync(input);
        notify.success("Project updated successfully.");
      } else {
        const input: CreateProjectInput = {
          title: form.title,
          description: form.description,
          imageUrl: form.imageUrl,
          category: form.category,
          location: form.location,
          featured: form.featured,
          active: form.active,
        };
        await createProject.mutateAsync(input);
        notify.success("Project created successfully.");
      }
      setModalOpen(false);
    } catch {
      notify.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProject.mutateAsync(deleteTarget);
      notify.success("Project deleted.");
    } catch {
      notify.error("Failed to delete project.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleBatchDelete = async () => {
    try {
      await batchDelete.mutateAsync(Array.from(selected));
      notify.success(`${selected.size} project(s) deleted.`);
      setSelected(new Set());
    } catch {
      notify.error("Batch delete failed.");
    } finally {
      setBatchConfirmOpen(false);
    }
  };

  const handleToggle = async (id: bigint) => {
    try {
      await toggleStatus.mutateAsync(id);
      notify.info("Project status updated.");
    } catch {
      notify.error("Failed to update status.");
    }
  };

  const columns: ColumnDef<Project>[] = [
    {
      key: "select",
      header: "",
      headerClassName: "w-10",
      className: "w-10",
      render: (row) => (
        <Checkbox
          checked={selected.has(row.id)}
          onCheckedChange={() => toggleSelect(row.id)}
          aria-label={`Select ${row.title}`}
          data-ocid="admin.projects.row.checkbox"
        />
      ),
    },
    {
      key: "title",
      header: "Project",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-0">
          {row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={row.title}
              className="w-10 h-10 rounded object-cover bg-muted shrink-0 hidden sm:block"
            />
          ) : (
            <div className="w-10 h-10 rounded bg-brand-teal/10 flex items-center justify-center shrink-0 hidden sm:flex">
              <Image size={14} className="text-brand-teal" />
            </div>
          )}
          <div className="min-w-0">
            <p
              className="font-semibold text-foreground truncate max-w-[180px]"
              title={row.title}
            >
              {row.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[180px]">
              {row.location || "—"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row) => <CategoryBadge category={row.category} />,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <button
          type="button"
          onClick={() => handleToggle(row.id)}
          className="group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full transition-opacity hover:opacity-80 min-h-[44px] sm:min-h-0 flex items-center"
          data-ocid="admin.projects.toggle_status"
          aria-label={`Toggle status for ${row.title} — currently ${row.active ? "Active (click to mark Completed)" : "Completed (click to mark Active)"}`}
          title={`Click to mark as ${row.active ? "Completed" : "Active"}`}
        >
          <StatusPill active={row.active} />
        </button>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      render: (row) => (
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-medium whitespace-nowrap",
            row.featured ? "text-amber-600" : "text-muted-foreground",
          )}
        >
          {row.featured ? (
            <Star
              size={13}
              className="fill-amber-400 text-amber-400 flex-shrink-0"
            />
          ) : (
            <StarOff size={13} className="flex-shrink-0" />
          )}
          {row.featured ? "Featured" : "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (row) => (
        <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
          {formatDate(row.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-7 sm:w-7 text-muted-foreground hover:text-brand-teal"
            onClick={() => openEdit(row)}
            aria-label={`Edit ${row.title}`}
            data-ocid="admin.projects.edit_button"
          >
            <Edit2 size={13} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-7 sm:w-7 text-muted-foreground hover:text-destructive"
            onClick={() => setDeleteTarget(row.id)}
            aria-label={`Delete ${row.title}`}
            data-ocid="admin.projects.delete_button"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6" data-ocid="admin.projects.page">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground font-display">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isLoading ? (
              <Skeleton className="h-4 w-40 inline-block" />
            ) : (
              <>
                {projects.length} project{projects.length !== 1 ? "s" : ""} ·{" "}
                <span className="text-emerald-600 font-medium">
                  {projects.filter((p) => p.active).length} active
                </span>
                {" · "}
                <span className="text-muted-foreground">
                  {projects.filter((p) => !p.active).length} completed
                </span>
              </>
            )}
          </p>
        </div>
        <Button
          className="admin-button-primary gap-2 min-h-[44px]"
          onClick={openCreate}
          data-ocid="admin.projects.add_button"
        >
          <Plus size={15} />
          Add Project
        </Button>
      </div>

      {/* Legend hint */}
      <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2 border border-border">
        <span className="font-medium text-foreground">Status guide:</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
          <span>= visible on site</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
            Completed
          </span>
          <span>= hidden from site</span>
        </span>
        <span className="text-xs italic">Click status pill to toggle</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          placeholder="Search by title or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs min-h-[44px] sm:min-h-0"
          data-ocid="admin.projects.search_input"
        />
        {someSelected && (
          <Button
            variant="destructive"
            size="sm"
            className="gap-1.5 ml-auto min-h-[44px] sm:min-h-0"
            onClick={() => setBatchConfirmOpen(true)}
            data-ocid="admin.projects.batch_delete_button"
          >
            <Trash2 size={13} />
            Delete {selected.size} selected
          </Button>
        )}
        {!someSelected && filtered.length > 0 && (
          <button
            type="button"
            className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            onClick={toggleSelectAll}
            data-ocid="admin.projects.select_all_toggle"
          >
            <Checkbox
              checked={allSelected}
              onCheckedChange={toggleSelectAll}
              aria-label="Select all"
              className="pointer-events-none"
            />
            Select all
          </button>
        )}
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        isLoading={isLoading}
        emptyMessage="No projects found. Add your first project."
        data-ocid="admin.projects.table"
      />

      {/* Create / Edit modal */}
      <Dialog open={modalOpen} onOpenChange={(v) => !v && setModalOpen(false)}>
        <DialogContent
          className="max-w-lg w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto"
          data-ocid="admin.projects.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingProject ? "Edit Project" : "Add New Project"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="proj-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="proj-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Site Regrading – Navi Mumbai"
                data-ocid="admin.projects.title.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="proj-desc">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="proj-desc"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                placeholder="Brief description of the project…"
                data-ocid="admin.projects.description.textarea"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="proj-category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm({ ...form, category: v as ProjectCategory })
                  }
                >
                  <SelectTrigger
                    id="proj-category"
                    data-ocid="admin.projects.category.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ProjectCategory).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {CATEGORY_LABELS[cat] ?? cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="proj-location">Location</Label>
                <Input
                  id="proj-location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="Mumbai, Maharashtra"
                  data-ocid="admin.projects.location.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Project Image</Label>
              <ImageUploadField
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                uploading={imageUploading}
                onUpload={handleImageUpload}
              />
            </div>

            <div className="flex gap-6 pt-1 flex-wrap">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="proj-active"
                  checked={form.active}
                  onCheckedChange={(v) =>
                    setForm({ ...form, active: v === true })
                  }
                  data-ocid="admin.projects.active.checkbox"
                />
                <Label
                  htmlFor="proj-active"
                  className="cursor-pointer font-normal"
                >
                  Active (visible on site)
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="proj-featured"
                  checked={form.featured}
                  onCheckedChange={(v) =>
                    setForm({ ...form, featured: v === true })
                  }
                  data-ocid="admin.projects.featured.checkbox"
                />
                <Label
                  htmlFor="proj-featured"
                  className="cursor-pointer font-normal"
                >
                  Featured in spotlight
                </Label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="flex-1 min-h-[44px]"
                data-ocid="admin.projects.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="admin-button-primary flex-1 min-h-[44px]"
                onClick={handleSubmit}
                disabled={
                  createProject.isPending ||
                  updateProject.isPending ||
                  imageUploading
                }
                data-ocid="admin.projects.submit_button"
              >
                {createProject.isPending || updateProject.isPending
                  ? "Saving…"
                  : editingProject
                    ? "Update Project"
                    : "Create Project"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        description="This will permanently remove the project from your portfolio. This action cannot be undone."
        confirmLabel="Delete"
        isLoading={deleteProject.isPending}
      />

      <ConfirmDialog
        open={batchConfirmOpen}
        onClose={() => setBatchConfirmOpen(false)}
        onConfirm={handleBatchDelete}
        title={`Delete ${selected.size} Project${selected.size !== 1 ? "s" : ""}`}
        description={`You are about to permanently delete ${selected.size} selected project${selected.size !== 1 ? "s" : ""}. This action cannot be undone.`}
        confirmLabel="Delete All"
        isLoading={batchDelete.isPending}
      />
    </div>
  );
}
