// Demo landing page JS for AirStay (all data is fictional)
// - Counter animation
// - Booking form simulated submission that updates counters locally
// - Button interactions

document.addEventListener('DOMContentLoaded', function () {
  // Set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Animated reservations counter initial value (dummy)
  let reservationsCount = 12345; // initial dummy number
  const counterEl = document.getElementById('reservationsCounter');
  const previewEl = document.getElementById('reservationsPreview');

  // small function to format numbers with commas
  function formatNumber(n){
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // set initial text
  counterEl.textContent = formatNumber(reservationsCount);
  previewEl.textContent = formatNumber(reservationsCount);

  // Animate count up slightly on load (visual)
  animateCount(counterEl, reservationsCount - 50, reservationsCount, 1200);

  // "Reserve" buttons on cards increment count locally for demo and show toast
  document.querySelectorAll('button[data-stay]').forEach(btn => {
    btn.addEventListener('click', function () {
      const stayName = this.getAttribute('data-stay') || 'Stay';
      reservationsCount += 1;
      counterEl.textContent = formatNumber(reservationsCount);
      previewEl.textContent = formatNumber(reservationsCount);
      showToast(`Reservation simulated for "${stayName}". Thank you!`);
    });
  });

  // Booking form simulated submit
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.name.value || "Guest";
    const stay = this.stay.value || "Stay";
    reservationsCount += 1;
    counterEl.textContent = formatNumber(reservationsCount);
    previewEl.textContent = formatNumber(reservationsCount);
    showToast(`Thanks ${name}! Your demo reservation at "${stay}" has been recorded (demo).`);
    this.reset();
  });

  // "How it works" interaction
  document.getElementById('learnBtn').addEventListener('click', function(){
    showToast("AirStay demo: Search a stay → Select dates → Confirm (demo).");
  });

  // Simple toast notification
  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(()=> t.classList.add('visible'), 20);
    setTimeout(()=> { t.classList.remove('visible'); setTimeout(()=> t.remove(), 300); }, 3000);
  }

  // count animation helper
  function animateCount(el, from, to, duration) {
    const start = performance.now();
    function step(ts) {
      const progress = Math.min((ts - start) / duration, 1);
      const value = Math.floor(from + (to - from) * progress);
      el.textContent = formatNumber(value);
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
});

/* Basic styling for toast (inserted via JS style tag to keep CSS file clean) */
(function addToastStyle(){
  const style = document.createElement('style');
  style.textContent = `
    .toast {
      position: fixed;
      right: 20px;
      bottom: 24px;
      background: rgba(16,24,40,0.95);
      color: #fff;
      padding: 12px 16px;
      border-radius: 10px;
      box-shadow: 0 8px 30px rgba(2,6,23,0.4);
      transform: translateY(10px) scale(.98);
      opacity: 0;
      transition: all .26s ease;
      z-index: 9999;
      max-width: 320px;
      font-weight:600;
      font-size:0.95rem;
    }
    .toast.visible { transform: translateY(0) scale(1); opacity:1; }
  `;
  document.head.appendChild(style);
})();
