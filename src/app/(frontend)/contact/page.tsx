"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LocationIcon, 
  PhoneIcon, 
  MailIcon, 
  ClockIcon, 
  MapIcon, 
  ArrowRightIcon,
  UserIcon,
  CalendarIcon,
  CheckIcon,
  ShieldCheckIcon,
  MessageIcon,
  BuildingIcon,
  StarIcon,
  HomeIcon
} from "@/assets/icons";

const contactInfo = [
  { 
    icon: <LocationIcon size={24} className="text-amber-600" />, 
    title: "Office Address",  
    value: "123 Luxury Ave, Beverly Hills, CA 90210",
    description: "Visit our flagship office"
  },
  { 
    icon: <PhoneIcon size={24} className="text-amber-600" />, 
    title: "Phone Number",            
    value: "+1 (555) 123-4567",
    description: "Mon-Fri 9AM-6PM PST"
  },
  { 
    icon: <MailIcon size={24} className="text-amber-600" />, 
    title: "Email Address",            
    value: "info@luxeproperties.com",
    description: "Response within 2 hours"
  },
  { 
    icon: <ClockIcon size={24} className="text-amber-600" />, 
    title: "Office Hours",     
    value: "Monday - Friday: 9AM - 6PM",
    description: "Saturday: 10AM - 3PM"
  },
];

