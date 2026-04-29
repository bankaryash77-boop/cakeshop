/* ============================================================
   SWEET BLISS — common.js
   Cart · Toast · Product Detail Modal · Address Modal · Sheet
   ============================================================ */

const WHATSAPP_NUMBER = '919876543210';   // ← change to your number
const SHOP_NAME       = 'Sweet Bliss Cake Shop';
const CURRENCY        = '₹';
const SHEETS_CSV_URL  = '';

/* ── PATH HELPER ─────────────────────────────────────────── */
/* Works whether file is in root or /pages/ subfolder */
function imgPath(rel) {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // If in pages/ folder, prefix ../
  const inPages = window.location.pathname.includes('/pages/');
  return inPages ? '../' + rel : rel;
}

/* ── PRODUCT CATALOGUE ───────────────────────────────────── */
const PRODUCT_CATALOGUE = [
  { id:1,  name:'Black Forest Cake',        price:799,  oldPrice:null, category:'signature',   weight:'1 kg',  badge:'Bestseller', badgeType:'best',    rating:4.9, reviews:124, active:true,
    img:'imgs/cake5.jpg',  desc:'Three layers of dark chocolate sponge with cherry compote, freshly whipped cream and rich dark chocolate shavings. A classic celebration cake.' },
  { id:2,  name:'Chocolate Mousse Cake',    price:699,  oldPrice:899,  category:'chocolate',   weight:'900 g', badge:'20% OFF',    badgeType:'disc',    rating:4.8, reviews:88,  active:true,
    img:'imgs/cake6.jpg',  desc:'Silky chocolate mousse layered between moist sponge, finished with a glossy ganache drip and pearl sprinkles. A chocolate lover\'s dream.' },
  { id:3,  name:'Strawberry Dream Cupcakes',price:299,  oldPrice:null, category:'cupcakes',    weight:'6 pcs', badge:'New',        badgeType:'new',     rating:4.7, reviews:76,  active:true,
    img:'imgs/cake7.jpg',  desc:'Fluffy vanilla sponge topped with pink strawberry buttercream, a fresh strawberry and a delicate white chocolate drizzle.' },
  { id:4,  name:'Ferrero Hazelnut Cupcake', price:349,  oldPrice:399,  category:'cupcakes',    weight:'4 pcs', badge:'Bestseller', badgeType:'best',    rating:4.9, reviews:112, active:true,
    img:'imgs/cake4.jpg',  desc:'Rich hazelnut sponge topped with Nutella frosting, crushed hazelnuts and a whole Ferrero Rocher — indulgence in every bite.' },
  { id:5,  name:'Pink Macaron Drip Cake',   price:1299, oldPrice:null, category:'signature',   weight:'1.2 kg',badge:null,         badgeType:null,      rating:5.0, reviews:54,  active:true,
    img:'imgs/cake10.jpg', desc:'Elegant pink-striped layer cake topped with French macarons, a white chocolate drip and colourful sprinkles. Perfect for birthdays.' },
  { id:6,  name:'Oreo Celebration Cake',    price:1099, oldPrice:1299, category:'celebration', weight:'1 kg',  badge:'Party Hit',  badgeType:'best',    rating:4.8, reviews:98,  active:true,
    img:'imgs/cake9.jpg',  desc:'Oreo cookies and cream cake with pink ganache drip, Oreo cookies pressed on the sides, crowned with cream swirls and mini donuts.' },
  { id:7,  name:'Blackberry & Cream Cake',  price:899,  oldPrice:null, category:'fruit',       weight:'900 g', badge:'Seasonal',   badgeType:'seasonal',rating:4.6, reviews:63,  active:true,
    img:'imgs/cake12.jpg', desc:'Light vanilla sponge with whipped cream frosting, fresh blackberries and delicate lilac flowers. Rustic, elegant and seasonal.' },
  { id:8,  name:'Red Velvet Strawberry',    price:849,  oldPrice:999,  category:'fruit',       weight:'900 g', badge:null,         badgeType:null,      rating:4.7, reviews:88,  active:true,
    img:'imgs/cake1.jpg',  desc:'Vibrant red velvet layers filled with cream cheese frosting and piled high with fresh sliced strawberries. Rich colour, rich taste.' },
  { id:9,  name:'Classic Vanilla Cupcake',  price:199,  oldPrice:null, category:'cupcakes',    weight:'6 pcs', badge:null,         badgeType:null,      rating:4.5, reviews:145, active:true,
    img:'imgs/cake2.jpg',  desc:'Soft vanilla cupcake with swirled pink frosting, rainbow sprinkles and a maraschino cherry on top. Simple, sweet perfection.' },
  { id:10, name:'Blueberry Walnut Cake',    price:799,  oldPrice:899,  category:'fruit',       weight:'900 g', badge:'Healthy',    badgeType:'organic', rating:4.6, reviews:67,  active:true,
    img:'imgs/cake3.jpg',  desc:'Spiced chocolate sponge layers with cream cheese frosting, fresh blueberries and crushed walnut crumble. A wholesome treat.' },
  { id:11, name:'Dark Chocolate Cherry',    price:949,  oldPrice:null, category:'chocolate',   weight:'1 kg',  badge:"Chef's Pick",badgeType:'chef',    rating:4.9, reviews:76,  active:true,
    img:'imgs/cake8.jpg',  desc:'Intense dark chocolate ganache cake topped with piped chocolate rosettes, glazed cherries and dark sprinkles. Deeply decadent.' },
  { id:12, name:'Classic Chocolate Cake',   price:299,  oldPrice:399,  category:'chocolate',   weight:'500 g', badge:null,         badgeType:null,      rating:4.8, reviews:189, active:true,
    img:'imgs/cake11.jpg', desc:'Dense fudgy chocolate sponge with silky ganache frosting — the timeless crowd-pleaser that everyone loves every single time.' },
];

