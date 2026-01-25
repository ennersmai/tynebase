"use client";

import Link from "next/link";
import { Shield, Lock, Globe, Server, Key, FileCheck, ArrowRight, Eye, Database, UserCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const certifications = [
  { icon: Shield, title: "SOC 2 Type II", description: "Independently audited security controls and practices" },
  { icon: Lock, title: "End-to-End Encryption", description: "Data encrypted at rest and in transit using AES-256" },
  { icon: Globe, title: "GDPR Compliant", description: "EU data residency with full GDPR compliance" },
  { icon: Server, title: "EU Data Centers", description: "All data stored in European data centers" },
  { icon: Key, title: "SSO & SCIM", description: "Enterprise SSO with SAML/OIDC and SCIM provisioning" },
  { icon: FileCheck, title: "HIPAA Ready", description: "BAA available for healthcare customers" }
];

const securityPractices = [
  {
    icon: Database,
    title: "Infrastructure Security",
    description: "Enterprise-grade cloud infrastructure with 99.99% uptime SLA",
    features: [
      "Isolated VPCs and network segmentation",
      "Web Application Firewall (WAF)",
      "DDoS protection and mitigation",
      "24/7 security monitoring and alerts",
      "Intrusion detection and prevention systems"
    ]
  },
  {
    icon: UserCheck,
    title: "Access Control",
    description: "Granular permissions and authentication mechanisms",
    features: [
      "Role-based access control (RBAC)",
      "Multi-factor authentication (MFA)",
      "SSO integration (SAML, OIDC)",
      "SCIM user provisioning",
      "Detailed audit logs and activity tracking"
    ]
  },
  {
    icon: Lock,
    title: "Data Protection",
    description: "Military-grade encryption and backup strategies",
    features: [
      "AES-256 encryption at rest",
      "TLS 1.3 encryption in transit",
      "Automated daily backups",
      "Point-in-time recovery (30 days)",
      "Secure data deletion and retention policies"
    ]
  },
  {
    icon: Eye,
    title: "Monitoring & Compliance",
    description: "Continuous security monitoring and compliance",
    features: [
      "Real-time security event monitoring",
      "Automated vulnerability scanning",
      "Regular penetration testing",
      "Annual third-party security audits",
      "Compliance with GDPR, SOC 2, HIPAA"
    ]
  }
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen relative">
      <div className="hero-gradient" />

      <SiteNavbar currentPage="other" />

      <section className="section pt-[180px] pb-[80px]">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <img 
              src="/security_logo.webp" 
              alt="Security" 
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'contain' 
              }} 
            />
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Security</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '24px', textAlign: 'center' }}>
            Enterprise-grade <span className="text-gradient">security</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', textAlign: 'center' }}>
            Your data security is our top priority. We implement industry-leading security measures to protect your knowledge.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="section py-16">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ width: '100%', maxWidth: '1152px' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', textAlign: 'center' }}>Certifications & Compliance</h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '48px', maxWidth: '672px', marginLeft: 'auto', marginRight: 'auto' }}>
              We maintain the highest security standards and comply with international regulations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div key={cert.title} className="bento-item" style={{ textAlign: 'center' }}>
                  <div className="feature-icon feature-icon-brand" style={{ margin: '0 auto 16px auto' }}>
                    <cert.icon className="w-5 h-5" />
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>{cert.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="section py-16 bg-[var(--bg-secondary)]">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ width: '100%', maxWidth: '1152px' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', textAlign: 'center' }}>Security Practices</h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '48px', maxWidth: '672px', marginLeft: 'auto', marginRight: 'auto' }}>
              Enterprise-grade security features designed for organisations with strict compliance requirements
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityPractices.map((practice) => (
                <div key={practice.title} className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-8" style={{ paddingTop: '22px', paddingBottom: '22px', paddingLeft: '16px', paddingRight: '16px' }}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="feature-icon feature-icon-brand">
                      <practice.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{practice.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{practice.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {practice.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="w-4 h-4 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="section py-16">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ width: '100%', maxWidth: '896px' }}>
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-8" style={{ paddingTop: '22px', paddingBottom: '22px', paddingLeft: '16px', paddingRight: '16px' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="feature-icon feature-icon-brand">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">Incident Response</h3>
                  <p className="text-[var(--text-secondary)] mb-6">
                    We maintain a comprehensive incident response plan to quickly identify, contain and resolve security incidents
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">Detection</h4>
                  <p className="text-sm text-[var(--text-secondary)]">24/7 monitoring with automated alerts for suspicious activity</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">Response</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Dedicated security team responds within 15 minutes</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">Communication</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Transparent updates to affected customers within 1 hour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-20">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ width: '100%', maxWidth: '768px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>Need More Details?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Request our security whitepaper, schedule a security review, or speak with our security team
            </p>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Contact Security Team
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/docs" className="btn btn-secondary btn-lg">
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter currentPage="security" />
    </div>
  );
}
