import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, MapPin, Brain, Shield, Zap } from "lucide-react";

export default function Marketing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Next-Generation Field Service Management</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Empower Your Field
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Operations
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              FieldForce Pro combines powerful analytics, AI-driven insights, and real-time tracking 
              to optimize your field operations and drive revenue growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="group">
                <Link to="/">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive tools designed for modern field service management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "AI-Powered Insights",
              description: "Leverage predictive analytics and machine learning to anticipate customer churn, optimize scheduling, and maximize revenue."
            },
            {
              icon: MapPin,
              title: "Real-Time Tracking",
              description: "Monitor your technicians in the field with live GPS tracking and route optimization for maximum efficiency."
            },
            {
              icon: BarChart3,
              title: "Advanced Analytics",
              description: "Gain deep insights into your operations with comprehensive reporting and customizable dashboards."
            },
            {
              icon: Users,
              title: "Team Management",
              description: "Efficiently manage your workforce with intelligent scheduling, performance tracking, and burnout prevention."
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description: "Keep your data safe with enterprise-grade security and compliance standards."
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Built for speed and reliability, ensuring your team stays productive without interruptions."
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of field service teams already using FieldForce Pro to optimize their operations.
          </p>
          <Button size="lg" asChild>
            <Link to="/">
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