/* ── SHEET CACHE ─────────────────────────────────────────── */
const CACHE_KEY = 'sweetbliss_sheet_v1';

function saveSheetCache(rows) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), rows })); } catch(e) {}
}

function applySheetCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return;
    const { rows } = JSON.parse(raw);
    if (!rows || !rows.length) return;
    applyRows(rows);
  } catch(e) {}
}

function applyRows(rows) {
  rows.forEach(row => {
    const prod = PRODUCT_CATALOGUE.find(p => p.id === Number(row.id));
    if (!prod) return;
    if (row.name      && row.name      !== '') prod.name     = row.name;
    if (row.price     && row.price     !== '') prod.price    = Number(row.price);
    if (row.oldPrice  !== undefined)           prod.oldPrice = row.oldPrice ? Number(row.oldPrice) : null;
    if (row.badge     !== undefined)           prod.badge    = row.badge    || null;
    if (row.badgeType !== undefined)           prod.badgeType= row.badgeType|| null;
    if (row.category  && row.category  !== '') prod.category = row.category.toLowerCase();
    if (row.weight    && row.weight    !== '') prod.weight   = row.weight;
    if (row.desc      && row.desc      !== '') prod.desc     = row.desc;
    if (row.active    !== undefined)           prod.active   = row.active.toString().toUpperCase() !== 'FALSE';
    if (row.rating    && row.rating    !== '') prod.rating   = Number(row.rating);
  });
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = []; let cur = '', inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { values.push(cur.trim()); cur = ''; }
      else cur += ch;
    }
    values.push(cur.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (values[i] || '').replace(/^"|"$/g, ''); });
    return obj;
  });
}

