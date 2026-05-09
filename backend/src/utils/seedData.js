const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Expert = require("../models/Expert");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const experts = [
  {
    name: "Alice Johnson",
    category: "Design",
    experience: 5,
    rating: 4.8,
    bio: "UI/UX specialist with 5 years of experience in product design.",
    availableSlots: [
      { date: "2026-05-15", time: "10:00 AM" },
      { date: "2026-05-15", time: "11:00 AM" },
      { date: "2026-05-16", time: "02:00 PM" },
      { date: "2026-05-16", time: "03:00 PM" },
    ],
  },
  {
    name: "Bob Smith",
    category: "Engineering",
    experience: 8,
    rating: 4.6,
    bio: "Full stack developer specializing in React and Node.js.",
    availableSlots: [
      { date: "2026-05-15", time: "09:00 AM" },
      { date: "2026-05-15", time: "10:00 AM" },
      { date: "2026-05-16", time: "03:00 PM" },
    ],
  },
  {
    name: "Carol White",
    category: "Marketing",
    experience: 6,
    rating: 4.9,
    bio: "Growth marketing expert helping startups scale.",
    availableSlots: [
      { date: "2026-05-17", time: "10:00 AM" },
      { date: "2026-05-17", time: "01:00 PM" },
      { date: "2026-05-18", time: "11:00 AM" },
    ],
  },
  {
    name: "David Lee",
    category: "Engineering",
    experience: 10,
    rating: 4.7,
    bio: "Backend engineer with expertise in distributed systems.",
    availableSlots: [
      { date: "2026-05-15", time: "02:00 PM" },
      { date: "2026-05-17", time: "09:00 AM" },
      { date: "2026-05-18", time: "10:00 AM" },
    ],
  },
  {
    name: "Emma Davis",
    category: "Design",
    experience: 4,
    rating: 4.5,
    bio: "Brand designer focused on creating memorable visual identities.",
    availableSlots: [
      { date: "2026-05-16", time: "10:00 AM" },
      { date: "2026-05-17", time: "02:00 PM" },
      { date: "2026-05-18", time: "03:00 PM" },
    ],
  },
  {
    name: "Frank Wilson",
    category: "Marketing",
    experience: 7,
    rating: 4.3,
    bio: "SEO and content marketing strategist.",
    availableSlots: [
      { date: "2026-05-15", time: "11:00 AM" },
      { date: "2026-05-16", time: "01:00 PM" },
      { date: "2026-05-18", time: "09:00 AM" },
    ],
  },
  {
    name: "Grace Kim",
    category: "Finance",
    experience: 9,
    rating: 4.9,
    bio: "Financial advisor helping businesses manage their finances.",
    availableSlots: [
      { date: "2026-05-15", time: "03:00 PM" },
      { date: "2026-05-17", time: "11:00 AM" },
      { date: "2026-05-18", time: "02:00 PM" },
    ],
  },
  {
    name: "Henry Brown",
    category: "Finance",
    experience: 12,
    rating: 4.8,
    bio: "Investment strategist with expertise in startup funding.",
    availableSlots: [
      { date: "2026-05-15", time: "01:00 PM" },
      { date: "2026-05-16", time: "09:00 AM" },
      { date: "2026-05-17", time: "03:00 PM" },
    ],
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Expert.deleteMany();
    await Expert.insertMany(experts);
    console.log("✅ Seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
