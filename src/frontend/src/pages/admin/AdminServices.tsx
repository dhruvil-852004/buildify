import type { Service, UpdateServiceInput } from "@/backend.d";
import AdminTable, { type ColumnDef } from "@/components/admin/AdminTable";
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
import { useServices, useUpdateService } from "@/hooks/useQueries";
import { Edit2, ImageIcon, Info, Lock, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

type ServiceForm = {
  title: string;
  description: string;
  iconUrl: string;
  displayOrder: string;
};

export default function AdminServices() {
  const { data: services = [], isLoading } = useServices();
  const updateService = useUpdateService();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState<ServiceForm>({
    title: "",
    description: "",
    iconUrl: "",
    displayOrder: "1",
  });
  const [iconPreview, setIconPreview] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openEdit = (service: Service) => {
    setEditingService(service);
    setForm({
      title: service.title,
      description: service.description,
      iconUrl: service.iconUrl,
      displayOrder: String(service.displayOrder),
    });
    setIconPreview(service.iconUrl);
    setUploadError("");
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setIconPreview("");
    setUploadError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, SVG, WebP).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be under 2 MB.");
      return;
    }
    setUploadError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setIconPreview(dataUrl);
      setForm((prev) => ({ ...prev, iconUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const clearIcon = () => {
    setIconPreview("");
    setForm((prev) => ({ ...prev, iconUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!editingService || !form.title.trim()) {
      notify.error("Title is required.");
      return;
    }
    try {
      const input: UpdateServiceInput = {
        id: editingService.id,
        title: form.title,
        description: form.description,
        iconUrl: form.iconUrl,
        displayOrder: BigInt(Number(form.displayOrder) || 1),
      };
      await updateService.mutateAsync(input);
      notify.success("Service updated successfully.");
      handleClose();
    } catch {
      notify.error("Failed to update service.");
    }
  };

  const columns: ColumnDef<Service>[] = [
    {
      key: "displayOrder",
      header: "#",
      render: (row) => (
        <span className="text-muted-foreground text-xs tabular-nums font-mono">
          {String(row.displayOrder).padStart(2, "0")}
        </span>
      ),
      headerClassName: "w-12",
    },
    {
      key: "icon",
      header: "Icon",
      render: (row) =>
        row.iconUrl ? (
          <div className="w-9 h-9 rounded-md border border-border bg-muted/40 flex items-center justify-center overflow-hidden">
            <img
              src={row.iconUrl}
              alt={`${row.title} icon`}
              className="w-7 h-7 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-md border border-border bg-muted/40 flex items-center justify-center">
            <ImageIcon size={14} className="text-muted-foreground" />
          </div>
        ),
      headerClassName: "w-16",
    },
    {
      key: "title",
      header: "Service Name",
      render: (row) => (
        <span className="font-medium text-foreground">{row.title}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (row) => (
        <span className="text-muted-foreground text-sm line-clamp-2 max-w-xs block">
          {row.description || "—"}
        </span>
      ),
    },
    {
      key: "locked",
      header: "Status",
      render: () => (
        <Badge
          variant="outline"
          className="text-xs gap-1 text-muted-foreground whitespace-nowrap"
        >
          <Lock size={10} />
          Locked
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row, idx) => (
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 sm:h-7 sm:w-7 text-muted-foreground hover:text-brand-teal"
          onClick={() => openEdit(row)}
          data-ocid={`admin.services.edit_button.${idx + 1}`}
          aria-label={`Edit ${row.title}`}
        >
          <Edit2 size={13} />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6" data-ocid="admin.services.page">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground font-display">
            Services
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Edit service listings displayed on the public site.
          </p>
        </div>
      </div>

      <div
        className="flex items-start gap-3 rounded-md border border-border bg-muted/50 px-4 py-3"
        data-ocid="admin.services.info_state"
      >
        <Info
          size={15}
          className="text-brand-teal flex-shrink-0 mt-0.5"
          aria-hidden
        />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            Services are locked.
          </span>{" "}
          The four core services are defined in the backend and cannot be
          created or deleted. Use the edit action to update title, description,
          icon, or display order.
        </p>
      </div>

      <AdminTable
        columns={columns}
        data={services}
        isLoading={isLoading}
        emptyMessage="No services found."
        data-ocid="admin.services.table"
      />

      <Dialog open={modalOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent
          className="max-w-lg w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto"
          data-ocid="admin.services.dialog"
          aria-labelledby="svc-dialog-title"
        >
          <DialogHeader>
            <DialogTitle id="svc-dialog-title">Edit Service</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="svc-title">Title *</Label>
              <Input
                id="svc-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Site Regrading"
                data-ocid="admin.services.title.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="svc-desc">Description</Label>
              <Textarea
                id="svc-desc"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                placeholder="Describe this service…"
                data-ocid="admin.services.description.textarea"
              />
            </div>

            <div className="space-y-1.5 max-w-[140px]">
              <Label htmlFor="svc-order">Display Order</Label>
              <Input
                id="svc-order"
                type="number"
                min={1}
                value={form.displayOrder}
                onChange={(e) =>
                  setForm({ ...form, displayOrder: e.target.value })
                }
                data-ocid="admin.services.order.input"
              />
            </div>

            {/* Icon Upload */}
            <div className="space-y-2">
              <Label>Service Icon</Label>
              <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap">
                <div className="relative flex-shrink-0 w-16 h-16 rounded-md border border-border bg-muted/40 flex items-center justify-center overflow-hidden">
                  {iconPreview ? (
                    <>
                      <img
                        src={iconPreview}
                        alt="Icon preview"
                        className="w-12 h-12 object-contain"
                        onError={() => setIconPreview("")}
                      />
                      <button
                        type="button"
                        onClick={clearIcon}
                        className="absolute top-0.5 right-0.5 rounded-full bg-background border border-border w-4 h-4 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        aria-label="Remove icon"
                        data-ocid="admin.services.icon_clear_button"
                      >
                        <X size={9} />
                      </button>
                    </>
                  ) : (
                    <ImageIcon size={20} className="text-muted-foreground/50" />
                  )}
                </div>

                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-xs h-8 min-h-[44px] sm:min-h-0"
                      onClick={() => fileInputRef.current?.click()}
                      data-ocid="admin.services.icon_upload_button"
                    >
                      <Upload size={12} />
                      Upload image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleFileChange}
                      aria-label="Upload icon file"
                      data-ocid="admin.services.icon_file_input"
                    />
                  </div>
                  <Input
                    value={form.iconUrl.startsWith("data:") ? "" : form.iconUrl}
                    onChange={(e) => {
                      const url = e.target.value;
                      setForm({ ...form, iconUrl: url });
                      setIconPreview(url);
                    }}
                    placeholder="Or paste image URL…"
                    className="text-xs h-8"
                    data-ocid="admin.services.icon_url.input"
                  />
                  {uploadError && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="admin.services.icon.field_error"
                    >
                      {uploadError}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, SVG or WebP · max 2 MB
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 min-h-[44px]"
                data-ocid="admin.services.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="admin-button-primary flex-1 min-h-[44px]"
                onClick={handleSubmit}
                disabled={updateService.isPending}
                data-ocid="admin.services.submit_button"
              >
                {updateService.isPending ? "Saving…" : "Update Service"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
