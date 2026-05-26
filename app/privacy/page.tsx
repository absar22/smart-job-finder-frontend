// app/privacy/page.tsx
"use client";
import Link from "next/link";
import React from "react";
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-syne">
            Privacy Policy
          </h1>
          <p className="text-lg opacity-90">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Job Finder ("we", "our", or "us"). We are committed to protecting your 
              personal information and your right to privacy. This Privacy Policy explains how we 
              collect, use, disclose, and safeguard your information when you use our job finding 
              platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree with the terms of this 
              privacy policy, please do not access the site or use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Personal Information You Disclose to Us
                </h3>
                <p className="text-gray-700 mb-2">
                  We collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Register for an account (name, email address, password)</li>
                  <li>Upload a profile picture or resume</li>
                  <li>Apply for jobs through our platform</li>
                  <li>Post job listings (company information, job details)</li>
                  <li>Contact us with inquiries</li>
                  <li>Subscribe to job alerts or newsletters</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Information Automatically Collected
                </h3>
                <p className="text-gray-700 mb-2">
                  When you visit our website, we automatically collect certain information about 
                  your device, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Time zone setting</li>
                  <li>Operating system</li>
                  <li>Pages you view and how you interact with our site</li>
                  <li>Referring URLs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Create and manage your account</li>
              <li>Match you with relevant job opportunities</li>
              <li>Process job applications</li>
              <li>Communicate with you about job matches, applications, and platform updates</li>
              <li>Improve and optimize our platform</li>
              <li>Protect against fraudulent or unauthorized activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to track activity on our platform 
              and hold certain information. Cookies are files with a small amount of data that 
              are sent to your browser from a website and stored on your device.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can instruct your browser to refuse all cookies or to indicate when a cookie 
              is being sent. However, if you do not accept cookies, you may not be able to use 
              some portions of our platform.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement appropriate technical and organizational security measures to protect 
              the security of your personal information. However, please remember that no method 
              of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-800 text-sm">
                <strong>Security Measures:</strong> We use encryption (HTTPS), secure cookies, 
                regular security audits, and access controls to protect your data.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We will retain your personal information only for as long as is necessary for the 
              purposes set out in this Privacy Policy. We will retain and use your information to 
              the extent necessary to comply with our legal obligations, resolve disputes, and 
              enforce our agreements.
            </p>
          </section>

          {/* Your Privacy Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Your Privacy Rights
            </h2>
            <p className="text-gray-700 mb-3">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
              <li><strong>Data Portability:</strong> Request transfer of your data</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@jobfinder.com" className="text-orange-600 hover:underline">
                  privacy@jobfinder.com
                </a>
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may use third-party services for:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Cloud storage (e.g., Cloudinary for profile images)</li>
              <li>Analytics (to understand platform usage)</li>
              <li>Email services (for notifications)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              These third parties may have access to your personal information only to perform 
              specific tasks on our behalf and are obligated not to disclose or use it for any 
              other purpose.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If you become aware that a child 
              has provided us with personal information, please contact us.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date. 
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📧 Email: privacy@jobfinder.com</p>
              <p>📍 Address: 123 Job Street, Tech City, TC 12345</p>
              <p>📞 Phone: +1 (555) 123-4567</p>
            </div>
          </section>

          {/* Consent */}
          <div className="bg-orange-50 rounded-lg p-6 text-center">
            <p className="text-gray-800">
              By using Job Finder, you consent to this Privacy Policy.
            </p>
            <Link 
              href="/signup" 
              className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Accept and Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}