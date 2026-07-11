/* ============================================================
   ⭐ ADMIN CONFIG — CST Institute Website
   ============================================================
   This is the ONLY file you need to edit to change contact
   details across ALL pages of the website.

   HOW TO UPDATE:
   1. Edit the values below (keep the quotes "...").
   2. Save → commit → push to GitHub (or edit directly on
      github.com with the pencil icon and press "Commit changes").
   3. The site updates automatically in ~30 seconds.
   ============================================================ */

window.SITE = {

  /* ------------------------------------------------------------
     GUARANTEED ENQUIRY DELIVERY (email backup) — Web3Forms key.
     Why: WhatsApp needs the student to press "Send". With this key,
     every form submission is ALSO emailed to you instantly, even
     if the student never sends the WhatsApp message.
     How to get your free key (2 minutes):
       1. Go to https://web3forms.com
       2. Enter your institute email → Create Access Key
       3. Copy the key from your email and paste it below.
     Example: web3formsKey: "a1b2c3d4-1111-2222-3333-abcdef123456"
     Leave "" to disable email backup (WhatsApp-only mode). */
  web3formsKey: "",

  /* WhatsApp number — digits only, with country code, NO + sign.
     Example: "919812345678"
     Used by: floating WhatsApp button, all enquiry forms,
     every "WhatsApp Us" button on the site. */
  waNumber: "91XXXXXXXXXX",

  /* Phone number as DISPLAYED on the website.
     Example: "+91 98123 45678" */
  phoneDisplay: "+91 XXXXX XXXXX",

  /* Phone number for click-to-call links — no spaces.
     Example: "+919812345678" */
  phoneLink: "+91XXXXXXXXXX",

  /* Institute email address */
  email: "info@cstinstitute.in",

  /* Full address shown in footer & contact page */
  address: "CST Institute, Near Main Road, Bhusawal, Dist. Jalgaon, Maharashtra – 425201",

  /* Google Maps embed URL.
     How to get yours: Google Maps → search your institute →
     Share → "Embed a map" → copy ONLY the src="..." URL. */
  mapEmbed: "https://www.google.com/maps?q=Bhusawal,+Maharashtra&output=embed"

};
