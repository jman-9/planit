interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="flex fixed justify-center items-center top-0 left-0 w-screen h-screen bg-black/50 dark:bg-white/5 z-1000">
      <div className="relative bg-white dark:bg-gray-950 dark:border-1 rounded-xl p-5 pt-6 min-w-[max(40vw,350px)] max-w-[min(90vw,1000px)] max-h-[90vh] box-shadow-lg z-1001" onClick={(e) => e.stopPropagation()}>
        <button style={{ background: 'none', border: 'none'}} className="absolute top-4 right-4 text-xl cursor-pointer" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}
