import type {
  CreateTeamMemberInput,
  TeamMember,
  UpdateTeamMemberInput,
} from "@/backend.d";
import AdminTable, { type ColumnDef } from "@/components/admin/AdminTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { notify } from "@/components/admin/ToastNotification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateTeamMember,
  useDeleteTeamMember,
  useTeamMembers,
  useUpdateTeamMember,
} from "@/hooks/useQueries";
import {
  Edit2,
  ImagePlus,
  Linkedin,
  Plus,
  Trash2,
  Twitter,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

// ─── Image Upload Field ───────────────────────────────────────────────────────

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  "data-ocid"?: string;
}

function ImageUploadField({
  value,
  onChange,
  "data-ocid": dataOcid,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const convertFileToDataUrl = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        notify.error("Please select an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        notify.error("Image must be smaller than 5 MB.");
        return;
      }
      setIsConverting(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
        setIsConverting(false);
      };
      reader.onerror = () => {
        notify.error("Failed to read image.");
        setIsConverting(false);
      };
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) convertFileToDataUrl(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) convertFileToDataUrl(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div className="space-y-2" data-ocid={dataOcid}>
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-20 h-20 rounded-lg object-cover border border-border bg-muted"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Remove image"
            data-ocid="admin.team.image_remove_button"
          >
            <X size={10} />
          </button>
        </div>
      )}

      <button
        type="button"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        className={`w-full relative border-2 border-dashed rounded-lg p-3 flex items-center gap-3 transition-colors cursor-pointer text-left min-h-[56px]
          ${isDragging ? "border-brand-teal bg-brand-teal/5" : "border-border hover:border-brand-teal/60 hover:bg-muted/40"}`}
        onClick={() => fileInputRef.current?.click()}
        aria-label="Upload photo"
        data-ocid="admin.team.image_dropzone"
      >
        <div className="w-8 h-8 rounded-md bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
          <ImagePlus size={15} className="text-brand-teal" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground">
            {isConverting ? "Processing…" : "Upload photo"}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            PNG, JPG, WebP · max 5 MB
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
          data-ocid="admin.team.image_file_input"
        />
      </button>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Or paste an image URL</p>
        <Input
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="text-xs h-8"
          data-ocid="admin.team.image_url.input"
        />
      </div>
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

type MemberForm = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedIn: string;
  twitter: string;
  displayOrder: string;
};

