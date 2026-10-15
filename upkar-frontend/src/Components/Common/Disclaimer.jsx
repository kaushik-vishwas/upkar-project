import React, { useEffect } from 'react';

export default function DisclaimerModal({ onAgree }) {
  useEffect(() => {
    // Disable background scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore scrolling when modal closes
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] font-figtree flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 tracking-wide uppercase">
            Disclaimer
          </h2>
        </div>

        {/* Scrollable Body */}
        <div className="px-8 pb-6 max-h-[60vh] overflow-y-auto scrollbar-hide text-justify text-gray-700 text-sm space-y-4 border border-green-800 mx-6 rounded p-4">
          <p>
            The content of this website is for general information purposes
            only. While enough care is taken by Upkar Developers to ensure that
            information on the website is up to date, accurate and correct.
            Readers are requested to make their independent enquiry before
            relying upon the same. In no event will Upkar Developers offer any
            warranty on the information made available, or be liable for any
            loss or damage including without limitation, indirect or
            consequential loss or damage in connection with the use of
            information in this website. By using or accessing the website, you
            agree with the Disclaimer without any qualification or limitation.
            Computer generated images, walkthroughs and render images are the
            artist's impression and are an indicative of the actual designs. The
            contents of this website are meant to provide information to the
            readers of this website about ourselves including our various
            projects, various initiatives taken by us etc. They are only for
            general information and are subject to change. By no stretch of
            imagination, the information on the website shall be construed as an
            advertisement and/or invitation or offer for sale.
          </p>

          <p>
            To find out more about projects/developments, please call
            (8880796796) or visit our sales office during working hours and get
            in touch with authorized Upkar Developers sales representative.
          </p>

          <p>
            Upkar Developers is a member of Confederation of the Real Estate
            Developers Associations of India - Bengaluru.
          </p>

          <p className="font-bold text-gray-900">
            All payments to be made through cheques, DD, NEFT, RTGS favouring
            the concerned company against official receipts.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center py-5 border-t border-gray-100">
          <button
            onClick={onAgree}
            className="bg-[#2D5C3A] hover:bg-green-900 text-white font-semibold px-12 py-2.5 rounded transition-colors duration-200"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
}
