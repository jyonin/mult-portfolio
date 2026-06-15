/* ============================================================
   포트폴리오 메인 JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 01. Nav 스크롤 + active 링크 ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── 02. Before / After 슬라이더 ── */
  const slider   = document.getElementById('baSlider');
  const range    = document.getElementById('baRange');
  const handle   = document.getElementById('baHandle');
  const baAfter  = slider?.querySelector('.ba-after');

  if (slider && range && baAfter) {
    const labelLeft  = slider.querySelector('.ba-label--left');
    const labelRight = slider.querySelector('.ba-label--right');

    const updateSlider = (val) => {
      const pct = 100 - val;
      baAfter.style.clipPath = `inset(0 ${pct}% 0 0)`;
      handle.style.left = `${val}%`;

      // 임계점: 왼쪽 25% / 오른쪽 75% 넘어가면 해당 라벨 노란색
      if (labelLeft)  labelLeft.classList.toggle('ba-label--lit',  val < 25);
      if (labelRight) labelRight.classList.toggle('ba-label--lit', val > 75);
    };

    // range input
    range.addEventListener('input', () => updateSlider(range.value));

    // 마우스 드래그
    let dragging = false;
    slider.addEventListener('mousedown', () => { dragging = true; });
    window.addEventListener('mouseup',   () => { dragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const rect = slider.getBoundingClientRect();
      const val  = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
      range.value = val;
      updateSlider(val);
    });

    // 터치
    slider.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = slider.getBoundingClientRect();
      const val  = Math.min(100, Math.max(0, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
      range.value = val;
      updateSlider(val);
    }, { passive: false });

    updateSlider(50); // 초기값
  }

  /* ── 03. Scroll 진입 애니메이션 ── */
  const fadeEls = document.querySelectorAll(
    '.section__header, .step, .gallery-item, .case-card, .ps-detail, .feed-mock, .color-system, .flow, .terminal, .github-badge, .about__inner, .ba-wrap, .prompt-box'
  );

  fadeEls.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // 연속 요소는 stagger
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.step ? (parseInt(entry.target.dataset.step) - 1) * 80 : 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  /* ── 04. 모바일 사이드 패널 ── */
  const navToggle  = document.getElementById('navToggle');
  const navClose   = document.getElementById('navClose');
  const navPanel   = document.getElementById('navPanel');
  const navOverlay = document.getElementById('navOverlay');

  const openPanel = () => {
    navPanel.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    navToggle?.setAttribute('aria-expanded', 'true');
  };
  const closePanel = () => {
    navPanel.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
    navToggle?.setAttribute('aria-expanded', 'false');
  };

  navToggle?.addEventListener('click', openPanel);
  navClose?.addEventListener('click', closePanel);
  navOverlay?.addEventListener('click', closePanel);

  // 패널 링크 클릭 시 닫기 + 스크롤
  navPanel?.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', closePanel);
  });

  /* ── 05. Process 아코디언 ── */
  document.querySelectorAll('.pa-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.pa-item');
      const isOpen = item.classList.contains('open');
      // 모두 닫기
      document.querySelectorAll('.pa-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.pa-header').setAttribute('aria-expanded', 'false');
      });
      // 현재 항목 토글
      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── 06. 컨택 모달 ── */
  const contactModal = document.getElementById('contactModal');
  const contactForm  = document.getElementById('contactForm');

  const openContact = () => {
    contactModal.classList.add('open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('cf-name')?.focus();
  };
  const closeContact = () => {
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-contact').forEach(el =>
    el.addEventListener('click', openContact)
  );
  document.querySelectorAll('.js-close-contact').forEach(el =>
    el.addEventListener('click', closeContact)
  );

  // ESC 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('open')) closeContact();
  });

  // 폼 제출 → Formspree
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name    = document.getElementById('cf-name').value.trim();
    const company = document.getElementById('cf-company').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) return;

    const submitBtn = contactForm.querySelector('.contact-form__submit');
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';

    try {
      const res = await fetch('https://formspree.io/f/xdavblwg', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, message })
      });

      if (res.ok) {
        submitBtn.textContent = '✓ 전송 완료';
        contactForm.reset();
        setTimeout(() => {
          closeContact();
          submitBtn.disabled = false;
          submitBtn.textContent = '메일 보내기 →';
        }, 1800);
      } else {
        throw new Error();
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = '전송 실패 — 다시 시도해주세요';
      setTimeout(() => { submitBtn.textContent = '메일 보내기 →'; }, 2500);
    }
  });

  /* ── 07. 벤토 이미지 팝업 ── */
  const bentoPopup    = document.getElementById('bentoPopup');
  const bentoPopupImg = document.getElementById('bentoPopupImg');

  const openPopup = (bgImage, ratio) => {
    bentoPopupImg.style.backgroundImage = bgImage;
    bentoPopupImg.style.aspectRatio = ratio || '4 / 5';
    bentoPopup.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closePopup = () => {
    bentoPopup.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.bento-item').forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      openPopup(item.querySelector('.bento-img').style.backgroundImage, '4 / 5');
    });
  });

  document.querySelectorAll('.feed-cell').forEach(cell => {
    cell.style.cursor = 'zoom-in';
    cell.addEventListener('click', () => {
      openPopup(cell.style.backgroundImage, '4 / 5');
    });
  });

  document.querySelectorAll('.case-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      openPopup(thumb.querySelector('.case-thumb__img').style.backgroundImage, '4 / 5');
    });
  });

  bentoPopup.addEventListener('click', closePopup);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bentoPopup.classList.contains('open')) closePopup();
  });

  /* ── 07. Skill Clock ── */
  (function initClock() {
    const ticksG   = document.getElementById('ticks');
    const handHour = document.getElementById('handHour');
    const handMin  = document.getElementById('handMin');
    const handSec  = document.getElementById('handSec');
    const NS = 'http://www.w3.org/2000/svg';

    if (!handHour) return;

    // 눈금 생성 (r=88 바깥쪽에서 안쪽으로)
    for (let i = 0; i < 12; i++) {
      const rad = ((i / 12) * 360 - 90) * (Math.PI / 180);
      const r   = 88;
      const len = i % 3 === 0 ? 12 : 6;
      const ln  = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', (100 + r * Math.cos(rad)).toFixed(2));
      ln.setAttribute('y1', (100 + r * Math.sin(rad)).toFixed(2));
      ln.setAttribute('x2', (100 + (r - len) * Math.cos(rad)).toFixed(2));
      ln.setAttribute('y2', (100 + (r - len) * Math.sin(rad)).toFixed(2));
      ln.setAttribute('stroke', '#1A1A1A');
      ln.setAttribute('stroke-width', i % 3 === 0 ? '2' : '1');
      ticksG.appendChild(ln);
    }

    // 모든 침: view-box 기준 (100,100)을 축으로 회전
    [handHour, handMin, handSec].forEach(el => {
      el.style.transformBox    = 'view-box';
      el.style.transformOrigin = '100px 100px';
    });

    const tick = () => {
      const now = new Date();
      const s   = now.getSeconds();
      const m   = now.getMinutes() + s / 60;
      const h   = (now.getHours() % 12) + m / 60;
      handHour.style.transform = `rotate(${(h * 30).toFixed(2)}deg)`;
      handMin.style.transform  = `rotate(${(m * 6).toFixed(2)}deg)`;
      handSec.style.transform  = `rotate(${(s * 6).toFixed(2)}deg)`;
    };

    tick();
    setInterval(tick, 1000);
  })();

  /* ── 08. 히어로 릴 — 마우스 패럴랙스 ── */
  const heroReel = document.querySelector('.hero__reel');
  if (heroReel) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 4;
      heroReel.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

});

