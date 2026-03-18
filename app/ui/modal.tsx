import { useEffect, useRef, KeyboardEvent } from "react";
import CloseButton from "./close-button";

type ModalProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal = ({ closeModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the previously focused element
    const previouslyFocusedElement = document.activeElement as HTMLElement;
    // Focus on the modal
    modalRef.current?.focus();

    return () => {
      // Return focus to the previously focused element
      previouslyFocusedElement?.focus();
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key === "Tab") {
      // Trap the focus
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), textarea, input, select",
      );

      if (!focusableElements) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  };

  return (
    <div
      className="modal relative z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 z-10 w-screen transform bg-stone-700/75 dark:bg-stone-900/75 backdrop-blur-xs"
        onClick={closeModal}
      >
        <div className="flex min-h-full items-center justify-center text-center">
          <div
            ref={modalRef}
            className="flex flex-col p-3 border border-stone-200 dark:border-stone-700 sm:rounded-lg bg-stone-100 dark:bg-stone-900 shadow-2xl w-full sm:max-w-lg"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <CloseButton onClick={closeModal} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
