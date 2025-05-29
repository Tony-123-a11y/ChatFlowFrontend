export default function TermsOfService() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">Terms of Service</h1>
        <p className="text-gray-700 mb-6">
          Welcome to <span className="font-semibold">Chat Flow</span>. By using our platform, you agree to these Terms of Service. Please read them carefully to understand your rights and responsibilities.
        </p>

        <Section title="1. Acceptance of Terms">
          <p className="text-gray-600">
            By accessing or using Chat Flow, you agree to be bound by these terms and our Privacy Policy. If you do not agree, please do not use our services.
          </p>
        </Section>

        <Section title="2. Use of the Service">
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>You must be at least 13 years old to use Chat Flow.</li>
            <li>You are responsible for your activity on the platform.</li>
            <li>You agree not to use the service for any unlawful or harmful purposes.</li>
          </ul>
        </Section>

        <Section title="3. User Content">
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>You retain ownership of the content you post.</li>
            <li>You grant us a non-exclusive license to display and distribute your content on Chat Flow.</li>
            <li>Do not post or share content that is abusive, illegal, or violates any rights.</li>
          </ul>
        </Section>

        <Section title="4. Chat & Messaging">
          <p className="text-gray-600">
            Private chats should remain respectful. We may review or moderate messages only when necessary for safety, legal, or platform integrity reasons.
          </p>
        </Section>

        <Section title="5. Account & Security">
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>Notify us immediately of any unauthorized access or breach.</li>
          </ul>
        </Section>

        <Section title="6. Termination">
          <p className="text-gray-600">
            We reserve the right to suspend or terminate your account if you violate these terms or engage in harmful behavior.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p className="text-gray-600">
            Chat Flow is provided “as is” without warranties of any kind. We are not liable for indirect or consequential damages arising from your use of the service.
          </p>
        </Section>

        <Section title="8. Modifications to Terms">
          <p className="text-gray-600">
            We may update these Terms from time to time. Continued use of Chat Flow after changes means you accept the revised terms.
          </p>
        </Section>

        <Section title="9. Governing Law">
          <p className="text-gray-600">
            These terms are governed by the laws of your local jurisdiction unless otherwise specified.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p className="text-gray-600">
            If you have questions about these Terms, please contact us at <a href="mailto:support@chatflow.app" className="text-purple-600 underline">support@chatflow.app</a>.
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
