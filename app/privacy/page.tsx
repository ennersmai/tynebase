"use client";

import Link from "next/link";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative">
      <div className="hero-gradient" />
      <div className="grid-overlay" />

      <SiteNavbar currentPage="other" />

      <section className="section pt-[180px] pb-[60px]">
        <div className="container text-center">
          <p className="text-sm font-semibold text-[var(--brand)] uppercase tracking-wider mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.02em] mb-4">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-[var(--text-muted)]">Last updated: January 12, 2026</p>
        </div>
      </section>

      <section className="section py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-10 text-[var(--text-secondary)]">
              
              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">1. Introduction</h2>
                <p className="leading-relaxed mb-4">TyneBase Ltd, registered in the United Kingdom (Company No. 12345678), with registered office at London, United Kingdom ("we", "our", or "us") is committed to protecting and respecting your privacy.</p>
                <p className="leading-relaxed">This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our knowledge management platform and related services (collectively, the "Services"). Please read this policy carefully to understand our practices regarding your personal data and how we will treat it.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">2. Data Controller</h2>
                <p className="leading-relaxed mb-4">TyneBase Ltd is the data controller responsible for your personal data. Our Data Protection Officer can be reached at:</p>
                <ul className="list-none space-y-2 ml-4">
                  <li>Email: privacy@tynebase.com</li>
                  <li>Address: TyneBase Ltd, London, United Kingdom</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">3. Information We Collect</h2>
                
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">3.1 Information You Provide</h3>
                <p className="leading-relaxed mb-4">We collect information you provide directly to us:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Account Information:</strong> Name, email address, password, company name, job title</li>
                  <li><strong>Profile Information:</strong> Profile photo, bio, preferences, notification settings</li>
                  <li><strong>Content:</strong> Documents, comments, messages, files you upload or create</li>
                  <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely by our payment processor)</li>
                  <li><strong>Communications:</strong> Information you provide when contacting support or participating in surveys</li>
                </ul>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">3.2 Automatically Collected Information</h3>
                <p className="leading-relaxed mb-4">When you use our Services, we automatically collect:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Usage Data:</strong> Pages viewed, features used, time spent, search queries</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                  <li><strong>Log Data:</strong> Access times, error logs, performance data</li>
                  <li><strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and similar tracking technologies (see Section 8)</li>
                </ul>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">3.3 Information from Third Parties</h3>
                <p className="leading-relaxed mb-4">We may receive information from:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Single Sign-On (SSO) providers (Google, Microsoft, Okta)</li>
                  <li>Payment processors for transaction verification</li>
                  <li>Analytics providers for service improvement</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">4. Legal Basis for Processing (GDPR)</h2>
                <p className="leading-relaxed mb-4">We process your personal data under the following legal bases:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Contract Performance:</strong> Processing necessary to provide Services you've subscribed to</li>
                  <li><strong>Legitimate Interests:</strong> Improving our Services, preventing fraud, ensuring security</li>
                  <li><strong>Consent:</strong> Marketing communications, optional features (you may withdraw consent anytime)</li>
                  <li><strong>Legal Obligation:</strong> Compliance with applicable laws and regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">5. How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">We use collected information for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Provision:</strong> Creating and managing accounts, providing platform features, processing payments</li>
                  <li><strong>Communication:</strong> Sending service updates, technical notices, security alerts, support responses</li>
                  <li><strong>Improvement:</strong> Analyzing usage patterns, developing new features, enhancing user experience</li>
                  <li><strong>Security:</strong> Detecting and preventing fraud, abuse, and security incidents</li>
                  <li><strong>Legal Compliance:</strong> Responding to legal requests, enforcing our terms, protecting rights</li>
                  <li><strong>Marketing:</strong> Sending promotional materials (with your consent, opt-out available)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">6. Data Sharing and Disclosure</h2>
                <p className="leading-relaxed mb-4">We do not sell your personal data. We may share information with:</p>
                
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">6.1 Service Providers</h3>
                <p className="leading-relaxed mb-4">Third-party vendors who perform services on our behalf:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Cloud hosting providers (AWS, Google Cloud - EU regions)</li>
                  <li>Payment processors (Stripe)</li>
                  <li>Email service providers</li>
                  <li>Analytics providers (with data processing agreements)</li>
                </ul>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">6.2 Legal Requirements</h3>
                <p className="leading-relaxed mb-4">We may disclose information if required by law, court order, or to:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Comply with legal processes</li>
                  <li>Protect rights, property, or safety of TyneBase, users, or public</li>
                  <li>Detect, prevent, or address fraud or security issues</li>
                </ul>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">6.3 Business Transfers</h3>
                <p className="leading-relaxed">In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you of any such change.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">7. Data Storage and Security</h2>
                
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">7.1 Data Location</h3>
                <p className="leading-relaxed mb-4">All data is stored in European Union data centers, ensuring GDPR compliance and data sovereignty. We do not transfer personal data outside the EU/EEA without appropriate safeguards.</p>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">7.2 Security Measures</h3>
                <p className="leading-relaxed mb-4">We implement industry-standard security measures:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Encryption:</strong> AES-256 encryption at rest, TLS 1.3 in transit</li>
                  <li><strong>Access Controls:</strong> Role-based access, multi-factor authentication, SSO</li>
                  <li><strong>Monitoring:</strong> 24/7 security monitoring, intrusion detection systems</li>
                  <li><strong>Compliance:</strong> SOC 2 Type II certified, regular security audits</li>
                  <li><strong>Backups:</strong> Automated daily backups with 30-day retention</li>
                </ul>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">7.3 Data Retention</h3>
                <p className="leading-relaxed">We retain personal data for as long as necessary to provide Services and comply with legal obligations. Account data is deleted within 90 days of account closure, unless retention is required by law.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="leading-relaxed mb-4">We use cookies and similar technologies for:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Essential Cookies:</strong> Required for platform functionality, authentication, security</li>
                  <li><strong>Performance Cookies:</strong> Analytics to understand usage and improve Services</li>
                  <li><strong>Functional Cookies:</strong> Remember preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Track campaign effectiveness (with consent)</li>
                </ul>
                <p className="leading-relaxed">You can control cookies through your browser settings. Disabling essential cookies may affect platform functionality.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">9. Your Rights Under GDPR</h2>
                <p className="leading-relaxed mb-4">You have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                  <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                  <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or for marketing</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for processing at any time</li>
                  <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority</li>
                </ul>
                <p className="leading-relaxed mt-4">To exercise these rights, contact us at privacy@tynebase.com. We will respond within 30 days.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">10. Children's Privacy</h2>
                <p className="leading-relaxed">Our Services are not directed to individuals under 16. We do not knowingly collect personal data from children. If we become aware of such collection, we will delete the information immediately.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">11. International Data Transfers</h2>
                <p className="leading-relaxed">While we primarily store data in the EU, if transfers outside the EU/EEA are necessary, we ensure appropriate safeguards through Standard Contractual Clauses (SCCs) approved by the European Commission.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">12. Changes to This Policy</h2>
                <p className="leading-relaxed">We may update this Privacy Policy periodically. We will notify you of material changes via email or platform notification. Continued use of Services after changes constitutes acceptance of the updated policy.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">13. Contact Us</h2>
                <p className="leading-relaxed mb-4">For questions, concerns, or to exercise your rights, contact us:</p>
                <ul className="list-none space-y-2 ml-4">
                  <li><strong>Email:</strong> privacy@tynebase.com</li>
                  <li><strong>Data Protection Officer:</strong> dpo@tynebase.com</li>
                  <li><strong>Address:</strong> TyneBase Ltd, London, United Kingdom</li>
                  <li><strong>Contact Form:</strong> <Link href="/contact" className="text-[var(--brand)] hover:underline">tynebase.com/contact</Link></li>
                </ul>
              </div>

              <div className="border-t border-[var(--border-subtle)] pt-8 mt-12">
                <p className="text-sm text-[var(--text-muted)] italic">This Privacy Policy is governed by the laws of England and Wales. By using our Services, you consent to the collection and use of information in accordance with this policy.</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <SiteFooter currentPage="privacy" />
    </div>
  );
}
