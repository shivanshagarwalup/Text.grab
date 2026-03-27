import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clipboard, 
  Download, 
  Upload, 
  Loader2, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  Moon, 
  Sun,
  Copy,
  ExternalLink,
  Zap
} from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const API_BASE_URL = "http://localhost:5000/api/clip";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [fetchCode, setFetchCode] = useState("");
  const [fetchedText, setFetchedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleCreate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, { text: inputText });
      setGeneratedCode(response.data.code);
      toast.success("Clipboard created!");
      setInputText("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create clip");
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = async () => {
    if (!fetchCode.trim()) {
      toast.error("Please enter a code.");
      return;
    }
    setLoading(true);
    setFetchedText("");
    try {
      const response = await axios.get(`${API_BASE_URL}/${fetchCode}`);
      setFetchedText(response.data.text);
      toast.success("Clip fetched!");
    } catch (err) {
      toast.error("Invalid code or clip expired");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300 flex flex-col items-center py-12 px-4 md:py-24">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full space-y-12 relative"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl">
              <Clipboard className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Online Clipboard</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsDark(!isDark)}
            className="rounded-full w-10 h-10 border border-border"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </motion.header>

        {/* Create Section */}
        <motion.section variants={itemVariants}>
          <Card className="border-border shadow-2xl bg-card/50 backdrop-blur-md overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-500" />
                Create Clipboard
              </CardTitle>
              <CardDescription>Paste your text to generate a secure, temporary code.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] font-mono text-sm bg-background/50 border-border focus-visible:ring-primary/20 transition-all rounded-xl"
              />
              <Button 
                onClick={handleCreate} 
                disabled={loading || !inputText.trim()}
                className="w-full h-12 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 transition-all active:scale-[0.98]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Clipboard"}
              </Button>
            </CardContent>
            
            <AnimatePresence>
              {generatedCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-6"
                >
                  <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center justify-between group">
                    <div>
                      <span className="text-xs font-semibold text-blue-500/70 uppercase tracking-widest mb-1 block">Your Code</span>
                      <span className="text-4xl font-mono font-black tracking-[0.2em] text-blue-500 sm:text-5xl">
                        {generatedCode}
                      </span>
                    </div>
                    <Button 
                      onClick={() => copyToClipboard(generatedCode)}
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-xl border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                    >
                      <Copy className="w-5 h-5 text-blue-500" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.section>

        {/* Divider */}
        <div className="flex items-center gap-4 px-4">
          <div className="h-[1px] flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">or</span>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        {/* Fetch Section */}
        <motion.section variants={itemVariants}>
          <Card className="border-border shadow-2xl bg-card/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-indigo-500" />
                Fetch Clipboard
              </CardTitle>
              <CardDescription>Enter a 6-character code to retrieve shared text.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code (e.g. Zx2Y9w)"
                  value={fetchCode}
                  onChange={(e) => setFetchCode(e.target.value)}
                  maxLength={6}
                  className="h-12 text-center font-mono text-xl tracking-[0.3em] font-bold bg-background/50 border-border rounded-xl"
                />
                <Button 
                  onClick={handleFetch} 
                  disabled={loading || fetchCode.length !== 6}
                  className="h-12 px-8 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all active:scale-[0.98]"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Fetch"}
                </Button>
              </div>

              <AnimatePresence>
                {fetchedText && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-2 pt-4"
                  >
                    <div className="flex items-center justify-between px-1">
                      <span className="text-sm font-medium text-muted-foreground">Fetched Content</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(fetchedText)}
                        className="h-8 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
                      >
                        <Copy className="w-3 h-3 mr-2" />
                        Copy Result
                      </Button>
                    </div>
                    <div className="w-full bg-background border border-border rounded-2xl p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed shadow-inner min-h-[120px]">
                      {fetchedText}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.section>

        {/* Footer */}
        <motion.footer variants={itemVariants} className="pt-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
             <div className="flex items-center gap-1.5">
               <Zap className="w-4 h-4 text-yellow-500" />
               <span>Fast</span>
             </div>
             <div className="w-1 h-1 rounded-full bg-border" />
             <div className="flex items-center gap-1.5">
               <Check className="w-4 h-4 text-green-500" />
               <span>Secure</span>
             </div>
             <div className="w-1 h-1 rounded-full bg-border" />
             <div className="flex items-center gap-1.5">
               <RefreshCw className="w-4 h-4 text-blue-500" />
               <span>1hr TTL</span>
             </div>
          </div>
          <p className="text-xs text-muted-foreground/50 italic">
            "Simple, ephemeral, and powerful." — Built for modern workflows.
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default App;
