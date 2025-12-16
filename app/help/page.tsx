import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Book, MessageCircle, Video, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and get the help you need to make the most of BuyAgain.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Documentation</CardTitle>
              <CardDescription>
                Step-by-step guides to help you get started and make the most of BuyAgain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="#guides">Browse Guides</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Contact Support</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Our support team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Video Tutorials</CardTitle>
              <CardDescription>
                Watch quick video tutorials to learn how to use BuyAgain effectively.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="#videos">Watch Videos</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="getting-started">
              <AccordionTrigger className="text-left">
                How do I get started with BuyAgain?
              </AccordionTrigger>
              <AccordionContent>
                Getting started is easy! Simply sign up for a free account, complete your business profile, and start generating QR codes for your loyalty and referral programs. Check out our getting started guide for detailed instructions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pricing">
              <AccordionTrigger className="text-left">
                What are the pricing plans?
              </AccordionTrigger>
              <AccordionContent>
                BuyAgain offers a free plan with basic features and paid plans starting from ₦5,000/month. Paid plans include unlimited QR codes, advanced analytics, and priority support. Visit our pricing page for detailed plan comparisons.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="qr-codes">
              <AccordionTrigger className="text-left">
                How do QR codes work?
              </AccordionTrigger>
              <AccordionContent>
                QR codes are scannable codes that customers can use to access discounts or participate in referral programs. You generate codes through your dashboard, print them on receipts or displays, and track redemptions in real-time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-security">
              <AccordionTrigger className="text-left">
                Is my data secure?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we take data security seriously. We use industry-standard encryption, secure servers, and follow best practices to protect your business and customer data. Review our Privacy Policy for more details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger className="text-left">
                How can I contact support?
              </AccordionTrigger>
              <AccordionContent>
                You can reach our support team via email at support@buyagain.ng, through the contact form on our website, or by phone during business hours. We typically respond within 24 hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancel-account">
              <AccordionTrigger className="text-left">
                How do I cancel my account?
              </AccordionTrigger>
              <AccordionContent>
                You can cancel your account at any time from your dashboard settings. Paid subscriptions will remain active until the end of the current billing period. Contact support if you need assistance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Still Need Help */}
        <div className="text-center mt-12">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our support team is ready to assist.
              </p>
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