async function fetchSheetData() {
  const result = { changed: false };
  if (!SHEETS_CSV_URL) return result;
  try {
    const res = await fetch(SHEETS_CSV_URL + '&t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) return result;
    const rows = parseCSV(await res.text());
    applyRows(rows);
    saveSheetCache(rows);
    result.changed = true;
  } catch(e) { console.warn('Sheet fetch failed:', e.message); }
  return result;
}

/* Apply cache immediately so first render is up-to-date */
applySheetCache();

/* ── CART ─────────────────────────────────────────────────── */
function getCart()   { return JSON.parse(localStorage.getItem('sb_cart') || '[]'); }
function saveCart(c) { localStorage.setItem('sb_cart', JSON.stringify(c)); updateCartBadge(); }

function addToCart(item) {
  const cart = getCart();
  const ex = cart.find(c => c.id === item.id);
  if (ex) ex.qty += 1; else cart.push({ ...item, qty: 1 });
  saveCart(cart);
  showToast(`${item.name} added to cart! 🎂`);
  updateFloatBar();
}

function removeFromCart(id) { saveCart(getCart().filter(c => c.id !== id)); updateFloatBar(); }

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
}

function updateCartBadge() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

/* ── TOAST ─────────────────────────────────────────────────── */
function showToast(msg, icon = '') {
  let t = document.getElementById('pf-toast');
  if (!t) { t = document.createElement('div'); t.id = 'pf-toast'; document.body.appendChild(t); }
  t.innerHTML = icon ? `${icon} ${msg}` : msg;
  t.style.transform = 'translateX(-50%) translateY(0)';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(80px)'; t.style.opacity = '0'; }, 2500);
}

/* ── FLOATING CART BAR ─────────────────────────────────────── */
function updateFloatBar() {
  const bar = document.getElementById('sbFloatBar');
  if (!bar) return;
  const cart = getCart();
  const n = cart.reduce((s, i) => s + i.qty, 0);
  const t = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('sbFcbBadge').textContent = n;
  document.getElementById('sbFcbTotal').textContent = CURRENCY + t.toLocaleString('en-IN');
  if (n > 0) bar.classList.add('up'); else bar.classList.remove('up');
}

function buildFloatBar() {
  if (document.getElementById('sbFloatBar')) return;
  const bar = document.createElement('div');
  bar.id = 'sbFloatBar';
  bar.className = 'float-cart-bar';
  bar.setAttribute('data-open-cart', '');
  bar.innerHTML = `
    <div class="fcb-left">
      <span class="fcb-badge" id="sbFcbBadge">0</span>
      <span>View Your Order</span>
    </div>
    <span class="fcb-total" id="sbFcbTotal">${CURRENCY}0</span>`;
  document.body.appendChild(bar);
}

/* ── CART DRAWER ─────────────────────────────────────────── */
function buildCartDrawer() {
  if (document.getElementById('pfCartDrawer')) return;
  const d = document.createElement('div'); d.id = 'pfCartDrawer';
  d.innerHTML = `
    <div id="pfCartBackdrop"></div>
    <div id="pfCartPanel">
      <div class="pf-cart-head">
        <h3>🛒 Your Order</h3>
        <button id="pfCartClose">✕</button>
      </div>
      <div id="pfCartItems"></div>
      <div id="pfCartFooter">
        <div id="pfCartTotal"></div>
        <button id="pfWhatsappBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Order on WhatsApp
        </button>
        <button id="pfClearCart">Clear Cart</button>
      </div>
    </div>`;
  document.body.appendChild(d);
  document.getElementById('pfCartBackdrop').addEventListener('click', closeCart);
  document.getElementById('pfCartClose').addEventListener('click', closeCart);
  document.getElementById('pfWhatsappBtn').addEventListener('click', () => { closeCart(); setTimeout(openAddressModal, 300); });
  document.getElementById('pfClearCart').addEventListener('click', () => { saveCart([]); renderCartDrawer(); updateFloatBar(); });
}

function openCart()  { document.getElementById('pfCartDrawer').classList.add('open'); renderCartDrawer(); document.body.style.overflow = 'hidden'; }
function closeCart() { document.getElementById('pfCartDrawer').classList.remove('open'); document.body.style.overflow = ''; }

