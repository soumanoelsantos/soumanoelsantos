
import { toast, type ToastT } from "sonner"

type ToastProps = Omit<Parameters<typeof toast>[1], "action"> & {
  action?: {
    label: string
    onClick: () => void
  }
}

const useToast = () => {
  return {
    toast: ({ title, description, action, ...props }: ToastProps) => {
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
export type { ToastProps }
