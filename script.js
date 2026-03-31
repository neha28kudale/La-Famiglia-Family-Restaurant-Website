// ─── DATA ─────────────────────────────────────────────────────────
const menuItems = [
  { id:1, name:"Bruschetta al Pomodoro", desc:"Toasted ciabatta, vine tomatoes, basil, garlic, extra virgin olive oil", price:320, emoji:"🍅", category:"starters", tags:["veg","popular"] },
  { id:2, name:"Arancini Siciliani", desc:"Golden fried risotto balls stuffed with mozzarella and ragù", price:420, emoji:"🟡", category:"starters", tags:["popular"] },
  { id:3, name:"Burrata Caprese", desc:"Creamy burrata, heirloom tomatoes, basil oil, aged balsamic", price:680, emoji:"🧀", category:"starters", tags:["veg"] },
  { id:4, name:"Tagliatelle al Ragù", desc:"Hand-rolled egg pasta, slow-cooked Bolognese, Parmigiano Reggiano", price:820, emoji:"🍝", category:"pasta", tags:["popular"] },
  { id:5, name:"Cacio e Pepe", desc:"Spaghetti, aged Pecorino Romano, black pepper — perfection in simplicity", price:720, emoji:"🍜", category:"pasta", tags:["veg"] },
  { id:6, name:"Risotto ai Funghi", desc:"Carnaroli rice, wild mushrooms, truffle oil, fresh thyme", price:950, emoji:"🍄", category:"pasta", tags:["veg","popular"] },
  { id:7, name:"Osso Buco alla Milanese", desc:"Braised veal shank, gremolata, saffron risotto", price:1450, emoji:"🥩", category:"mains", tags:["popular"] },
  { id:8, name:"Branzino al Forno", desc:"Whole sea bass roasted with lemon, capers, olives, cherry tomatoes", price:1280, emoji:"🐟", category:"mains", tags:[] },
  { id:9, name:"Pollo alla Cacciatora", desc:"Free-range chicken, rustic tomato & herb sauce, polenta", price:980, emoji:"🍗", category:"mains", tags:["spicy"] },
  { id:10, name:"Tiramisù della Nonna", desc:"Nonna Rosa's original recipe — mascarpone, espresso, ladyfingers", price:480, emoji:"🍰", category:"desserts", tags:["popular"] },
  { id:11, name:"Panna Cotta", desc:"Vanilla bean panna cotta, mixed berry coulis, mint", price:380, emoji:"🍮", category:"desserts", tags:["veg"] },
  { id:12, name:"Cannoli Siciliani", desc:"Crispy pastry shells filled with sweet ricotta and pistachios", price:420, emoji:"🧁", category:"desserts", tags:["popular"] },
];

const testimonials = [
  { text: "La Famiglia has been our family's special occasion restaurant for over a decade. The pasta is extraordinary — it genuinely tastes like it was made by an Italian grandmother.", name: "Priya Sharma", info: "Regular Guest · Mumbai", stars: 5, avatar: "👩", color: "#C9973A" },
  { text: "We celebrated our anniversary here last month. The staff remembered it was a special occasion and surprised us with a beautiful dessert. That's genuine hospitality.", name: "Rahul & Anita Mehta", info: "Anniversary Dinner", stars: 5, avatar: "👨‍👩‍👧", color: "#7A8C6E" },
  { text: "The Osso Buco is the best I've had outside of Milan. The wine list is superb. This restaurant is a hidden gem that deserves every star it gets.", name: "Vikram Nair", info: "Food Critic · Verified Review", stars: 5, avatar: "🧑", color: "#C4622D" },
  { text: "Brought the whole family — kids, grandparents and all. Everyone found something they loved. The staff were incredibly patient and warm with our elderly guests.", name: "The Patel Family", info: "Family Dinner Party", stars: 5, avatar: "👨‍👩‍👦", color: "#6B4C3B" },
  { text: "I've ordered delivery three times this month. The packaging is excellent, food arrives hot, and the Tagliatelle al Ragù travels perfectly. Absolute comfort food.", name: "Sneha Joshi", info: "Regular Online Order", stars: 5, avatar: "👩‍💼", color: "#3D7A6E" },
  { text: "Hosted a business lunch for 8 people. Impeccable service, beautiful presentation, and the private dining arrangement was seamless. Will definitely return.", name: "Arjun Kapoor", info: "Business Lunch", stars: 5, avatar: "👨‍💼", color: "#8B4513" },
];

