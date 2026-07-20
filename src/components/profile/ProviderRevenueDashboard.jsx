import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, Users } from "lucide-react";
import { useLang } from "../../lib/LangContext";

export default function ProviderRevenueDashboard() {
  const { lang } = useLang();
  const data = [
    { month: "Jan", revenue: 400 },
    { month: "Feb", revenue: 550 },
    { month: "Mar", revenue: 700 },
    { month: "Apr", revenue: 1100 },
    { month: "May", revenue: 900 },
    { month: "Jun", revenue: 1400 },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl">
          <p className="text-xs text-muted-foreground font-semibold uppercase">{lang === "fr" ? "Revenus cumulés" : "Accumulated Revenue"}</p>
          <p className="text-2xl font-bold text-foreground mt-1">$5,050</p>
          <span className="text-[10px] text-green-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +15.3% ce mois
          </span>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl">
          <p className="text-xs text-muted-foreground font-semibold uppercase">{lang === "fr" ? "Commission Beninease" : "Beninease Commission"}</p>
          <p className="text-2xl font-bold text-foreground mt-1">10%</p>
          <p className="text-[10px] text-muted-foreground mt-1">{lang === "fr" ? "Frais de service solidaires" : "Solidarity service fees"}</p>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl">
          <p className="text-xs text-muted-foreground font-semibold uppercase">{lang === "fr" ? "Réservations totales" : "Total Bookings"}</p>
          <p className="text-2xl font-bold text-foreground mt-1">112</p>
          <span className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
            <Users className="h-3 w-3" /> 84 {lang === "fr" ? "spectateurs uniques" : "unique spectators"}
          </span>
        </div>
      </div>

      <div className="bg-card border border-border p-5 rounded-xl">
        <h3 className="font-bold text-sm text-foreground mb-4">
          {lang === "fr" ? "Évolution mensuelle des revenus ($)" : "Monthly Revenue Trend ($)"}
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
