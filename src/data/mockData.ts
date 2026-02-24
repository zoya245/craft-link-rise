import { WorkerProfile, EmployerProfile, JobPosting } from "@/types";

export const mockWorkers: WorkerProfile[] = [
  {
    id: "w1",
    name: "Ramesh Kumar",
    village: "Sundargram",
    district: "Varanasi",
    skills: [
      { category: "Carpentry", description: "Traditional furniture making, door and window frames, wooden carvings with 15 years of experience." },
    ],
    experienceLevel: "Expert",
    availability: "Available",
    phone: "+91 98765 43210",
    createdAt: "2025-01-15",
  },
  {
    id: "w2",
    name: "Lakshmi Devi",
    village: "Phulwari",
    district: "Jaipur",
    skills: [
      { category: "Tailoring", description: "Specializing in traditional Rajasthani embroidery and modern garment stitching." },
      { category: "Handicrafts", description: "Handmade bags, cushion covers, and decorative items using local textiles." },
    ],
    experienceLevel: "Expert",
    availability: "Available",
    phone: "+91 87654 32109",
    createdAt: "2025-02-01",
  },
  {
    id: "w3",
    name: "Suresh Yadav",
    village: "Chandpur",
    district: "Lucknow",
    skills: [
      { category: "Electrical Work", description: "House wiring, motor repair, solar panel installation." },
    ],
    experienceLevel: "Intermediate",
    availability: "Busy",
    phone: "+91 76543 21098",
    createdAt: "2025-01-20",
  },
  {
    id: "w4",
    name: "Meena Kumari",
    village: "Basantpur",
    district: "Patna",
    skills: [
      { category: "Pottery", description: "Handcrafted clay pots, decorative items, and traditional earthenware." },
    ],
    experienceLevel: "Expert",
    availability: "Available",
    phone: "+91 65432 10987",
    createdAt: "2025-03-05",
  },
  {
    id: "w5",
    name: "Arjun Singh",
    village: "Ramnagar",
    district: "Bhopal",
    skills: [
      { category: "Masonry", description: "Brick and stone construction, plastering, tile work." },
      { category: "Painting", description: "Interior and exterior wall painting, texture work." },
    ],
    experienceLevel: "Intermediate",
    availability: "Available",
    phone: "+91 54321 09876",
    createdAt: "2025-02-10",
  },
  {
    id: "w6",
    name: "Sunita Bai",
    village: "Keshavpur",
    district: "Indore",
    skills: [
      { category: "Weaving", description: "Handloom weaving of traditional sarees and fabric." },
    ],
    experienceLevel: "Expert",
    availability: "Not Available",
    phone: "+91 43210 98765",
    createdAt: "2025-01-25",
  },
];

export const mockEmployers: EmployerProfile[] = [
  {
    id: "e1",
    name: "Priya Sharma",
    organization: "Rural Craft Foundation",
    type: "NGO",
    location: "Jaipur",
    phone: "+91 99887 76655",
    createdAt: "2025-01-10",
  },
  {
    id: "e2",
    name: "Vikram Mehta",
    organization: "BuildRight Construction",
    type: "Employer",
    location: "Lucknow",
    phone: "+91 88776 65544",
    createdAt: "2025-02-05",
  },
  {
    id: "e3",
    name: "District Skill Center",
    organization: "Govt. Skill Development Program",
    type: "Government",
    location: "Varanasi",
    phone: "+91 77665 54433",
    createdAt: "2025-01-01",
  },
];

export const mockJobs: JobPosting[] = [
  {
    id: "j1",
    employerId: "e1",
    employerName: "Rural Craft Foundation",
    title: "Artisan for Handicraft Exhibition",
    description: "Looking for skilled artisans to create handicraft items for an upcoming national craft exhibition. Training and materials provided.",
    requiredSkill: "Handicrafts",
    location: "Jaipur",
    contactInfo: "priya@ruralcraft.org",
    status: "Open",
    createdAt: "2025-02-15",
  },
  {
    id: "j2",
    employerId: "e2",
    employerName: "BuildRight Construction",
    title: "Experienced Carpenter Needed",
    description: "Seeking experienced carpenter for a residential construction project. 3-month contract with competitive daily wages.",
    requiredSkill: "Carpentry",
    location: "Lucknow",
    contactInfo: "vikram@buildright.in",
    status: "Open",
    createdAt: "2025-02-20",
  },
  {
    id: "j3",
    employerId: "e3",
    employerName: "Govt. Skill Development Program",
    title: "Electrical Training Program",
    description: "Free 6-week training program for electrical work. Certification provided upon completion. Open to all experience levels.",
    requiredSkill: "Electrical Work",
    location: "Varanasi",
    contactInfo: "skillcenter@gov.in",
    status: "Open",
    createdAt: "2025-03-01",
  },
  {
    id: "j4",
    employerId: "e1",
    employerName: "Rural Craft Foundation",
    title: "Weaving Workshop Instructor",
    description: "Seeking expert weaver to lead a 2-week workshop for young women in handloom techniques.",
    requiredSkill: "Weaving",
    location: "Jaipur",
    contactInfo: "priya@ruralcraft.org",
    status: "Closed",
    createdAt: "2025-01-10",
  },
];

export const SKILL_CATEGORIES: string[] = [
  "Carpentry", "Tailoring", "Handicrafts", "Electrical Work",
  "Plumbing", "Masonry", "Pottery", "Weaving",
  "Farming", "Cooking", "Painting", "Welding",
];

export const DISTRICTS: string[] = [
  "Varanasi", "Jaipur", "Lucknow", "Patna", "Bhopal",
  "Indore", "Kanpur", "Agra", "Nashik", "Pune",
];
