"use client";
import { useRouter } from "next/navigation"; 
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Terminal, Users, Code } from "lucide-react";
import axios from "axios";
interface FormData {
  teamName: string;
  teamSize: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  college: string;
  experience: string;
  techStack: string;
  projectTopic: string;
  projectIdea: string;
  agreeTerms: boolean;
  memberNames: string[];
  transactionId: string;
  paymentAmount: number; // assuming totalFee is a number
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    teamSize: "",
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    college: "Kathir college of Engineering",
    experience: "",
    techStack: "",
    projectTopic: "",
    projectIdea: "",
    agreeTerms: false,
    memberNames: [] as string[],
    transactionId: "",
    paymentAmount: 0,
  });
  const router = useRouter();
  const inputClass =
    "border border-border bg-input focus:border-primary focus:ring-1 focus:ring-primary";

  const selectTriggerClass =
    "border border-border bg-input focus:border-primary focus:ring-1 focus:ring-primary";

  // Validate phone number is 10 digit number
  const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Check for unique names in the team members including leader
  const hasUniqueNames = () => {
    const names = [
      // formData.leaderName.trim(),
      ...formData.memberNames.map((n) => n.trim()),
    ];
    const nonEmptyNames = names.filter((n) => n !== "");
    return new Set(nonEmptyNames).size === nonEmptyNames.length;
  };

  // Validate all required fields for the current step
  const canProceed = () => {
    if (step === 1) {
      return (
        formData.teamName.trim() !== "" &&
        formData.teamSize.trim() !== "" &&
        formData.leaderName.trim() !== "" &&
        formData.leaderEmail.trim() !== "" &&
        isValidEmail(formData.leaderEmail.trim()) && // check email
        formData.leaderPhone.trim() !== "" &&
        isValidPhone(formData.leaderPhone.trim())
      );
    }
    if (step === 2) {
      if (formData.memberNames.length !== Number(formData.teamSize))
        return false;
      if (formData.memberNames.some((name) => name.trim() === "")) return false;
      return hasUniqueNames();
    }
    if (step === 3) {
      return (
        formData.experience.trim() !== "" &&
        formData.projectTopic.trim() !== "" &&
        formData.projectIdea.trim() !== ""
      );
    }
    if (step === 4) {
      return formData.agreeTerms === true;
    }
    if (step === 5) {
      return formData.transactionId.trim() !== "";
    }
    return false;
  };

  // Handle Next Step with validations
  const handleNext = () => {
    if (!canProceed()) {
      if (step === 1) {
        if (!isValidEmail(formData.leaderEmail.trim())) {
          alert("Please enter a valid email address.");
        } else {
          alert(
            "Please fill all required fields on Step 1. Phone number must be 10 digits."
          );
        }
      } else if (step === 2) {
        if (formData.memberNames.some((name) => name.trim() === "")) {
          alert("Please fill in all team member names.");
        } else if (!hasUniqueNames()) {
          alert("Team leader and team members must have unique names.");
        }
      } else if (step === 3) {
        alert("Please fill all required fields on Step 3.");
      } else if (step === 4) {
        alert("You must agree to the terms and conditions to proceed.");
      } else if (step === 5) {
        alert("Please enter your payment transaction ID.");
      }
      return;
    }
    if (step < 5) setStep(step + 1);
  };

  // Handle Prev Step
  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  // Calculate total fee based on team size
  const teamCount = Number(formData.teamSize) || 0;
  const feePerPerson = 100;
  const totalFee = teamCount * feePerPerson;
  const finalData = { ...formData, paymentAmount: totalFee };
  console.log(finalData)

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) {
      alert(
        "Please complete all required fields and validations before submitting."
      );
      return;
    }

    const finalData = { ...formData, paymentAmount: totalFee };
    setIsSubmitting(true);
    
    try {
      const response = await axios.post("/api/register", finalData); // <-- adjust URL
      if (response.status === 200) {
        alert(
          "Registration submitted successfully! Check your email for confirmation."
        );
         router.push("/");
        console.log("Server Response:", response.data);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error: any) {
      console.error("Error submitting registration:", error);
      alert(error.response?.data?.message || "Failed to submit registration.");
    }finally{
       setIsSubmitting(false); // stop loading
    }
  };

  // QR code image URL - replace with your actual QR code image or URL
  const qrCodeUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=gobidreamer@oksbi&pn=CaesarCipher2025&am=" +
