import React from 'react';
import Navbar from '../../Components/Common/NavbarHome';

const TermsConditions = () => {
  return (
    <>
      <Navbar />

      <div className=" pt-28 w-full font-figtree px-6 sm:px-10 lg:px-24 py-12 bg-white text-gray-800">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-[#2D5C3A]">
          Terms & Conditions
        </h1>

        <div className="space-y-8 text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using our website
              {/* <span className="font-semibold text-[#2D5C3A]">
                upkar-frontend.vercel.app
              </span> */}
              , you accept and agree to be bound by these Terms & Conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. Use of the Website
            </h2>
            <p>
              You agree to use the website for lawful purposes only and in a way
              that does not infringe the rights of, restrict, or inhibit anyone
              else's use and enjoyment of the website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content on this website, including text, graphics, logos, and
              images, is the property of Upkar Groups and is protected by
              applicable intellectual property laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              4. Limitation of Liability
            </h2>
            <p>
              Upkar Groups shall not be liable for any indirect, incidental,
              special, or consequential damages arising out of or in connection
              with the use of our website or services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              5. Third-Party Services
            </h2>
            <p>
              We may use third-party services for RCS messaging, WhatsApp
              Business communications, and other digital campaigns. Your use of
              these services is subject to the terms and conditions of the
              respective third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. User Conduct</h2>
            <p className="mb-2">You agree not to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Use the website in any way that may damage, disable, overburden,
                or impair the website.
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the website
                or its related systems.
              </li>
              <li>
                Use any automated means to access the website for any purpose
                without our express written permission.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed in
              accordance with the laws of India.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              8. Changes to Terms & Conditions
            </h2>
            <p>
              We reserve the right to modify these Terms & Conditions at any
              time. Changes will be effective immediately upon posting on the
              website.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
