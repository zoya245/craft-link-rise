export type SkillCategory =
  | "Carpentry"
  | "Tailoring"
  | "Handicrafts"
  | "Electrical Work"
  | "Plumbing"
  | "Masonry"
  | "Pottery"
  | "Weaving"
  | "Farming"
  | "Cooking"
  | "Painting"
  | "Welding";

export type ExperienceLevel = "Beginner" | "Intermediate" | "Expert";
export type AvailabilityStatus = "Available" | "Busy" | "Not Available";
export type JobStatus = "Open" | "Closed";
export type UserRole = "worker" | "employer";

export interface WorkerProfile {
  id: string;
  name: string;
  village: string;
  district: string;
  skills: Skill[];
  experienceLevel: ExperienceLevel;
  availability: AvailabilityStatus;
  phone: string;
  avatar?: string;
  createdAt: string;
}

export interface Skill {
  category: SkillCategory;
  description: string;
  images?: string[];
}

export interface EmployerProfile {
  id: string;
  name: string;
  organization: string;
  type: "Employer" | "NGO" | "Government";
  location: string;
  phone: string;
  createdAt: string;
}

export interface JobPosting {
  id: string;
  employerId: string;
  employerName: string;
  title: string;
  description: string;
  requiredSkill: SkillCategory;
  location: string;
  contactInfo: string;
  status: JobStatus;
  createdAt: string;
}
