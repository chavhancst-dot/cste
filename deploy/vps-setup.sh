#!/bin/bash
# ============================================================
#  CST Institute — ONE-TIME VPS SETUP (run this on the VPS)
#  Usage:  bash vps-setup.sh yourdomain.in
# ============================================================
set -e

DOMAIN=${1:-}
if [ -z "$DOMAIN" ]; then
  echo "Usage: bash vps-setup.sh yourdomain.in"
  exit 1
fi

echo "==> 1/5 Updating system & installing Nginx..."
apt update -y
apt install -y nginx ufw

echo "==> 2/5 Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> 3/5 Creating website folder..."
mkdir -p /var/www/cst-institute
chown -R www-data:www-data /var/www/cst-institute

echo "==> 4/5 Writing Nginx site config for $DOMAIN..."
cat > /etc/nginx/sites-available/cst-institute <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    root /var/www/cst-institute;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    # cache static assets for 30 days
    location ~* \.(css|js|jpg|jpeg|png|webp|svg|ico)\$ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # basic security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
}
EOF

ln -sf /etc/nginx/sites-available/cst-institute /etc/nginx/sites-enabled/cst-institute
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl reload nginx

echo "==> 5/5 Done!"
echo ""
echo "------------------------------------------------------------"
echo " NEXT STEPS:"
echo " 1. Point DNS: A record @ and www -> this VPS IP"
echo " 2. Push your code to GitHub (Actions will deploy files here)"
echo " 3. After DNS works, get free SSL by running:"
echo "      apt install -y certbot python3-certbot-nginx"
echo "      certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "------------------------------------------------------------"
