import React from "react";
import Navbar from "../Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-lg shadow-lg mt-16">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              At Tutty, accessible from tutty.com, one of our main priorities
              is the privacy of our visitors. This Privacy Policy document
              contains types of information that is collected and recorded by
              Tutty and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
              Log Files
            </h2>
            <p>
              Tutty follows a standard procedure of using log files. These
              files log visitors when they visit websites. All hosting companies
              do this and a part of hosting services' analytics. The information
              collected by log files include internet protocol (IP) addresses,
              browser type, Internet Service Provider (ISP), date and time stamp,
              referring/exit pages, and possibly the number of clicks. These are
  not linked to any information that is personally identifiable. The
              purpose of the information is for analyzing trends, administering
              the site, tracking users' movement on the website, and gathering
              demographic information.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
              JWT (JSON Web Tokens)
            </h2>
            <p>
              Tutty uses JWTs (JSON Web Tokens) for user authentication and session management. When you log in to our service, we generate a JWT that is stored on your device. This token contains a user identifier and is used to authenticate your requests to our server, ensuring that you can access protected resources without having to log in for every request. We do not use cookies for tracking or advertising purposes.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
              Third-Party Policies
            </h2>
            <p>
              Tutty's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;