import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Users, Briefcase, ArrowRight, MapPin, Hammer, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { mockWorkers, mockJobs, SKILL_CATEGORIES } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t.skilledWorkers, value: "150+", icon: Users },
    { label: t.jobsPosted, value: "45+", icon: Briefcase },
    { label: t.villagesConnected, value: "30+", icon: MapPin },
    { label: t.skillsMapped, value: "12", icon: Star },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Rural artisans at work" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40" />
        </div>
        <div className="container relative mx-auto px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 bg-primary/90 text-primary-foreground border-none text-sm px-3 py-1">
              {t.heroTag}
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-tight text-background md:text-5xl lg:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-lg text-background/80 md:text-xl">
              {t.heroDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button size="lg" className="gap-2 text-base">
                  <Hammer className="h-5 w-5" />
                  {t.registerAsWorker}
                </Button>
              </Link>
              <Link to="/workers">
                <Button size="lg" variant="secondary" className="gap-2 text-base">
                  <Search className="h-5 w-5" />
                  {t.findWorkersBtn}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold">{t.skillsWeMap}</h2>
          <p className="mt-2 text-muted-foreground">{t.skillsWeMapDesc}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {SKILL_CATEGORIES.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link to={`/workers?skill=${skill}`}>
                <div className="rounded-xl border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-md cursor-pointer">
                  <Hammer className="mx-auto mb-2 h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Workers */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold">{t.featuredWorkers}</h2>
              <p className="mt-1 text-muted-foreground">{t.featuredWorkersDesc}</p>
            </div>
            <Link to="/workers">
              <Button variant="ghost" className="gap-1">
                {t.viewAll} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockWorkers.slice(0, 3).map((worker) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-display text-lg font-bold">
                    {worker.name.charAt(0)}
                  </div>
                  <Badge variant={worker.availability === "Available" ? "default" : "secondary"} className={worker.availability === "Available" ? "bg-olive text-olive-foreground" : ""}>
                    {worker.availability}
                  </Badge>
                </div>
                <h3 className="font-display text-lg font-bold">{worker.name}</h3>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {worker.village}, {worker.district}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {worker.skills.map((s) => (
                    <Badge key={s.category} variant="outline" className="text-xs">
                      {s.category}
                    </Badge>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {worker.experienceLevel} · {worker.skills[0]?.description.slice(0, 60)}...
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">{t.recentOpportunities}</h2>
            <p className="mt-1 text-muted-foreground">{t.recentOpportunitiesDesc}</p>
          </div>
          <Link to="/jobs">
            <Button variant="ghost" className="gap-1">
              {t.viewAll} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockJobs.filter(j => j.status === "Open").map((job) => (
            <div key={job.id} className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-lg">
              <div className="flex items-start justify-between mb-2">
                <Badge className="bg-olive text-olive-foreground border-none">{job.status}</Badge>
                <Badge variant="outline">{job.requiredSkill}</Badge>
              </div>
              <h3 className="font-display text-lg font-bold mt-2">{job.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{job.employerName}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" /> {job.location}
              </p>
              <p className="text-sm mt-3 text-muted-foreground line-clamp-2">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            {t.readyToBridge}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            {t.readyToBridgeDesc}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="gap-2 text-base">
                {t.getStarted}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