// ─── STATE ─────────────────────────────────────────────────────────
const cart = {};
let currentCategory = 'all';
let currentSlide = 0;
let testimonialsPerSlide = 3;

// ─── INIT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderMenu('all');
  renderOrderItems();
  renderTestimonials();
  initScrollAnimations();
  setMinDate();
  updateTestimonialsPerSlide();
  window.addEventListener('resize', updateTestimonialsPerSlide);
});

// ─── NAV ─────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

document.getElementById('hamburger').addEventListener('click', function() {
  this.classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
});

function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

// ─── MENU ─────────────────────────────────────────────────────────
function renderMenu(category) {
  const grid = document.getElementById('menuGrid');
  const items = category === 'all' ? menuItems : menuItems.filter(i => i.category === category);
  grid.innerHTML = items.map(item => `
    <div class="menu-card" onclick="addToCartFromMenu(${item.id})" style="animation: fadeUp 0.5s ease both;">
      <div class="menu-card-img" style="background: linear-gradient(135deg, ${categoryColor(item.category)});">
        <span style="font-size:3.5rem;position:relative;z-index:1">${item.emoji}</span>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-header">
          <div class="menu-card-name">${item.name}</div>
          <div class="menu-card-price">₹${item.price}</div>
        </div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-tags">
          ${item.tags.map(t => `<span class="tag ${t}">${t === 'popular' ? '⭐ Popular' : t === 'veg' ? '🌿 Veg' : '🌶 Spicy'}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function categoryColor(cat) {
  const c = { starters:'#8B6347, #C4622D', pasta:'#C9973A, #8B6347', mains:'#3D2B1F, #6B4C3B', desserts:'#C4622D, #9B4521' };
  return c[cat] || c.starters;
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentCategory = this.dataset.category;
    renderMenu(currentCategory);
  });
});

function addToCartFromMenu(id) {
  const item = menuItems.find(i => i.id === id);
  cart[id] = (cart[id] || 0) + 1;
  renderOrderItems();
  showToast(`🛒 ${item.name} added to order`);
  setTimeout(() => { document.getElementById('order').scrollIntoView({behavior:'smooth'}); }, 600);
}

// ─── ORDER ITEMS ─────────────────────────────────────────────────
function renderOrderItems() {
  const container = document.getElementById('orderItems');
  const orderMenuItems = menuItems.filter(i => i.category !== 'desserts').slice(0, 6);
  let total = 0;

  container.innerHTML = orderMenuItems.map(item => {
    const qty = cart[item.id] || 0;
    total += qty * item.price;
    return `
      <div class="order-item-row">
        <span class="item-emoji">${item.emoji}</span>
        <span class="item-name">${item.name}</span>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQty(${item.id},-1)">−</button>
          <span class="qty-display">${qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id},1)">+</button>
        </div>
        <span class="item-price">₹${item.price}</span>
      </div>
    `;
  }).join('');

  document.getElementById('orderTotal').textContent = `₹${total.toFixed(2)}`;
}

function updateQty(id, delta) {
  cart[id] = Math.max(0, (cart[id] || 0) + delta);
  renderOrderItems();
}

// ─── ORDER FORM VALIDATION ─────────────────────────────────────────
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('orderName');
  const phone = document.getElementById('orderPhone');
  const address = document.getElementById('orderAddress');

  clearErrors();

  if (!name.value.trim() || name.value.trim().length < 2) {
    showError(name, 'orderNameErr'); valid = false;
  } else { name.classList.add('success'); }

  if (!phone.value.trim() || !/[\d\s+\-()]{8,}/.test(phone.value)) {
    showError(phone, 'orderPhoneErr'); valid = false;
  } else { phone.classList.add('success'); }

  if (!address.value.trim() || address.value.trim().length < 10) {
    showError(address, 'orderAddressErr'); valid = false;
  } else { address.classList.add('success'); }

  const hasItems = Object.values(cart).some(q => q > 0);
  if (!hasItems) {
    showToast('⚠️ Please add at least one item to your order');
    return;
  }

  if (valid) {
    document.getElementById('orderSuccess').classList.add('show');
    showToast('✅ Order placed successfully!');
  }
});

