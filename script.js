/* =========================================================
   Wong Jing Quan — Portfolio JavaScript v6 (Immersive Scroll)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* PRELOADER */
    const preloader = document.getElementById('preloader');
    const preFill = document.getElementById('preloaderFill');
    const prePct = document.getElementById('preloaderPct');
    let p = 0;
    const preInt = setInterval(() => {
        p += Math.random() * 14 + 4;
        if (p >= 100) {
            p = 100;
            clearInterval(preInt);
            setTimeout(() => preloader.classList.add('gone'), 400);
        }
        preFill.style.width = p + '%';
        prePct.textContent = Math.floor(p);
    }, 100);

    /* SCROLL PROGRESS + SCROLL-DRIVEN CSS VAR */
    const scrollFill = document.getElementById('scrollProgressFill');
    const docEl = document.documentElement;
    let scrollTicking = false;

    const updateScroll = () => {
        const scrollTop = docEl.scrollTop;
        const scrollHeight = docEl.scrollHeight - docEl.clientHeight;
        const pct = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        scrollFill.style.width = (pct * 100) + '%';
        docEl.style.setProperty('--scroll-pct', pct.toFixed(3));
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(updateScroll);
            scrollTicking = true;
        }
    }, { passive: true });

    /* RIPPLE CLICK */
    const ripples = document.getElementById('ripples');
    document.addEventListener('click', e => {
        if (e.target.closest('input, textarea, select')) return;
        const r = document.createElement('div');
        r.classList.add('ripple');
        r.style.left = (e.clientX - 120) + 'px';
        r.style.top = (e.clientY - 120) + 'px';
        ripples.appendChild(r);
        setTimeout(() => r.remove(), 900);
    });

    /* NAVBAR SCROLL */
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        if (window.scrollY > 400) backTop.classList.add('visible');
        else backTop.classList.remove('visible');
    }, { passive: true });

    /* MOBILE MENU */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ACTIVE NAV LINK */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) link.classList.add('active');
                });
            }
        });
    }, { passive: true });

    /* SECTION IN-VIEW (for ambient section-glow) */
    const sectionObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
            else entry.target.classList.remove('in-view');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -20% 0px' });
    sections.forEach(sec => sectionObs.observe(sec));

    /* SMOOTH SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* BACK TO TOP */
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* TYPING */
    const typed = document.getElementById('typed');
    const phrases = [
        'Decision Science Undergraduate',
        'Data Analytics Focus',
        'Business Intelligence Enthusiast',
        'Aspiring Data Analyst'
    ];
    let pi = 0, ci = 0, del = false;
    const type = () => {
        const cur = phrases[pi];
        if (del) { typed.textContent = cur.substring(0, ci - 1); ci--; }
        else { typed.textContent = cur.substring(0, ci + 1); ci++; }
        let speed = del ? 40 : 75;
        if (!del && ci === cur.length) { speed = 2200; del = true; }
        else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; speed = 400; }
        setTimeout(type, speed);
    };
    if (typed) setTimeout(type, 1800);

    /* SCROLL REVEAL */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
    revealEls.forEach(el => revealObs.observe(el));

    /* BARS */
    const bars = document.querySelectorAll('.sk-fill, .edu-fill');
    const barObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => { bar.style.width = progress + '%'; }, 200);
                barObs.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(bar => barObs.observe(bar));

    /* COUNTERS */
    const counters = document.querySelectorAll('.stat-num');
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const isDec = target % 1 !== 0;
                let count = 0;
                const step = target / 80;
                const upd = () => {
                    count += step;
                    if (count < target) {
                        el.textContent = isDec ? count.toFixed(2) : Math.floor(count);
                        requestAnimationFrame(upd);
                    } else {
                        el.textContent = isDec ? target.toFixed(2) : target;
                    }
                };
                upd();
                counterObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObs.observe(counter));

    /* PROJECT FILTER */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projCards = document.querySelectorAll('.proj-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = '';
                    requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    /* DARK MODE */
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    /* TOAST */
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    let toastTimer;
    const showToast = (msg) => {
        toastMsg.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    };

    /* COPY */
    document.querySelectorAll('[data-copy]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const val = el.getAttribute('data-copy');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(val).then(() => showToast('Copied to clipboard'));
            } else {
                const ta = document.createElement('textarea');
                ta.value = val;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                showToast('Copied to clipboard');
            }
        });
    });

    /* VANILLA TILT */
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 8, speed: 400, glare: true, 'max-glare': 0.15, scale: 1.01
        });
    }

    /* MAGNETIC BUTTONS */
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            if (el.classList.contains('btn-primary')) {
                el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
                el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
            }
        });
        el.addEventListener('mouseleave', () => el.style.transform = 'translate(0, 0)');
    });

    /* PROFILE ORB PARALLAX */
    const orbWrap = document.getElementById('orbWrap');
    if (orbWrap) {
        let orbTicking = false;
        document.addEventListener('mousemove', e => {
            if (!orbTicking) {
                requestAnimationFrame(() => {
                    const rect = orbWrap.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const x = (e.clientX - cx) / 80;
                    const y = (e.clientY - cy) / 80;
                    orbWrap.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
                    orbTicking = false;
                });
                orbTicking = true;
            }
        });
    }

    /* MOUSE PARALLAX ON AURORA BLOBS (subtle depth) */
    const auroraBlobs = document.querySelectorAll('.aurora-blob');
    let auroraTicking = false;
    document.addEventListener('mousemove', e => {
        if (!auroraTicking) {
            requestAnimationFrame(() => {
                const mx = (e.clientX / window.innerWidth - 0.5) * 30;
                const my = (e.clientY / window.innerHeight - 0.5) * 30;
                auroraBlobs.forEach((blob, i) => {
                    const strength = (i + 1) * 0.4;
                    blob.style.setProperty('--px', (mx * strength) + 'px');
                    blob.style.setProperty('--py', (my * strength) + 'px');
                });
                auroraTicking = false;
            });
            auroraTicking = true;
        }
    }, { passive: true });

    /* GENERATE FIXED FLOATING BG DOTS (20 dots across whole page) */
    const bgDots = document.getElementById('bgDots');
    if (bgDots) {
        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.classList.add('bg-dot');
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.animationDuration = (Math.random() * 20 + 25) + 's';
            dot.style.animationDelay = Math.random() * 15 + 's';
            dot.style.opacity = (Math.random() * 0.5 + 0.2).toFixed(2);
            bgDots.appendChild(dot);
        }
    }

    /* CONSOLE SIGNATURE */
    console.log('%cWong Jing Quan', 'font-size:24px;font-weight:900;background:linear-gradient(135deg,#2563EB,#60A5FA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;padding:10px;');
    console.log('%cData Analytics Portfolio — v6 immersive', 'font-size:14px;color:#60A5FA;font-weight:600;');
    console.log('%cLet\'s connect: wongquan23@gmail.com', 'font-size:12px;color:#6B7280;');
});
