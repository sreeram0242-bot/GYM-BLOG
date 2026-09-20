/**
 * GymFlow SaaS — Interactive Client Logic
 * Handles Device Switcher, Hardware Terminal Simulation, Web Audio Chime, ROI Calculator & Forms
 */

document.addEventListener('DOMContentLoaded', () => {
  initDeviceSwitcher();
  initClock();
  initSimulator();
  initRoiCalculator();
  initFaqAccordion();
  initMobileNav();
});

/* ==========================================================================
   1. Hero Device Switcher (Desktop PC vs Mobile Layout)
   ========================================================================== */
function initDeviceSwitcher() {
  const btnPc = document.getElementById('btn-pc-view');
  const btnMobile = document.getElementById('btn-mobile-view');
  const pcCard = document.getElementById('pc-preview-card');
  const mobileCard = document.getElementById('mobile-preview-card');

  if (!btnPc || !btnMobile || !pcCard || !mobileCard) return;

  btnPc.addEventListener('click', () => {
    btnPc.classList.add('active');
    btnMobile.classList.remove('active');
    pcCard.classList.add('active');
    mobileCard.classList.remove('active');
  });

  btnMobile.addEventListener('click', () => {
    btnMobile.classList.add('active');
    btnPc.classList.remove('active');
    mobileCard.classList.add('active');
    pcCard.classList.remove('active');
  });
}

/* ==========================================================================
   2. Live Clock for Terminal
   ========================================================================== */
function initClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }
  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. Web Audio Synthesizer (Realistic Check-In Beep / Chime)
   ========================================================================== */
function playCheckinChime(isSuccess = true) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (isSuccess) {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.1);
      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.35);
    }
  } catch (e) {
    // AudioContext blocked by autoplay policy
  }
}

/* ==========================================================================
   4. Reception Terminal Simulator (Horizontal & Compact)
   ========================================================================== */
function initSimulator() {
  const memberBtns = document.querySelectorAll('.member-pick-btn');
  const btnNfc = document.getElementById('trigger-nfc');
  const btnFp = document.getElementById('trigger-fp');

  const standbyState = document.getElementById('terminal-standby');
  const resultCard = document.getElementById('punch-result');
  const statusPill = document.getElementById('sim-status-pill');

  const waUserName = document.getElementById('wa-user-name');
  const waUserTime = document.getElementById('wa-user-time');
  const waUserPlan = document.getElementById('wa-user-plan');
  const waUserStatus = document.getElementById('wa-user-status');
  const waDueText = document.getElementById('wa-due-text');
  const waChat = document.getElementById('wa-chat');

  let activeMember = {
    name: 'Rahul Sharma',
    avatar: 'RS',
    plan: 'Annual Pro (₹12,000)',
    due: '₹0 (Paid)',
    status: 'Active Member',
    isStaff: false,
    phone: '+91 98765 43210'
  };

  memberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      memberBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const isStaff = btn.dataset.status === 'Staff';
      activeMember = {
        name: btn.dataset.name,
        avatar: btn.querySelector('.avatar') ? btn.querySelector('.avatar').textContent : 'RS',
        plan: btn.dataset.plan,
        due: btn.dataset.due,
        status: btn.dataset.status,
        isStaff: isStaff,
        phone: btn.dataset.phone
      };

      if (standbyState) standbyState.style.display = 'flex';
      if (resultCard) resultCard.style.display = 'none';
      if (statusPill) {
        statusPill.textContent = 'READY TO PUNCH';
        statusPill.style.background = '#2563EB';
      }
    });
  });

  function executePunch(methodName) {
    playCheckinChime(true);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (standbyState) standbyState.style.display = 'none';
    if (resultCard) resultCard.style.display = 'block';

    if (statusPill) {
      statusPill.textContent = `${methodName.toUpperCase()} CONFIRMED`;
      statusPill.style.background = '#10B981';
    }

    // Update WhatsApp Card
    if (waUserName) waUserName.textContent = activeMember.name.split(' ')[0];
    if (waUserTime) waUserTime.textContent = timeStr;
    if (waUserPlan) waUserPlan.textContent = `Plan: ${activeMember.plan}`;
    if (waUserStatus) waUserStatus.textContent = activeMember.isStaff ? 'Shift: Active' : 'Valid till 28 May 2026';

    if (waDueText) {
      if (activeMember.due.includes('₹0')) {
        waDueText.innerHTML = '✅ No outstanding balance dues. Enjoy your workout!';
        waDueText.style.color = '#34D399';
      } else if (activeMember.isStaff) {
        waDueText.innerHTML = '⏱️ Shift punch-in recorded. Have a productive shift!';
        waDueText.style.color = '#A78BFA';
      } else {
        waDueText.innerHTML = `⚠️ <strong>Friendly Reminder:</strong> Pending dues of ${activeMember.due}. <br><a href="https://wa.me/919629661668" style="color:#60A5FA;text-decoration:underline;">Click to pay via UPI QR</a>`;
        waDueText.style.color = '#F87171';
      }
    }

    if (waChat) waChat.scrollTop = waChat.scrollHeight;
  }

  if (btnNfc) {
    btnNfc.addEventListener('click', () => executePunch('NFC Tap'));
  }
  if (btnFp) {
    btnFp.addEventListener('click', () => executePunch('Fingerprint'));
  }
}