function renderCartDrawer() {
  const cart = getCart();
  const itemsEl  = document.getElementById('pfCartItems');
  const footerEl = document.getElementById('pfCartFooter');
  const totalEl  = document.getElementById('pfCartTotal');

  if (!cart.length) {
    itemsEl.innerHTML = `<div class="pf-cart-empty"><div>🛒</div><p>Your cart is empty</p></div>`;
    footerEl.style.display = 'none'; return;
  }
  footerEl.style.display = 'flex';

  itemsEl.innerHTML = cart.map(item => {
    const prod = PRODUCT_CATALOGUE.find(p => p.id === item.id);
    const src = prod ? imgPath(prod.img) : '';
    return `<div class="pf-cart-item">
      ${src ? `<img class="pf-cart-img" src="${src}" alt="${item.name}">` : ''}
      <div class="pf-ci-info">
        <div class="pf-ci-name">${item.name}</div>
        <div class="pf-ci-price">${CURRENCY}${(item.price * item.qty).toLocaleString('en-IN')}</div>
        <div class="pf-ci-qty">
          <button class="pf-qty-btn" data-id="${item.id}" data-action="dec">−</button>
          <span class="pf-qty-num">${item.qty}</span>
          <button class="pf-qty-btn" data-id="${item.id}" data-action="inc">+</button>
        </div>
      </div>
      <button class="pf-ci-del" data-id="${item.id}">✕</button>
    </div>`;
  }).join('');

  const grand = cart.reduce((s, i) => s + i.price * i.qty, 0);
  totalEl.innerHTML = `<span>Total</span><span>${CURRENCY}${grand.toLocaleString('en-IN')}</span>`;

  itemsEl.querySelectorAll('.pf-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      changeQty(id, btn.dataset.action === 'inc' ? 1 : -1);
      renderCartDrawer(); updateFloatBar();
      syncAllCardStates();
    });
  });
  itemsEl.querySelectorAll('.pf-ci-del').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.dataset.id));
      renderCartDrawer(); updateFloatBar();
      syncAllCardStates();
    });
  });
}

/* ── PRODUCT CARD WIRING ─────────────────────────────────── */
function wireAddButton(card, productId) {
  const prod = PRODUCT_CATALOGUE.find(p => p.id === productId);
  if (!prod) return;
  const addBtn  = card.querySelector('.add-btn');
  const counter = card.querySelector('.qty-counter');
  const qtyNum  = card.querySelector('.qty-num');
  if (!addBtn || !counter || !qtyNum) return;

  function syncState() {
    const item = getCart().find(c => c.id === productId);
    if (item && item.qty > 0) {
      addBtn.style.display  = 'none';
      counter.style.display = 'flex';
      qtyNum.textContent    = item.qty;
    } else {
      addBtn.style.display  = '';
      counter.style.display = 'none';
    }
  }
  card._syncState = syncState;
  syncState();

  addBtn.addEventListener('click', e => {
    e.stopPropagation();
    addToCart({ id: prod.id, name: prod.name, price: prod.price, img: prod.img, weight: prod.weight });
    syncState(); updateFloatBar();
  });
  card.querySelector('.qty-inc')?.addEventListener('click', e => {
    e.stopPropagation();
    addToCart({ id: prod.id, name: prod.name, price: prod.price, img: prod.img, weight: prod.weight });
    syncState(); updateFloatBar();
  });
  card.querySelector('.qty-dec')?.addEventListener('click', e => {
    e.stopPropagation();
    changeQty(productId, -1);
    const it = getCart().find(c => c.id === productId);
    if (!it || it.qty <= 0) removeFromCart(productId);
    syncState(); updateFloatBar();
  });
  window.addEventListener('storage', syncState);
}

