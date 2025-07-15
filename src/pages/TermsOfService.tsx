import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
            ClipSpin Terms of Service
          </h1>

          <div className="space-y-8 leading-relaxed text-gray-700">
            {/* Section 1: General */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                1. General
              </h2>
              <div className="space-y-4">
                <p>
                  By accessing and using ClipSpin&apos;s application programming
                  interfaces, video generation tools, software, documentation,
                  data, or website (collectively, the &quot;Services&quot;), you
                  confirm that you are at least 18 years old and legally able to
                  enter into a binding agreement, and you agree to be bound by
                  these Terms of Service (&quot;Terms&quot;) and any applicable
                  laws, regulations, or updates.
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    &quot;User&quot;, &quot;Client&quot;, &quot;You&quot; and
                    &quot;Your&quot; refer to you, the individual or entity
                    using the Services.
                  </li>
                  <li>
                    &quot;ClipSpin&quot;, &quot;We&quot;, &quot;Our&quot;, and
                    &quot;Us&quot; refer to ClipSpin Inc.
                  </li>
                  <li>
                    &quot;Representatives&quot; refers to ClipSpin&apos;s
                    employees, contractors, affiliates, and agents.
                  </li>
                </ul>
                <p>
                  These Terms form the entire agreement between you and ClipSpin
                  and supersede any prior communications.
                </p>
                <p>
                  No joint venture, partnership, or employment relationship is
                  created through your use of the Services.
                </p>
                <p>
                  You may not assign your rights or obligations under these
                  Terms without our written consent. We may assign these Terms
                  to any successor organization or affiliate.
                </p>
              </div>
            </section>

            {/* Section 2: Privacy and Data Use */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                2. Privacy and Data Use
              </h2>
              <div className="space-y-4">
                <p>
                  Our Privacy Policy explains how we collect and handle your
                  data. By using our Services, you consent to our data
                  practices.
                </p>
                <p>
                  If you&apos;re using the Services on behalf of an
                  organization, you agree that our Data Processing Addendum
                  governs any personal data involved in using ClipSpin.
                </p>
                <p>
                  You understand that we may process data related to your use
                  for support, analytics, improvement of our models and
                  features, and compliance purposes.
                </p>
              </div>
            </section>

            {/* Section 3: License to Use Services */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                3. License to Use Services
              </h2>
              <div className="space-y-4">
                <p>
                  We grant you a limited, non-exclusive, non-transferable
                  license to access and use the Services under these Terms.
                </p>
                <p>
                  You are responsible for all activity on your account. You may
                  authorize internal employees or contractors to use the
                  Services on your behalf, but may not resell or sublicense the
                  Services.
                </p>
                <p className="font-medium">You agree not to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Copy, distribute, reverse engineer, or modify our
                    proprietary technology.
                  </li>
                  <li>Upload illegal, misleading, or harmful content.</li>
                  <li>
                    Use ClipSpin for political, deceptive, or offensive
                    purposes.
                  </li>
                  <li>Interfere with, or disrupt, other users&apos; access.</li>
                  <li>
                    Scrape or automate access to the Services in an unauthorized
                    way.
                  </li>
                  <li>Impersonate others using the tool.</li>
                  <li>
                    Use our Services to produce harmful, misleading, or falsely
                    represented videos.
                  </li>
                  <li>
                    Use ClipSpin-generated content without disclosing that it
                    was AI-assisted, when required by applicable law.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4: Content Rights and Usage */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                4. Content Rights and Usage
              </h2>
              <div className="space-y-4">
                <p>
                  You retain ownership of the input you provide to ClipSpin
                  (&quot;User Input&quot;) and the content generated as a result
                  (&quot;User Output&quot;), collectively referred to as
                  &quot;Your Content&quot;.
                </p>
                <p>
                  You grant ClipSpin a worldwide, royalty-free, sublicensable,
                  and transferable license to use Your Content to provide and
                  improve the Services, including model training and system
                  performance.
                </p>
                <p>
                  You confirm you have all necessary rights to submit Your
                  Content and grant ClipSpin this license. ClipSpin may remove
                  or block content at its sole discretion, particularly if it
                  violates these Terms.
                </p>
                <p>
                  You acknowledge that similar User Output may be independently
                  generated for other users and is not subject to your
                  ownership.
                </p>
              </div>
            </section>

            {/* Section 5: Termination */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                5. Termination
              </h2>
              <div className="space-y-4">
                <p>
                  These Terms remain in effect until terminated by either party.
                  You may stop using the Services and delete your account at any
                  time.
                </p>
                <p>
                  We may suspend or terminate your access immediately if we
                  believe you have violated these Terms. Upon termination, you
                  must cease all use of the Services and delete all related
                  output in your possession.
                </p>
                <p>
                  In cases of termination without breach, we may refund any
                  unused, prepaid subscription fees.
                </p>
                <p>
                  Sections on General Terms, Content License, Confidentiality,
                  Limitations, and Dispute Resolution will survive termination.
                </p>
              </div>
            </section>

            {/* Section 6: Confidentiality */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                6. Confidentiality
              </h2>
              <div className="space-y-4">
                <p>
                  You may receive confidential or proprietary information
                  (&quot;Confidential Information&quot;) from ClipSpin while
                  using the Services. You agree to:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Use Confidential Information only to access or use the
                    Services.
                  </li>
                  <li>Protect it as you would your own confidential data.</li>
                  <li>
                    Not share it with third parties unless legally required, and
                    notify ClipSpin in such cases.
                  </li>
                </ul>
                <p>
                  &quot;Confidential Information&quot; includes technical,
                  commercial, and business data that is marked or reasonably
                  understood as confidential.
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              For questions about these Terms of Service, please contact us at
              legal@clipspin.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