/* ==========================================================================
   5. Interactive ROI Calculator
   ========================================================================== */
function initRoiCalculator() {
  const memberSlider = document.getElementById('member-slider');
  const feeSlider = document.getElementById('fee-slider');

  const memberCountText = document.getElementById('slider-member-count');
  const feeAmountText = document.getElementById('slider-fee-amount');

  const calcRecovered = document.getElementById('calc-recovered');
  const calcHours = document.getElementById('calc-hours');
  const calcPayback = document.getElementById('calc-payback');

  if (!memberSlider || !feeSlider) return;

  function calculate() {
    const members = parseInt(memberSlider.value, 10);
    const fee = parseInt(feeSlider.value, 10);

    if (memberCountText) memberCountText.textContent = `${members}`;
    if (feeAmountText) feeAmountText.textContent = `₹${fee.toLocaleString('en-IN')}`;

    const annualLostRecovered = Math.round(members * fee * 0.20);
    const hoursSaved = members * 4;

    if (calcRecovered) calcRecovered.textContent = `₹${annualLostRecovered.toLocaleString('en-IN')}`;
    if (calcHours) calcHours.textContent = `${hoursSaved} hrs`;

    const dailyRecovery = annualLostRecovered / 365;
    const paybackDays = Math.max(7, Math.ceil(7999 / dailyRecovery));

    if (calcPayback) calcPayback.textContent = `Paid in ${paybackDays} days!`;
  }

  memberSlider.addEventListener('input', calculate);
  feeSlider.addEventListener('input', calculate);
  calculate();
}

/* ==========================================================================
   6. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* ==========================================================================
   8. Lead Capture & Demo Form Handler
   ========================================================================== */
function handleFormSubmit(e) {
  e.preventDefault();

  const gymNameEl = document.getElementById('gym-name');
  const ownerNameEl = document.getElementById('owner-name');
  const ownerPhoneEl = document.getElementById('owner-phone');
  const cityEl = document.getElementById('city');
  const memberCountEl = document.getElementById('members-count');

  const gymName = gymNameEl ? gymNameEl.value.trim() : 'My Gym';
  const ownerName = ownerNameEl ? ownerNameEl.value.trim() : 'Gym Owner';
  const ownerPhone = ownerPhoneEl ? ownerPhoneEl.value.trim() : '';
  const city = cityEl ? cityEl.value.trim() : '';
  const memberCount = memberCountEl ? memberCountEl.value : '50 - 150';

  const successMsg = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Opening WhatsApp...</span>';
  }

  if (successMsg) {
    successMsg.style.display = 'block';
  }

  const message = `Hi Sreeram, I want to book a Free Demo & 1-Week Free Trial for GymFlow SaaS!%0A%0A` +
    `*Gym Name:* ${encodeURIComponent(gymName)}%0A` +
    `*Owner:* ${encodeURIComponent(ownerName)}%0A` +
    `*Phone:* ${encodeURIComponent(ownerPhone)}%0A` +
    `*City:* ${encodeURIComponent(city)}%0A` +
    `*Member Count:* ${encodeURIComponent(memberCount)}%0A%0A` +
    `Please set up my 1-week free trial!`;

  setTimeout(() => {
    window.open(`https://wa.me/919629661668?text=${message}`, '_blank');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Request Received!</span>';
    }
  }, 1000);
}
window.handleFormSubmit = handleFormSubmit;
