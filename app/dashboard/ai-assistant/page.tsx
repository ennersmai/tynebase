"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, FileText, Video, Wand2, Upload, Check, Loader2, Clock, Zap, Image } from "lucide-react";

type TabType = 'prompt' | 'video' | 'enhance';

const recentGenerations = [
  { id: 1, title: "API Documentation", type: "From Prompt", time: "2 hours ago", status: "completed" },
  { id: 2, title: "Product Demo Transcript", type: "From Video", time: "Yesterday", status: "completed" },
  { id: 3, title: "User Guide Enhancement", type: "Enhance", time: "2 days ago", status: "completed" },
];

const outputOptions = [
  { id: 'full', label: 'Full Article', desc: 'Comprehensive document' },
  { id: 'summary', label: 'Summary', desc: 'Key points overview' },
  { id: 'outline', label: 'Outline', desc: 'Structure only' },
];

const aiProviders = [
  { id: 'openai', name: 'OpenAI (GPT-5.2)', desc: 'Best for documentation & general tasks', badge: 'Recommended' },
  { id: 'google', name: 'Google (Gemini 3)', desc: 'Best for video understanding & research', badge: null },
  { id: 'anthropic', name: 'Anthropic (Claude)', desc: 'Best for analysis & nuanced writing', badge: null },
];

