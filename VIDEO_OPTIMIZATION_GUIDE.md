# Video Optimization Guide

## 📹 Videos to Compress

You need to create **8 video files** total (4 desktop + 4 mobile versions):

### Expected File Sizes
- **Desktop versions**: 2-4 MB each (1920px width)
- **Mobile versions**: 500KB - 1.5 MB each (1280px width)

### Required Files

#### 1. Homepage Hero
```bash
# Desktop (1920px)
ffmpeg -i herovideo.webm -ss 00:00:00 -t 10 -c:v libvpx-vp9 -crf 33 -b:v 0 -an -vf "scale=1920:-2:flags=lanczos" -row-mt 1 -threads 4 public/herovideo-optimized.webm

# Mobile (1280px)
ffmpeg -i herovideo.webm -ss 00:00:00 -t 10 -c:v libvpx-vp9 -crf 40 -b:v 0 -an -vf "scale=1280:-2:flags=lanczos" -row-mt 1 -threads 4 public/herovideo-mobile.webm
```

#### 2. Tandem Page
```bash
# Desktop
ffmpeg -i tandemhopp.webm -ss 00:00:00 -t 10 -c:v libvpx-vp9 -crf 33 -b:v 0 -an -vf "scale=1920:-2:flags=lanczos" -row-mt 1 -threads 4 public/tandemhopp-optimized.webm

# Mobile
ffmpeg -i tandemhopp.webm -ss 00:00:00 -t 10 -c:v libvpx-vp9 -crf 40 -b:v 0 -an -vf "scale=1280:-2:flags=lanczos" -row-mt 1 -threads 4 public/tandemhopp-mobile.webm
```

#### 3. Kurs Page
```bash
# Desktop
ffmpeg -i kurs-hero.webm -ss 00:00:00 -t 10 -c:v libvpx-vp9 -crf 33 -b:v 0 -an -vf "scale=1920:-2:flags=lanczos" -row-mt 1 -threads 4 public/kurs-hero-optimized.webm

# Mobile
ffmpeg -i kurs-hero.webm -ss 00:00:00 -t 10 -c:v libvpx-vp9 -crf 40 -b:v 0 -an -vf "scale=1280:-2:flags=lanczos" -row-mt 1 -threads 4 public/kurs-hero-mobile.webm
```

#### 4. For Hoppere Page
```bash
# Desktop
ffmpeg -i for-hoppere.webm -ss 00:00:00 -t 10 -c:v libvpx-vp9 -crf 33 -b:v 0 -an -vf "scale=1920:-2:flags=lanczos" -row-mt 1 -threads 4 public/for-hoppere-optimized.webm

# Mobile
ffmpeg -i for-hoppere.webm -ss 00:00:00 -t 10 -c:v libvpx-vp9 -crf 40 -b:v 0 -an -vf "scale=1280:-2:flags=lanczos" -row-mt 1 -threads 4 public/for-hoppere-mobile.webm
```

## ⚙️ Command Parameters Explained

- `-ss 00:00:00` = Start time (change if you want a different segment)
- `-t 10` = Duration in seconds (10-12 seconds recommended)
- `-crf 33` = Quality (lower = better, 30-35 for desktop, 38-42 for mobile)
- `-an` = Remove audio (not needed for background videos)
- `scale=1920:-2` = Resize to width, maintain aspect ratio
- `-row-mt 1 -threads 4` = Multi-threading for faster encoding

## 📊 What Was Changed in the Code

### New Component: `src/components/ui/hero-video.tsx`
- Lazy loads videos when not on homepage
- Serves different videos for mobile/desktop
- Uses Intersection Observer for performance

### Updated Files:
1. ✅ `src/components/sections/Hero.tsx` - Homepage hero (priority load)
2. ✅ `src/app/tandem/TandemContent.tsx` - Tandem page hero (lazy load)
3. ✅ `src/app/kurs/KursContent.tsx` - Kurs page hero (lazy load)
4. ✅ `src/app/for-hoppere/ForHoppereContent.tsx` - For Hoppere hero (lazy load)
5. ✅ `src/app/layout.tsx` - Added video preload tags

## 🎯 Benefits

### Performance Gains:
- **60-70 MB → 2-4 MB** per desktop video (95% reduction!)
- **Mobile videos**: 500KB - 1.5 MB (even better on slow connections)
- Lazy loading on secondary pages = faster initial page load
- Responsive videos = mobile users get smaller files
- Preloading on homepage = better LCP score

### Expected Results:
- Initial page load: **~5 MB** (vs 60-70 MB before)
- Lighthouse Performance: **80-90+** (vs ~30-40 before)
- Mobile experience: **Drastically improved**

## 🚀 Next Steps

1. **Trim your videos** to the best 10-12 seconds
2. **Run the FFmpeg commands** above
3. **Verify file sizes** are in the target range
4. **Test locally** - videos should autoplay and loop smoothly
5. **Commit and deploy** when satisfied

## 🔍 Testing Checklist

- [ ] All 8 video files created and in `public/` folder
- [ ] File sizes under 4 MB (desktop) and 1.5 MB (mobile)
- [ ] Videos play smoothly on localhost
- [ ] Mobile responsive switching works (test on phone)
- [ ] Lazy loading works (videos only load when section is visible)
- [ ] Homepage video preloads correctly

## 💡 Tips

- Pick the most visually interesting 10 seconds of each video
- Test on actual mobile device, not just browser DevTools
- If videos still seem large, increase CRF value (35-38 for desktop, 42-45 for mobile)
- Keep the original videos backed up before deleting them

