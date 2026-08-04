import { useLocation } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6 text-destructive">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-bold text-foreground mb-4">404 - Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The badge or page you are looking for doesn't exist. It might have been removed or the URL is incorrect.
      </p>
      <Button onClick={() => setLocation("/")} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Return to Encyclopedia
      </Button>
    </div>
  );
}
