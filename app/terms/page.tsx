import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-8">BUYAGAIN.NG – TERMS OF SERVICE</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: 03/01/2026</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to BuyAgain.ng ("BuyAgain", "we", "us", "our").
            BuyAgain provides digital loyalty, discount, and referral tools that help businesses encourage repeat purchases.
            By accessing or using BuyAgain, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Eligibility</h2>
          <p>BuyAgain is intended for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Registered businesses, sole proprietors, or authorised business representatives.</li>
            <li>Users who are at least 18 years old.</li>
          </ul>
          <p>You confirm that all information you provide is accurate and up to date.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration & Security</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You are responsible for maintaining the confidentiality of your login details.</li>
            <li>You are responsible for all activities performed by users under your business account.</li>
            <li>BuyAgain is not liable for unauthorised access caused by your failure to secure your credentials.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Description of Service</h2>
          <p>BuyAgain provides tools that allow businesses to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Generate QR-based discount and referral codes</li>
            <li>Print or display these codes physically or digitally</li>
            <li>Track redemptions and referral activity</li>
            <li>View basic business insights and reports</li>
          </ul>
          <p>BuyAgain does not:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process payments</li>
            <li>Set prices for goods or services</li>
            <li>Control business operations or customer interactions</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use BuyAgain for fraudulent, misleading, or illegal activities</li>
            <li>Create false or deceptive discount offers</li>
            <li>Manipulate or abuse referral or redemption systems</li>
            <li>Resell or white-label BuyAgain without written permission</li>
            <li>Interfere with the platform's security or functionality</li>
          </ul>
          <p>BuyAgain reserves the right to suspend or terminate accounts that violate these rules.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Plans, Limits & Fair Use</h2>
          <p>BuyAgain offers free and paid subscription plans with usage limits, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Number of QR codes generated per month</li>
            <li>Number of redemptions</li>
            <li>Referral tracking duration</li>
            <li>Data retention period</li>
            <li>And any other usage it deems fit to control plans</li>
          </ul>
          <p>Exceeding plan limits or abusing system resources may result in restricted access or plan upgrades.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Fees & Payments</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Paid plans are billed monthly or yearly in advance.</li>
            <li>Payments are non-refundable once processed.</li>
            <li>BuyAgain may revise pricing with or without prior notice.</li>
            <li>Failure to pay may result in account suspension.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Data Ownership</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Businesses retain ownership of their customer data.</li>
            <li>BuyAgain owns the platform software, designs, analytics models, and aggregated anonymised insights.</li>
            <li>BuyAgain may use anonymised data to improve the service.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Service Availability</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>BuyAgain is provided on an "as is" and "as available" basis.</li>
            <li>We do not guarantee uninterrupted or error-free operation.</li>
            <li>Scheduled maintenance or downtime may occur.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>BuyAgain shall not be liable for indirect, incidental, or consequential damages.</li>
            <li>BuyAgain is not responsible for loss of profits, revenue, or business opportunities.</li>
            <li>Total liability is limited to the fees paid by you in the three (3) months preceding the claim.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Termination</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You may stop using BuyAgain at any time.</li>
            <li>BuyAgain may suspend or terminate accounts for violations, abuse, or non-payment.</li>
            <li>Upon termination, access to the platform will be revoked.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to These Terms</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>We may update these Terms from time to time.</li>
            <li>Continued use of BuyAgain constitutes acceptance of updated Terms.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Governing Law</h2>
          <p>These Terms are governed by the laws of the Federal Republic of Nigeria.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Contact</h2>
          <p>For questions or support:</p>
          <p>support@buyagain.ng</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
