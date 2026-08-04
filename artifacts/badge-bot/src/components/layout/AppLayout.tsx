import { Link, useLocation } from "wouter"
import { Shield, LayoutGrid, BarChart2, Terminal } from "lucide-react"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Encyclopedia", icon: LayoutGrid },
    { href: "/stats", label: "Statistics", icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-card border-r border-border md:h-screen sticky top-0 flex flex-col z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_15px_rgba(88,101,242,0.3)]">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">BadgeBot</span>
        </div>
        <nav className="flex-1 px-4 flex flex-col gap-2">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${location === item.href ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
              <item.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-background/50 border border-border rounded-lg p-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 mb-2 text-foreground font-medium">
              <Terminal className="w-4 h-4 text-primary" />
              Developer Note
            </div>
            Use console commands with caution. Never paste code from untrusted sources into your Discord client.
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden min-h-[100dvh] relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 -z-10 blur-3xl pointer-events-none" />
        {children}
      </main>
    </div>
  )
}
