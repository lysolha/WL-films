import { useEffect, useRef } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog = ({ open, onClose, children }: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target === ref.current) onClose();
    };

    if (open) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, onClose]);

  return (
    <dialog
      ref={ref}
      className="min-w-[600px] m-auto min-h-[400px] bg-white rounded-md p-4"
    >
      {children}
    </dialog>
  );
};

export default Dialog;
