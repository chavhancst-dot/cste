/* CST Institute — shared scripts */
document.addEventListener('DOMContentLoaded', function () {

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

  /* ---- Enquiry forms → WhatsApp ----
     Every form with class .wa-form opens WhatsApp with a pre-filled
     message so enquiries land directly on the institute's phone.
     EDIT the number in the data-wa attribute on <body> (digits only,
     country code first, e.g. 919812345678). */
  var waNumber = document.body.dataset.wa || '91XXXXXXXXXX';
  document.querySelectorAll('form.wa-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var msg = 'New Enquiry — CST Institute Website%0A';
      data.forEach(function (value, key) {
        if (String(value).trim() !== '') {
          msg += '%0A*' + key + ':* ' + encodeURIComponent(value);
        }
      });
      window.open('https://wa.me/' + waNumber + '?text=' + msg, '_blank');
      form.reset();
      var ok = form.querySelector('.form-success');
      if (ok) { ok.style.display = 'block'; }
    });
  });

  /* ---- Footer year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