function syncAllCardStates() {
  document.querySelectorAll('[data-product-id]').forEach(card => {
    if (typeof card._syncState === 'function') card._syncState();
  });
}

/* ── PRODUCT DETAIL MODAL ────────────────────────────────── */
let detailQty = 1;
let detailProd = null;

function buildDetailModal() {
  if (document.getElementById('sbDetailOverlay')) return;
  const el = document.createElement('div');
  el.id = 'sbDetailOverlay';
  el.className = 'detail-overlay';
  el.innerHTML = `
    <div class="detail-modal" id="sbDetailModal">
      <div class="detail-modal-img"><img id="dmImg" src="" alt=""></div>
      <div class="detail-modal-body">
        <div class="dm-tag" id="dmTag"></div>
        <div class="dm-name" id="dmName"></div>
        <div class="dm-price-row">
          <span class="dm-price" id="dmPrice"></span>
          <span class="dm-old"  id="dmOld"></span>
        </div>
        <span class="dm-weight" id="dmWeight"></span>
        <div class="dm-desc"  id="dmDesc"></div>
        <div class="dm-qty-row">
          <div class="dm-qty-ctrl">
            <button class="dm-q-btn" id="dmDec">−</button>
            <span class="dm-q-num"   id="dmQty">1</span>
            <button class="dm-q-btn" id="dmInc">+</button>
          </div>
          <span style="font-size:0.78rem;color:var(--txt-light)">qty</span>
        </div>
        <button class="dm-add-btn" id="dmAddBtn">
          <svg width="16" height="16" viewBox="0 0 46 46" fill="none"><path d="M14.2 9L10 14.6V34.2C10 34.94 10.3 35.65 10.82 36.18C11.35 36.7 12.06 37 12.8 37H32.4C33.14 37 33.86 36.7 34.38 36.18C34.9 35.65 35.2 34.94 35.2 34.2V14.6L31 9H14.2Z" stroke="white" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14.6H35.2" stroke="white" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Add to Order
        </button>
      </div>
      <button class="detail-close" id="dmClose">✕</button>
    </div>`;
  document.body.appendChild(el);

  el.addEventListener('click', e => { if (e.target === el) closeDetailModal(); });
  document.getElementById('dmClose').addEventListener('click', closeDetailModal);
  document.getElementById('dmInc').addEventListener('click', () => { detailQty++; document.getElementById('dmQty').textContent = detailQty; });
  document.getElementById('dmDec').addEventListener('click', () => { detailQty = Math.max(1, detailQty - 1); document.getElementById('dmQty').textContent = detailQty; });
  document.getElementById('dmAddBtn').addEventListener('click', () => {
    if (!detailProd) return;
    for (let i = 0; i < detailQty; i++) {
      addToCart({ id: detailProd.id, name: detailProd.name, price: detailProd.price, img: detailProd.img, weight: detailProd.weight });
    }
    // adjust qty manually after repeated addToCart
    const cart = getCart();
    const item = cart.find(c => c.id === detailProd.id);
    if (item) { item.qty = detailQty; saveCart(cart); }
    updateFloatBar();
    syncAllCardStates();
    closeDetailModal();
    showToast(`${detailProd.name} added!`);
  });
}

