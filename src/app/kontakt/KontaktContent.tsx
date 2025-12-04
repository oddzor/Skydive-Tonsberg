"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  Instagram,
  Youtube,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
  {
    icon: Mail,
    label: "E-post",
    value: "post@skydivetonsberg.no",
    href: "mailto:post@skydivetonsberg.no",
    color: "text-sky",
    bgColor: "bg-sky/10",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Tønsberg Flyplass, Jarlsberg",
    href: "https://goo.gl/maps/YOUR_MAPS_LINK",
    color: "text-leaf",
    bgColor: "bg-leaf/10",
  },
  {
    icon: Clock,
    label: "Åpent",
    value: "Hopphelger lør-søn i sesongen",
    href: "https://www.skydivetonsberg.no/hoppkalender-1",
    color: "text-sky",
    bgColor: "bg-sky/10",
  },
];

const socialLinks = [
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
];

const inquiryTypes = [
  { value: "tandem", label: "Tandemhopp" },
  { value: "kurs", label: "AFF Grunnkurs" },
  { value: "gjest", label: "Gjesthopping" },
  { value: "annet", label: "Annet" },
];

export function KontaktContent() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
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
      {/* Hero Section */}
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
              Vi er her for deg
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Ta <span className="text-gradient">kontakt</span> med oss
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Har du spørsmål om fallskjermhopping? Vi hjelper deg gjerne! 
              Send oss en melding eller kontakt oss direkte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 -mt-8 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((item, index) => (
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

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Send oss en <span className="text-gradient">melding</span>
              </h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-leaf/10 border border-leaf/20 rounded-2xl p-8 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-leaf mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Takk for din henvendelse!
                  </h3>
                  <p className="text-muted-foreground">
                    Vi har mottatt meldingen din og vil svare så snart som mulig.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Navn *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Ditt navn"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        E-post *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="din@epost.no"
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
                        Telefon
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="12345678"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Henvendelse gjelder *
                      </label>
                      <select
                        id="type"
                        name="type"
                        required
                        value={formState.type}
                        onChange={handleChange}
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Velg type</option>
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
                      Melding *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Skriv din melding her..."
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-brand hover:opacity-90 text-white font-semibold px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">Sender...</span>
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5" />
                        Send melding
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Social Media */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Følg oss
                  </h3>
                  <div className="space-y-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center text-white">
                          <social.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {social.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {social.handle}
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map / Location Image */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src="/map-location.webp"
                    alt="Kart over beliggenhet"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-semibold">Tønsberg Flyplass (Jarlsberg)</p>
                    <p className="text-sm text-white/80">Vestfold, Norge</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href="https://goo.gl/maps/YOUR_MAPS_LINK"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="mr-2 w-4 h-4" />
                      Åpne i Google Maps
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Rask tilgang
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="https://bookings.burblesoft.eu/551/18"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-sky/10 hover:bg-sky/20 transition-colors"
                    >
                      <span className="text-sky font-medium">→</span>
                      <span className="text-foreground">Book tandemhopp</span>
                    </a>
                    <a
                      href="https://www.skydivetonsberg.no/hoppkalender-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-leaf/10 hover:bg-leaf/20 transition-colors"
                    >
                      <span className="text-leaf font-medium">→</span>
                      <span className="text-foreground">Se hoppkalender</span>
                    </a>
                    <a
                      href="https://store.burblesoft.com/?dz_id=551"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <span className="text-foreground font-medium">→</span>
                      <span className="text-foreground">Nettbutikk</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}




