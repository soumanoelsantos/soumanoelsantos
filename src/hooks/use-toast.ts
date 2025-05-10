
import { toast } from "sonner"

type ExternalToast = Parameters<typeof toast>[1]

export interface ToastProps extends ExternalToast {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  variant?: "default" | "destructive" | "success"
  duration?: number
  className?: string
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  icon?: React.ReactNode
  id?: string
  important?: boolean
  dismissible?: boolean
  closeButton?: boolean
}

const useToast = () => {
  return {
    toast: ({ title, description, action, variant, ...props }: ToastProps) => {
      toast(title, {
        description,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
        ...props,
      })
    },
  }
}

export { useToast, toast }
// The error is here - we're exporting ToastProps twice
// Removing the duplicate export of ToastProps