function showError(el, errId) {
  el.classList.add('error');
  document.getElementById(errId).classList.add('show');
}

function clearErrors() {
  document.querySelectorAll('.form-control').forEach(el => {
    el.classList.remove('error', 'success');
  });
  document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));
}

function resetOrder() {
  document.getElementById('orderSuccess').classList.remove('show');
  document.getElementById('orderForm').reset();
  clearErrors();
  Object.keys(cart).forEach(k => delete cart[k]);
  renderOrderItems();
}

// ─── BOOKING FORM VALIDATION ───────────────────────────────────────
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const fields = [
    { id:'bName', errId:'bNameErr', test: v => v.trim().length >= 2 },
    { id:'bEmail', errId:'bEmailErr', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id:'bDate', errId:'bDateErr', test: v => !!v },
    { id:'bTime', errId:'bTimeErr', test: v => !!v },
    { id:'bGuests', errId:'bGuestsErr', test: v => !!v },
  ];

  document.querySelectorAll('#bookingForm .form-control').forEach(el => el.classList.remove('error','success'));
  document.querySelectorAll('#bookingForm .error-msg').forEach(el => el.classList.remove('show'));

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (!f.test(el.value)) {
      el.classList.add('error');
      document.getElementById(f.errId).classList.add('show');
      valid = false;
    } else {
      el.classList.add('success');
    }
  });

  if (valid) {
    document.getElementById('bookingSuccess').classList.add('show');
    showToast('🥂 Table reserved! Confirmation email sent.');
  }
});

function resetBooking() {
  document.getElementById('bookingSuccess').classList.remove('show');
  document.getElementById('bookingForm').reset();
  document.querySelectorAll('#bookingForm .form-control').forEach(el => el.classList.remove('error','success'));
  document.querySelectorAll('#bookingForm .error-msg').forEach(el => el.classList.remove('show'));
}

function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('bDate');
  if (dateInput) dateInput.min = today;
}

// ─── TESTIMONIALS SLIDER ───────────────────────────────────────────
function updateTestimonialsPerSlide() {
  const w = window.innerWidth;
  testimonialsPerSlide = w < 600 ? 1 : w < 900 ? 2 : 3;
  renderTestimonials();
}

function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card" style="flex: 0 0 calc(${100/testimonialsPerSlide}% - ${(testimonialsPerSlide-1)*1.5/testimonialsPerSlide}rem)">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar" style="background:${t.color}20;color:${t.color}">${t.avatar}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-info">${t.info}</div>
        </div>
      </div>
    </div>
  `).join('');

  const dotsEl = document.getElementById('testimonialDots');
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);
  dotsEl.innerHTML = Array.from({length: totalSlides}, (_, i) =>
    `<button class="nav-dot ${i === currentSlide ? 'active' : ''}" onclick="goToSlide(${i})"></button>`
  ).join('');

  goToSlide(Math.min(currentSlide, totalSlides - 1));
}

function goToSlide(n) {
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);
  currentSlide = (n + totalSlides) % totalSlides;
  const track = document.getElementById('testimonialsTrack');
  const cardWidth = track.children[0]?.offsetWidth || 0;
  const gap = 24;
  track.style.transform = `translateX(-${currentSlide * testimonialsPerSlide * (cardWidth + gap)}px)`;
  document.querySelectorAll('.nav-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

document.getElementById('prevArrow')?.addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextArrow')?.addEventListener('click', () => goToSlide(currentSlide + 1));

// Auto-advance
setInterval(() => goToSlide(currentSlide + 1), 5000);

// ─── TOAST ─────────────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ─── SCROLL ANIMATIONS ──────────────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
}

// ─── SMOOTH NAV CLICK ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
