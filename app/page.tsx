import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Code, Users, Trophy, Calendar, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-orbitron">CyberHack 2025</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#schedule" className="text-muted-foreground hover:text-primary transition-colors">
              Schedule
            </Link>
            <Link href="#prizes" className="text-muted-foreground hover:text-primary transition-colors">
              Prizes
            </Link>
            <Link href="#developers" className="text-muted-foreground hover:text-primary transition-colors">
              Developers
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-6 bg-secondary/20 text-secondary border-secondary/50">Rotaract Club Presents</Badge>

          <h1 className="text-5xl md:text-7xl font-bold font-orbitron mb-6 neon-glow text-primary">
            CYBER<span className="text-secondary">HACK</span>
          </h1>

          <div className="text-2xl md:text-3xl mb-8 terminal-cursor">
            <span className="text-muted-foreground">{">"} </span>
            <span>The Ultimate Hackathon Experience</span>
          </div>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the most electrifying hackathon competition at our college. Code your way to victory in a
            cyberpunk-themed coding marathon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold px-8 py-3 glitch-effect"
              >
                REGISTER NOW
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold font-orbitron text-center mb-12 text-primary">
            {"<"} EVENT_DETAILS {"/>"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-colors">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Duration</h3>
              <p className="text-muted-foreground">48 Hours of Non-stop Coding</p>
              <p className="text-sm text-primary mt-2">March 15-17, 2025</p>
            </Card>

            <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-colors">
              <MapPin className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Venue</h3>
              <p className="text-muted-foreground">College Tech Hub</p>
              <p className="text-sm text-secondary mt-2">Building A, Floor 3</p>
            </Card>

            <Card className="p-6 bg-card border-border/50 hover:border-primary/50 transition-colors">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Team Size</h3>
              <p className="text-muted-foreground">2-4 Members per Team</p>
              <p className="text-sm text-primary mt-2">Solo participation allowed</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-16 px-4 bg-muted/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold font-orbitron mb-12 text-secondary">
            {"<"} PRIZE_POOL {"/>"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-to-b from-secondary/20 to-transparent border-secondary/50">
              <Trophy className="h-16 w-16 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">1st Place</h3>
              <p className="text-3xl font-bold text-secondary mb-2">₹50,000</p>
              <p className="text-muted-foreground">+ Internship Opportunities</p>
            </Card>

            <Card className="p-8 bg-gradient-to-b from-primary/20 to-transparent border-primary/50">
              <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">2nd Place</h3>
              <p className="text-3xl font-bold text-primary mb-2">₹30,000</p>
              <p className="text-muted-foreground">+ Tech Gadgets</p>
            </Card>

            <Card className="p-8 bg-gradient-to-b from-muted/20 to-transparent border-muted/50">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">3rd Place</h3>
              <p className="text-3xl font-bold text-foreground mb-2">₹20,000</p>
              <p className="text-muted-foreground">+ Certificates</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section id="developers" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold font-orbitron text-center mb-12 text-primary">
            {"<"} WEBSITE_DEVELOPERS {"/>"}
          </h2>

          <Card className="p-8 bg-card border-border/50">
            <div className="text-center mb-8">
              <Code className="h-16 w-16 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Development Team</h3>
              <p className="text-muted-foreground">
                This cyberpunk-themed website was crafted by our talented development team
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-colors">
                <h4 className="text-lg font-bold text-primary mb-2">Frontend Developer</h4>
                <p className="text-muted-foreground">UI/UX Design & Implementation</p>
                <p className="text-sm text-secondary mt-2">Next.js • Tailwind CSS</p>
              </div>

              <div className="text-center p-4 border border-border/50 rounded-lg hover:border-secondary/50 transition-colors">
                <h4 className="text-lg font-bold text-secondary mb-2">Backend Developer</h4>
                <p className="text-muted-foreground">Server Logic & Database</p>
                <p className="text-sm text-primary mt-2">Node.js • Database</p>
              </div>
            </div>

            <div className="text-center mt-8 p-4 bg-muted/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Built with ❤️ using Next.js, Tailwind CSS, and cyberpunk aesthetics
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-bold font-orbitron">CyberHack 2025</span>
          </div>
          <p className="text-muted-foreground mb-4">Organized by Rotaract Club • Powered by Innovation</p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Rules
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
