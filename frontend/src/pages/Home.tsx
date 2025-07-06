import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  CheckCircle,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Code,
  Database,
  Palette,
  Rocket,
} from "lucide-react";
import { useAppSelector } from "../hooks/redux";

const Home = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-background">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center space-y-8 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium"
            >
              <Star className="w-4 h-4 text-primary" />
              <span className="gradient-text">Assignment Project</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
            >
              <span className="gradient-text">Project Management</span>
              <br />
              <span className="text-amber-600">Made Simple</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-[700px] text-muted-foreground md:text-xl leading-relaxed"
            >
              Streamline your workflow with our intuitive project management
              system. Built with modern technologies for the modern developer.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button
                asChild
                size="lg"
                className="btn-hover-lift focus-ring bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                <Link to={currentUser ? "/dashboard" : "/register"}>
                  {currentUser ? "Go to Dashboard" : "Get Started"}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {!currentUser && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="btn-hover-lift focus-ring glass"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              )}
            </motion.div>

            {!currentUser && (
              <motion.p
                variants={itemVariants}
                className="text-sm text-muted-foreground"
              >
                Demo Account: test@example.com / Test@123
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your projects efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Authentication",
                description:
                  "JWT-based authentication with encrypted user sessions",
                color: "text-green-500",
              },
              {
                icon: CheckCircle,
                title: "Smart Task Management",
                description:
                  "Organize tasks with intuitive status tracking and due dates",
                color: "text-blue-500",
              },
              {
                icon: Users,
                title: "Project Organization",
                description:
                  "Create and manage multiple projects with detailed descriptions",
                color: "text-purple-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card-hover glass p-6 rounded-xl h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-lg bg-background/50 ${feature.color}`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple workflow
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Your Account",
                description:
                  "Sign up securely with email verification and JWT authentication",
              },
              {
                step: "02",
                title: "Set Up Projects",
                description:
                  "Create projects with detailed descriptions and organize your workflow",
              },
              {
                step: "03",
                title: "Add Tasks",
                description:
                  "Create tasks with due dates and track progress through different statuses",
              },
              {
                step: "04",
                title: "Track Progress",
                description:
                  "Monitor your projects and tasks with our intuitive dashboard",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Built With Modern Stack
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powered by cutting-edge technologies for optimal performance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "React", icon: Code, color: "text-blue-500" },
              { name: "TypeScript", icon: Zap, color: "text-blue-600" },
              { name: "Node.js", icon: Rocket, color: "text-green-500" },
              { name: "MongoDB", icon: Database, color: "text-green-600" },
              { name: "Express", icon: Rocket, color: "text-gray-500" },
              { name: "Tailwind", icon: Palette, color: "text-cyan-500" },
              { name: "JWT Auth", icon: Shield, color: "text-purple-500" },
              { name: "Vite", icon: Zap, color: "text-yellow-500" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                animate={floatingAnimation}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="card-hover glass p-4 rounded-xl text-center"
              >
                <tech.icon className={`w-8 h-8 ${tech.color} mx-auto mb-2`} />
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers who trust our platform for their
              project management needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="btn-hover-lift focus-ring bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                <Link to={currentUser ? "/dashboard" : "/register"}>
                  {currentUser ? "Go to Dashboard" : "Start Free Trial"}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {!currentUser && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="btn-hover-lift focus-ring"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