export default function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState<TabType>('prompt');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [outputType, setOutputType] = useState('full');

  const tabs = [
    { id: 'prompt' as TabType, icon: FileText, label: 'From Prompt', description: 'Generate from text description' },
    { id: 'video' as TabType, icon: Video, label: 'From Video', description: 'Extract content from media' },
    { id: 'enhance' as TabType, icon: Wand2, label: 'Enhance', description: 'Improve existing content' },
  ];

  const quickPrompts = [
    "Create an API documentation for a REST endpoint",
    "Write an onboarding guide for new team members",
    "Generate a troubleshooting guide for common issues",
    "Create a product release notes template",
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="w-full h-full min-h-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--dash-text-primary)]">AI Assistant</h1>
          <p className="text-[var(--dash-text-tertiary)] mt-1">
            Generate content with AI-powered tools
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--dash-text-muted)]">
          <Zap className="w-4 h-4 text-[var(--brand)]" />
          <span>12 generations remaining this month</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="xl:col-span-8 flex flex-col gap-6 min-h-0">
          {/* Tab Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  activeTab === tab.id
                    ? 'border-[var(--brand)] bg-[var(--brand-primary-muted)]'
                    : 'border-[var(--dash-border-subtle)] bg-[var(--surface-card)] hover:border-[var(--dash-border-default)]'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  activeTab === tab.id
                    ? 'bg-[var(--brand)] text-white'
                    : 'bg-[var(--surface-ground)] text-[var(--dash-text-tertiary)]'
                }`}>
                  <tab.icon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-[var(--dash-text-primary)]">{tab.label}</p>
                <p className="text-sm text-[var(--dash-text-tertiary)]">{tab.description}</p>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl p-5 sm:p-6">
            {activeTab === 'prompt' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--dash-text-secondary)] mb-2">
                    Describe what you want to create
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Create a comprehensive API documentation for our user authentication endpoints including examples for login, signup, password reset, and token refresh..."
                    rows={5}
                    className="w-full px-4 py-3 bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] rounded-xl text-[var(--dash-text-primary)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 transition-all resize-none"
                  />
                </div>

                {/* Quick Prompts */}
                <div>
                  <p className="text-sm text-[var(--dash-text-tertiary)] mb-3">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((qp) => (
                      <button
                        key={qp}
                        onClick={() => setPrompt(qp)}
                        className="px-3 py-1.5 text-xs bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] rounded-full text-[var(--dash-text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
                      >
                        {qp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Options */}
                <div>
                  <p className="text-sm font-medium text-[var(--dash-text-secondary)] mb-3">Output type:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {outputOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setOutputType(opt.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          outputType === opt.id
                            ? 'border-[var(--brand)] bg-[var(--brand-primary-muted)]'
                            : 'border-[var(--dash-border-subtle)] hover:border-[var(--dash-border-default)]'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            outputType === opt.id ? 'border-[var(--brand)] bg-[var(--brand)]' : 'border-[var(--dash-border-default)]'
                          }`}>
                            {outputType === opt.id && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span className="font-medium text-[var(--dash-text-primary)]">{opt.label}</span>
                        </div>
                        <p className="text-xs text-[var(--dash-text-tertiary)] ml-6">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand)] hover:bg-[var(--brand-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Document
                    </>
                  )}
                </button>
              </div>
            )}

        {activeTab === 'video' && (
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-[var(--dash-border-subtle)] rounded-2xl p-12 text-center hover:border-[var(--brand)] transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[var(--brand-primary-muted)] flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-[var(--brand)]" />
              </div>
              <p className="text-lg font-medium text-[var(--dash-text-primary)] mb-2">
                Drop your video or audio file here
              </p>
              <p className="text-sm text-[var(--dash-text-tertiary)] mb-4">
                Supports MP4, MOV, MP3, WAV up to 500MB
              </p>
              <button className="px-4 py-2 border border-[var(--dash-border-subtle)] rounded-lg text-[var(--dash-text-secondary)] hover:border-[var(--brand)] transition-colors">
                Choose File
              </button>
            </div>

            {/* Or URL */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--dash-border-subtle)]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--surface-card)] px-3 text-[var(--dash-text-muted)]">
                  Or paste a URL
                </span>
              </div>
            </div>

            <input
              type="url"
              placeholder="https://youtube.com/watch?v=... or https://loom.com/..."
              className="w-full px-4 py-3 bg-[var(--surface-ground)] border border-[var(--dash-border-subtle)] rounded-xl text-[var(--dash-text-primary)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20"
            />

            {/* Output Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: FileText, label: 'Transcript', desc: 'Word-for-word', checked: true },
                { icon: Sparkles, label: 'Summary', desc: 'Key takeaways', checked: true },
                { icon: Wand2, label: 'Full Article', desc: 'Based on content', checked: false },
              ].map((opt) => (
                <div
                  key={opt.label}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    opt.checked
                      ? 'border-[var(--brand)] bg-[var(--brand-primary-muted)]'
                      : 'border-[var(--dash-border-subtle)] hover:border-[var(--dash-border-default)]'
                  }`}
                >
                  <opt.icon className={`w-5 h-5 mb-2 ${opt.checked ? 'text-[var(--brand)]' : 'text-[var(--dash-text-tertiary)]'}`} />
                  <p className="font-medium text-[var(--dash-text-primary)]">{opt.label}</p>
                  <p className="text-xs text-[var(--dash-text-tertiary)]">{opt.desc}</p>
                </div>
              ))}
            </div>

            <button
              disabled
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--brand)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium"
            >
              <Video className="w-4 h-4" />
              Process Video
            </button>
          </div>
        )}

        {activeTab === 'enhance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Wand2, label: 'Improve Writing', desc: 'Better clarity and flow' },
                { icon: FileText, label: 'Expand Content', desc: 'Add more detail' },
                { icon: Sparkles, label: 'Summarize', desc: 'Condense to key points' },
                { icon: Image, label: 'Add Visuals', desc: 'Suggest diagrams & images' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  className="p-4 rounded-xl border border-[var(--dash-border-subtle)] hover:border-[var(--brand)] hover:bg-[var(--brand-primary-muted)] text-left transition-all"
                >
                  <opt.icon className="w-5 h-5 text-[var(--brand)] mb-2" />
                  <p className="font-medium text-[var(--dash-text-primary)]">{opt.label}</p>
                  <p className="text-xs text-[var(--dash-text-tertiary)]">{opt.desc}</p>
                </button>
              ))}
            </div>

            <div className="bg-[var(--surface-ground)] rounded-xl p-6 text-center">
              <p className="text-[var(--dash-text-tertiary)]">
                Select a document from your Knowledge Base to enhance it with AI
              </p>
              <Link href="/dashboard/knowledge">
                <button className="mt-4 px-4 py-2 border border-[var(--dash-border-subtle)] rounded-lg text-[var(--dash-text-secondary)] hover:border-[var(--brand)] transition-colors">
                  Browse Documents
                </button>
              </Link>
            </div>
          </div>
        )}
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-6 min-h-0">
          {/* AI Provider Settings */}
          <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl">
            <div className="px-6 py-4 border-b border-[var(--dash-border-subtle)]">
              <h2 className="font-semibold text-[var(--dash-text-primary)]">AI Provider</h2>
              <p className="text-sm text-[var(--dash-text-tertiary)]">Choose your preferred AI model</p>
            </div>
            <div className="p-6 space-y-3">
              {aiProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                    selectedProvider === provider.id
                      ? 'border-[var(--brand)] bg-[var(--brand-primary-muted)]'
                      : 'border-[var(--dash-border-subtle)] hover:border-[var(--dash-border-default)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedProvider === provider.id ? 'border-[var(--brand)] bg-[var(--brand)]' : 'border-[var(--dash-border-default)]'
                    }`}>
                      {selectedProvider === provider.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--dash-text-primary)]">{provider.name}</p>
                      <p className="text-sm text-[var(--dash-text-tertiary)]">{provider.desc}</p>
                    </div>
                  </div>
                  {provider.badge && (
                    <span className="px-2 py-1 text-xs font-medium bg-[var(--brand-primary-muted)] text-[var(--brand)] rounded-full">
                      {provider.badge}
                    </span>
                  )}
                </button>
              ))}
              <p className="text-xs text-[var(--dash-text-muted)] mt-4 flex items-center gap-1">
                <Check className="w-3 h-3 text-[var(--status-success)]" />
                All providers use EU/UK data centers for GDPR compliance.
              </p>
            </div>
          </div>

          {/* Recent Generations */}
          <div className="bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl">
            <div className="px-6 py-4 border-b border-[var(--dash-border-subtle)]">
              <h2 className="font-semibold text-[var(--dash-text-primary)]">Recent Generations</h2>
              <p className="text-sm text-[var(--dash-text-tertiary)]">Your AI-generated content history</p>
            </div>
            <div className="divide-y divide-[var(--dash-border-subtle)]">
              {recentGenerations.map((gen) => (
                <div key={gen.id} className="px-6 py-4 flex items-center justify-between hover:bg-[var(--surface-hover)] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary-muted)] flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[var(--brand)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--dash-text-primary)]">{gen.title}</p>
                      <p className="text-sm text-[var(--dash-text-tertiary)]">{gen.type} • {gen.time}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-[var(--status-success-bg)] text-[var(--status-success)] rounded-full">
                    {gen.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
