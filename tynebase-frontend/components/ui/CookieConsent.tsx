"use client";

import { useState, useEffect } from "react";
import { X, Cookie, Shield } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface CookieConsentProps {
  onAcceptAll?: () => void;
  onAcceptNecessary?: () => void;
  onCustomize?: () => void;
  privacyPolicyUrl?: string;
  className?: string;
}

export function CookieConsent({
  onAcceptAll,
  onAcceptNecessary,
  onCustomize,
  privacyPolicyUrl = "/privacy",
  className,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
    onAcceptAll?.();
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(necessaryOnly));
    setIsVisible(false);
    onAcceptNecessary?.();
  };

  const handleSavePreferences = () => {
    const customPrefs = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(customPrefs));
    setIsVisible(false);
    onCustomize?.();
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none",
      className
    )}>
      <div className="max-w-4xl mx-auto bg-[var(--surface-card)] border border-[var(--dash-border-subtle)] rounded-xl shadow-xl pointer-events-auto">
        {!showCustomize ? (
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--brand-primary-muted)] flex items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  We value your privacy
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and Analyse our traffic. By clicking "Accept All", you consent to our use of cookies.{" "}
                  <a href={privacyPolicyUrl} className="text-[var(--brand)] hover:underline">
                    Read our Privacy Policy
                  </a>
                </p>
                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  <Button
                    variant="primary"
                    onClick={handleAcceptAll}
                    className="!h-9 !px-9 !py-0 rounded-full text-sm leading-none"
                  >
                    Accept All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAcceptNecessary}
                    className="!h-9 !px-9 !py-0 rounded-full text-sm leading-none"
                  >
                    Necessary Only
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowCustomize(true)}
                    className="!h-9 !px-8 !py-0 rounded-full text-sm leading-none"
                  >
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowCustomize(false)}
                className="p-1 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-ground)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Necessary */}
              <div className="flex items-center justify-between p-4 bg-[var(--surface-ground)] rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-[var(--text-primary)]">Necessary</span>
                    <span className="px-2 py-0.5 text-xs bg-green-500/10 text-green-600 rounded-full">
                      Required
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-tertiary)] mt-1">
                    Essential for the website to function properly
                  </p>
                </div>
                <div className="w-11 h-6 bg-green-500 rounded-full opacity-50 cursor-not-allowed" />
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-4 bg-[var(--surface-ground)] rounded-lg">
                <div>
                  <span className="font-medium text-[var(--text-primary)]">Analytics</span>
                  <p className="text-sm text-[var(--text-tertiary)] mt-1">
                    Help us understand how visitors interact with our website
                  </p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative",
                    preferences.analytics ? "bg-[var(--brand)]" : "bg-[var(--dash-border-default)]"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                    preferences.analytics && "translate-x-5"
                  )} />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-4 bg-[var(--surface-ground)] rounded-lg">
                <div>
                  <span className="font-medium text-[var(--text-primary)]">Marketing</span>
                  <p className="text-sm text-[var(--text-tertiary)] mt-1">
                    Used to deliver personalized advertisements
                  </p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative",
                    preferences.marketing ? "bg-[var(--brand)]" : "bg-[var(--dash-border-default)]"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                    preferences.marketing && "translate-x-5"
                  )} />
                </button>
              </div>

              {/* Personalization */}
              <div className="flex items-center justify-between p-4 bg-[var(--surface-ground)] rounded-lg">
                <div>
                  <span className="font-medium text-[var(--text-primary)]">Personalization</span>
                  <p className="text-sm text-[var(--text-tertiary)] mt-1">
                    Remember your preferences and settings
                  </p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, personalization: !p.personalization }))}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative",
                    preferences.personalization ? "bg-[var(--brand)]" : "bg-[var(--dash-border-default)]"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                    preferences.personalization && "translate-x-5"
                  )} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 relative z-10">
              <Button
                variant="ghost"
                onClick={() => setShowCustomize(false)}
                className="!h-9 !px-8 !py-0 rounded-full text-sm leading-none"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSavePreferences}
                className="!h-9 !px-9 !py-0 rounded-full text-sm leading-none"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}