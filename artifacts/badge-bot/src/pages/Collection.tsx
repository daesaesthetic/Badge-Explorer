import { useMemo } from "react";
import { Link } from "wouter";
import { Check, Circle, RotateCcw, Trophy } from "lucide-react";
import { useListBadges } from "@workspace/api-client-react";
import type { Badge as BadgeType } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollection } from "@/hooks/use-collection";

export default function Collection() {
  const { data: badges, isLoading } = useListBadges();
  const { ownedSet, ownedCount, toggleOwned, clearCollection } = useCollection();

  const obtainableBadges = useMemo(
    () => badges?.filter((badge) => badge.obtainable) ?? [],
    [badges],
  );
  const ownedObtainable = obtainableBadges.filter((badge) => ownedSet.has(badge.id));
  const remaining = obtainableBadges.filter((badge) => !ownedSet.has(badge.id));
  const percent = obtainableBadges.length
    ? Math.round((ownedObtainable.length / obtainableBadges.length) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <Skeleton className="w-64 h-10 mb-10" />
        <Skeleton className="h-32 rounded-xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">
            Personal tracker
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">My Collection</h1>
          <p className="text-muted-foreground max-w-2xl">
            Keep a private checklist of the badges you have earned. It stays in this browser and never leaves your device.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 self-start md:self-auto"
          onClick={clearCollection}
          disabled={ownedCount === 0}
        >
          <RotateCcw className="w-4 h-4" />
          Reset checklist
        </Button>
      </header>

      <Card className="border-primary/30 bg-primary/5 mb-10 overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-end justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Obtainable progress</p>
                  <p className="text-3xl font-black">{ownedObtainable.length} <span className="text-lg text-muted-foreground font-medium">/ {obtainableBadges.length}</span></p>
                </div>
                <span className="text-2xl font-black text-primary">{percent}%</span>
              </div>
              <div className="h-3 rounded-full bg-background/70 overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }} />
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {remaining.length === 0
                  ? "Every obtainable badge is marked. Nice work."
                  : `${remaining.length} obtainable ${remaining.length === 1 ? "badge remains" : "badges remain"} on your list.`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="mb-10">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold">Still hunting</h2>
            <p className="text-sm text-muted-foreground">Your next targets, ordered by difficulty.</p>
          </div>
          <Link href="/" className="text-sm text-primary hover:underline">Browse encyclopedia</Link>
        </div>
        {remaining.length === 0 ? (
          <EmptyState text="You have checked off every obtainable badge in the catalog." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {remaining.map((badge) => (
              <CollectionRow key={badge.id} badge={badge} owned={false} onToggle={() => toggleOwned(badge.id)} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold">Marked obtained</h2>
            <p className="text-sm text-muted-foreground">Includes legacy badges for a complete collection record.</p>
          </div>
        </div>
        {badges && badges.filter((badge) => ownedSet.has(badge.id)).length === 0 ? (
          <EmptyState text="Nothing marked yet. Open a badge and mark it when you earn it." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {badges?.filter((badge) => ownedSet.has(badge.id)).map((badge) => (
              <CollectionRow key={badge.id} badge={badge} owned onToggle={() => toggleOwned(badge.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CollectionRow({
  badge,
  owned,
  onToggle,
}: {
  badge: BadgeType;
  owned: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className={`border-border/50 transition-all hover:border-primary/50 ${owned ? "bg-primary/5" : "bg-card/60"}`}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0" style={{ backgroundColor: badge.color }}>
          {badge.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/badge/${badge.id}`} className="font-semibold truncate block hover:text-primary transition-colors">
            {badge.name}
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={badge.obtainable ? "outline" : "legacy"} className="text-[10px] px-2 py-0.5">
              {badge.obtainable ? badge.difficulty : "legacy"}
            </Badge>
            <span className="text-xs text-muted-foreground capitalize">{badge.category.replace("_", " ")}</span>
          </div>
        </div>
        <Button variant={owned ? "secondary" : "outline"} size="icon" className="shrink-0" onClick={onToggle} aria-label={owned ? `Remove ${badge.name}` : `Mark ${badge.name} obtained`}>
          {owned ? <Check className="w-4 h-4 text-primary" /> : <Circle className="w-4 h-4" />}
        </Button>
      </CardContent>
    </Card>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-12 bg-card/20 rounded-xl border border-border border-dashed">
      <Check className="w-8 h-8 text-primary mx-auto mb-3" />
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}