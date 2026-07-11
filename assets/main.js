/* CST Institute — shared scripts */
document.addEventListener('DOMContentLoaded', function () {

  /* ---- Apply admin config (assets/config.js) everywhere ---- */
  var S = window.SITE || {};
  var PH_PHONE_DISPLAY = '+91 XXXXX XXXXX';
  var PH_PHONE_LINK = '+91XXXXXXXXXX';
  var PH_WA = '91XXXXXXXXXX';
  var PH_EMAIL = 'info@cstinstitute.in';
  var PH_ADDRESS = 'CST Institute, Near Main Road, Bhusawal, Dist. Jalgaon, Maharashtra \u2013 425201';

  if (S.waNumber) document.body.dataset.wa = S.waNumber;

  /* rewrite links: tel:, mailto:, wa.me */
  document.querySelectorAll('a[href]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (S.phoneLink && h.indexOf('tel:') === 0) {
      a.setAttribute('href', 'tel:' + S.phoneLink);
    } else if (S.email && h.indexOf('mailto:') === 0) {
      a.setAttribute('href', 'mailto:' + S.email);
    } else if (S.waNumber && h.indexOf('wa.me/') !== -1) {
      a.setAttribute('href', h.replace(/wa\.me\/[0-9X]+/, 'wa.me/' + S.waNumber));
    }
  });

  /* rewrite map iframes */
  if (S.mapEmbed) {
    document.querySelectorAll('iframe.map-frame').forEach(function (fr) {
      fr.src = S.mapEmbed;
    });
  }

  /* replace displayed text (phone, email, address) site-wide */
  (function () {
    var pairs = [];
    if (S.phoneDisplay) pairs.push([PH_PHONE_DISPLAY, S.phoneDisplay]);
    if (S.email) pairs.push([PH_EMAIL, S.email]);
    if (S.address) pairs.push([PH_ADDRESS, S.address]);
    if (!pairs.length) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var t = node.nodeValue;
      pairs.forEach(function (p) {
        if (t.indexOf(p[0]) !== -1) t = t.split(p[0]).join(p[1]);
      });
      if (t !== node.nodeValue) node.nodeValue = t;
    }
  })();

  /* ---- Mobile menu ---- */
  var burger = document.querySelector('.hamburger');
  var menu = document.querySelector('nav.menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
  }

  /* ---- Courses dropdown ---- */
  document.querySelectorAll('.dropdown > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      btn.parentElement.classList.toggle('open');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown.open').forEach(function (d) { d.classList.remove('open'); });
  });

  /* ---- Terminal typing animation (homepage signature) ---- */
  var typeEl = document.getElementById('type-target');
  if (typeEl) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lines = [
      'enroll("MS-CIT")',
      'enroll("Python")',
      'enroll("Java")',
      'enroll("Tally Prime")',
      'enroll("Web Development")',
      'enroll("Advanced Excel")',
      'enroll("AI & ChatGPT Tools")'
    ];
    if (reduce) { typeEl.textContent = lines[0]; }
    else {
      var li = 0, ci = 0, deleting = false;
      (function tick() {
        var line = lines[li];
        typeEl.textContent = line.slice(0, ci);
        if (!deleting && ci < line.length) { ci++; setTimeout(tick, 60); }
        else if (!deleting) { deleting = true; setTimeout(tick, 1600); }
        else if (ci > 0) { ci--; setTimeout(tick, 28); }
        else { deleting = false; li = (li + 1) % lines.length; setTimeout(tick, 350); }
      })();
    }
  }

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || '';
        var start = null;
        function stepFn(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1400, 1);
          el.textContent = Math.floor(p * target).toLocaleString('en-IN') + suffix;
          if (p < 1) requestAnimationFrame(stepFn); else el.textContent = target.toLocaleString('en-IN') + suffix;
        }
        requestAnimationFrame(stepFn);
        io.unobserve(el);
      });
    }, { threshold: .4 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
      });
    }, { threshold: .15 });
    reveals.forEach(function (r) { ro.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('in'); });
  }

  /* ---- Enquiry forms: GUARANTEED dual delivery ----
     1) Instantly emails the enquiry to the institute via Web3Forms
        (if SITE.web3formsKey is set in assets/config.js) - works even
        if the student never presses Send on WhatsApp.
     2) Then opens WhatsApp with the message pre-filled as before. */
  var waNumber = document.body.dataset.wa || '91XXXXXXXXXX';
  document.querySelectorAll('form.wa-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var origText = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

      var data = new FormData(form);
      var entries = [];
      data.forEach(function (value, key) {
        if (String(value).trim() !== '') entries.push([key, String(value)]);
      });

      function openWhatsApp() {
        var msg = 'New Enquiry - CST Institute Website%0A';
        entries.forEach(function (p) {
          msg += '%0A*' + p[0] + ':* ' + encodeURIComponent(p[1]);
        });
        window.open('https://wa.me/' + waNumber + '?text=' + msg, '_blank');
      }

      function finish(emailOk) {
        if (btn) { btn.disabled = false; btn.textContent = origText; }
        form.reset();
        var ok = form.querySelector('.form-success');
        if (ok) {
          ok.style.display = 'block';
          ok.textContent = emailOk
            ? '\u2713 Enquiry received! We have your details - also press Send in WhatsApp for fastest reply.'
            : '\u2713 WhatsApp opened - please press SEND to complete your enquiry.';
        }
      }

      var key = (window.SITE && window.SITE.web3formsKey) || '';
      if (key) {
        var payload = { access_key: key, subject: 'New Website Enquiry - CST Institute', from_name: 'CST Website' };
        entries.forEach(function (p) { payload[p[0]] = p[1]; });
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (r) { return r.json(); })
          .then(function (res) { openWhatsApp(); finish(res && res.success); })
          .catch(function () { openWhatsApp(); finish(false); });
      } else {
        openWhatsApp();
        finish(false);
      }
    });
  });

  /* ---- Footer year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
