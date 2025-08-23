"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Terminal, Users, Code } from "lucide-react"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    teamName: "",
    teamSize: "",
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    college: "",
    experience: "",
    techStack: "",
    projectIdea: "",
    agreeTerms: false,
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Registration submitted successfully! Check your email for confirmation.")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <Terminal className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-orbitron">CyberHack 2025</span>
          </Link>
          <div className="text-sm text-muted-foreground">Step {step} of 3</div>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-orbitron mb-4 text-primary neon-glow">
            {"<"} REGISTRATION {"/>"}
          </h1>
          <p className="text-muted-foreground">Join the cyberpunk coding revolution</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className={`text-sm ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>Team Info</span>
            <span className={`text-sm ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>Details</span>
            <span className={`text-sm ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>Confirmation</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8 bg-card border-border/50">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Team Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Team Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="teamName">Team Name *</Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      placeholder="Enter your team name"
                      className="bg-input border-border focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="teamSize">Team Size *</Label>
                    <Select
                      value={formData.teamSize}
                      onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
                    >
                      <SelectTrigger className="bg-input border-border">
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
                      onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                      placeholder="Enter team leader's name"
                      className="bg-input border-border focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="leaderEmail">Team Leader Email *</Label>
                    <Input
                      id="leaderEmail"
                      type="email"
                      value={formData.leaderEmail}
                      onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                      placeholder="Enter email address"
                      className="bg-input border-border focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="leaderPhone">Phone Number *</Label>
                    <Input
                      id="leaderPhone"
                      type="tel"
                      value={formData.leaderPhone}
                      onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })}
                      placeholder="Enter phone number"
                      className="bg-input border-border focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Technical Details */}
            {step === 2 && (
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
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      placeholder="Enter your college name"
                      className="bg-input border-border focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Programming Experience *</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => setFormData({ ...formData, experience: value })}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                        <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="techStack">Preferred Tech Stack</Label>
                    <Input
                      id="techStack"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      placeholder="e.g., React, Node.js, Python, etc."
                      className="bg-input border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectIdea">Project Idea (Optional)</Label>
                    <Textarea
                      id="projectIdea"
                      value={formData.projectIdea}
                      onChange={(e) => setFormData({ ...formData, projectIdea: e.target.value })}
                      placeholder="Briefly describe your project idea..."
                      className="bg-input border-border focus:border-primary min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Terminal className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Confirmation</h2>
                </div>

                <div className="bg-muted/10 p-6 rounded-lg space-y-4">
                  <h3 className="text-lg font-bold text-primary">Registration Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Team Name:</span>
                      <p className="font-medium">{formData.teamName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Team Size:</span>
                      <p className="font-medium">{formData.teamSize} member(s)</p>
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
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm">
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

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  className="border-border text-foreground hover:bg-muted bg-transparent"
                >
                  Previous
                </Button>
              )}

              <div className="ml-auto">
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!formData.agreeTerms}
                    className="bg-secondary hover:bg-secondary/80 text-secondary-foreground glitch-effect"
                  >
                    Submit Registration
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
