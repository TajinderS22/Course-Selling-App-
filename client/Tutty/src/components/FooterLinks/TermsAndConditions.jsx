import React from "react";
import Navbar from "../Navbar";

const TermsAndConditions = () => {
  return (
    <div className="min-h-svh bg-app text-ink">
      <Navbar />
      <div className="p-6">
        <div className="card mx-auto mt-24 max-w-4xl p-8 md:p-10">
          <h1 className="font-display mb-6 text-3xl font-bold md:text-4xl">
            Terms and Conditions
          </h1>
          <div className="space-y-4 leading-relaxed text-ink-soft">
            <p>
              Welcome to Tutty! These terms and conditions outline the rules and
              regulations for the use of Tutty's Website, located at tutty.com.
            </p>
            <p>
              By accessing this website we assume you accept these terms and
              conditions. Do not continue to use Tutty if you do not agree to
              take all of the terms and conditions stated on this page.
            </p>
            <h2 className="font-display mt-6 text-xl font-semibold text-ink">
              JWT (JSON Web Tokens)
            </h2>
            <p>
              We use JWTs for authentication purposes. When you log in, we issue
              a JWT that is stored on your device. This token is used to identify
              you and grant you access to protected routes and resources. By
              using our services, you consent to the use of JWTs for
              authentication.
            </p>
            <h2 className="font-display mt-6 text-xl font-semibold text-ink">
              License
            </h2>
            <p>
              Unless otherwise stated, Tutty and/or its licensors own the
              intellectual property rights for all material on Tutty. All
              intellectual property rights are reserved. You may access this from
              Tutty for your own personal use subjected to restrictions set in
              these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>Republish material from Tutty</li>
              <li>Sell, rent or sub-license material from Tutty</li>
              <li>Reproduce, duplicate or copy material from Tutty</li>
              <li>Redistribute content from Tutty</li>
            </ul>
            <h2 className="font-display mt-6 text-xl font-semibold text-ink">
              iFrames
            </h2>
            <p>
              Without prior approval and written permission, you may not create
              frames around our Webpages that alter in any way the visual
              presentation or appearance of our Website.
            </p>
            <h2 className="font-display mt-6 text-xl font-semibold text-ink">
              Content Liability
            </h2>
            <p>
              We shall not be hold responsible for any content that appears on
              your Website. You agree to protect and defend us against all claims
              that is rising on your Website. No link(s) should appear on any
              Website that may be interpreted as libelous, obscene or criminal,
              or which infringes, otherwise violates, or advocates the
              infringement or other violation of, any third party rights.
            </p>
            <h2 className="font-display mt-6 text-xl font-semibold text-ink">
              Reservation of Rights
            </h2>
            <p>
              We reserve the right to request that you remove all links or any
              particular link to our Website. You approve to immediately remove
              all links to our Website upon request. We also reserve the right to
              amend these terms and conditions and it's linking policy at any
              time. By continuously linking to our Website, you agree to be bound
              to and follow these linking terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
