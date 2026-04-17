import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function FAB() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-white rounded-2xl shadow-xl w-72 overflow-hidden border border-border"
            data-ocid="fab.modal"
          >
            <div className="bg-brand-teal px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">
                  Buildify Support
                </p>
                <p className="text-white/70 text-xs">
                  We typically reply in minutes
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white"
                data-ocid="fab.close_button"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-brand-muted text-sm mb-4">
                Hi there! 👋 How can we help you with your construction project
                today?
              </p>
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-muted outline-none focus:border-brand-teal"
                data-ocid="fab.input"
              />
              <button
                type="button"
                className="w-full mt-3 bg-brand-teal text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                data-ocid="fab.submit_button"
              >
                Send Message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTooltip && !open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-brand-text text-white text-xs font-medium px-3 py-1.5 rounded-lg pointer-events-none"
            data-ocid="fab.tooltip"
          >
            Need Help?
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform fab-pulse"
        aria-label="Need Help?"
        data-ocid="fab.open_modal_button"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