const interestOptions = [
  { value: "Buy", label: "Buy a Property", icon: "🏠" },
  { value: "Sell", label: "Sell Property", icon: "💰" },
  { value: "Rent", label: "Rent a Home", icon: "📋" },
  { value: "Invest", label: "Investment", icon: "📈" },
  { value: "Consult", label: "Consultation", icon: "💬" },
  { value: "Other", label: "Other", icon: "❓" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    interest: "Buy", 
    message: "", 
    budget: "",
    timeline: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", phone: "", interest: "Buy", message: "", budget: "", timeline: "" });
        setFormStep(1);
      }, 4000);
    }
  };

  const nextStep = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const prevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 pt-32 pb-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-transparent to-blue-400/20" />
        </div>

        {/* Animated Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2.5 mb-8 border border-white/20">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-semibold tracking-wide">
                CONTACT US
              </span>
            </div>

            <h1 className="text-white text-5xl lg:text-6xl font-bold mb-6">
              Let's Find Your <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Dream Home</span>
            </h1>

            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
              Our expert team is ready to guide you through every step of your luxury real estate journey. 
              Schedule a personalized consultation today.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: "24/7", label: "Support Available" },
                { value: "1 hour", label: "Response Time" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "500+", label: "Properties Listed" },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="text-3xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <div 
                  key={i} 
                  className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-xl blur group-hover:blur-md transition-all duration-500" />
                      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-semibold mb-1 text-sm uppercase tracking-wider text-gray-500">
                        {item.title}
                      </h4>
                      <p className="text-gray-900 text-lg font-bold mb-1">{item.value}</p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-gray-900 text-lg font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                  <ShieldCheckIcon size={20} className="text-amber-600" />
                </div>
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "🏆", text: "Award-winning luxury real estate agency" },
                  { icon: "🎯", text: "15+ years of industry experience" },
                  { icon: "🔒", text: "Secure & confidential transactions" },
                  { icon: "📊", text: "Data-driven market analysis" },
                  { icon: "💎", text: "Exclusive access to premium listings" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <span className="text-gray-600 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Link */}
            <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />
              <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center">
                  <MapIcon size={20} className="text-amber-400" />
                </div>
                Visit Our Office
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Schedule an in-person consultation at our Beverly Hills headquarters
              </p>
              <Link
                href="https://maps.google.com"
                target="_blank"
                className="inline-flex items-center gap-2 text-amber-400 font-semibold text-sm hover:gap-3 transition-all duration-300 group"
              >
                Get Directions
                <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="relative mx-auto w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-lg animate-pulse" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                      <CheckIcon size={32} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h3>
                  <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                    We've received your message. Our luxury property specialist will contact you within 24 hours to schedule your consultation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  {/* Form Header */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                        <MessageIcon size={24} className="text-amber-600" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                          Schedule Your <span className="text-amber-600">Consultation</span>
                        </h2>
                        <p className="text-gray-600 mt-1">
                          Fill out the form below and our luxury property expert will contact you
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Progress */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                      {["Personal Info", "Property Details", "Final Step"].map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`relative w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                            index + 1 === formStep 
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                              : index + 1 < formStep 
                                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' 
                                : 'bg-gray-100 text-gray-400'
                          }`}>
                            {index + 1 < formStep ? <CheckIcon size={20} /> : index + 1}
                          </div>
                          <span className={`text-sm font-semibold ${
                            index + 1 === formStep ? 'text-amber-600' : 
                            index + 1 < formStep ? 'text-emerald-600' : 'text-gray-400'
                          }`}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                        style={{ width: `${(formStep / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Step 1: Personal Info */}
                    {formStep === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">
                              Full Name *
                            </label>
                            <div className="relative">
                              <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="John Smith"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all duration-300"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">
                              Email Address *
                            </label>
                            <div className="relative">
                              <MailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="john@example.com"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all duration-300"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">
                            Phone Number
                          </label>
                          <div className="relative">
                            <PhoneIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              placeholder="+1 (555) 123-4567"
                              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Property Details */}
                    {formStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">
                            What are you interested in? *
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {interestOptions.map((option) => (
                              <button
                                type="button"
                                key={option.value}
                                onClick={() => setForm({ ...form, interest: option.value })}
                                className={`p-5 rounded-xl border transition-all duration-300 text-center group ${
                                  form.interest === option.value
                                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-400 ring-2 ring-amber-100'
                                    : 'bg-white border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                                }`}
                              >
                                <div className="text-2xl mb-3">{option.icon}</div>
                                <div className={`font-semibold ${
                                  form.interest === option.value 
                                    ? 'text-amber-600' 
                                    : 'text-gray-900 group-hover:text-amber-600'
                                }`}>
                                  {option.label}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">
                              Budget Range
                            </label>
                            <select
                              value={form.budget}
                              onChange={(e) => setForm({ ...form, budget: e.target.value })}
                              className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all duration-300"
                            >
                              <option value="">Select budget range</option>
                              <option value="Under 1M">Under $1M</option>
                              <option value="1M-2M">$1M - $2M</option>
                              <option value="2M-5M">$2M - $5M</option>
                              <option value="5M-10M">$5M - $10M</option>
                              <option value="10M+">$10M+</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">
                              Timeline
                            </label>
                            <div className="relative">
                              <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <select
                                value={form.timeline}
                                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all duration-300"
                              >
                                <option value="">Select timeline</option>
                                <option value="Immediate">Immediately</option>
                                <option value="1-3 months">1-3 months</option>
                                <option value="3-6 months">3-6 months</option>
                                <option value="6+ months">6+ months</option>
                                <option value="Just exploring">Just exploring</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Final Message */}
                    {formStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wider">
                            Your Message *
                          </label>
                          <div className="relative">
                            <MessageIcon className="absolute left-4 top-4 text-gray-400" size={20} />
                            <textarea
                              value={form.message}
                              onChange={(e) => setForm({ ...form, message: e.target.value })}
                              placeholder="Tell us about your requirements, preferred locations, architectural preferences, or any specific needs..."
                              rows={6}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none resize-none transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                              <ShieldCheckIcon size={24} className="text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 mb-2">Your Information is Secure & Confidential</p>
                              <p className="text-gray-600 text-sm">
                                We respect your privacy and will never share your personal information with third parties. 
                                All communications are encrypted and handled with the utmost discretion.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form Navigation */}
                    <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                      {formStep > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-8 py-3.5 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-all duration-300"
                        >
                          Back
                        </button>
                      ) : (
                        <div />
                      )}
                      
                      {formStep < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
                        >
                          Continue to Next Step
                          <ArrowRightIcon size={20} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
                        >
                          Submit Consultation Request
                          <CheckIcon size={20} />
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-transparent to-blue-400/20" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2.5 mb-8 border border-white/20">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-semibold tracking-wide">
              GET STARTED TODAY
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Begin Your Luxury Real Estate Journey
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Schedule a free consultation with our expert team and discover how we can help you achieve your real estate goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <HomeIcon size={20} />
              Browse Properties
            </Link>
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
            >
              <BuildingIcon size={20} />
              Meet Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}