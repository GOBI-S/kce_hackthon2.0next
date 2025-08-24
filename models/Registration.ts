import mongoose, { Schema, models } from "mongoose";

// Simple schema without validators
const RegistrationSchema = new Schema({
  teamName: String,
  teamSize: Number,
  leaderName: String,
  leaderEmail: String,
  leaderPhone: String,
  college: String,
  experience: String,
  techStack: String,
  projectTopic: String,
  projectIdea: String,
  agreeTerms: Boolean,
  memberNames: [String],
  transactionId: String,
  paymentAmount: Number,
  createdAt: { type: Date, default: () => new Date() },
});

// Prevent OverwriteModelError in Next.js hot reload
const Registration = models.Registration || mongoose.model("Registration", RegistrationSchema);

export default Registration;