const emptyForm: MemberForm = {
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  linkedIn: "",
  twitter: "",
  displayOrder: "1",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminTeam() {
  const { data: members = [], isLoading } = useTeamMembers();
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();
  const deleteMember = useDeleteTeamMember();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<MemberForm>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);
  const [search, setSearch] = useState("");

  const sorted = [...members].sort(
    (a, b) => Number(a.displayOrder) - Number(b.displayOrder),
  );
  const filtered = sorted.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()),
  );

  const openCreate = () => {
    setEditingMember(null);
    const nextOrder =
      members.length > 0
        ? String(Math.max(...members.map((m) => Number(m.displayOrder))) + 1)
        : "1";
    setForm({ ...emptyForm, displayOrder: nextOrder });
    setModalOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio,
      imageUrl: member.imageUrl,
      linkedIn: member.linkedIn,
      twitter: member.twitter,
      displayOrder: String(member.displayOrder),
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.role.trim()) {
      notify.error("Name and role are required.");
      return;
    }
    const order = BigInt(Math.max(1, Number(form.displayOrder) || 1));
    try {
      if (editingMember) {
        const input: UpdateTeamMemberInput = {
          id: editingMember.id,
          name: form.name.trim(),
          role: form.role.trim(),
          bio: form.bio.trim(),
          imageUrl: form.imageUrl,
          linkedIn: form.linkedIn.trim(),
          twitter: form.twitter.trim(),
          displayOrder: order,
        };
        await updateMember.mutateAsync(input);
        notify.success("Team member updated.");
      } else {
        const input: CreateTeamMemberInput = {
          name: form.name.trim(),
          role: form.role.trim(),
          bio: form.bio.trim(),
          imageUrl: form.imageUrl,
          linkedIn: form.linkedIn.trim(),
          twitter: form.twitter.trim(),
          displayOrder: order,
        };
        await createMember.mutateAsync(input);
        notify.success("Team member added.");
      }
      setModalOpen(false);
    } catch {
      notify.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMember.mutateAsync(deleteTarget);
      notify.success("Team member removed.");
    } catch {
      notify.error("Failed to delete member.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const columns: ColumnDef<TeamMember>[] = [
    {
      key: "name",
      header: "Member",
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={row.name}
              className="w-9 h-9 rounded-full object-cover bg-muted flex-shrink-0 border border-border"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-brand-teal">
                {row.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">{row.name}</p>
            <Badge
              variant="outline"
              className="text-[10px] mt-0.5 font-normal text-muted-foreground border-border"
            >
              {row.role}
            </Badge>
          </div>
        </div>
      ),
    },
    {
      key: "bio",
      header: "Bio",
      render: (row) => (
        <span className="text-muted-foreground text-sm line-clamp-2 max-w-xs block">
          {row.bio || <span className="italic opacity-50">No bio</span>}
        </span>
      ),
    },
    {
      key: "social",
      header: "Social",
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.linkedIn && (
            <a
              href={row.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-teal transition-colors p-1"
              aria-label="LinkedIn"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={13} />
            </a>
          )}
          {row.twitter && (
            <a
              href={
                row.twitter.startsWith("http")
                  ? row.twitter
                  : `https://twitter.com/${row.twitter.replace(/^@/, "")}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-teal transition-colors p-1"
              aria-label="Twitter"
              onClick={(e) => e.stopPropagation()}
            >
              <Twitter size={13} />
            </a>
          )}
          {!row.linkedIn && !row.twitter && (
            <span className="text-xs text-muted-foreground/50 italic">—</span>
          )}
        </div>
      ),
    },
    {
      key: "displayOrder",
      header: "Order",
      render: (row) => (
        <span className="tabular-nums text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
          #{String(row.displayOrder)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row, idx) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-7 sm:w-7 text-muted-foreground hover:text-brand-teal"
            onClick={() => openEdit(row)}
            aria-label={`Edit ${row.name}`}
            data-ocid={`admin.team.edit_button.${idx + 1}`}
          >
            <Edit2 size={13} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-7 sm:w-7 text-muted-foreground hover:text-destructive"
            onClick={() => setDeleteTarget(row.id)}
            aria-label={`Delete ${row.name}`}
            data-ocid={`admin.team.delete_button.${idx + 1}`}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      ),
    },
  ];

  const isSaving = createMember.isPending || updateMember.isPending;

  return (
    <div className="space-y-5 sm:space-y-6" data-ocid="admin.team.page">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground font-display">
            Team Members
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {members.length} member{members.length !== 1 ? "s" : ""} · sorted by
            display order
          </p>
        </div>
        <Button
          className="admin-button-primary gap-2 flex-shrink-0 min-h-[44px]"
          onClick={openCreate}
          data-ocid="admin.team.add_button"
        >
          <Plus size={15} />
          Add Member
        </Button>
      </div>

      <Input
        placeholder="Search by name or role…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm min-h-[44px] sm:min-h-0"
        data-ocid="admin.team.search_input"
      />

      <AdminTable
        columns={columns}
        data={filtered}
        isLoading={isLoading}
        emptyMessage="No team members yet. Add your first member."
        data-ocid="admin.team.table"
      />

      <Dialog open={modalOpen} onOpenChange={(v) => !v && setModalOpen(false)}>
        <DialogContent
          className="max-w-lg w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto"
          data-ocid="admin.team.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="tm-name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="tm-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ravi Sharma"
                  data-ocid="admin.team.name.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tm-role">
                  Role <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="tm-role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Site Engineer"
                  data-ocid="admin.team.role.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tm-bio">Bio</Label>
              <Textarea
                id="tm-bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                placeholder="Brief introduction about this team member…"
                data-ocid="admin.team.bio.textarea"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Photo</Label>
              <ImageUploadField
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                data-ocid="admin.team.image_upload"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="tm-linkedin">LinkedIn</Label>
                <div className="relative">
                  <Linkedin
                    size={13}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="tm-linkedin"
                    value={form.linkedIn}
                    onChange={(e) =>
                      setForm({ ...form, linkedIn: e.target.value })
                    }
                    placeholder="Profile URL"
                    className="pl-7 text-xs"
                    data-ocid="admin.team.linkedin.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tm-twitter">Twitter</Label>
                <div className="relative">
                  <Twitter
                    size={13}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="tm-twitter"
                    value={form.twitter}
                    onChange={(e) =>
                      setForm({ ...form, twitter: e.target.value })
                    }
                    placeholder="@handle"
                    className="pl-7 text-xs"
                    data-ocid="admin.team.twitter.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tm-order">Display Order</Label>
                <Input
                  id="tm-order"
                  type="number"
                  min={1}
                  value={form.displayOrder}
                  onChange={(e) =>
                    setForm({ ...form, displayOrder: e.target.value })
                  }
                  data-ocid="admin.team.order.input"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="flex-1 min-h-[44px]"
                data-ocid="admin.team.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="admin-button-primary flex-1 min-h-[44px]"
                onClick={handleSubmit}
                disabled={isSaving}
                data-ocid="admin.team.submit_button"
              >
                {isSaving
                  ? "Saving…"
                  : editingMember
                    ? "Update Member"
                    : "Add Member"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Remove Team Member"
        description="This will permanently remove the team member from the site. This action cannot be undone."
        confirmLabel="Remove"
        isLoading={deleteMember.isPending}
      />
    </div>
  );
}
