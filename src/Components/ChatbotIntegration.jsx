import React, { useState } from "react";
import {
  Check,
  Share2,
  Copy,
  Mail,
  Loader2,
  X,
  User,
  ArrowRight,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatbotIntegration = () => {
  const [integrationStatus, setIntegrationStatus] = useState("initial");
  const [showInstructions, setShowInstructions] = useState(false);
  const [showEmail, setemail] = useState(false);
  const [loadingtest, setloadingTest] = useState(false);
  const [loadingEmail, setloadingEmail] = useState(false);
  const [message, setmessage] = useState("");
  const [loadSucess, setloadSucess] = useState(false);

  const dummyCode = `<script>
  window.chatbotConfig = {
    apiKey: 'demo-key-123',
    position: 'bottom-right'
  };
</script>
<script src="https://chatbot-demo.com/widget.js"></script>`;

  const navigate = useNavigate();

  const handleTestChatbot = () => {
    setloadingTest(true);
    setTimeout(() => {
      navigate("/client-website");
      setloadingTest(false);
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(dummyCode);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setloadingEmail(true);
    setTimeout(() => {
      setloadingEmail(false);
      setmessage("Sent email Successfully");
    }, 2000);
  };

  const handleTestIntegration = () => {
    setloadSucess(true);
    setTimeout(() => {
      setloadSucess(false);
      const isSuccess = Math.random() > 0.5;
      setIntegrationStatus(isSuccess ? "success" : "pending");
    }, 4000);
  };

  const username = localStorage.getItem("username") || "";
  if (!username) return null;

  const closePop = () => {
    setIntegrationStatus("initial");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-300 border border-emerald-100">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Chatbot Integration & Testing
          </h1>

          {/* Test Chatbot Section */}
          <div className="space-y-6">
            <div className="rounded-lg p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <h2 className="text-xl font-bold mb-4 text-emerald-800">
                Test Your Chatbot
              </h2>
              <button
                onClick={handleTestChatbot}
                disabled={loadingtest}
                className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
              >
                {loadingtest ? (
                  <div className="flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Loading...
                  </div>
                ) : (
                  "Test Chatbot"
                )}
              </button>
            </div>

            {/* Integration Section */}
            <div className="rounded-lg p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200">
              <h2 className="text-xl font-bold mb-4 text-teal-800">
                Integration Instructions
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  View Integration Instructions
                </button>

                {showInstructions && (
                  <div className="bg-white/90 p-4 rounded-lg mt-4 border border-teal-100">
                    <h3 className="font-semibold mb-2 text-teal-800">
                      Copy this code to your website:
                    </h3>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative font-mono text-sm">
                      {dummyCode}
                      <button
                        onClick={handleCopyCode}
                        className="absolute top-2 right-2 p-2 hover:bg-gray-700 rounded text-teal-400 hover:text-teal-300"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setemail(!showEmail)}
                  className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Mail Instructions to Developer
                </button>

                {showEmail && (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-400" />
                      <input
                        type="email"
                        required
                        className="pl-10 w-full py-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-teal-400"
                        placeholder="Developer's Email"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                      disabled={loadingEmail}
                    >
                      {loadingEmail ? (
                        <div className="flex items-center">
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          Send
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                    {message && (
                      <div className="text-emerald-500 font-semibold mt-2">
                        {message}
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Test Integration Section */}
            <div className="rounded-lg p-6 bg-gradient-to-r from-cyan-50 to-emerald-50 border border-cyan-200">
              <h2 className="text-xl font-bold mb-4 text-cyan-800">
                Test Integration
              </h2>
              <button
                onClick={handleTestIntegration}
                className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
              >
                {loadSucess ? (
                  <div className="flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Validating...
                  </div>
                ) : (
                  "Test Integration"
                )}
              </button>
            </div>
          </div>

          {/* Success Modal */}
          {integrationStatus === "success" && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="relative bg-white rounded-xl p-8 max-w-md w-full mx-4 border border-emerald-200">
                <button
                  onClick={closePop}
                  className="absolute top-4 right-4 rounded-lg text-gray-500 z-50 hover:text-gray-700"
                >
                  <X className="h-5 w-5 " />
                </button>
                <div className="text-center">
                  <div className="mb-4 text-2xl">🎉</div>
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Integration Successful!
                  </h3>
                  <div className="space-y-4">
                    <button className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Explore Admin Panel
                    </button>
                    <button className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Start Talking to Your Chatbot
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {integrationStatus === "pending" && (
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-semibold text-amber-800 mb-2">
                Integration Not Yet Detected
              </h3>
              <p className="text-amber-700">
                We haven't detected the chatbot on your website yet. Please make
                sure you've correctly added the integration code and try testing
                again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotIntegration;
