import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Briefcase, Plus, Trash2, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { SKILL_CATEGORIES, DISTRICTS } from "@/data/mockData";
import type { ExperienceLevel, AvailabilityStatus } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Register = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState<string | null>(null);

  const [workerName, setWorkerName] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [experience, setExperience] = useState<ExperienceLevel | "">("");
  const [availability, setAvailability] = useState<AvailabilityStatus | "">("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState<{ category: string; description: string }[]>([{ category: "", description: "" }]);

  const [empName, setEmpName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [empType, setEmpType] = useState("");
  const [empLocation, setEmpLocation] = useState("");
  const [empPhone, setEmpPhone] = useState("");

  const addSkill = () => setSkills([...skills, { category: "", description: "" }]);
  const removeSkill = (i: number) => setSkills(skills.filter((_, idx) => idx !== i));
  const updateSkill = (i: number, field: "category" | "description", value: string) => {
    const updated = [...skills];
    updated[i][field] = value;
    setSkills(updated);
  };

  const handleWorkerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerName || !village || !district || !experience || !availability || !phone || !skills[0]?.category) {
      toast({ title: t.pleaseFillAllFields, variant: "destructive" });
      return;
    }
    toast({ title: t.workerRegistered });
    setSubmitted("worker");
  };

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName || !orgName || !empType || !empLocation || !empPhone) {
      toast({ title: t.pleaseFillAllFields, variant: "destructive" });
      return;
    }
    toast({ title: t.employerRegistered });
    setSubmitted("employer");
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-olive" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold">{t.registrationSuccessful}</h1>
          <p className="mt-2 text-muted-foreground">
            {submitted === "worker" ? t.workerSuccessDesc : t.employerSuccessDesc}
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => setSubmitted(null)}>{t.registerAnother}</Button>
            <Button variant="outline" onClick={() => window.location.href = "/dashboard"}>{t.goToDashboard}</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">{t.registerTitle}</h1>
          <p className="mt-1 text-muted-foreground">{t.registerDesc}</p>
        </div>

        <Tabs defaultValue="worker">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="worker" className="gap-2"><UserPlus className="h-4 w-4" /> {t.worker}</TabsTrigger>
            <TabsTrigger value="employer" className="gap-2"><Briefcase className="h-4 w-4" /> {t.employerNgo}</TabsTrigger>
          </TabsList>

          <TabsContent value="worker">
            <form onSubmit={handleWorkerSubmit} className="space-y-5 rounded-xl border bg-card p-6">
              <h2 className="font-display text-xl font-bold">{t.workerProfile}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>{t.fullName} *</Label><Input value={workerName} onChange={e => setWorkerName(e.target.value)} placeholder="e.g. Ramesh Kumar" /></div>
                <div><Label>{t.phone} *</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" /></div>
                <div><Label>{t.village} *</Label><Input value={village} onChange={e => setVillage(e.target.value)} placeholder="e.g. Sundargram" /></div>
                <div>
                  <Label>{t.district} *</Label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger><SelectValue placeholder={t.selectDistrict} /></SelectTrigger>
                    <SelectContent>{DISTRICTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t.experienceLevel} *</Label>
                  <Select value={experience} onValueChange={v => setExperience(v as ExperienceLevel)}>
                    <SelectTrigger><SelectValue placeholder={t.selectLevel} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">{t.beginner}</SelectItem>
                      <SelectItem value="Intermediate">{t.intermediate}</SelectItem>
                      <SelectItem value="Expert">{t.expert}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t.availability} *</Label>
                  <Select value={availability} onValueChange={v => setAvailability(v as AvailabilityStatus)}>
                    <SelectTrigger><SelectValue placeholder={t.selectStatus} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">{t.available}</SelectItem>
                      <SelectItem value="Busy">{t.busy}</SelectItem>
                      <SelectItem value="Not Available">{t.notAvailable}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">{t.skills} *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSkill} className="gap-1">
                    <Plus className="h-3 w-3" /> {t.addSkill}
                  </Button>
                </div>
                {skills.map((skill, i) => (
                  <div key={i} className="rounded-lg border bg-muted/30 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t.skill} {i + 1}</span>
                      {skills.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeSkill(i)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                    <Select value={skill.category} onValueChange={v => updateSkill(i, "category", v)}>
                      <SelectTrigger><SelectValue placeholder={t.selectSkillCategory} /></SelectTrigger>
                      <SelectContent>{SKILL_CATEGORIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                    <Textarea placeholder={t.describeWork} value={skill.description} onChange={e => updateSkill(i, "description", e.target.value)} rows={2} />
                  </div>
                ))}
              </div>

              <Button type="submit" size="lg" className="w-full">{t.registerAsWorkerBtn}</Button>
            </form>
          </TabsContent>

          <TabsContent value="employer">
            <form onSubmit={handleEmployerSubmit} className="space-y-5 rounded-xl border bg-card p-6">
              <h2 className="font-display text-xl font-bold">{t.employerProfile}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>{t.contactName} *</Label><Input value={empName} onChange={e => setEmpName(e.target.value)} placeholder="e.g. Priya Sharma" /></div>
                <div><Label>{t.organizationName} *</Label><Input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. Rural Craft Foundation" /></div>
                <div>
                  <Label>{t.type} *</Label>
                  <Select value={empType} onValueChange={setEmpType}>
                    <SelectTrigger><SelectValue placeholder={t.selectType} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employer">{t.employer}</SelectItem>
                      <SelectItem value="NGO">{t.ngo}</SelectItem>
                      <SelectItem value="Government">{t.government}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>{t.location} *</Label><Input value={empLocation} onChange={e => setEmpLocation(e.target.value)} placeholder="e.g. Jaipur" /></div>
                <div className="sm:col-span-2"><Label>{t.phone} *</Label><Input value={empPhone} onChange={e => setEmpPhone(e.target.value)} placeholder="+91 99887 76655" /></div>
              </div>
              <Button type="submit" size="lg" className="w-full">{t.registerAsEmployer}</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Register;
