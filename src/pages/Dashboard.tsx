import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, MapPin, Phone, Mail, Plus, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import { mockWorkers, mockJobs, SKILL_CATEGORIES } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import type { JobPosting } from "@/types";

const availabilityIcon = (status: string) => {
  if (status === "Available") return <CheckCircle className="h-3.5 w-3.5 text-olive" />;
  if (status === "Busy") return <Clock className="h-3.5 w-3.5 text-warm" />;
  return <XCircle className="h-3.5 w-3.5 text-destructive" />;
};

const Dashboard = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobSkill, setJobSkill] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobContact, setJobContact] = useState("");

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDesc || !jobSkill || !jobLocation || !jobContact) {
      toast({ title: t.pleaseFillAll, variant: "destructive" });
      return;
    }
    const newJob: JobPosting = {
      id: `j${Date.now()}`,
      employerId: "e1",
      employerName: "Your Organization",
      title: jobTitle,
      description: jobDesc,
      requiredSkill: jobSkill as any,
      location: jobLocation,
      contactInfo: jobContact,
      status: "Open",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setJobs([newJob, ...jobs]);
    setDialogOpen(false);
    setJobTitle(""); setJobDesc(""); setJobSkill(""); setJobLocation(""); setJobContact("");
    toast({ title: t.jobPosted });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">{t.dashboardTitle}</h1>
            <p className="mt-1 text-muted-foreground">{t.dashboardDesc}</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> {t.postJob}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle className="font-display text-xl">{t.postNewOpportunity}</DialogTitle></DialogHeader>
              <form onSubmit={handlePostJob} className="space-y-4 mt-2">
                <div><Label>{t.title} *</Label><Input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Experienced Carpenter Needed" /></div>
                <div><Label>{t.description} *</Label><Textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} placeholder="Describe the opportunity..." rows={3} /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>{t.requiredSkill} *</Label>
                    <Select value={jobSkill} onValueChange={setJobSkill}>
                      <SelectTrigger><SelectValue placeholder={t.selectSkillCategory} /></SelectTrigger>
                      <SelectContent>{SKILL_CATEGORIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>{t.location} *</Label><Input value={jobLocation} onChange={e => setJobLocation(e.target.value)} placeholder="e.g. Lucknow" /></div>
                </div>
                <div><Label>{t.contactInfo} *</Label><Input value={jobContact} onChange={e => setJobContact(e.target.value)} placeholder="email or phone" /></div>
                <Button type="submit" className="w-full">{t.postOpportunity}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="workers">
          <TabsList className="mb-6">
            <TabsTrigger value="workers" className="gap-2"><Users className="h-4 w-4" /> {t.workers} ({mockWorkers.length})</TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2"><Briefcase className="h-4 w-4" /> {t.opportunities} ({jobs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="workers">
            <div className="rounded-xl border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">{t.worker}</th>
                      <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">{t.location}</th>
                      <th className="px-4 py-3 text-left font-medium">{t.skills}</th>
                      <th className="px-4 py-3 text-left font-medium hidden md:table-cell">{t.experience}</th>
                      <th className="px-4 py-3 text-left font-medium">{t.status}</th>
                      <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">{t.contactInfo}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockWorkers.map((w) => (
                      <tr key={w.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">{w.name.charAt(0)}</div>
                            <span className="font-medium">{w.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{w.village}, {w.district}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">{w.skills.map(s => <Badge key={s.category} variant="outline" className="text-xs">{s.category}</Badge>)}</div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{w.experienceLevel}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1.5">{availabilityIcon(w.availability)}<span className="text-xs">{w.availability}</span></span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="flex items-center gap-1 text-muted-foreground"><Phone className="h-3 w-3" />{w.phone}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="grid gap-4 sm:grid-cols-2">
              {jobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-xl border bg-card p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={job.status === "Open" ? "bg-olive text-olive-foreground border-none" : ""}>{job.status}</Badge>
                    <Badge variant="outline">{job.requiredSkill}</Badge>
                  </div>
                  <h3 className="font-display text-lg font-bold mt-1">{job.title}</h3>
                  <p className="text-sm text-primary">{job.employerName}</p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{job.contactInfo}</span>
                    <span>{job.createdAt}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
