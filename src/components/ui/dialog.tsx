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
      className="min-w-full m-auto min-h-1.5 bg-cream border border-charcoal-dark rounded-md p-4 lg:min-w-[600px] lg:min-h-[400px]"
    >
      <div className="flex flex-col gap-2 p-4 border border-charcoal-dark rounded-md min-h-[400px]">
        {children}
      </div>
    </dialog>
  );
};

export default Dialog;
