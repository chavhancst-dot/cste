==========================================================
 CST INSTITUTE WEBSITE — SETUP GUIDE (5 EASY STEPS)
==========================================================

STEP 1 — ADD YOUR REAL CONTACT DETAILS
  Open any HTML file in Notepad / VS Code and use Find & Replace
  (Ctrl+H) across ALL files:
    • Replace  91XXXXXXXXXX      → your WhatsApp number (digits only, e.g. 919812345678)
    • Replace  +91XXXXXXXXXX     → your phone with country code (e.g. +919812345678)
    • Replace  +91 XXXXX XXXXX   → your phone as displayed (e.g. +91 98123 45678)
    • Replace  info@cstinstitute.in → your real email
    • Replace the address line "Near Main Road, Bhusawal..." → your full address
  (All enquiry forms send messages to the WhatsApp number automatically.)

STEP 2 — ADD YOUR GOOGLE MAP
  Google Maps → search your institute → Share → "Embed a map" →
  copy the src URL and replace the maps URL in index.html & contact.html.

STEP 3 — ADD REAL PHOTOS
  In gallery.html and index.html, replace the coloured placeholder
  boxes (<div class="ph ...">) with:  <img src="assets/photos/lab-1.jpg" alt="Computer lab">
  Put your photos inside assets/photos/.

STEP 4 — HOSTING (make it live)
  Easiest options:
    • Netlify.com / Vercel.com — free: drag & drop this whole folder → live in 1 minute.
    • Hostinger / GoDaddy shared hosting — upload all files via File Manager.
  Buy a domain like cstinstitutebhusawal.in and connect it.
  Then replace YOURDOMAIN.in inside sitemap.xml and robots.txt.

STEP 5 — GET ENQUIRIES FLOWING
  • Create/claim your Google Business Profile and add the website link.
  • Submit sitemap.xml in Google Search Console (free) for Google ranking.
  • Put the website link in your WhatsApp status, Instagram bio and pamphlets.
  • Update fees/batches anytime by editing the HTML text.

FILES:
  index.html ......... Home            mscit.html ........ MS-CIT page
  about.html ......... About Us        programming.html .. Programming courses
  courses.html ....... All courses     job-oriented.html . Job-oriented courses
  placements.html .... Placements      gallery.html ...... Gallery
  testimonials.html .. Reviews         admissions.html ... Admissions + form
  blog.html .......... Blog            faq.html .......... 35+ FAQs
  contact.html ....... Contact + map   privacy.html / terms.html
  assets/style.css ... all design      assets/main.js .... all effects
==========================================================
