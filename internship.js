/* =========================================================
   Wong Jing Quan — Internship page add-ons (v7)
   Runs alongside script.js; touches only internship-page elements.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ANIMATED COUNTERS WITH THOUSANDS SEPARATORS */
    const nums = document.querySelectorAll('.i-num[data-count]');
    const fmt = n => Math.round(n).toLocaleString('en-US');
    if ('IntersectionObserver' in window) {
        const numObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const suffix = el.getAttribute('data-suffix') || '';
                const start = performance.now();
                const dur = 1400;
                const tick = now => {
                    const t = Math.min(1, (now - start) / dur);
                    const eased = 1 - Math.pow(1 - t, 3);
                    el.textContent = fmt(target * eased) + suffix;
                    if (t < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                numObs.unobserve(el);
            });
        }, { threshold: 0.5 });
        nums.forEach(n => numObs.observe(n));
    } else {
        nums.forEach(n => { n.textContent = fmt(parseFloat(n.dataset.count)) + (n.dataset.suffix || ''); });
    }

    /* WEEK RAIL SCROLL-SPY */
    const rail = document.getElementById('wkRail');
    const weeks = document.querySelectorAll('.wk-card[id]');
    if (rail && weeks.length && 'IntersectionObserver' in window) {
        const links = new Map();
        rail.querySelectorAll('a[href^="#week-"]').forEach(a => links.set(a.getAttribute('href').slice(1), a));
        let current = null;
        const setActive = id => {
            if (id === current) return;
            current = id;
            links.forEach((a, key) => {
                const on = key === id;
                a.classList.toggle('is-active', on);
                if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
            });
            const a = links.get(id);
            // keep the active chip visible when the rail scrolls sideways (tablet / phone)
            if (a && rail.scrollWidth > rail.clientWidth) {
                rail.scrollTo({ left: a.offsetLeft - rail.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' });
            }
        };
        const spy = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
        }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });
        weeks.forEach(w => spy.observe(w));
        const fromHash = location.hash && links.has(location.hash.slice(1)) ? location.hash.slice(1) : weeks[0].id;
        setActive(fromHash);
    }

    /* KEEP DEEP LINKS ON TARGET: web fonts swapping in reflow the text and can push
       the linked week away from the top, so re-anchor once unless the reader has moved */
    if (location.hash.length > 1) {
        let moved = false;
        ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(ev =>
            window.addEventListener(ev, () => { moved = true; }, { once: true, passive: true }));
        const reanchor = () => {
            if (moved) return;
            let el = null;
            try { el = document.querySelector(decodeURIComponent(location.hash)); } catch (err) { return; }
            if (el) el.scrollIntoView({ block: 'start' });
        };
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setTimeout(reanchor, 30));
        window.addEventListener('load', () => setTimeout(reanchor, 60));
    }

    /* LIGHTBOX FOR FIGURES (progressive: without JS the link opens the image) */
    const zoomLinks = document.querySelectorAll('a.zoom');
    if (zoomLinks.length) {
        const box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('aria-label', 'Image viewer');
        box.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close image"><i class="fas fa-xmark"></i></button><p></p>';
        document.body.appendChild(box);
        const img = document.createElement('img');   // inserted on first open so the page never holds an <img> without a source
        const cap = box.querySelector('p');
        const closeBtn = box.querySelector('.lightbox-close');
        let lastFocus = null;
        const close = () => {
            box.classList.remove('open');
            document.body.style.overflow = '';
            if (lastFocus) lastFocus.focus();
        };
        zoomLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                lastFocus = link;
                const inner = link.querySelector('img');
                if (!img.isConnected) box.insertBefore(img, cap);
                img.src = link.getAttribute('href');
                img.alt = inner ? inner.alt : '';
                const fig = link.closest('figure');
                const fc = fig ? fig.querySelector('figcaption') : null;
                cap.textContent = fc ? fc.textContent.trim() : '';
                box.classList.add('open');
                document.body.style.overflow = 'hidden';
                closeBtn.focus();
            });
        });
        box.addEventListener('click', e => { if (e.target === box || e.target.closest('.lightbox-close')) close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
    }
});
