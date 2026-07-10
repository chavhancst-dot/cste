# CST Institute Website — GitHub → VPS Auto-Deploy

Every time you push to the `main` branch, GitHub Actions automatically copies
the website to your VPS and reloads Nginx. Edit → push → live in ~30 seconds.

---

## ONE-TIME SETUP (do these 5 steps once)

### Step 1 — Prepare the VPS
SSH into your VPS and run the included setup script:

```bash
ssh root@YOUR_VPS_IP
# copy deploy/vps-setup.sh to the VPS first (or paste its contents into a file), then:
bash vps-setup.sh yourdomain.in
```

This installs Nginx, opens the firewall, creates `/var/www/cst-institute`,
and configures the web server for your domain.

### Step 2 — Create an SSH key for GitHub (on your local computer)

```bash
ssh-keygen -t ed25519 -f cst_deploy_key -N ""
```

This creates two files:
- `cst_deploy_key`      → PRIVATE key (goes into GitHub secrets)
- `cst_deploy_key.pub`  → PUBLIC key (goes onto the VPS)

Install the public key on the VPS:

```bash
ssh-copy-id -i cst_deploy_key.pub root@YOUR_VPS_IP
# or manually: append the .pub contents to ~/.ssh/authorized_keys on the VPS
```

Test it works without a password:
```bash
ssh -i cst_deploy_key root@YOUR_VPS_IP "echo connected OK"
```

### Step 3 — Create the GitHub repository and push this folder

```bash
git init
git add .
git commit -m "CST Institute website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cst-website.git
git push -u origin main
```

(The first push will trigger the workflow, but it will FAIL until Step 4 —
that's expected.)

### Step 4 — Add the three secrets in GitHub

Repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret name   | Value                                              |
|---------------|----------------------------------------------------|
| `VPS_HOST`    | your VPS IP address (e.g. `203.0.113.10`)          |
| `VPS_USER`    | `root` (or your VPS username)                      |
| `VPS_SSH_KEY` | the FULL contents of the `cst_deploy_key` PRIVATE file (including the BEGIN/END lines) |

### Step 5 — Run the first deployment

Repo → **Actions** tab → select "Deploy CST Website to VPS" → **Run workflow**.
Green tick = your site is live at `http://YOUR_VPS_IP` (and your domain once
DNS points to the VPS).

Then add free HTTPS on the VPS:
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.in -d www.yourdomain.in
```

---

## EVERYDAY USE (updating the website)

```bash
# edit any HTML file, then:
git add .
git commit -m "Updated fees / added photos"
git push
```

Or edit files directly on github.com (pencil icon) and commit — either way,
the Actions workflow deploys automatically. Check the **Actions** tab for the
green tick.

---

## BEFORE GOING LIVE — checklist

- [ ] Find & Replace `91XXXXXXXXXX`, `+91XXXXXXXXXX`, `+91 XXXXX XXXXX`
      with your real phone/WhatsApp numbers (all HTML files)
- [ ] Replace `info@cstinstitute.in` and the address with real details
- [ ] Replace `YOURDOMAIN.in` in `sitemap.xml` and `robots.txt`
- [ ] Replace the Google Maps embed with your exact business location
- [ ] Add real photos in `assets/photos/` and update gallery.html
- [ ] Replace sample statistics/testimonials with your genuine ones
- [ ] Test the WhatsApp enquiry form from a mobile phone
- [ ] Submit sitemap in Google Search Console

## Troubleshooting

- **Action fails at "Copy website files"** → check the three secrets, and that
  the private key includes the BEGIN/END lines with no extra spaces.
- **"Permission denied (publickey)"** → the public key isn't on the VPS; redo
  `ssh-copy-id` from Step 2.
- **Site shows Nginx welcome page** → the default site wasn't removed; run
  `rm /etc/nginx/sites-enabled/default && systemctl reload nginx`.
- **Domain not opening** → DNS not propagated yet; test with the IP first.
