# Styling Consistency Guide

This document explains how to ensure mobile styling is consistent between localhost and Vercel deployment.

## Testing Production Build Locally

To test the production build locally (which matches Vercel):

```bash
# Build and preview production version
npm run build:preview

# Or separately:
npm run build
npm run preview
```

The preview server will start on `http://localhost:4173` and will be accessible on your network at `http://YOUR_IP:4173` for mobile testing.

## Key Configuration for Consistency

### 1. Vite Build Configuration
- `cssCodeSplit: false` - Keeps all CSS in one file (prevents loading order issues)
- `minify: 'esbuild'` - Uses esbuild for consistent minification
- `cssTarget: 'chrome80'` - Targets modern browsers for consistent CSS output
- `base: '/'` - Ensures correct asset paths

### 2. HTML Meta Tags
- Viewport meta tag is identical in both environments
- Mobile web app capabilities are set
- Font preloading is configured

### 3. CSS Reset
- Added comprehensive CSS reset for consistent baseline
- Prevents browser-specific differences
- Ensures consistent box-sizing and margins

### 4. Font Loading
- Google Fonts are loaded via CDN (same in both environments)
- Fonts are preloaded in HTML for faster loading
- Fallback fonts are specified

## Common Issues and Solutions

### Issue: Styles look different on Vercel
**Solution:**
1. Clear browser cache on mobile device
2. Test using `npm run preview` to match production build
3. Check if CSS file is loading correctly (Network tab)

### Issue: Fonts not loading
**Solution:**
1. Verify Google Fonts CDN is accessible
2. Check font preload links in HTML
3. Ensure fonts are loaded before content renders

### Issue: Mobile viewport issues
**Solution:**
1. Verify viewport meta tag is correct
2. Check for `-webkit-text-size-adjust: 100%` in CSS
3. Ensure no conflicting viewport settings

### Issue: Touch interactions not working
**Solution:**
1. Verify `touch-action: manipulation` is set
2. Check `pointer-events` are not blocked
3. Ensure minimum touch target size (44px)

## Testing Checklist

Before deploying to Vercel, test locally with production build:

- [ ] Build production version: `npm run build`
- [ ] Preview production build: `npm run preview`
- [ ] Test on mobile device via network IP
- [ ] Verify all fonts load correctly
- [ ] Check all images display properly
- [ ] Test touch interactions (buttons, inputs)
- [ ] Verify responsive breakpoints work
- [ ] Check viewport scaling
- [ ] Test on different mobile browsers (Safari, Chrome)

## Deployment Verification

After deploying to Vercel:

1. **Clear cache** on mobile device
2. **Test on real device** (not just emulator)
3. **Compare side-by-side** with localhost preview
4. **Check Network tab** for failed resources
5. **Verify console** for any errors

## Notes

- The production build (`npm run build`) creates optimized files in `dist/`
- The preview server (`npm run preview`) serves these files exactly as Vercel would
- Any differences between preview and Vercel are usually due to:
  - CDN caching
  - Different server headers
  - Network latency

If styles still differ after following this guide, check:
1. Vercel build logs for warnings
2. Browser console for CSS loading errors
3. Network tab for failed resource requests

