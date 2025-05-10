
import { useToast } from "@/hooks/use-toast"
import {
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  // Ainda usamos o hook para não quebrar a aplicação,
  // mas não renderizamos os toasts
  useToast()

  return (
    <ToastProvider>
      {/* Não renderizamos mais nenhum toast */}
      <ToastViewport />
    </ToastProvider>
  )
}
