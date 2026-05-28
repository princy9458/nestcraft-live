"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { defaultContactFormData } from './contactFormData';

const iconMap: Record<string, any> = {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight
};

interface ContactFormProps {
  data?: any;
}

export const ContactForm: React.FC<ContactFormProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Merge provided data with defaults. We use 'en' for now, but this supports dynamic CMS passing.
  const content = data || defaultContactFormData.props;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(responseData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-32 px-[5%] max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[1.2fr_1.8fr] gap-24">
        {/* Left Side: Info Cards */}
        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black mb-10 tracking-tight">{content.sectionHeading?.en}</h2>
            <div className="space-y-12">
              {content.contactItems?.map((item: any, index: number) => {
                const IconComponent = iconMap[item.icon] || MapPin;
                return (
                  <div key={index} className="group cursor-pointer">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                        <IconComponent size={18} />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[2px] text-muted">
                        {item.label?.en}
                      </span>
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-2xl font-bold tracking-tight inline-block">
                        {item.value?.en}
                      </a>
                    ) : (
                      <p className="text-2xl font-bold tracking-tight">
                        {item.value?.en}
                      </p>
                    )}
                    <div className="w-0 group-hover:w-full h-px bg-secondary transition-all duration-500 mt-2" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
          
          <div className="bg-surface border border-border p-10 lg:p-16 rounded-[48px] shadow-2xl relative z-10">
            {isSubmitted ? (
              <div className="py-20 text-center">
                <div className="w-24 h-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tight">{content.successHeading?.en}</h3>
                <p className="text-muted font-semibold mb-10 text-lg">
                  {content.successDescription?.en}
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-primary text-white px-12 h-14 rounded-full text-[15px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-all"
                >
                  {content.successButtonText?.en}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight mb-2">{content.formHeading?.en}</h3>
                  <p className="text-muted font-semibold">{content.formDescription?.en}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[3px] text-muted ml-1">
                      {content.nameLabel?.en}
                    </label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={content.namePlaceholder?.en}
                      className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-secondary transition-all font-bold text-xl placeholder:text-muted/30"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[3px] text-muted ml-1">
                      {content.emailLabel?.en}
                    </label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={content.emailPlaceholder?.en}
                      className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-secondary transition-all font-bold text-xl placeholder:text-muted/30"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[3px] text-muted ml-1">
                    {content.subjectLabel?.en}
                  </label>
                  <select 
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-secondary transition-all font-bold text-xl appearance-none cursor-pointer"
                  >
                    {content.subjectOptions?.map((option: any, index: number) => (
                      <option key={index} value={option.value} className="bg-surface">
                        {option.label?.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[3px] text-muted ml-1">
                    {content.messageLabel?.en}
                  </label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={content.messagePlaceholder?.en}
                    className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-secondary transition-all font-bold text-xl resize-none placeholder:text-muted/30"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex relative h-12 items-center justify-center rounded-full bg-primary px-8 text-[14px] font-semibold uppercase tracking-wider text-white transition-all overflow-hidden scroll-mt-20"
                >
                  <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 flex gap-2 items-center">
                    {content.submitButtonText?.en} 
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
