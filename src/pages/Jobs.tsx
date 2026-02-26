import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, Briefcase, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { mockJobs, SKILL_CATEGORIES, DISTRICTS } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const Jobs = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return mockJobs.filter((j) => {
      const matchesSearch = !searchTerm || j.title.toLowerCase().includes(searchTerm.toLowerCase()) || j.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSkill = !skillFilter || j.requiredSkill === skillFilter;
      const matchesLocation = !locationFilter || j.location === locationFilter;
      const matchesStatus = !statusFilter || j.status === statusFilter;
      return matchesSearch && matchesSkill && matchesLocation && matchesStatus;
    });
  }, [searchTerm, skillFilter, locationFilter, statusFilter]);

  const clearFilters = () => { setSearchTerm(""); setSkillFilter(""); setLocationFilter(""); setStatusFilter(""); };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">{t.jobTrainingBoard}</h1>
          <p className="mt-1 text-muted-foreground">{t.jobTrainingBoardDesc}</p>
        </div>

        <div className="mb-6 rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" /> {t.filters}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={t.searchJobs} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
            </div>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger><SelectValue placeholder={t.requiredSkill} /></SelectTrigger>
              <SelectContent>
                {SKILL_CATEGORIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger><SelectValue placeholder={t.location} /></SelectTrigger>
              <SelectContent>
                {DISTRICTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger><SelectValue placeholder={t.status} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">{t.open}</SelectItem>
                <SelectItem value="Closed">{t.closed}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(searchTerm || skillFilter || locationFilter || statusFilter) && (
            <Button variant="ghost" size="sm" className="mt-2" onClick={clearFilters}>{t.clearAllFilters}</Button>
          )}
        </div>

        <p className="mb-4 text-sm text-muted-foreground">{filtered.length} {filtered.length !== 1 ? t.opportunitiesFound : t.opportunityFound}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <Badge className={job.status === "Open" ? "bg-olive text-olive-foreground border-none" : ""}>{job.status}</Badge>
                <Badge variant="outline">{job.requiredSkill}</Badge>
              </div>
              <h3 className="font-display text-xl font-bold">{job.title}</h3>
              <p className="text-sm font-medium text-primary mt-1">{job.employerName}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" /> {job.location}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{job.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span className="text-muted-foreground">{job.contactInfo}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t.posted}: {job.createdAt}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Briefcase className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-lg font-medium">{t.noOpportunitiesFound}</p>
            <p className="text-muted-foreground">{t.tryAdjustingFilters}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Jobs;
