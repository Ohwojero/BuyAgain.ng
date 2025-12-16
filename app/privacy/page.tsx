import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-8">BUYAGAIN.NG – PRIVACY POLICY</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: 03/01/2026</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            BuyAgain respects your privacy and is committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, and protect information relating to merchants and customers who interact with BuyAgain.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium mt-6 mb-2">A. Merchant Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Business name</li>
            <li>Contact email and phone number</li>
            <li>Account login details</li>
            <li>Subscription and usage data</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-2">B. Customer Information</h3>
          <p>We collect minimal data, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>QR scan and redemption events</li>
            <li>Date and time of interaction</li>
            <li>Optional phone number (only if merchant enables it)</li>
          </ul>
          <p>We do not collect payment card details.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Information</h2>
          <p>We use information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide loyalty and referral services</li>
            <li>Prevent fraud and misuse</li>
            <li>Generate analytics for merchants</li>
            <li>Improve BuyAgain's features and performance</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Sharing</h2>
          <p>We do not sell personal data.</p>
          <p>Data may be shared only with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Payment processors (e.g. Paystack)</li>
            <li>Hosting and infrastructure providers</li>
            <li>Messaging providers (Email/WhatsApp/SMS), if enabled by merchants</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Data is stored based on the merchant's subscription plan.</li>
            <li>Merchants may request data deletion.</li>
            <li>Anonymised data may be retained for analytics.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies</h2>
          <p>BuyAgain uses basic cookies for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Login sessions</li>
            <li>Security</li>
            <li>Analytics (non-invasive)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Security</h2>
          <p>We use reasonable technical and organisational measures to protect data, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Encryption</li>
            <li>Secure servers</li>
            <li>Limited internal access</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion</li>
            <li>Withdraw marketing consent</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Children's Privacy</h2>
          <p>BuyAgain is not intended for individuals under 18.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact</h2>
          <p>support@buyagain.ng</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
