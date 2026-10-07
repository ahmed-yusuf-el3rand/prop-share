const PrivacyPolicyPage = () => (
  <div className="mx-10 py-20 text-gray-800">
    <h1 className="text-3xl font-bold mb-20 text-center">Privacy Policy</h1>
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">1. What We Collect</h2>
        <p>
          We collect personal information you provide, such as your name, email,
          and payment details. We may also collect usage data like pages visited
          and IP address.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
        <p className="mb-2">We use your data to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Create and manage your account</li>
          <li>Process property investments</li>
          <li>Send notifications or updates</li>
          <li>Improve platform performance</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">3. Cookies</h2>
        <p>
          We use cookies to track usage and improve your experience. You can
          control cookies via your browser settings.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
        <p>
          We may share your data with trusted third-party services for payment
          processing, hosting, or analytics. We never sell your data.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">5. Security</h2>
        <p>
          We take reasonable steps to protect your data from unauthorized
          access, but no system is 100% secure.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p>
          You can request to view, update, or delete your personal data at any
          time by contacting{" "}
          <a
            href="mailto:support@propshare.com"
            className="text-cyan-600 hover:underline"
          >
            support@propshare.com
          </a>
          .
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          7. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy. We will notify users of significant
          changes and update the “Effective Date” below.
        </p>
      </div>
    </section>
    <p className="text-sm text-gray-500 mt-10 text-right">Effective Date: July 27, 2026</p>
  </div>
);

export default PrivacyPolicyPage;
