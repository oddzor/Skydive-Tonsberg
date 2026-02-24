"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Instagram,
  Youtube,
  Facebook,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendContactEmail, type ContactFormData } from "@/lib/emailjs";
const getContactInfoWithIcons = (t: (key: string) => string) => [
  {
    icon: Mail,
    label: t('kontakt.info.email.label'),
    value: t('kontakt.info.email.value'),
    href: `mailto:${t('kontakt.info.email.value')}`,
    color: "text-sky",
    bgColor: "bg-sky/10",
  },
  {
    icon: MapPin,
    label: t('kontakt.info.address.label'),
    value: t('kontakt.info.address.value'),
    href: "https://goo.gl/maps/YOUR_MAPS_LINK",
    color: "text-leaf",
    bgColor: "bg-leaf/10",
  },
  {
    icon: Phone,
    label: t('kontakt.info.phone.label'),
    value: t('kontakt.info.phone.value'),
    href: `tel:${t('kontakt.info.phone.value')}`,
    color: "text-sky",
    bgColor: "bg-sky/10",
  },
];
const socialLinksWithIcons = [
  {
    name: "Instagram",
    href: "https://instagram.com/skydivetonsberg",
    icon: Instagram,
    handle: "@skydivetonsberg",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@skydivetnsberg9501",
    icon: Youtube,
    handle: "Skydive Tønsberg",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/skydivetonsberg/",
    icon: Facebook,
    handle: "Skydive Tønsberg",
  },
];
export function KontaktContent() {
  const { t } = useLanguage();
  const contactInfoWithIcons = getContactInfoWithIcons(t);
  const [formState, setFormState] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inquiryTypes = [
    { value: "tandem", label: t('kontakt.form.typeOptions.tandem') },
    { value: "kurs", label: t('kontakt.form.typeOptions.course') },
    { value: "gjest", label: t('kontakt.form.typeOptions.guest') },
    { value: "annet", label: t('kontakt.form.typeOptions.other') },
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await sendContactEmail(formState);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        type: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to send message. Please try emailing us directly at info@hoppfallskjerm.no"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-sky/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-leaf/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-sky/10 rounded-full text-sky border border-sky/20"
            >
              {t('kontakt.hero.badge')}
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('kontakt.hero.title')} <span className="text-gradient">{t('kontakt.hero.titleHighlight')}</span> {t('kontakt.hero.titleEnd')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('kontakt.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 -mt-8 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfoWithIcons.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-14 h-14 rounded-2xl ${item.bgColor} flex items-center justify-center mx-auto mb-4`}
                    >
                      <item.icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                {t('kontakt.form.title')}
              </h2>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-leaf/10 border border-leaf/20 rounded-2xl p-8 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-leaf mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t('kontakt.form.successTitle')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('kontakt.form.successMessage')}
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-2"
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </motion.div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t('kontakt.form.name')} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder={t('kontakt.form.namePlaceholder')}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t('kontakt.form.email')} *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder={t('kontakt.form.emailPlaceholder')}
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t('kontakt.form.phone')}
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder={t('kontakt.form.phonePlaceholder')}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t('kontakt.form.type')} *
                      </label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={formState.type}
                        onChange={handleChange}
                        className="w-full h-12 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">{t('kontakt.form.typePlaceholder')}</option>
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t('kontakt.form.message')} *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder={t('kontakt.form.messagePlaceholder')}
                      rows={14}
                      className="resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-brand hover:opacity-90 text-white font-semibold h-12"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('kontakt.form.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        {t('kontakt.form.submit')}
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >

              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {t('kontakt.social.title')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {socialLinksWithIcons.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <social.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{social.name}</p>
                        <p className="text-sm text-muted-foreground">{social.handle}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/skydive-tonsberg-northernlights-1.webp"
                  alt="Skydive Tønsberg Northern Lights"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