totalFee;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <Terminal className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-orbitron">
              Caesar-Cipher 2025
            </span>
          </Link>
          <div className="text-sm text-muted-foreground">Step {step} of 5</div>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-orbitron mb-4 text-primary neon-glow">
            {"<"} REGISTRATION {"/>"}
          </h1>
          <p className="text-muted-foreground">Join the coding revolution</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span
              className={`text-sm ${
                step >= 1 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Team Info
            </span>
            <span
              className={`text-sm ${
                step >= 2 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Members
            </span>
            <span
              className={`text-sm ${
                step >= 3 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Details
            </span>
            <span
              className={`text-sm ${
                step >= 4 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Confirmation
            </span>
            <span
              className={`text-sm ${
                step >= 5 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Payment
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8 bg-card border-border/50">
          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Team Information</h2>

                <div>
                  <Label htmlFor="teamName">Team Name *</Label>
                  <Input
                    id="teamName"
                    value={formData.teamName}
                    onChange={(e) =>
                      setFormData({ ...formData, teamName: e.target.value })
                    }
                    placeholder="Enter your team name"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <Label htmlFor="teamSize">Team Size *</Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value) => {
                      const size = parseInt(value || "0");
                      const members = Array(size).fill(""); // create array for members
                      members[0] = formData.leaderName; // first member = leader
                      setFormData({
                        ...formData,
                        teamSize: value,
                        memberNames: members,
                      });
                    }}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Solo (1 member)</SelectItem>
                      <SelectItem value="2">2 members</SelectItem>
                      <SelectItem value="3">3 members</SelectItem>
                      <SelectItem value="4">4 members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="leaderName">Team Leader Name *</Label>
                  <Input
                    id="leaderName"
                    value={formData.leaderName}
                    onChange={(e) => {
                      const newLeader = e.target.value;
                      const updatedMembers = [...formData.memberNames];
                      if (updatedMembers.length > 0)
                        updatedMembers[0] = newLeader; // Sync first member
                      setFormData({
                        ...formData,
                        leaderName: newLeader,
                        memberNames: updatedMembers,
                      });
                    }}
                    placeholder="Enter team leader's name"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <Label htmlFor="leaderEmail">Leader Email *</Label>
                  <Input
                    id="leaderEmail"
                    type="email"
                    value={formData.leaderEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, leaderEmail: e.target.value })
                    }
                    placeholder="Enter email"
                    required
                    className={inputClass}
                  />
                  {formData.leaderEmail &&
                    !isValidEmail(formData.leaderEmail) && (
                      <p className="text-sm text-red-500 mt-1">
                        Enter a valid email address
                      </p>
                    )}
                </div>

                <div>
                  <Label htmlFor="leaderPhone">Phone Number *</Label>
                  <Input
                    id="leaderPhone"
                    type="tel"
                    value={formData.leaderPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, leaderPhone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    required
                    className={inputClass}
                    maxLength={10}
                  />
                  {!isValidPhone(formData.leaderPhone) &&
                    formData.leaderPhone !== "" && (
                      <p className="text-sm text-red-500 mt-1">
                        Phone number must be 10 digits
                      </p>
                    )}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Team Members</h2>
                <div className="space-y-4">
                  {formData.memberNames.map((name, index) => (
                    <div key={index}>
                      <Label htmlFor={`member-${index}`}>
                        Member {index + 1} Name *
                      </Label>
                      <Input
                        id={`member-${index}`}
                        value={index === 0 ? formData.leaderName : name} // first member is always leader
                        onChange={(e) => {
                          if (index === 0) return; // prevent editing leader
                          const newMembers = [...formData.memberNames];
                          newMembers[index] = e.target.value;
                          setFormData({ ...formData, memberNames: newMembers });
                        }}
                        placeholder={`Enter name of member ${index + 1}`}
                        required
                        className={inputClass}
                        disabled={index === 0} // first member disabled
                      />
                      {index === 0 && (
                        <p className="text-xs text-muted-foreground">
                          Leader name is auto-filled and cannot be changed
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Technical Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Code className="h-6 w-6 text-secondary" />
                  <h2 className="text-2xl font-bold">Technical Details</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="college">College/Institution *</Label>
                    <Input
                      id="college"
                      value={formData.college}
                      disabled
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Programming Experience *</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) =>
                        setFormData({ ...formData, experience: value })
                      }
                    >
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">
                          Beginner (0-1 years)
                        </SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate (1-3 years)
                        </SelectItem>
                        <SelectItem value="advanced">
                          Advanced (3+ years)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="techStack">Preferred Tech Stack</Label>
                    <Input
                      id="techStack"
                      value={formData.techStack}
                      onChange={(e) =>
                        setFormData({ ...formData, techStack: e.target.value })
                      }
                      placeholder="e.g., React, Node.js, Python, etc."
                      className={inputClass}
                    />
                  </div>

                  {/* Project Topic Selection */}
                  <div>
                    <Label htmlFor="projectTopic">Project Topic *</Label>
                    <Select
                      value={formData.projectTopic}
                      onValueChange={(value) =>
                        setFormData({ ...formData, projectTopic: value })
                      }
                    >
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Choose your topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cybersecurity">
                          Cybersecurity
                        </SelectItem>
                        <SelectItem value="aiml">AI / ML</SelectItem>
                        <SelectItem value="webdevelopment">
                          Web Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Problem Statement */}
                  <div>
                    <Label htmlFor="projectIdea">Problem Statement *</Label>
                    <Textarea
                      id="projectIdea"
                      value={formData.projectIdea}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectIdea: e.target.value,
                        })
                      }
                      placeholder="Enter your problem statement related to chosen topic..."
                      className={`${inputClass} min-h-[100px]`}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Terminal className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Confirmation</h2>
                </div>

                <div className="bg-muted/10 p-6 rounded-lg space-y-4">
                  <h3 className="text-lg font-bold text-primary">
                    Registration Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Team Name:</span>
                      <p className="font-medium">{formData.teamName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Team Size:</span>
                      <p className="font-medium">
                        {formData.teamSize} member(s)
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Leader:</span>
                      <p className="font-medium">{formData.leaderName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{formData.leaderEmail}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Members:</span>
                    <ul className="list-disc pl-5 text-sm">
                      {formData.memberNames.map((name, i) => (
                        <li key={i}>{name}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Project Topic:
                    </span>
                    <p className="font-medium capitalize">
                      {formData.projectTopic}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Problem Statement:
                    </span>
                    <p className="font-medium">{formData.projectIdea}</p>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 border border-border rounded p-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        agreeTerms: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="terms" className="text-sm ml-2">
                    I agree to the{" "}
                    <Link href="#" className="text-primary hover:underline">
                      terms and conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:underline">
                      code of conduct
                    </Link>
                  </Label>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {step === 5 && (
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold mb-4 text-primary">
                  Payment
                </h2>
                <p className="mb-4">
                  Total Team Members: <strong>{teamCount}</strong>
                </p>
                <p className="mb-8">
                  Each member pays ₹100, total: <strong>₹{totalFee}</strong>
                </p>
                <div>
                  <img
                    src={qrCodeUrl}
                    alt="Payment QR Code"
                    className="mx-auto mb-6 border border-border rounded"
                    width={200}
                    height={200}
                  />
                  <p className="mb-4 text-muted-foreground">
                    Scan this QR code with your payment app (e.g., UPI), pay the
                    amount, then enter your transaction ID below.
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  <Label htmlFor="transactionId">
                    Payment Transaction ID *
                  </Label>
                  <Input
                    id="transactionId"
                    value={formData.transactionId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        transactionId: e.target.value,
                      })
                    }
                    placeholder="Enter your payment transaction ID"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  className="border border-border text-foreground hover:bg-muted bg-transparent"
                >
                  Previous
                </Button>
              )}

              <div className="ml-auto">
                {step < 5 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary border border-primary text-primary-foreground hover:bg-primary/80"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={formData.transactionId.trim() === ""}
                    className={`bg-secondary border border-secondary text-secondary-foreground ${
                      formData.transactionId.trim() !== ""
                        ? "hover:bg-secondary/80"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Submit Registration
                  </Button>
                )}
              </div>
            </div>
          </form>
          {isSubmitting && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="loader border-4 border-t-primary border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
  </div>
)}

        </Card>
      </div>
    </div>
  );
}
