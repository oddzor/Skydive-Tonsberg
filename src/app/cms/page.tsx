"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Key, Save, LogOut, Loader2, Home, Plane, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CMSPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [token, setToken] = useState("");

  // Check if already authenticated
  useEffect(() => {
    const storedToken = sessionStorage.getItem("cmsToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      loadContent();
    }
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/cms/content");
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Failed to load content:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const response = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        sessionStorage.setItem("cmsToken", data.token);
        setIsAuthenticated(true);
        loadContent();
      } else {
        setAuthError("Feil passord. Prøv igjen.");
      }
    } catch (error) {
      setAuthError("Kunne ikke logge inn. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cmsToken");
    setIsAuthenticated(false);
    setToken("");
    setPassword("");
    setContent(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveMessage("");

    try {
      const response = await fetch("/api/cms/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setSaveMessage("✓ Endringer lagret!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage("✗ Kunne ikke lagre endringer.");
      }
    } catch (error) {
      setSaveMessage("✗ Feil ved lagring.");
    } finally {
      setLoading(false);
    }
  };

  // Update functions for different sections
  const updateHomeFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setContent((prev: any) => {
      const newContent = { ...prev };
      newContent.home.faq[index][field] = value;
      return newContent;
    });
  };

  const updateHomeTestimonial = (index: number, field: string, value: string | number) => {
    setContent((prev: any) => {
      const newContent = { ...prev };
      newContent.home.testimonials[index][field] = value;
      return newContent;
    });
  };

  const updateTandemPricing = (field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      tandem: {
        ...prev.tandem,
        pricing: {
          ...prev.tandem.pricing,
          [field]: value,
        },
      },
    }));
  };

  const updateTandemFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setContent((prev: any) => {
      const newContent = { ...prev };
      newContent.tandem.faq[index][field] = value;
      return newContent;
    });
  };

  const updateKursPricing = (field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      kurs: {
        ...prev.kurs,
        pricing: {
          ...prev.kurs.pricing,
          [field]: value,
        },
      },
    }));
  };

  const updateKursIncluded = (index: number, value: string) => {
    setContent((prev: any) => {
      const newContent = { ...prev };
      newContent.kurs.included[index] = value;
      return newContent;
    });
  };

  const updateKursFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setContent((prev: any) => {
      const newContent = { ...prev };
      newContent.kurs.faq[index][field] = value;
      return newContent;
    });
  };

  const updateForHopperePricing = (section: string, index: number, field: string, value: string) => {
    setContent((prev: any) => {
      const newContent = { ...prev };
      newContent.forHoppere.pricing[section][index][field] = value;
      return newContent;
    });
  };

  const updateBunkhousePricing = (index: number, field: string, value: string) => {
    setContent((prev: any) => {
      const newContent = { ...prev };
      newContent.forHoppere.bunkhouse.pricing[index][field] = value;
      return newContent;
    });
  };

  const updateBunkhouseRule = (index: number, value: string) => {
    setContent((prev: any) => {
      const newContent = { ...prev };
      newContent.forHoppere.bunkhouse.rules[index] = value;
      return newContent;
    });
  };

  const updateContact = (field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      forHoppere: {
        ...prev.forHoppere,
        contact: {
          ...prev.forHoppere.contact,
          [field]: value,
        },
      },
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mb-4">
                <Key className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">CMS Login</CardTitle>
              <CardDescription>
                Skriv inn månedens passord for å redigere innhold
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Passord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-sm text-destructive mt-2">{authError}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-brand hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logger inn...
                    </>
                  ) : (
                    "Logg inn"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                CMS Dashboard
              </h1>
              <p className="text-muted-foreground">
                Rediger innhold på nettsiden
              </p>
            </div>
            <div className="flex items-center gap-3">
              {saveMessage && (
                <span className="text-sm font-medium text-leaf">
                  {saveMessage}
                </span>
              )}
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-gradient-brand hover:opacity-90"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Lagre endringer
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logg ut
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="home" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="home" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Hjem</span>
              </TabsTrigger>
              <TabsTrigger value="tandem" className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                <span>Tandem</span>
              </TabsTrigger>
              <TabsTrigger value="kurs" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Kurs</span>
              </TabsTrigger>
              <TabsTrigger value="forHoppere" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>For Hoppere</span>
              </TabsTrigger>
            </TabsList>

            {/* HOME TAB */}
            <TabsContent value="home" className="space-y-6">
              {/* Testimonials */}
              <Card>
                <CardHeader>
                  <CardTitle>Anmeldelser</CardTitle>
                  <CardDescription>
                    Rediger kundens testimonials som vises på forsiden
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {content.home.testimonials.map((item: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="font-medium text-sm text-muted-foreground">
                        Anmeldelse {index + 1}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Navn</label>
                          <Input
                            value={item.name}
                            onChange={(e) => updateHomeTestimonial(index, "name", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Rolle</label>
                          <Input
                            value={item.role}
                            onChange={(e) => updateHomeTestimonial(index, "role", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Anmeldelse tekst</label>
                        <Textarea
                          value={item.text}
                          onChange={(e) => updateHomeTestimonial(index, "text", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Ofte Stilte Spørsmål</CardTitle>
                  <CardDescription>
                    Rediger FAQ-seksjonen som vises på forsiden
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {content.home.faq.map((item: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="font-medium text-sm text-muted-foreground">
                        Spørsmål {index + 1}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Spørsmål</label>
                        <Input
                          value={item.question}
                          onChange={(e) => updateHomeFaq(index, "question", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Svar</label>
                        <Textarea
                          value={item.answer}
                          onChange={(e) => updateHomeFaq(index, "answer", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TANDEM TAB */}
            <TabsContent value="tandem" className="space-y-6">
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Tandempriser</CardTitle>
                  <CardDescription>
                    Oppdater priser for tandemhopp og tilleggstjenester
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Grunnpris tandemhopp</label>
                    <Input
                      value={content.tandem.pricing.base}
                      onChange={(e) => updateTandemPricing("base", e.target.value)}
                      placeholder="4690 kr"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Video tillegg</label>
                    <Input
                      value={content.tandem.pricing.video}
                      onChange={(e) => updateTandemPricing("video", e.target.value)}
                      placeholder="1500 kr"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bilder tillegg</label>
                    <Input
                      value={content.tandem.pricing.photos}
                      onChange={(e) => updateTandemPricing("photos", e.target.value)}
                      placeholder="500 kr"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Tandem FAQ</CardTitle>
                  <CardDescription>
                    Spørsmål og svar for tandemsiden
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {content.tandem.faq.map((item: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="font-medium text-sm text-muted-foreground">
                        Spørsmål {index + 1}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Spørsmål</label>
                        <Input
                          value={item.question}
                          onChange={(e) => updateTandemFaq(index, "question", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Svar</label>
                        <Textarea
                          value={item.answer}
                          onChange={(e) => updateTandemFaq(index, "answer", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* KURS TAB */}
            <TabsContent value="kurs" className="space-y-6">
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>AFF Kurspriser</CardTitle>
                  <CardDescription>
                    Oppdater pris for AFF grunnkurset
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Komplett kurspris</label>
                    <Input
                      value={content.kurs.pricing.fullCourse}
                      onChange={(e) => updateKursPricing("fullCourse", e.target.value)}
                      placeholder="18 990 kr"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Included items */}
              <Card>
                <CardHeader>
                  <CardTitle>Inkludert i kurset</CardTitle>
                  <CardDescription>
                    Hva som er inkludert i AFF kursprisen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.kurs.included.map((item: string, index: number) => (
                    <div key={index}>
                      <label className="text-sm font-medium mb-2 block">Punkt {index + 1}</label>
                      <Input
                        value={item}
                        onChange={(e) => updateKursIncluded(index, e.target.value)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Kurs FAQ</CardTitle>
                  <CardDescription>
                    Spørsmål og svar for kurssiden
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {content.kurs.faq.map((item: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="font-medium text-sm text-muted-foreground">
                        Spørsmål {index + 1}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Spørsmål</label>
                        <Input
                          value={item.question}
                          onChange={(e) => updateKursFaq(index, "question", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Svar</label>
                        <Textarea
                          value={item.answer}
                          onChange={(e) => updateKursFaq(index, "answer", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* FOR HOPPERE TAB */}
            <TabsContent value="forHoppere" className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Kontaktinformasjon</CardTitle>
                  <CardDescription>
                    Generell kontaktinformasjon for klubben
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">E-post</label>
                    <Input
                      value={content.forHoppere.contact.email}
                      onChange={(e) => updateContact("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Telefon</label>
                    <Input
                      value={content.forHoppere.contact.phone}
                      onChange={(e) => updateContact("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Adresse</label>
                    <Input
                      value={content.forHoppere.contact.address}
                      onChange={(e) => updateContact("address", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Jump Prices */}
              <Card>
                <CardHeader>
                  <CardTitle>Hoppriser</CardTitle>
                  <CardDescription>
                    Priser for hopp og hoppdeals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.forHoppere.pricing.jumpPrices.map((item: any, index: number) => (
                    <div key={index} className="grid grid-cols-3 gap-4 p-3 border rounded-lg">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Navn</label>
                        <Input
                          placeholder="Navn"
                          value={item.name}
                          onChange={(e) =>
                            updateForHopperePricing("jumpPrices", index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Pris</label>
                        <Input
                          placeholder="Pris"
                          value={item.price}
                          onChange={(e) =>
                            updateForHopperePricing("jumpPrices", index, "price", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Merknad</label>
                        <Input
                          placeholder="Merknad"
                          value={item.note}
                          onChange={(e) =>
                            updateForHopperePricing("jumpPrices", index, "note", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Registration Fees */}
              <Card>
                <CardHeader>
                  <CardTitle>Registreringsavgifter</CardTitle>
                  <CardDescription>
                    Årsavgift og dagsavgifter
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.forHoppere.pricing.registrationFees.map((item: any, index: number) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Navn</label>
                        <Input
                          placeholder="Navn"
                          value={item.name}
                          onChange={(e) =>
                            updateForHopperePricing("registrationFees", index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Pris</label>
                        <Input
                          placeholder="Pris"
                          value={item.price}
                          onChange={(e) =>
                            updateForHopperePricing("registrationFees", index, "price", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Equipment Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Utstyrspriser</CardTitle>
                  <CardDescription>
                    Leiepriser for utstyr
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.forHoppere.pricing.equipmentPricing?.map((item: any, index: number) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Navn</label>
                        <Input
                          placeholder="Navn"
                          value={item.name}
                          onChange={(e) =>
                            updateForHopperePricing("equipmentPricing", index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Pris</label>
                        <Input
                          placeholder="Pris"
                          value={item.price}
                          onChange={(e) =>
                            updateForHopperePricing("equipmentPricing", index, "price", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Bunkhouse Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Bunkhouse Priser</CardTitle>
                  <CardDescription>
                    Overnattingspriser
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.forHoppere.bunkhouse.pricing.map((item: any, index: number) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Navn</label>
                        <Input
                          placeholder="Navn"
                          value={item.name}
                          onChange={(e) => updateBunkhousePricing(index, "name", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Pris</label>
                        <Input
                          placeholder="Pris"
                          value={item.price}
                          onChange={(e) => updateBunkhousePricing(index, "price", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Bunkhouse Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>Bunkhouse Regler</CardTitle>
                  <CardDescription>
                    Regler for overnattings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.forHoppere.bunkhouse.rules.map((rule: string, index: number) => (
                    <div key={index}>
                      <label className="text-sm font-medium mb-2 block">Regel {index + 1}</label>
                      <Input
                        value={rule}
                        onChange={(e) => updateBunkhouseRule(index, e.target.value)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

