import React, { useState } from "react";
import {
  Building2,
  Globe,
  FileText,
  Check,
  Loader2,
  ChevronRight,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import axios from "axios";

const OrganizationSetup = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    description: "",
  });

  const [scrapingStatus, setScrapingStatus] = useState({
    status: "waiting",
    progress: 0,
    pages: [],
  });

  const dummyPages = [
    {
      url: "/home",
      status: "completed",
      chunks: [
        "Welcome to our company",
        "About our services",
        "Contact information",
      ],
    },
    {
      url: "/about",
      status: "completed",
      chunks: ["Company history", "Our mission", "Team members"],
    },
    { url: "/services", status: "pending", chunks: ["no chunks"] },
    { url: "/contact", status: "scraping", chunks: ["Office locations"] },
  ];

  const [selectedPage, setSelectedPage] = useState(null);
  const [showMetaDescription, setShowMetaDescription] = useState("");
  const [loading, setloading] = useState(false);

  const YOUR_OPENGRAPH_API_KEY = import.meta.env.VITE_META_API_KEY;

  const handleUrl = async () => {
    setloading(true);
    try {
      const apiKey = YOUR_OPENGRAPH_API_KEY;
      const response = await axios.get(
        `https://opengraph.io/api/1.1/site/${encodeURIComponent(
          formData.websiteUrl
        )}?app_id=${apiKey}`
      );
      const metaDescription = JSON.stringify(response.data.openGraph, null, 2);
      if (metaDescription) {
        setShowMetaDescription(metaDescription);
        setFormData((prevState) => ({
          ...prevState,
          description: metaDescription || "",
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          description: "No description available for this meta",
        }));
      }
    } catch (error) {
      setShowMetaDescription("Fetched failed");
      setFormData((prevState) => ({
        ...prevState,
        description: "No description available for this meta",
      }));
    }
    setloading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setScrapingStatus({
      ...scrapingStatus,
      status: "scraping",
      pages: dummyPages,
    });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setScrapingStatus((prev) => ({ ...prev, progress }));
      if (progress >= 100) {
        clearInterval(interval);
        setScrapingStatus((prev) => ({ ...prev, status: "completed" }));
      }
    }, 2000);
  };

  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const handleNxt = () => {
    window.location.reload();
  };

  const username = localStorage.getItem("username") || "";
  if (!username) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-300 border border-emerald-100">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Setup Your Organization
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-400" />
                  <input
                    type="text"
                    required
                    className="pl-10 w-full py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-400"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700">
                  Website URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-400" />
                  <input
                    type="url"
                    required
                    className="pl-10 w-full py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-400"
                    placeholder="https://example.com"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, websiteUrl: e.target.value })
                    }
                  />
                </div>
              </div>

              {formData.websiteUrl && isValidUrl(formData.websiteUrl) && (
                <button
                  type="button"
                  onClick={handleUrl}
                  disabled={!formData.websiteUrl}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-[1.02]"
                >
                  {loading ? "Loading..." : "Fetch URL meta"}
                </button>
              )}

              <div>
                <label className="block text-sm font-medium text-emerald-700">
                  Company Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-emerald-400" />
                  <textarea
                    className="pl-10 w-full py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-400"
                    rows="4"
                    required
                    placeholder="Describe your company"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  {showMetaDescription && (
                    <div className="mt-2 text-sm text-emerald-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Meta description automatically fetched
                    </div>
                  )}
                </div>
              </div>
            </div>

            {scrapingStatus.status === "waiting" && (
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
              >
                Start Website Analysis
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </form>

          {scrapingStatus.status !== "waiting" && (
            <div className="mt-8">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-700">
                    Analysis Progress
                  </span>
                  <span className="text-sm font-medium text-emerald-600">
                    {scrapingStatus.progress}%
                  </span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-2">
                  <div
                    className="bg-emerald-600 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${scrapingStatus.progress}%` }}
                  />
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-emerald-900 mb-4">
                  Detected Pages
                </h3>
                <div className="space-y-3">
                  {dummyPages.map((page, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg border border-emerald-200 hover:border-emerald-500 transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedPage(page)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 text-emerald-400 mr-2" />
                          <span className="text-sm font-medium">
                            {page.url}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {page.status === "completed" && (
                            <Check className="h-5 w-5 text-emerald-500" />
                          )}
                          {page.status === "scraping" && (
                            <Loader2 className="h-5 w-5 text-emerald-500 animate-spin" />
                          )}
                          {page.status === "pending" && (
                            <AlertCircle className="h-5 w-5 text-emerald-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPage && (
                <div className="mt-6 bg-emerald-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-emerald-900 mb-4">
                    Scraped Content for {selectedPage.url}
                  </h3>
                  <div className="space-y-2">
                    {selectedPage.chunks.map((chunk, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg border border-emerald-200"
                      >
                        <p className="text-sm text-emerald-600">{chunk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {scrapingStatus.status === "completed" && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleNxt}
                    className="py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 flex items-center transform hover:scale-[1.02]"
                  >
                    Continue to Integration
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}

              <button
                onClick={handleNxt}
                className="mt-4 py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 flex items-center transform hover:scale-[1.02]"
              >
                Skip and continue
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationSetup;
