import { useRoute, Link } from "wouter"
import { useGetBadge, getGetBadgeQueryKey } from "@workspace/api-client-react"
import { ArrowLeft, Clock, Terminal, AlertTriangle, Copy, Check, ExternalLink, ShieldAlert, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { useState } from "react"

export default function BadgeDetail() {
  const [, params] = useRoute("/badge/:id")
  const id = params?.id
  const { data: badge, isLoading, isError } = useGetBadge(id!, {
    query: { enabled: !!id, queryKey: id ? getGetBadgeQueryKey(id) : [] }
  })
  
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (!badge?.consoleCommand) return;
    navigator.clipboard.writeText(badge.consoleCommand);
    setCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <Skeleton className="w-24 h-10 mb-8 rounded-md" />
        <div className="flex items-start gap-6 mb-12">
          <Skeleton className="w-24 h-24 rounded-2xl" />
          <div className="space-y-4 flex-1">
            <Skeleton className="w-1/3 h-10" />
            <Skeleton className="w-2/3 h-6" />
          </div>
        </div>
        <Skeleton className="w-full h-64 rounded-xl" />
      </div>
    )
  }

  if (isError || !badge) {
    return (
      <div className="p-6 md:p-10 text-center mt-20">
        <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Badge Not Found</h2>
        <p className="text-muted-foreground mb-6">This badge might not exist or the ID is incorrect.</p>
        <Button asChild>
          <Link href="/">Return to Encyclopedia</Link>
        </Button>
      </div>
    )
  }

  const rarityVariant = badge.rarity as "common" | "uncommon" | "rare" | "very_rare" | "legendary" | "legacy";
  const difficultyVariant = badge.difficulty as "instant" | "easy" | "medium" | "hard" | "unobtainable";

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto animate-in fade-in duration-300">
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Encyclopedia
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
        <div 
          className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-white font-black text-4xl md:text-5xl shadow-2xl shrink-0 border-4 border-background"
          style={{ backgroundColor: badge.color, boxShadow: `0 10px 40px ${badge.color}40` }}
        >
          {badge.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{badge.name}</h1>
            {!badge.obtainable && (
              <Badge variant="legacy" className="text-sm px-3 py-1 uppercase tracking-widest">Legacy</Badge>
            )}
          </div>
          
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-2xl">
            {badge.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="capitalize text-sm py-1.5 px-4 bg-card/50 border-border/50">
              <Award className="w-3.5 h-3.5 mr-2 opacity-70" />
              {badge.category.replace('_', ' ')}
            </Badge>
            <Badge variant={rarityVariant} className="capitalize text-sm py-1.5 px-4 font-bold tracking-wide">
              {badge.rarity.replace('_', ' ')}
            </Badge>
            <Badge variant={difficultyVariant} className="capitalize text-sm py-1.5 px-4 font-bold">
              {badge.difficulty}
            </Badge>
            {badge.timeEstimate && (
              <Badge variant="outline" className="text-sm py-1.5 px-4 bg-card/50 border-border/50 text-muted-foreground">
                <Clock className="w-3.5 h-3.5 mr-2 opacity-70" />
                {badge.timeEstimate}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
              Unlock Guide
            </h2>
            
            <div className="space-y-4">
              {badge.guide.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/50 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground leading-relaxed">{step.description}</p>
                    {step.url && (
                      <a href={step.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:underline font-medium">
                        View Resource <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {badge.consoleCommand && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                Console Command
              </h2>
              
              <div className="rounded-xl border border-destructive/20 overflow-hidden bg-black/40">
                <div className="bg-destructive/10 px-4 py-3 border-b border-destructive/20 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-destructive mb-1">Developer Console Warning</p>
                    <p className="text-destructive/80 leading-relaxed">
                      Only paste code you understand. The Discord console has full access to your account. 
                      This snippet is provided for educational purposes.
                    </p>
                  </div>
                </div>
                
                <div className="p-4 relative group">
                  <pre className="font-mono text-sm text-[#A6ACCD] overflow-x-auto p-2">
                    <code>{badge.consoleCommand}</code>
                  </pre>
                  
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <><Check className="w-4 h-4 mr-2 text-green-400" /> Copied</>
                    ) : (
                      <><Copy className="w-4 h-4 mr-2" /> Copy Code</>
                    )}
                  </Button>
                </div>
                {badge.consoleCommandLabel && (
                  <div className="bg-card/50 px-4 py-2 border-t border-border/30 text-xs text-muted-foreground font-mono">
                    // {badge.consoleCommandLabel}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          {badge.tips && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-primary">
                  <Terminal className="w-5 h-5" />
                  Pro Tips
                </h3>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {badge.tips}
                </p>
              </CardContent>
            </Card>
          )}
          
          <Card className="border-border/50 bg-card/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider">Badge Metadata</h3>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">ID</dt>
                  <dd className="font-mono font-medium">{badge.id}</dd>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="font-medium text-foreground">{badge.obtainable ? "Currently Obtainable" : "Legacy (Unobtainable)"}</dd>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium capitalize">{badge.category.replace('_', ' ')}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
