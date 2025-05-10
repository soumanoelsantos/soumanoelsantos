
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  // Configura o toaster para duração 0 para não mostrar notificações
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={0} // Definir duração como 0 para não mostrar notificações
      toastOptions={{
        duration: 0, // Redundância para garantir que não apareçam
        className:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        descriptionClassName: "group-[.toast]:text-muted-foreground",
      }}
      {...props}
    />
  )
}

// Sobrescrevendo a função toast para não mostrar nada
const noopToast = (...args: any[]) => {
  // Não faz nada, apenas retorna um objeto vazio para evitar erros
  return { id: Date.now().toString() };
}

export { Toaster, noopToast as toast }
