import { Toaster as Sonner } from "sonner";

export function Toaster(props) {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "group border border-border bg-background text-foreground shadow-lg",
          description: "text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}
