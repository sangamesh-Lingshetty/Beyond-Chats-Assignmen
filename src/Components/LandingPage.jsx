import {
  ArrowRight,
  MessageCircle,
  Bot,
  Zap,
  Shield,
  ArrowDown,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrganizationSetup from "./OrganizationSetup";
import ChatbotIntegration from "./ChatbotIntegration";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const LandingPage = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [loading, setloading] = useState(false);
  
  useEffect(() => {
    setisVisible(true);
  }, []);

  const username = localStorage.getItem("username") || "";

  const handleLogOut = () => {
    setloading(true);
    localStorage.removeItem("username");
    window.location.reload();
    toast.success("Logout Successfully!", {
      autoClose: 2000,
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="h-8 w-8 text-emerald-600" />
                <span className="ml-2 text-xl font-bold text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ChatPlatform
                </span>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setisMenuOpen(!isMenuOpen)}
                  className="text-emerald-600 hover:text-emerald-800 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>

              {/* Desktop Navigation */}
              {!username ? (
                <div className="hidden md:flex items-center space-x-4">
                  <Link to={"/register"} target="_blank">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                    >
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <h3 className="text-emerald-800">Welcome {username}</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogOut}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Logout"
                    )}
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="md:hidden mt-4"
                >
                  {!username ? (
                    <Link to={"/register"} target="_blank">
                      <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center shadow-md">
                        Register Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </Link>
                  ) : (
                    <>
                      <h4 className="px-4 py-2 text-emerald-800">Hi {username}</h4>
                      <button
                        onClick={handleLogOut}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center shadow-md"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="pt-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.div
                variants={fadeInUp}
                className="text-center max-w-4xl mx-auto"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-emerald-950 mb-6">
                  Transform Your Website with
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {" "}Intelligent Chat
                  </span>
                </h1>
                <p className="text-xl text-emerald-800 mb-8">
                  Create AI-powered chatbots that understand your business and
                  delight your customers. Set up in minutes, not days.
                </p>
                {username ? (
                  <div className="flex justify-center">
                    <Link to="/">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        Start Below
                        <ArrowDown className="h-6 w-6" />
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Link to="/register" target="_blank">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        Get Started
                        <ArrowRight className="h-6 w-6" />
                      </motion.button>
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Feature Grid */}
              <motion.div
                variants={staggerChildren}
                className="grid md:grid-cols-3 gap-8 mt-16"
              >
                {[
                  {
                    icon: <Bot className="h-12 w-12 text-emerald-600 mb-4" />,
                    title: "AI-Powered Responses",
                    description:
                      "Smart chatbots that learn from your website content and provide accurate responses.",
                  },
                  {
                    icon: <Zap className="h-12 w-12 text-teal-600 mb-4" />,
                    title: "Quick Setup",
                    description:
                      "Get your chatbot up and running in minutes with our easy-to-use platform.",
                  },
                  {
                    icon: <Shield className="h-12 w-12 text-cyan-600 mb-4" />,
                    title: "Secure & Reliable",
                    description:
                      "Enterprise-grade security and reliability for your business communications.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100"
                  >
                    {feature.icon}
                    <h3 className="text-xl font-semibold mb-2 text-emerald-900">
                      {feature.title}
                    </h3>
                    <p className="text-emerald-700">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

         
        </main>

        <OrganizationSetup />
        <ChatbotIntegration />

        {/* Footer */}
        <footer className="mt-24 bg-gradient-to-r from-emerald-50 to-teal-50 py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <MessageCircle className="h-6 w-6 text-emerald-600" />
                <span className="ml-2 text-emerald-800 font-semibold">
                  ChatPlatform
                </span>
              </div>
              <div className="text-emerald-600 text-sm">
                © 2025 BeyondChats. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;