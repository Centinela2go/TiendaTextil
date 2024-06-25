// src/components/Snackbar.jsx
import { useEffect } from "react";

const Snackbar = ({ open, autoHideDuration = 6000, onClose, children }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 rounded shadow-lg">
      {children}
    </div>
  );
};

export default Snackbar;
