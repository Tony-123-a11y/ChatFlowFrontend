export default function PrivacyPolicy() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-6">
          At <span className="font-semibold">Chat Flow</span>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform.
        </p>

        <Section title="1. Information We Collect">
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Account details like name, email, and profile picture</li>
            <li>Messages sent via our chat feature</li>
            <li>Posts, likes, comments, and saved content</li>
            <li>Device and usage data (IP address, browser, interactions)</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>To provide core features like chat, posting, and notifications</li>
            <li>To improve platform performance and user experience</li>
            <li>To detect and prevent fraudulent or harmful activity</li>
            <li>To communicate important updates and changes</li>
          </ul>
        </Section>

        <Section title="3. Chat & Post Privacy">
          <p className="text-gray-600">
            Private messages are encrypted and not shared with third parties. Public posts and comments may be visible to other users, depending on your settings.
          </p>
        </Section>

        <Section title="4. Cookies & Tracking">
          <p className="text-gray-600">
            We use cookies to remember your preferences and improve your browsing experience. You can disable cookies in your browser settings at any time.
          </p>
        </Section>

        <Section title="5. Data Security">
          <p className="text-gray-600">
            We take data security seriously and implement industry-standard measures to protect your information from unauthorized access, loss, or misuse.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Access or update your personal information</li>
            <li>Request deletion of your data</li>
            <li>Control your communication preferences</li>
          </ul>
        </Section>

        <Section title="7. Changes to This Policy">
          <p className="text-gray-600">
            We may update this policy from time to time. We’ll notify you of any major changes through the app or email.
          </p>
        </Section>

        <Section title="8. Contact Us">
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please reach out to us at <a href="mailto:support@chatflow.app" className="text-purple-600 underline">support@chatflow.app</a>.
          </p>
        </Section>
      </div>
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-purple-600 mb-2">{title}</h2>
      {children}
    </div>
  );
}
