import React from 'react';
import Navbar from '../../Components/Common/NavbarHome';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 w-full font-figtree px-6 sm:px-10 lg:px-24 py-12 bg-white text-gray-800">
        <h1 className="text-3xl sm:text-4xl font-semibold font-figtree mb-8 text-[#2D5C3A]">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Upkar Group ("we", "our", "us") is committed to protecting the
              privacy of our users. This Privacy Policy outlines how we collect,
              use, disclose, and safeguard your information when you visit our
              website{' '}
              {/* <span className="font-semibold text-[#2D5C3A]">
                upkar-frontend.vercel.app
              </span>{' '} */}
              or engage with our services, including but not limited to RCS
              messaging, WhatsApp Business communications, and other digital
              campaigns.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Identification Information:</strong> Name,
                email address, phone number, postal address, and other contact
                details.
              </li>
              <li>
                <strong>Property Preferences:</strong> Details about property
                interests, budget, location preferences, and other related
                information.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type,
                operating system, and other technical information collected
                through cookies and similar technologies.
              </li>
              <li>
                <strong>Communication Data:</strong> Records of communications
                via RCS, WhatsApp, email, and other channels.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Delivery:</strong> To provide information about
                our properties, respond to inquiries, and facilitate property
                transactions.
              </li>
              <li>
                <strong>Marketing Communications:</strong> To send promotional
                messages via RCS, WhatsApp, email, or SMS, subject to your
                consent.
              </li>
              <li>
                <strong>Improvement of Services:</strong> To analyze user
                behavior and preferences to enhance our offerings.
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with legal
                obligations and protect our legal rights.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              4. Sharing Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                assist in operating our website, conducting our business, or
                servicing you.
              </li>
              <li>
                <strong>Regulatory Authorities:</strong> When required by law or
                to protect our rights.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or asset sale.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
            <p className="mb-2">
              Depending on your location, you may have rights under applicable
              data protection laws, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access:</strong> The right to access the personal data
                we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> The right to correct inaccurate or
                incomplete data.
              </li>
              <li>
                <strong>Deletion:</strong> The right to request the deletion of
                your data.
              </li>
              <li>
                <strong>Objection:</strong> The right to object to certain data
                processing activities.
              </li>
            </ul>

            <p className="mt-3">
              To exercise these rights, please contact us at{' '}
              <a
                href="mailto:info@upkardevelopers.com"
                className="font-semibold text-[#2D5C3A] hover:underline"
              >
                info@upkardevelopers.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              7. Cookies and Tracking Technologies
            </h2>
            <p>
              Our website uses cookies to enhance user experience. You can set
              your browser to refuse all or some browser cookies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these websites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. We encourage you
              to review this page regularly for any changes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
