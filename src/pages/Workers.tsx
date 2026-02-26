import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { mockWorkers, SKILL_CATEGORIES, DISTRICTS } from "@/data/mockData";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Workers = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialSkill = searchParams.get("skill") || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState(initialSkill);
  const [locationFilter, setLocationFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  const filtered = useMemo(() => {
    return mockWorkers.filter((w) => {
      const matchesSearch = !searchTerm || w.name.toLowerCase().includes(searchTerm.toLowerCase()) || w.skills.some(s => s.category.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSkill = !skillFilter || w.skills.some(s => s.category === skillFilter);
      const matchesLocation = !locationFilter || w.district === locationFilter;
      const matchesAvailability = !availabilityFilter || w.availability === availabilityFilter;
      return matchesSearch && matchesSkill && matchesLocation && matchesAvailability;
    });
  }, [searchTerm, skillFilter, locationFilter, availabilityFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setSkillFilter("");
    setLocationFilter("");
    setAvailabilityFilter("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">{t.findSkilledWorkers}</h1>
          <p className="mt-1 text-muted-foreground">{t.findSkilledWorkersDesc}</p>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" /> {t.filters}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={t.searchByNameOrSkill} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
            </div>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger><SelectValue placeholder={t.skillCategory} /></SelectTrigger>
              <SelectContent>
                {SKILL_CATEGORIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger><SelectValue placeholder={t.district} /></SelectTrigger>
              <SelectContent>
                {DISTRICTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger><SelectValue placeholder={t.availability} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">{t.available}</SelectItem>
                <SelectItem value="Busy">{t.busy}</SelectItem>
                <SelectItem value="Not Available">{t.notAvailable}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(searchTerm || skillFilter || locationFilter || availabilityFilter) && (
            <Button variant="ghost" size="sm" className="mt-2" onClick={clearFilters}>{t.clearAllFilters}</Button>
          )}
        </div>

        <p className="mb-4 text-sm text-muted-foreground">{filtered.length} {filtered.length !== 1 ? t.workersFound : t.workerFound}</p>

        {/* Results */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((worker, i) => (
            <motion.div
              key={worker.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-display text-xl font-bold">
                  {worker.name.charAt(0)}
                </div>
                <Badge variant={worker.availability === "Available" ? "default" : "secondary"} className={worker.availability === "Available" ? "bg-olive text-olive-foreground" : ""}>
                  {worker.availability}
                </Badge>
              </div>
              <h3 className="font-display text-xl font-bold">{worker.name}</h3>
              <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" /> {worker.village}, {worker.district}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{t.experience}: {worker.experienceLevel}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {worker.skills.map(s => (
                  <Badge key={s.category} variant="outline" className="text-xs">{s.category}</Badge>
                ))}
              </div>
              {worker.skills.map(s => (
                <p key={s.category} className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              ))}
              <div className="mt-4 flex items-center gap-2 text-sm">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">{worker.phone}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-lg font-medium">{t.noWorkersFound}</p>
            <p className="text-muted-foreground">{t.tryAdjustingFilters}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Workers;
