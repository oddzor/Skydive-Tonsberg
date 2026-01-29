"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, RefreshCw, Plus, X } from "lucide-react";
import { ImageUpload } from "@/components/cms/ImageUpload";

interface FAQ {
  question: string;
  answer: string;
}

type CMSContent = Record<string, unknown> & {
  pricing?: Record<string, Record<string, Record<string, number>>>;
  tandem?: Record<string, unknown> & {
    videoUrl?: string;
    images?: Record<string, string>;
  };
  course?: Record<string, unknown> & {
    videoUrl?: string;
    images?: Record<string, string>;
  };
  forHoppere?: Record<string, unknown>;
  faqs?: Record<string, FAQ[]>;
  images?: Record<string, string[]>;
  accomodation?: Record<string, Record<string, number>>;
};

export default function AdministrasjonPage() {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchContent();
  }, []);
  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/cms-content?t=${Date.now()}`);
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage('Failed to load content');
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch('/api/cms-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        setMessage('Content saved successfully! Changes are now live on the website.');
        setTimeout(() => setMessage(""), 5000);
        await fetchContent();
      } else {
        setMessage('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };
  const updateValue = (path: string[], value: string | number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const newContent = JSON.parse(JSON.stringify(prev));
      let current = newContent;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newContent;
    });
  };
  const updateFAQ = (page: string, index: number, field: string, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const newContent = JSON.parse(JSON.stringify(prev));
      newContent.faqs[page][index][field] = value;
      return newContent;
    });
  };
  const addFAQ = (page: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const newContent = JSON.parse(JSON.stringify(prev)) as CMSContent;
      if (newContent.faqs?.[page]) {
        newContent.faqs[page].push({ question: "", answer: "" });
      }
      return newContent;
    });
  };
  const removeFAQ = (page: string, index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const newContent = JSON.parse(JSON.stringify(prev)) as CMSContent;
      if (newContent.faqs?.[page]) {
        newContent.faqs[page].splice(index, 1);
      }
      return newContent;
    });
  };
  const updateArrayItem = (path: string[], index: number, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const newContent = JSON.parse(JSON.stringify(prev));
      let current = newContent;
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      current[index] = value;
      return newContent;
    });
  };
  const addArrayItem = (path: string[]) => {
    setContent((prev) => {
      if (!prev) return prev;
      const newContent = JSON.parse(JSON.stringify(prev));
      let current: Record<string, unknown> = newContent;
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]] as Record<string, unknown>;
      }
      if (Array.isArray(current)) {
        current.push("");
      }
      return newContent;
    });
  };
  const removeArrayItem = (path: string[], index: number) => {
    setContent((prev) => {
      if (!prev) return prev;
      const newContent = JSON.parse(JSON.stringify(prev));
      let current = newContent;
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      current.splice(index, 1);
      return newContent;
    });
  };
  const extractVideoId = (input: string): string => {
    if (!input) return '';
    input = input.trim();
    if (!/[/:?=&]/.test(input)) {
      return input;
    }
    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];
    for (const pattern of youtubePatterns) {
      const match = input.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    const vimeoPattern = /vimeo\.com\/(\d+)/;
    const vimeoMatch = input.match(vimeoPattern);
    if (vimeoMatch && vimeoMatch[1]) {
      return vimeoMatch[1];
    }
    return input;
  };
  const updateVideoUrl = (path: string[], value: string) => {
    const videoId = extractVideoId(value);
    updateValue(path, videoId);
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Content Management System</h1>
          <p className="text-muted-foreground">Manage prices, FAQs, and course content for Skydive Tønsberg</p>
          <p className="text-sm text-muted-foreground mt-1">💡 Changes are applied immediately to the live website after saving</p>
        </div>
        {message && (
          <div className={`mb-4 p-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        <div className="mb-6 flex gap-4 sticky top-4 z-10 bg-background pb-4">
          <Button onClick={handleSave} disabled={saving} size="lg">
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
          <Button onClick={fetchContent} variant="outline" size="lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload
          </Button>
        </div>
        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="course">Course</TabsTrigger>
            <TabsTrigger value="tandem-req">Tandem</TabsTrigger>
            <TabsTrigger value="bunkhouse">Bunkhouse</TabsTrigger>
          </TabsList>
          {}
          <TabsContent value="pricing" className="space-y-6">
            <Tabs defaultValue="tandem-pricing" className="w-full">
              <TabsList>
                <TabsTrigger value="tandem-pricing">Tandem</TabsTrigger>
                <TabsTrigger value="kurs-pricing">Kurs</TabsTrigger>
                <TabsTrigger value="jumps">Jumps</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
              <TabsContent value="tandem-pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tandem Prices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tandem-weekday">Weekday Price (NOK)</Label>
                        <Input
                          id="tandem-weekday"
                          type="number"
                          value={Number(content?.pricing?.tandem?.weekday) || 0}
                          onChange={(e) => updateValue(['pricing', 'tandem', 'weekday'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tandem-weekend">Weekend Price (NOK)</Label>
                        <Input
                          id="tandem-weekend"
                          type="number"
                          value={Number(content?.pricing?.tandem?.weekend) || 0}
                          onChange={(e) => updateValue(['pricing', 'tandem', 'weekday'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tandem-video">Video Only (NOK)</Label>
                        <Input
                          id="tandem-video"
                          type="number"
                          value={(content?.pricing?.tandem?.video as number | undefined) || 0}
                          onChange={(e) => updateValue(['pricing', 'tandem', 'video'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tandem-videophoto">Video + Photos (NOK)</Label>
                        <Input
                          id="tandem-videophoto"
                          type="number"
                          value={(content?.pricing?.tandem?.videoPhotos as number | undefined) || 0}
                          onChange={(e) => updateValue(['pricing', 'tandem', 'videoPhotos'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tandem-fullpackage">Full Package (NOK)</Label>
                        <Input
                          id="tandem-fullpackage"
                          type="number"
                          value={(content?.pricing?.tandem?.fullPackage as number | undefined) || 0}
                          onChange={(e) => updateValue(['pricing', 'tandem', 'fullPackage'], Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="kurs-pricing">
                <Card>
                  <CardHeader>
                    <CardTitle>AFF Course Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="aff-course">AFF Course Price (NOK)</Label>
                      <Input
                        id="aff-course"
                        type="number"
                        value={(content?.pricing?.kurs?.affCourse as number | undefined) || 0}
                        onChange={(e) => updateValue(['pricing', 'kurs', 'affCourse'], Number(e.target.value))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="jumps" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Jump Prices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Normal Jump (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.jumps?.normal || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'jumps', 'normal'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Hopperdeal (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.jumps?.deal || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'jumps', 'deal'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Hopperdeal Deposit (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.jumps?.dealDeposit || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'jumps', 'dealDeposit'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Storhopperdeal (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.jumps?.bigDeal || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'jumps', 'bigDeal'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Storhopperdeal Deposit (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.jumps?.bigDealDeposit || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'jumps', 'bigDealDeposit'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>High Altitude Surcharge (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.jumps?.highAltitude || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'jumps', 'highAltitude'], Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3">Registration Fees</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Annual (NOK)</Label>
                          <Input
                            type="number"
                            value={content?.pricing?.forHoppere?.registration?.annual || 0}
                            onChange={(e) => updateValue(['pricing', 'forHoppere', 'registration', 'annual'], Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Annual Veteran/Student (NOK)</Label>
                          <Input
                            type="number"
                            value={content?.pricing?.forHoppere?.registration?.annualVeteran || 0}
                            onChange={(e) => updateValue(['pricing', 'forHoppere', 'registration', 'annualVeteran'], Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Day Fee (NOK)</Label>
                          <Input
                            type="number"
                            value={content?.pricing?.forHoppere?.registration?.day || 0}
                            onChange={(e) => updateValue(['pricing', 'forHoppere', 'registration', 'day'], Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Weekend Fee (NOK)</Label>
                          <Input
                            type="number"
                            value={content?.pricing?.forHoppere?.registration?.weekend || 0}
                            onChange={(e) => updateValue(['pricing', 'forHoppere', 'registration', 'weekend'], Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Week Fee (NOK)</Label>
                          <Input
                            type="number"
                            value={content?.pricing?.forHoppere?.registration?.week || 0}
                            onChange={(e) => updateValue(['pricing', 'forHoppere', 'registration', 'week'], Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="equipment">
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Rental</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Rental Rig (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.equipment?.rentalRig || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'equipment', 'rentalRig'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Student Rig (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.equipment?.studentRig || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'equipment', 'studentRig'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Altimeter (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.equipment?.altimeter || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'equipment', 'altimeter'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Packing (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.equipment?.packing || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'equipment', 'packing'], Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Course & Training Prices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>AFF Course (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.courses?.affCourse || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'courses', 'affCourse'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Rejump Level 1-3 (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.courses?.rejump13 || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'courses', 'rejump13'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Rejump Level 4-7 (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.courses?.rejump47 || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'courses', 'rejump47'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Level 8 (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.courses?.level8 || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'courses', 'level8'], Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Checkout Jump (NOK)</Label>
                        <Input
                          type="number"
                          value={content?.pricing?.forHoppere?.courses?.checkoutJump || 0}
                          onChange={(e) => updateValue(['pricing', 'forHoppere', 'courses', 'checkoutJump'], Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3">Miscellaneous</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>TøFSK Membership (NOK)</Label>
                          <Input
                            type="number"
                            value={content?.pricing?.forHoppere?.misc?.tofskMembership || 0}
                            onChange={(e) => updateValue(['pricing', 'forHoppere', 'misc', 'tofskMembership'], Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Burble Withdrawal (NOK)</Label>
                          <Input
                            type="number"
                            value={content?.pricing?.forHoppere?.misc?.burbleWithdrawal || 0}
                            onChange={(e) => updateValue(['pricing', 'forHoppere', 'misc', 'burbleWithdrawal'], Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Recruiter Reward</Label>
                          <Input
                            type="text"
                            value={content?.pricing?.forHoppere?.misc?.recruiterReward || ""}
                            onChange={(e) => updateValue(['pricing', 'forHoppere', 'misc', 'recruiterReward'], e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Family Discount (NOK)</Label>
                          <Input
                            type="number"
                            value={content?.pricing?.forHoppere?.misc?.familyDiscount || 0}
                            onChange={(e) => updateValue(['pricing', 'forHoppere', 'misc', 'familyDiscount'], Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
          {}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video URLs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
                    <strong>ℹ️ How to use:</strong>
                  </p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-4">
                    <li>• Paste the full YouTube URL or just the video ID</li>
                    <li>• System automatically extracts the video ID</li>
                    <li>• Works with YouTube and Vimeo URLs</li>
                    <li>• Leave empty to hide the video section</li>
                  </ul>
                </div>
                <div>
                  <Label htmlFor="tandem-video">Tandem Page Video URL or ID</Label>
                  <Input
                    id="tandem-video"
                    type="text"
                    value={content?.tandem?.videoUrl || ""}
                    onChange={(e) => updateVideoUrl(['tandem', 'videoUrl'], e.target.value)}
                    placeholder="olKR6xCSB7M or https://www.youtube.com/watch?v=olKR6xCSB7M"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {content?.tandem?.videoUrl ? `✓ Video ID extracted: ${content.tandem.videoUrl}` : 'Paste full YouTube URL or just the video ID'}
                  </p>
                </div>
                <div>
                  <Label htmlFor="course-video">Course Page Video URL or ID</Label>
                  <Input
                    id="course-video"
                    type="text"
                    value={content?.course?.videoUrl || ""}
                    onChange={(e) => updateVideoUrl(['course', 'videoUrl'], e.target.value)}
                    placeholder="olKR6xCSB7M or https://www.youtube.com/watch?v=olKR6xCSB7M"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {content?.course?.videoUrl ? `✓ Video ID extracted: ${content.course.videoUrl}` : 'Paste full YouTube URL or just the video ID'}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Preview URLs:</strong>
                  </p>
                  {content?.tandem?.videoUrl && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Tandem: {`https://youtube.com/watch?v=${content.tandem.videoUrl}`}
                    </p>
                  )}
                  {content?.course?.videoUrl && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Course: {`https://youtube.com/watch?v=${content.course.videoUrl}`}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {}
          <TabsContent value="images" className="space-y-6">
            <Tabs defaultValue="tandem-images" className="w-full">
              <TabsList>
                <TabsTrigger value="tandem-images">Tandem Images</TabsTrigger>
                <TabsTrigger value="course-images">Course Images</TabsTrigger>
              </TabsList>
              {}
              <TabsContent value="tandem-images" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tandem Page Images</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
                        <strong>📸 Image Upload Instructions:</strong>
                      </p>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-4">
                        <li>• Click &quot;Upload New Image&quot; to select a photo from your computer</li>
                        <li>• Accepted formats: JPEG, PNG, WebP (WebP recommended for best performance)</li>
                        <li>• Maximum file size: 10MB</li>
                        <li>• Recommended sizes: Hero 1920x1080px, Gallery Wide 1600x900px, Rectangular 1200x1600px, Square 800x800px</li>
                        <li>• Click &quot;Save All Changes&quot; at the bottom after uploading</li>
                      </ul>
                    </div>
                    <div className="grid gap-6">
                      <ImageUpload
                        label="Hero Photo (Main Banner Image)"
                        currentImage={content?.tandem?.images?.heroPhoto || "/tandem-hero-photo.webp"}
                        imageName="tandem-hero-photo"
                        onImageUpdate={(path) => updateValue(['tandem', 'images', 'heroPhoto'], path)}
                        helperText="Appears right after pricing section • 1920x1080px recommended"
                      />
                      <div className="border-t pt-4 mt-2">
                        <h4 className="font-semibold mb-4 text-lg">Gallery Images</h4>
                        <div className="space-y-6">
                          <ImageUpload
                            label="Wide Image 1"
                            currentImage={content?.tandem?.images?.galleryWide1 || "/tandem-gallery-wide-1.webp"}
                            imageName="tandem-gallery-wide-1"
                            onImageUpdate={(path) => updateValue(['tandem', 'images', 'galleryWide1'], path)}
                            helperText="Full-width landscape photo • 1600x900px recommended"
                          />
                          <div className="grid md:grid-cols-2 gap-6">
                            <ImageUpload
                              label="Rectangular Image 1"
                              currentImage={content?.tandem?.images?.galleryRect1 || "/tandem-gallery-rect-1.webp"}
                              imageName="tandem-gallery-rect-1"
                              onImageUpdate={(path) => updateValue(['tandem', 'images', 'galleryRect1'], path)}
                              helperText="Tall portrait photo (left) • 1200x1600px"
                            />
                            <ImageUpload
                              label="Rectangular Image 2"
                              currentImage={content?.tandem?.images?.galleryRect2 || "/tandem-gallery-rect-2.webp"}
                              imageName="tandem-gallery-rect-2"
                              onImageUpdate={(path) => updateValue(['tandem', 'images', 'galleryRect2'], path)}
                              helperText="Tall portrait photo (right) • 1200x1600px"
                            />
                          </div>
                          <div className="grid md:grid-cols-3 gap-4">
                            <ImageUpload
                              label="Square Image 1"
                              currentImage={content?.tandem?.images?.gallerySquare1 || "/tandem-gallery-square-1.webp"}
                              imageName="tandem-gallery-square-1"
                              onImageUpdate={(path) => updateValue(['tandem', 'images', 'gallerySquare1'], path)}
                              helperText="Square photo (left) • 800x800px"
                            />
                            <ImageUpload
                              label="Square Image 2"
                              currentImage={content?.tandem?.images?.gallerySquare2 || "/tandem-gallery-square-2.webp"}
                              imageName="tandem-gallery-square-2"
                              onImageUpdate={(path) => updateValue(['tandem', 'images', 'gallerySquare2'], path)}
                              helperText="Square photo (center) • 800x800px"
                            />
                            <ImageUpload
                              label="Square Image 3"
                              currentImage={content?.tandem?.images?.gallerySquare3 || "/tandem-gallery-square-3.webp"}
                              imageName="tandem-gallery-square-3"
                              onImageUpdate={(path) => updateValue(['tandem', 'images', 'gallerySquare3'], path)}
                              helperText="Square photo (right) • 800x800px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {}
              <TabsContent value="course-images" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AFF Course Page Images</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
                        <strong>📸 Image Upload Instructions:</strong>
                      </p>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-4">
                        <li>• Click &quot;Upload New Image&quot; to select photos directly from your computer</li>
                        <li>• Accepted formats: JPEG, PNG, WebP (WebP recommended)</li>
                        <li>• Maximum file size: 10MB per image</li>
                        <li>• Click &quot;Save All Changes&quot; at the bottom when done</li>
                      </ul>
                    </div>
                    <div className="grid gap-6">
                      <ImageUpload
                        label="Hero Photo"
                        currentImage={content?.course?.images?.heroPhoto || "/aff-course-hero-photo.webp"}
                        imageName="aff-course-hero-photo"
                        onImageUpdate={(path) => updateValue(['course', 'images', 'heroPhoto'], path)}
                        helperText="Main banner after booking CTA • 1920x1080px recommended"
                      />
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-4 text-lg">Section Images</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <ImageUpload
                            label="Classroom Photo"
                            currentImage={content?.course?.images?.classroom || "/course-classroom.webp"}
                            imageName="course-classroom"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'classroom'], path)}
                            helperText="Theory/ground school section"
                          />
                          <ImageUpload
                            label="Student In Action"
                            currentImage={content?.course?.images?.studentInAction || "/aff-student.webp"}
                            imageName="aff-student"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'studentInAction'], path)}
                            helperText="Student during training"
                          />
                          <ImageUpload
                            label="Registration Photo"
                            currentImage={content?.course?.images?.registration || "/course-registration.webp"}
                            imageName="course-registration"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'registration'], path)}
                            helperText="Sign-up/registration section"
                          />
                          <ImageUpload
                            label="Freefall Progression"
                            currentImage={content?.course?.images?.freefallProgression || "/aff-freefall-progression.webp"}
                            imageName="aff-freefall-progression"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'freefallProgression'], path)}
                            helperText="Progression section image"
                          />
                          <ImageUpload
                            label="Solo Student"
                            currentImage={content?.course?.images?.soloStudent || "/aff-solo-student.webp"}
                            imageName="aff-solo-student"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'soloStudent'], path)}
                            helperText="Independent jumping section"
                          />
                          <ImageUpload
                            label="Instructor Coaching"
                            currentImage={content?.course?.images?.instructorCoaching || "/aff-instructor-coaching.webp"}
                            imageName="aff-instructor-coaching"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'instructorCoaching'], path)}
                            helperText="Coaching/instruction section"
                          />
                          <ImageUpload
                            label="Packing Course"
                            currentImage={content?.course?.images?.packingCourse || "/packing-course.webp"}
                            imageName="packing-course"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'packingCourse'], path)}
                            helperText="Packing training section"
                          />
                          <ImageUpload
                            label="License Celebration"
                            currentImage={content?.course?.images?.licenseCelebration || "/a-license-celebration.webp"}
                            imageName="a-license-celebration"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'licenseCelebration'], path)}
                            helperText="A-license achievement section"
                          />
                        </div>
                      </div>
                      <div className="border-t pt-4 mt-2">
                        <h4 className="font-semibold mb-4 text-lg">Gallery Images</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <ImageUpload
                            label="Group Photo 1"
                            currentImage={content?.course?.images?.groupPhoto1 || "/course-group-1.webp"}
                            imageName="course-group-1"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'groupPhoto1'], path)}
                            helperText="Course group photo"
                          />
                          <ImageUpload
                            label="Group Photo 2"
                            currentImage={content?.course?.images?.groupPhoto2 || "/course-group-2.webp"}
                            imageName="course-group-2"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'groupPhoto2'], path)}
                            helperText="Course group photo"
                          />
                          <ImageUpload
                            label="Group Photo 3"
                            currentImage={content?.course?.images?.groupPhoto3 || "/course-group-3.webp"}
                            imageName="course-group-3"
                            onImageUpdate={(path) => updateValue(['course', 'images', 'groupPhoto3'], path)}
                            helperText="Course group photo"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
          {}
          <TabsContent value="bunkhouse">
            <Card>
              <CardHeader>
                <CardTitle>Bunkhouse Prices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>3-Man Room (NOK/night)</Label>
                    <Input
                      type="number"
                      value={content?.pricing?.forHoppere?.bunkhouse?.threeMan || 0}
                      onChange={(e) => updateValue(['pricing', 'forHoppere', 'bunkhouse', 'threeMan'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Double Room Single (NOK/night)</Label>
                    <Input
                      type="number"
                      value={content?.pricing?.forHoppere?.bunkhouse?.doubleSingle || 0}
                      onChange={(e) => updateValue(['pricing', 'forHoppere', 'bunkhouse', 'doubleSingle'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Double Room Two People (NOK/night)</Label>
                    <Input
                      type="number"
                      value={content?.pricing?.forHoppere?.bunkhouse?.doubleTwo || 0}
                      onChange={(e) => updateValue(['pricing', 'forHoppere', 'bunkhouse', 'doubleTwo'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Bedding & Laundry (NOK)</Label>
                    <Input
                      type="number"
                      value={content?.pricing?.forHoppere?.bunkhouse?.bedding || 0}
                      onChange={(e) => updateValue(['pricing', 'forHoppere', 'bunkhouse', 'bedding'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>RV with Power (NOK/day)</Label>
                    <Input
                      type="number"
                      value={content?.pricing?.forHoppere?.bunkhouse?.rvPower || 0}
                      onChange={(e) => updateValue(['pricing', 'forHoppere', 'bunkhouse', 'rvPower'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>RV with Power (NOK/week)</Label>
                    <Input
                      type="number"
                      value={content?.pricing?.forHoppere?.bunkhouse?.rvPowerWeek || 0}
                      onChange={(e) => updateValue(['pricing', 'forHoppere', 'bunkhouse', 'rvPowerWeek'], Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Tent/Car No Power (NOK/day)</Label>
                    <Input
                      type="number"
                      value={content?.pricing?.forHoppere?.bunkhouse?.tentNoPower || 0}
                      onChange={(e) => updateValue(['pricing', 'forHoppere', 'bunkhouse', 'tentNoPower'], Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {}
          <TabsContent value="faqs" className="space-y-6">
            <Tabs defaultValue="home-faq" className="w-full">
              <TabsList>
                <TabsTrigger value="home-faq">Home</TabsTrigger>
                <TabsTrigger value="tandem-faq">Tandem</TabsTrigger>
                <TabsTrigger value="kurs-faq">Kurs</TabsTrigger>
                <TabsTrigger value="forhoppere-faq">For Hoppere</TabsTrigger>
              </TabsList>
              {['home', 'tandem', 'kurs', 'forHoppere'].map((page) => (
                <TabsContent key={page} value={`${page === 'forHoppere' ? 'forhoppere' : page}-faq`} className="space-y-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="capitalize">{page === 'forHoppere' ? 'For Hoppere' : page} FAQs</CardTitle>
                      <Button onClick={() => addFAQ(page)} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add FAQ
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {content?.faqs?.[page]?.map((faq: FAQ, index: number) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3 relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeFAQ(page, index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <div>
                            <Label>Question {index + 1}</Label>
                            <Input
                              value={faq.question}
                              onChange={(e) => updateFAQ(page, index, 'question', e.target.value)}
                              placeholder="Enter question..."
                            />
                          </div>
                          <div>
                            <Label>Answer</Label>
                            <Textarea
                              value={faq.answer}
                              onChange={(e) => updateFAQ(page, index, 'answer', e.target.value)}
                              placeholder="Enter answer..."
                              rows={4}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
          {}
          <TabsContent value="course" className="space-y-6">
            {}
            <Card>
              <CardHeader>
                <CardTitle>Course Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {['groundSchool', 'windTunnel', 'level13', 'level47'].map((module) => (
                  <div key={module} className="p-4 border rounded-lg space-y-3">
                    <h4 className="font-semibold capitalize">{module.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={(content?.course?.modules as Record<string, Record<string, string>> | undefined)?.[module]?.title || ""}
                        onChange={(e) => updateValue(['course', 'modules', module, 'title'], e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={(content?.course?.modules as Record<string, Record<string, string>> | undefined)?.[module]?.description || ""}
                        onChange={(e) => updateValue(['course', 'modules', module, 'description'], e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input
                        value={(content?.course?.modules as Record<string, Record<string, string>> | undefined)?.[module]?.duration || ""}
                        onChange={(e) => updateValue(['course', 'modules', module, 'duration'], e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            {}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Included in Course</CardTitle>
                <Button onClick={() => addArrayItem(['course', 'included'])} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {((content?.course?.included as string[] | undefined) || []).map((item: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem(['course', 'included'], index, e.target.value)}
                      placeholder="Enter included item..."
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem(['course', 'included'], index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            {}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Course Requirements</CardTitle>
                <Button onClick={() => addArrayItem(['course', 'requirements'])} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Requirement
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {((content?.course?.requirements as string[] | undefined) || []).map((item: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem(['course', 'requirements'], index, e.target.value)}
                      placeholder="Enter requirement..."
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem(['course', 'requirements'], index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          {}
          <TabsContent value="tandem-req">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tandem Requirements</CardTitle>
                <Button onClick={() => addArrayItem(['tandem', 'requirements'])} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Requirement
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {((content?.tandem?.requirements as string[] | undefined) || []).map((item: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem(['tandem', 'requirements'], index, e.target.value)}
                      placeholder="Enter requirement..."
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem(['tandem', 'requirements'], index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-8">
          <Button onClick={handleSave} disabled={saving} size="lg" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
