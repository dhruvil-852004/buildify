/**
 * ToastNotification — thin wrappers around sonner's `toast()` with
 * Buildify admin styling. Import `notify` and call `notify.success(...)`, etc.
 */
import { toast } from "sonner";

type ToastOptions = {
  description?: string;
  duration?: number;
};

export const notify = {
  success(message: string, opts?: ToastOptions) {
    toast.success(message, {
      description: opts?.description,
      duration: opts?.duration ?? 4500,
    });
  },
  error(message: string, opts?: ToastOptions) {
    toast.error(message, {
      description: opts?.description,
      duration: opts?.duration ?? 5000,
    });
  },
  info(message: string, opts?: ToastOptions) {
    toast.info(message, {
      description: opts?.description,
      duration: opts?.duration ?? 4000,
    });
  },
  warning(message: string, opts?: ToastOptions) {
    toast.warning(message, {
      description: opts?.description,
      duration: opts?.duration ?? 4500,
    });
  },
  loading(message: string) {
    return toast.loading(message);
  },
  dismiss(id?: string | number) {
    toast.dismiss(id);
  },
};

export default notify;