function openDetailModal(productId) {
  buildDetailModal();
  const prod = PRODUCT_CATALOGUE.find(p => p.id === productId);
  if (!prod) return;
  detailProd = prod;
  detailQty = 1;
  document.getElementById('dmImg').src = imgPath(prod.img);
  document.getElementById('dmTag').textContent   = prod.badge || prod.category;
  document.getElementById('dmName').textContent  = prod.name;
  document.getElementById('dmPrice').textContent = CURRENCY + prod.price.toLocaleString('en-IN');
  const oldEl = document.getElementById('dmOld');
  oldEl.textContent = prod.oldPrice ? CURRENCY + prod.oldPrice.toLocaleString('en-IN') : '';
  document.getElementById('dmWeight').textContent = prod.weight || '';
  document.getElementById('dmDesc').textContent  = prod.desc || '';
  document.getElementById('dmQty').textContent   = 1;
  document.getElementById('sbDetailOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  const el = document.getElementById('sbDetailOverlay');
  if (el) el.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── ADDRESS + DELIVERY MODAL ────────────────────────────── */
function buildAddressModal() {
  if (document.getElementById('pfAddressModal')) return;
  const el = document.createElement('div'); el.id = 'pfAddressModal';
  el.innerHTML = `
    <div id="pfAddressBox">
      <div id="pfAddressHead"><h3>📦 Delivery Details</h3><button id="pfAddressClose">✕</button></div>
      <div id="pfAddressBody">
        <label>Full Name *</label>
        <input type="text" id="pfName" placeholder="e.g. Priya Sharma">
        <label>Phone / WhatsApp *</label>
        <input type="tel" id="pfPhone" placeholder="e.g. 9876543210">
        <label>Delivery Slot *</label>
        <div id="pfSlotPicker">
          <button class="pf-slot-btn" data-slot="🌅 Morning (9am–12pm)">🌅 Morning<span>9am – 12pm</span></button>
          <button class="pf-slot-btn" data-slot="🌆 Evening (5pm–8pm)">🌆 Evening<span>5pm – 8pm</span></button>
        </div>
        <label>Full Address *</label>
        <textarea id="pfStreet" rows="2" placeholder="Flat / House No, Street, Area"></textarea>
        <label>City *</label>
        <input type="text" id="pfCity" placeholder="e.g. Pune">
        <label>Pincode *</label>
        <input type="text" id="pfPin" placeholder="e.g. 411001">
        <label>Special Note (optional)</label>
        <textarea id="pfNote" rows="2" placeholder="Allergens, custom message on cake…"></textarea>
        <button id="pfConfirmBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Confirm &amp; Order on WhatsApp
        </button>
      </div>
    </div>`;
  document.body.appendChild(el);

  let selectedSlot = '';
  document.getElementById('pfAddressClose').addEventListener('click', closeAddressModal);
  el.addEventListener('click', e => { if (e.target === el) closeAddressModal(); });
  document.querySelectorAll('.pf-slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pf-slot-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected'); selectedSlot = btn.dataset.slot;
    });
  });

  document.getElementById('pfConfirmBtn').addEventListener('click', () => {
    const name   = document.getElementById('pfName').value.trim();
    const phone  = document.getElementById('pfPhone').value.trim();
    const street = document.getElementById('pfStreet').value.trim();
    const city   = document.getElementById('pfCity').value.trim();
    const pin    = document.getElementById('pfPin').value.trim();
    const note   = document.getElementById('pfNote').value.trim();
    if (!name || !phone || !street || !city || !pin) { showToast('Please fill all required fields ⚠️'); return; }
    if (!selectedSlot) { showToast('Please select a delivery slot ⚠️'); return; }
    localStorage.setItem('sb_addr', JSON.stringify({ name, phone, street, city, pin }));
    const cart = getCart();
    if (!cart.length) { showToast('Your cart is empty! ⚠️'); return; }
    let msg = `🎂 *New Order — ${SHOP_NAME}*\n\n*ITEMS:*\n`;
    let total = 0;
    cart.forEach(i => { const sub = i.price * i.qty; msg += `• *${i.name}* ×${i.qty} — ${CURRENCY}${sub.toLocaleString('en-IN')}\n`; total += sub; });
    msg += `\n*Total: ${CURRENCY}${total.toLocaleString('en-IN')}*\n⏰ *Slot:* ${selectedSlot}\n`;
    msg += `\n━━━━━━━━━━━━━━━━━━\n*DELIVERY:*\n👤 ${name}\n📞 ${phone}\n📍 ${street}, ${city} — ${pin}`;
    if (note) msg += `\n📝 ${note}`;
    msg += '\n━━━━━━━━━━━━━━━━━━\nPlease confirm my order 🙏';
    closeAddressModal();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

function openAddressModal() {
  buildAddressModal();
  const s = JSON.parse(localStorage.getItem('sb_addr') || '{}');
  if (s.name)   document.getElementById('pfName').value   = s.name;
  if (s.phone)  document.getElementById('pfPhone').value  = s.phone;
  if (s.street) document.getElementById('pfStreet').value = s.street;
  if (s.city)   document.getElementById('pfCity').value   = s.city;
  if (s.pin)    document.getElementById('pfPin').value    = s.pin;
  document.getElementById('pfAddressModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAddressModal() {
  const m = document.getElementById('pfAddressModal');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── NAV SHARED ──────────────────────────────────────────── */
function buildNav(activePage) {
  const isPages = window.location.pathname.includes('/pages/');
  const root = isPages ? '../' : '';
  const links = [
    { href: root + 'index.html',            label: 'Home',    key: 'home' },
    { href: root + 'pages/about.html',      label: 'About',   key: 'about' },
    { href: root + 'pages/menu.html',       label: 'Menu',    key: 'menu' },
    { href: root + 'pages/gallery.html',    label: 'Gallery', key: 'gallery' },
    { href: root + 'pages/contact.html',    label: 'Contact', key: 'contact' },
  ];
  const navHTML = `
    <div class="mobile-drawer" id="drawer">
      <button class="drawer-close" id="drawerClose">✕</button>
      ${links.map(l => `<a href="${l.href}"${l.key === activePage ? ' class="active"' : ''}>${l.label}</a>`).join('')}
    </div>
    <nav class="sb-nav" id="sbNav">
      <a href="${root}index.html" class="nav-logo">Sweet<span>Bliss</span></a>
      <ul class="nav-links">
        ${links.map(l => `<li><a href="${l.href}"${l.key === activePage ? ' class="active"' : ''}>${l.label}</a></li>`).join('')}
      </ul>
      <div class="nav-right">
        <button class="nav-cart-btn" data-open-cart>
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><path d="M12 29.33C12.74 29.33 13.33 28.74 13.33 28C13.33 27.26 12.74 26.67 12 26.67C11.26 26.67 10.67 27.26 10.67 28C10.67 28.74 11.26 29.33 12 29.33Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M26.67 29.33C27.4 29.33 28 28.74 28 28C28 27.26 27.4 26.67 26.67 26.67C25.93 26.67 25.33 27.26 25.33 28C25.33 28.74 25.93 29.33 26.67 29.33Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.33 1.33H6.67L10.24 19.19C10.36 19.8 10.7 20.35 11.18 20.74C11.67 21.14 12.28 21.35 12.91 21.33H25.87C26.49 21.35 27.1 21.14 27.59 20.74C28.08 20.35 28.41 19.8 28.53 19.19L30.67 8H8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Cart&nbsp;<span class="cart-count">0</span>
        </button>
        <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
      </div>
    </nav>`;
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  // Hamburger
  const ham = document.getElementById('hamburger');
  ham.addEventListener('click', () => { ham.classList.toggle('open'); document.getElementById('drawer').classList.toggle('open'); });
  document.getElementById('drawerClose').addEventListener('click', () => { ham.classList.remove('open'); document.getElementById('drawer').classList.remove('open'); });
  // Scroll
  window.addEventListener('scroll', () => {
    document.getElementById('sbNav').classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ── MARQUEE ─────────────────────────────────────────────── */
function buildMarquee() {
  const items = ['Fresh Cakes Daily','Custom Orders Welcome','Same-Day Delivery','Premium Ingredients','Made with Love','No Preservatives','Gift Wrapping Available','Free Delivery Over ₹1000'];
  const wrap = document.createElement('div'); wrap.className = 'marquee-wrap';
  const track = document.createElement('div'); track.className = 'marquee-track';
  track.innerHTML = [...items, ...items].map(i => `<span class="marquee-item">${i} <span class="marquee-sep">✦</span></span>`).join('');
  wrap.appendChild(track);
  return wrap;
}

/* ── FOOTER ──────────────────────────────────────────────── */
function buildFooter() {
  const isPages = window.location.pathname.includes('/pages/');
  const root = isPages ? '../' : '';
  return `<footer class="sb-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${root}index.html" class="nav-logo">Sweet<span>Bliss</span></a>
        <p>Handcrafted cakes for every occasion. Made fresh daily, delivered with love.</p>
        <div class="footer-soc">
          <a href="#" class="soc-btn" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
          <a href="#" class="soc-btn" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href="https://wa.me/${WHATSAPP_NUMBER}" class="soc-btn" aria-label="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.093.539 4.061 1.487 5.774L0 24l6.384-1.464A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.859 0-3.6-.498-5.1-1.361l-.364-.217-3.791.869.899-3.695-.238-.381A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul class="footer-list">
          <li><a href="${root}index.html">Home</a></li>
          <li><a href="${root}pages/about.html">About</a></li>
          <li><a href="${root}pages/menu.html">Menu</a></li>
          <li><a href="${root}pages/gallery.html">Gallery</a></li>
          <li><a href="${root}pages/contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Info</h4>
        <ul class="footer-list">
          <li>123 Bakery Lane, Sweet City</li>
          <li>+91 98765 43210</li>
          <li>hello@sweetbliss.com</li>
          <li>Mon–Sat: 9am – 8pm</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Sweet Bliss Cake Shop. All rights reserved.</span>
      <span>Made with ❤️ for cake lovers</span>
    </div>
  </footer>`;
}

/* ── PRODUCT CARD HTML ───────────────────────────────────── */
function productCardHTML(prod) {
  const badgeClass = { disc:'', new:'new', seasonal:'seasonal', chef:'chef', organic:'seasonal', bestseller:'', best:'', fresh:'new' }[prod.badgeType] || '';
  const stars = '★'.repeat(Math.round(prod.rating)) + '☆'.repeat(5 - Math.round(prod.rating));
  return `
    <div class="p-card" data-product-id="${prod.id}" data-category="${prod.category}">
      <div class="p-card-img">
        <img src="${imgPath(prod.img)}" alt="${prod.name}" loading="lazy">
        ${prod.badge ? `<div class="p-badge ${badgeClass}">${prod.badge}</div>` : ''}
      </div>
      <div class="p-card-body">
        <div class="p-name">${prod.name}</div>
        <div class="p-weight">${prod.weight}</div>
        <div class="p-price-row">
          <span class="p-price">${CURRENCY}${prod.price.toLocaleString('en-IN')}</span>
          ${prod.oldPrice ? `<span class="p-old-price">${CURRENCY}${prod.oldPrice.toLocaleString('en-IN')}</span>` : ''}
        </div>
        <div class="p-desc">${prod.desc}</div>
        <div class="p-rating"><span class="stars">${stars}</span> ${prod.rating} (${prod.reviews})</div>
        <div class="p-card-foot">
          <button class="p-view-btn btn-view" data-id="${prod.id}">View Details</button>
          <button class="add-btn">Add</button>
          <div class="qty-counter">
            <button class="qty-dec">−</button>
            <span class="qty-num">1</span>
            <button class="qty-inc">+</button>
          </div>
        </div>
      </div>
    </div>`;
}

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildCartDrawer();
  buildDetailModal();
  buildFloatBar();
  updateCartBadge();
  updateFloatBar();

  document.addEventListener('click', e => {
    const cartTrigger = e.target.closest('[data-open-cart]');
    if (cartTrigger) { e.preventDefault(); openCart(); }
  });

  fetchSheetData().then(({ changed }) => {
    if (changed && typeof renderGrid === 'function') renderGrid();
  });
});
