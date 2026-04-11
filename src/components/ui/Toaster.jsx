import { useToast } from "../../hooks/use-toast";

export function Toaster() {
    const { toasts, dismiss } = useToast();

    return (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
            {toasts.map((toast) => (
                <div key={toast.id} className="bg-black text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 min-w-62.5">
                    <span>{toast.title || toast.description}</span>
                    <button onClick={() => dismiss(toast.id)} className="text-sm opacity-70 hover:opacity-100" >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}