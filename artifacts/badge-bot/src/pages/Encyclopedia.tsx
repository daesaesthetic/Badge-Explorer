import { useMemo, useState } from "react"
import { Link } from "wouter"
import { Search, Trophy, History, Sparkles, Zap, Archive } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { NativeSelect } from "@/components/ui/select-native"
import { useListBadges, useListBadgeCategories } from "@workspace/api-client-react"
import type { ListBadgesObtainable, Badge as BadgeType } from "@workspace/api-client-react"
import { useDebounce } from "@/hooks/use-debounce"
import { useCollection } from "@/hooks/use-collection"
import { Button } from "@/components/ui/button"

export default function Encyclopedia() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)
  
  const [category, setCategory] = useState<string>("")
  const [difficulty, setDifficulty] = useState<string>("")
  const [obtainable, setObtainable] = useState<string>("")
  const { ownedSet, ownedCount } = useCollection()

  const parsedObtainable = obtainable === "" ? undefined : obtainable as ListBadgesObtainable

  const { data: badges, isLoading: isLoadingBadges } = useListBadges({
    q: debouncedSearch || undefined,
    category: category || undefined,
    difficulty: difficulty || undefined,
    obtainable: parsedObtainable
  })

  const { data: categories } = useListBadgeCategories()
  const obtainableTotal = useMemo(() => badges?.filter((badge) => badge.obtainable).length ?? 0, [badges])

  const applyQuickFilter = (next: { difficulty?: string; obtainable?: string }) => {
    setSearch("")
    setCategory("")
    setDifficulty(next.difficulty ?? "")
    setObtainable(next.obtainable ?? "")
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Badge Encyclopedia</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Discover, track, and unlock every Discord badge. From common achievements to legendary legacy artifacts.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <Button variant="secondary" className="justify-start gap-3 h-auto py-3" onClick={() => applyQuickFilter({ difficulty: "instant", obtainable: "true" })}>
          <Zap className="w-4 h-4 text-[#57F287]" />
          <span className="text-left"><span className="block font-semibold">Quick wins</span><span className="text-xs text-muted-foreground">Instant unlocks</span></span>
        </Button>
        <Button variant="secondary" className="justify-start gap-3 h-auto py-3" onClick={() => applyQuickFilter({ obtainable: "true" })}>
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-left"><span className="block font-semibold">Obtainable now</span><span className="text-xs text-muted-foreground">{obtainableTotal} current targets</span></span>
        </Button>
        <Link href="/collection" className="flex items-center gap-3 rounded-md bg-secondary px-4 py-3 hover:bg-secondary/80 transition-colors">
          <Trophy className="w-4 h-4 text-[#FEE75C]" />
          <span className="text-left"><span className="block font-semibold">My collection</span><span className="text-xs text-muted-foreground">{ownedCount} marked obtained</span></span>
        </Link>
      </div>
      
      <div className="bg-card/40 border border-border rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search badges..." 
            className="pl-9 bg-background/50 border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
           <NativeSelect 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="bg-background/50 md:w-40"
          >
            <option value="">All Categories</option>
            {categories?.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </NativeSelect>

          <Button variant="ghost" className="gap-2" onClick={() => applyQuickFilter({ obtainable: "false" })}>
            <Archive className="w-4 h-4" />
            Legacy
          </Button>
          
          <NativeSelect 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-background/50 md:w-40"
          >
            <option value="">All Difficulties</option>
            <option value="instant">Instant</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="unobtainable">Unobtainable</option>
          </NativeSelect>

          <NativeSelect 
            value={obtainable} 
            onChange={(e) => setObtainable(e.target.value)}
            className="bg-background/50 md:w-40"
          >
            <option value="">All Statuses</option>
            <option value="true">Obtainable</option>
            <option value="false">Legacy</option>
          </NativeSelect>
        </div>
      </div>

      {isLoadingBadges ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : badges?.length === 0 ? (
        <div className="text-center py-20 bg-card/20 rounded-xl border border-border border-dashed">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No badges found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {badges?.map((badge, index) => (
             <BadgeCard key={badge.id} badge={badge} index={index} owned={ownedSet.has(badge.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

function BadgeCard({ badge, index, owned }: { badge: BadgeType, index: number, owned: boolean }) {
  const rarityVariant = badge.rarity as "common" | "uncommon" | "rare" | "very_rare" | "legendary" | "legacy";
  const difficultyVariant = badge.difficulty as "instant" | "easy" | "medium" | "hard" | "unobtainable";

  return (
    <Link 
      href={`/badge/${badge.id}`} 
      className="block group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Card className={`h-full border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 relative overflow-hidden ${!badge.obtainable ? 'bg-card/40 grayscale-[0.2] opacity-80 hover:opacity-100 hover:grayscale-0' : 'bg-card/80 hover:bg-card'}`}>
        {!badge.obtainable && (
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-10 pointer-events-none">
            <div className="absolute top-0 right-0 bg-destructive text-[10px] font-bold py-1 w-[100px] text-center rotate-45 translate-y-3 translate-x-7 shadow-sm text-destructive-foreground tracking-wider uppercase">
              Legacy
            </div>
          </div>
        )}
        <CardContent className="p-6 flex flex-col h-full gap-4">
          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-inner shrink-0"
              style={{ backgroundColor: badge.color }}
            >
              {badge.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="font-bold text-lg leading-tight truncate group-hover:text-primary transition-colors">{badge.name}</h3>
              <p className="text-sm text-muted-foreground capitalize mt-0.5">{badge.category.replace('_', ' ')}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground/90 flex-1 line-clamp-2 leading-relaxed">
            {badge.description}
          </p>
          
           <div className="flex items-center gap-2 mt-auto pt-5 border-t border-border/50">
             {owned && <Badge variant="outline" className="text-primary border-primary/30 px-2 py-1"><Trophy className="w-3 h-3 mr-1" />Owned</Badge>}
            <Badge variant={rarityVariant} className="capitalize px-3 py-1 font-bold tracking-wide">
              {badge.rarity.replace('_', ' ')}
            </Badge>
            <Badge variant={difficultyVariant} className="capitalize px-3 py-1 ml-auto font-bold">
              {badge.difficulty}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
