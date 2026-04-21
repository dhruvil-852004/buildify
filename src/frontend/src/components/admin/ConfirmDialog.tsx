import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "default";
  isLoading?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm" data-ocid="admin.confirm.dialog">
        <DialogHeader>
          <div className="flex items-start gap-3">
            {variant === "destructive" && (
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle size={18} className="text-destructive" />
              </div>
            )}
            <div>
              <DialogTitle className="text-base">{title}</DialogTitle>
              <DialogDescription className="text-sm mt-1">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            data-ocid="admin.confirm.cancel_button"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isLoading}
            data-ocid="admin.confirm.confirm_button"
          >
            {isLoading ? "Processing…" : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
