
// سيمباتيك - تطبيق المتجر العالمي - Mobile First
const FALLBACK_PRODUCTS = [
  {id:"P001",name:"منظم مكياج أكريليك 3 طبقات",category:"تنظيم وتخزين",subcategory:"منظمات",description:"منظم شفاف أنيق يحافظ على مكياجك مرتب ويسهل الوصول إليه. مقاوم للغبار بلمسة فاخرة جداً وعصرية.",price:8500,old_price:12000,discount:29,image:"https://images.unsplash.com/photo-1583202075415-3498461f9a39?w=600",images:"",stock:45,featured:true,badge:"الأكثر طلباً",rating:4.9,sku:"SYM-001",availability:"متوفر"},
  {id:"P002",name:"مرآة مضيئة بلمسة ذكية",category:"مرايا وإضاءة",subcategory:"مرايا",description:"مرآة مكياج بإضاءة LED بثلاث درجات، شحن USB، لمسة بناتية فاخرة تضيء تسريحتك.",price:14500,old_price:18000,discount:19,image:"https://images.unsplash.com/photo-1526045478515-99145907023c?w=600",images:"",stock:20,featured:true,badge:"جديد",rating:4.8,sku:"SYM-002",availability:"متوفر"},
  {id:"P003",name:"سلة تخزين قماش بفيونكة",category:"تنظيم وتخزين",subcategory:"سلال",description:"سلة تخزين ناعمة للملابس أو الألعاب أو المكياج، قماش سميك بلمسة بناتية.",price:4200,old_price:5500,discount:23,image:"https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",images:"",stock:100,featured:false,badge:"",rating:4.7,sku:"SYM-003",availability:"متوفر"},
  {id:"P004",name:"حامل إكسسوارات دوار",category:"عناية وجمال",subcategory:"حوامل",description:"حامل دوار 360 درجة لعرض العقود والخواتم بطريقة فاخرة.",price:6800,old_price:8500,discount:20,image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",images:"",stock:35,featured:true,badge:"عرض خاص",rating:4.8,sku:"SYM-004",availability:"متوفر"},
  {id:"P005",name:"فواحة كهربائية لؤلؤة",category:"عطور وفواحات",subcategory:"فواحات",description:"فواحة عطرية بتصميم لؤلؤي، إضاءة دافئة، تعمل بهدوء وتناسب غرفة النوم.",price:11200,old_price:15000,discount:25,image:"https://images.unsplash.com/photo-1608571423902-eed4a94d8108?w=600",images:"",stock:28,featured:true,badge:"جديد",rating:4.9,sku:"SYM-005",availability:"متوفر"},
  {id:"P006",name:"حامل فرش مكياج رخامي",category:"عناية وجمال",subcategory:"حوامل",description:"حامل فاخر بتصميم رخامي وردي لحفظ الفرش بشكل أنيق على التسريحة.",price:3500,old_price:5000,discount:30,image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",images:"",stock:80,featured:true,badge:"الأكثر طلباً",rating:4.9,sku:"SYM-006",availability:"متوفر"},
  {id:"P007",name:"شموع معطرة فانيلا طقم 2",category:"ديكور وشمعدانات",subcategory:"شموع",description:"شموع صويا طبيعية برائحة الفانيلا الدافئة في كوب زجاجي أنيق.",price:5600,old_price:7000,discount:20,image:"https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600",images:"",stock:8,featured:false,badge:"",rating:4.6,sku:"SYM-007",availability:"متوفر"},
  {id:"P008",name:"علبة مجوهرات مخملية بمرآة",category:"حقائب ومنظمات سفر",subcategory:"علب",description:"علبة صغيرة فاخرة بمرآة داخلية، مثالية للسفر والهدايا.",price:9200,old_price:12000,discount:23,image:"https://images.unsplash.com/photo-15891287770967771748646-263566ae5e4d?w=600",images:"",stock:30,featured:false,badge:"جديد",rating:4.8,sku:"SYM-008",availability:"متوفر"},
];

const CAT_ICONS = {
  "تنظيم وتخزين":"🧸",
  "مرايا وإضاءة":"💡",
  "عناية وجمال":"💅",
  "عطور وفواحات":"🌸",
  "مطبخ لطيف":"🍰",
  "ديكور وشمعدانات":"🕯️",
  "حقائب ومنظمات سفر":"✈️",
  "هدايا وتغليف":"🎁",
  "إكسسوارات":"✨",
  "أدوات منزلية":"🏠",
  "أدوات مكتبية":"📎"
};

let state = {
  products: [],
  filtered: [],
  category: null,
  search: "",
  sort: "default",
  showAvailableOnly: false,
  activeProduct: null,
  selectedColor: "",
  qty: 1,
  cart: JSON.parse(localStorage.getItem('sympatik_cart')||'[]'),
  favs: JSON.parse(localStorage.getItem('sympatik_fav')||'[]')
};

// Utils
function parseCSV(text){
  const rows=[]; let field='', row=[], inQ=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(c=='"'){
      if(inQ && text[i+1]=='"'){ field+='"'; i++; continue; }
      inQ=!inQ; continue;
    }
    if(c==',' && !inQ){ row.push(field); field=''; continue; }
    if((c=='\n' || c=='\r') && !inQ){
      row.push(field);
      if(row.join('').trim()) rows.push(row);
      field=''; row=[];
      if(c=='\r' && text[i+1]=='\n') i++;
      continue;
    }
    field+=c;
  }
  if(field||row.length){ row.push(field); rows.push(row); }
  if(!rows.length) return [];
  const headers = rows[0].map(h=>h.trim().toLowerCase());
  return rows.slice(1).filter(r=>r.join('').trim()).map(r=>{
    const o={}; headers.forEach((h,i)=>o[h]=(r[i]||'').trim()); return o;
  });
}

function normalizeProduct(p){
  // دعم البنية الجديدة والقديمة
  const id = (p.id || p.sku || '').trim();
  const name = (p.name || '').trim();
  const category = (p.category || 'تنظيم وتخزين').trim();
  const subcategory = (p.subcategory || '').trim();
  const description = (p.description || '').trim();
  const price = parseInt((p.price||'0').toString().replace(/[^0-9]/g,''))||0;
  const old_price = parseInt((p.old_price||p.oldprice||'0').toString().replace(/[^0-9]/g,''))||0;
  let discount = parseInt(p.discount||p.discount_percent||0)||0;
  if(!discount && old_price>price) discount = Math.round((old_price-price)/old_price*100);
  const image = (p.image || p.image_url || p.imageurl || '').trim();
  const images = (p.images || '').trim();
  const stock = parseInt(p.stock||p.stock_quantity||'0')||0;
  const featured = (p.featured||'').toString().toLowerCase()==='true' || p.featured===true;
  const badge = (p.badge||'').trim();
  const rating = parseFloat(p.rating||'4.8')||4.8;
  const sku = (p.sku||id||'').trim();
  const availability = (p.availability|| (stock>0?'متوفر':'غير متوفر')).trim();
  const material = (p.material||'').trim();
  const colors = (p.colors||p.color||'').trim();
  const size = (p.size||'').trim();
  const sort_order = parseInt(p.sort_order||'0')||0;

  return {id,name,category,subcategory,description,price,old_price,discount,image,images,stock,featured,badge,rating,sku,availability,material,colors,size,sort_order};
}

function cleanAndSort(products){
  return products
    .filter(p=>p.name && p.price>0 && p.id)
    .filter(p=>!isNaN(p.price))
    .sort((a,b)=> (b.featured?1:0)-(a.featured?1:0) || b.sort_order-a.sort_order || b.stock-a.stock);
}

function placeholderImg(){
  return "https://images.unsplash.com/photo-1583202075415-3498461f9a39?w=600";
}

// Render
function renderCategories(){
  const cats = [...new Set(state.products.map(p=>p.category))].filter(Boolean);
  const el = document.getElementById('cats');
  if(!el) return;
  el.innerHTML = cats.map(c=>{
    const active = state.category===c;
    return `<button data-cat="${c}" class="cat-card ${active?'active':''}">
      <div class="cat-icon">${CAT_ICONS[c]||'🎀'}</div>
      <span class="cat-name">${c}</span>
    </button>`;
  }).join('');
  el.querySelectorAll('[data-cat]').forEach(b=>{
    b.addEventListener('click',()=>{
      state.category = state.category===b.dataset.cat?null:b.dataset.cat;
      document.getElementById('clearCat').style.display = state.category?'inline-flex':'none';
      applyFilters();
      renderCategories();
      document.getElementById('productsSection').scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
}

function applyFilters(){
  let list = [...state.products];
  if(state.category) list = list.filter(p=>p.category===state.category);
  if(state.search){
    const q = state.search.toLowerCase();
    list = list.filter(p=> p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || (p.subcategory&&p.subcategory.toLowerCase().includes(q)));
  }
  if(state.showAvailableOnly) list = list.filter(p=>p.availability.includes('متوفر')||p.stock>0);
  // sort
  if(state.sort==='price_low') list.sort((a,b)=>a.price-b.price);
  if(state.sort==='price_high') list.sort((a,b)=>b.price-a.price);
  if(state.sort==='newest') list.sort((a,b)=>b.sort_order-a.sort_order);
  if(state.sort==='discount') list.sort((a,b)=>b.discount-a.discount);
  if(state.sort==='popular') list.sort((a,b)=>b.rating-a.rating);
  if(state.sort==='default') list = cleanAndSort(list);
  state.filtered = list;
  document.getElementById('pTitle').textContent = state.category?`قسم ${state.category} ${CAT_ICONS[state.category]||''}`:'كل المنتجات 💖';
  document.getElementById('pCount').textContent = `${list.length} منتج`;
  renderProducts();
  renderSuggest();
}

function renderProducts(){
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  if(!state.filtered.length){
    grid.innerHTML=''; empty.style.display='block'; return;
  }
  empty.style.display='none';
  grid.innerHTML = state.filtered.map(p=>{
    const fav = state.favs.includes(p.id);
    const stockClass = p.stock<=0||p.availability.includes('غير')?'stock-out':p.stock<10?'stock-low':'stock-ok';
    const stockText = p.stock<=0?'نفذ':p.stock<10?`باقي ${p.stock}`:'متوفر';
    return `<div class="product-card" data-id="${p.id}">
      <button class="p-fav" data-fav="${p.id}">${fav?'❤️':'🤍'}</button>
      <div class="p-img-wrap">
        ${p.badge?`<span class="p-badge">${p.badge}</span>`:''}
        ${p.discount?`<span class="p-discount">-${p.discount}%</span>`:''}
        <img class="p-img" src="${p.image||placeholderImg()}" alt="${p.name}" loading="lazy" onerror="this.src='${placeholderImg()}'">
      </div>
      <div class="p-body">
        <div class="p-name">${p.name}</div>
        <div class="p-price-row">
          <span class="p-price">${p.price.toLocaleString('ar-EG')} ر.ي</span>
          ${p.old_price?`<span class="p-old">${p.old_price.toLocaleString('ar-EG')}</span>`:''}
        </div>
        <div class="p-foot">
          <span class="p-stock ${stockClass}">${stockText}</span>
          <span class="p-cart">🛒</span>
        </div>
      </div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.product-card').forEach(el=>{
    el.addEventListener('click',(e)=>{
      if(e.target.closest('[data-fav]')) return;
      openModal(el.dataset.id);
    });
  });
  grid.querySelectorAll('[data-fav]').forEach(b=>{
    b.addEventListener('click',(e)=>{
      e.stopPropagation();
      toggleFav(b.dataset.fav);
    });
  });
  updateCartCount();
}

function renderSuggest(){
  const box = document.getElementById('searchSuggest');
  if(!box) return;
  const q = state.search;
  if(!q || q.length<2){ box.style.display='none'; return; }
  const matches = state.products.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())).slice(0,5);
  if(!matches.length){ box.style.display='none'; return; }
  box.innerHTML = matches.map(p=>`<button data-sid="${p.id}" style="width:100%;display:flex;gap:10px;padding:8px;border-radius:12px;text-align:right" class="hover:bg-[#FFF5F7]"><img src="${p.image}" style="width:40px;height:40px;border-radius:8px;object-fit:cover"><div style="flex:1"><div style="font-size:12px;font-weight:800">${p.name}</div><div style="font-size:10px;color:#E11D48;font-weight:800">${p.price.toLocaleString('ar-EG')} ر.ي</div></div></button>`).join('');
  box.style.display='block';
  box.querySelectorAll('[data-sid]').forEach(b=>b.addEventListener('click',()=>{ openModal(b.dataset.sid); box.style.display='none'; }));
}

function toggleFav(id){
  if(state.favs.includes(id)) state.favs = state.favs.filter(f=>f!==id);
  else state.favs.push(id);
  localStorage.setItem('sympatik_fav', JSON.stringify(state.favs));
  renderProducts();
  if(state.activeProduct && state.activeProduct.id===id) updateFavBtn();
}

function updateFavBtn(){
  const btn = document.getElementById('mFav');
  if(!btn || !state.activeProduct) return;
  const isFav = state.favs.includes(state.activeProduct.id);
  btn.textContent = isFav?'❤️':'🤍';
  btn.style.background = isFav?'#FFE4EC':'#FFF5F7';
}

function openModal(id){
  const p = state.products.find(x=>x.id===id) || state.filtered.find(x=>x.id===id);
  if(!p) return;
  state.activeProduct = p;
  state.selectedColor = (p.colors? p.colors.split(',')[0].trim() : '');
  state.qty = 1;
  document.getElementById('mImg').src = p.image || placeholderImg();
  document.getElementById('mName').textContent = p.name;
  document.getElementById('mDesc').textContent = p.description || 'منتج بناتي فاخر مختار بعناية.';
  document.getElementById('mPrice').textContent = p.price.toLocaleString('ar-EG')+' ر.ي';
  document.getElementById('mOld').textContent = p.old_price? p.old_price.toLocaleString('ar-EG')+' ر.ي' : '';
  const disc = document.getElementById('mDisc');
  if(p.old_price && p.old_price>p.price){
    const per = Math.round((p.old_price-p.price)/p.old_price*100);
    disc.textContent = `وفري ${per}%`;
    disc.style.display='inline-flex';
  } else disc.style.display='none';
  document.getElementById('mBadges').innerHTML = `${p.badge?`<span class="m-badge m-badge-new">${p.badge}</span>`:''}<span class="m-badge m-badge-stock">${p.availability}</span><span class="m-badge" style="background:#fff;border:1px solid var(--line)">SKU: ${p.sku}</span>`;
  document.getElementById('mSpecs').innerHTML = `
    ${p.material?`<div class="m-spec"><span>الخامة:</span><span>${p.material}</span></div>`:''}
    ${p.size?`<div class="m-spec"><span>المقاس:</span><span>${p.size}</span></div>`:''}
    ${p.colors?`<div class="m-spec"><span>الألوان:</span><span>${p.colors}</span></div>`:''}
    ${p.sku?`<div class="m-spec"><span>SKU:</span><span>${p.sku}</span></div>`:''}
    <div class="m-spec"><span>التوفر:</span><span>${p.stock? p.stock+' قطعة متوفرة':'متوفر'}</span></div>
    <div class="m-spec"><span>التوصيل:</span><span>كل اليمن • مجاني فوق ${SYMPATIK_CONFIG.FREE_SHIPPING_THRESHOLD.toLocaleString('ar-EG')} ر.ي (صنعاء وعمران)</span></div>
  `;
  const wrap = document.getElementById('mColorsWrap');
  const cList = document.getElementById('mColors');
  if(p.colors){
    wrap.style.display='block';
    cList.innerHTML = p.colors.split(',').map(c=>c.trim()).filter(Boolean).map(c=>`<button data-col="${c}" class="color-pill ${state.selectedColor===c?'active':''}">${c}</button>`).join('');
    cList.querySelectorAll('.color-pill').forEach(b=>{
      b.addEventListener('click',()=>{
        state.selectedColor=b.dataset.col;
        cList.querySelectorAll('.color-pill').forEach(x=>x.classList.remove('active'));
        b.classList.add('active');
        updateWA();
      });
    });
  } else wrap.style.display='none';
  document.getElementById('qVal').textContent = state.qty;
  updateFavBtn();
  updateFreeShip();
  updateWA();
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
  if(navigator.vibrate) navigator.vibrate(10);
}

function closeModal(){
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow='';
}

function updateFreeShip(){
  if(!state.activeProduct) return;
  const total = state.activeProduct.price * state.qty;
  const rem = SYMPATIK_CONFIG.FREE_SHIPPING_THRESHOLD - total;
  const bar = document.getElementById('freeBarFill');
  const txt = document.getElementById('freeBarText');
  const perc = Math.min(100, (total/SYMPATIK_CONFIG.FREE_SHIPPING_THRESHOLD)*100);
  if(bar) bar.style.width = perc+'%';
  if(txt) txt.textContent = rem<=0? '🎉 مبروك! توصيل مجاني':'باقي '+rem.toLocaleString('ar-EG')+' ر.ي للشحن المجاني';
}

function updateWA(){
  if(!state.activeProduct) return;
  const p = state.activeProduct;
  const msg = `السلام عليكم، أرغب في طلب المنتج التالي من متجر سيمباتيك:%0A%0A1. ${p.name}%0A   - SKU: ${p.sku}%0A   - الكمية: ${state.qty}%0A   - السعر: ${p.price.toLocaleString('ar-EG')} ر.ي%0A   - اللون: ${state.selectedColor||'-'}%0A   - المقاس: ${p.size||'-'}%0A%0Aإجمالي الطلب: ${(p.price*state.qty).toLocaleString('ar-EG')} ر.ي%0A%0A📍 عنواني: %0A`;
  document.getElementById('mWA').href = `${SYMPATIK_CONFIG.WHATSAPP_BASE}?text=${msg}`;
}

function addToCart(){
  if(!state.activeProduct) return;
  const p = state.activeProduct;
  const existing = state.cart.find(c=>c.id===p.id && c.color===state.selectedColor);
  if(existing) existing.qty += state.qty;
  else state.cart.push({id:p.id,name:p.name,price:p.price,image:p.image,color:state.selectedColor,size:p.size,sku:p.sku,qty:state.qty});
  saveCart();
  openCart();
  closeModal();
}

function saveCart(){
  localStorage.setItem('sympatik_cart', JSON.stringify(state.cart));
  updateCartCount();
  renderCart();
}

function updateCartCount(){
  const count = state.cart.reduce((s,c)=>s+c.qty,0);
  const el = document.getElementById('cartCount');
  if(el){
    el.textContent = count;
    el.style.display = count>0?'flex':'none';
  }
  document.getElementById('cartCountMobile') && (document.getElementById('cartCountMobile').textContent = count);
}

function renderCart(){
  const box = document.getElementById('cartItems');
  if(!box) return;
  if(!state.cart.length){
    box.innerHTML = `<div class="empty"><div class="empty-icon">🛒</div><div class="empty-title">السلة فاضية</div><div class="empty-sub">أضيفي منتجات بناتية لطيفة من سيمباتيك</div></div>`;
  } else {
    box.innerHTML = state.cart.map((c,i)=>`
      <div class="cart-item">
        <img src="${c.image||'https://images.unsplash.com/photo-1583202075415-3498461f9a39?w=200'}" alt="${c.name}">
        <div style="flex:1">
          <div style="font-size:12px;font-weight:800;line-height:1.3">${c.name}</div>
          <div style="font-size:10px;color:#7A5A64;margin-top:2px">SKU: ${c.sku} ${c.color?'• '+c.color:''} ${c.size?'• '+c.size:''}</div>
          <div style="margin-top:6px;display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:11px;font-weight:800;color:#E11D48">${c.price.toLocaleString('ar-EG')} ر.ي</span>
            <div style="display:flex;gap:6px;align-items:center">
              <button data-dec="${i}" style="width:24px;height:24px;border-radius:999px;border:1px solid var(--line);background:var(--soft)">−</button>
              <span style="width:18px;text-align:center;font-size:11px;font-weight:800">${c.qty}</span>
              <button data-inc="${i}" style="width:24px;height:24px;border-radius:999px;background:var(--dark);color:#fff">+</button>
            </div>
          </div>
        </div>
        <button data-rem="${i}" style="width:24px;height:24px;border-radius:999px;background:#FFE4E4;font-size:10px">✕</button>
      </div>
    `).join('');
    box.querySelectorAll('[data-dec]').forEach(b=>b.addEventListener('click',()=>{ const it=state.cart[b.dataset.dec]; it.qty=Math.max(1,it.qty-1); saveCart(); }));
    box.querySelectorAll('[data-inc]').forEach(b=>b.addEventListener('click',()=>{ state.cart[b.dataset.inc].qty++; saveCart(); }));
    box.querySelectorAll('[data-rem]').forEach(b=>b.addEventListener('click',()=>{ state.cart.splice(b.dataset.rem,1); saveCart(); }));
  }
  const total = state.cart.reduce((s,c)=>s+c.price*c.qty,0);
  document.getElementById('cartTotal').textContent = total.toLocaleString('ar-EG')+' ر.ي';
  const freeEl = document.getElementById('cartFree');
  if(freeEl){
    const rem = SYMPATIK_CONFIG.FREE_SHIPPING_THRESHOLD-total;
    freeEl.textContent = rem<=0? '🎉 مبروك! توصيل مجاني داخل صنعاء وعمران' : 'باقي '+rem.toLocaleString('ar-EG')+' ر.ي للشحن المجاني';
    freeEl.style.color = rem<=0?'#0B8A3A':'#E11D48';
  }
  const waMsg = `السلام عليكم، أرغب في طلب المنتجات التالية من متجر سيمباتيك:%0A%0A${state.cart.map((c,i)=>`${i+1}. ${c.name}%0A   - SKU: ${c.sku}%0A   - الكمية: ${c.qty}%0A   - السعر: ${c.price.toLocaleString('ar-EG')} ر.ي%0A   - اللون: ${c.color||'-'}%0A`).join('%0A')}%0Aإجمالي الطلب: ${total.toLocaleString('ar-EG')} ر.ي%0A%0A📍 عنواني: %0A`;
  const waBtn = document.getElementById('cartWA');
  if(waBtn) waBtn.href = `${SYMPATIK_CONFIG.WHATSAPP_BASE}?text=${waMsg}`;
}

function openCart(){
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeCart(){
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow='';
}

// Init
async function loadSheet(){
  const skel = document.getElementById('skel');
  try{
    const res = await fetch(SYMPATIK_CONFIG.SHEET_CSV_URL,{cache:'no-store'});
    if(!res.ok) throw new Error('sheet error');
    const txt = await res.text();
    const parsed = parseCSV(txt);
    const normalized = parsed.map(normalizeProduct).filter(p=>p.name && p.price>0);
    state.products = normalized.length? cleanAndSort(normalized) : cleanAndSort(FALLBACK_PRODUCTS.map(normalizeProduct));
  }catch(e){
    console.warn('Fallback products',e);
    state.products = cleanAndSort(FALLBACK_PRODUCTS.map(normalizeProduct));
    document.getElementById('errorBar') && (document.getElementById('errorBar').style.display='flex');
  }
  if(skel) skel.style.display='none';
  state.filtered = [...state.products];
  renderCategories();
  applyFilters();
  updateCartCount();
  renderCart();
  document.getElementById('liveDot') && (document.getElementById('liveDot').textContent = `${state.products.length} منتج • مربوط مباشرة بالشيت`);
  // auto refresh 5min
  setTimeout(loadSheet, 5*60*1000);
}

document.addEventListener('DOMContentLoaded',()=>{
  // events
  document.getElementById('mClose')?.addEventListener('click',closeModal);
  document.getElementById('mBackdrop')?.addEventListener('click',closeModal);
  document.getElementById('mAddCart')?.addEventListener('click',addToCart);
  document.getElementById('qMinus')?.addEventListener('click',()=>{ state.qty=Math.max(1,state.qty-1); document.getElementById('qVal').textContent=state.qty; updateFreeShip(); updateWA(); });
  document.getElementById('qPlus')?.addEventListener('click',()=>{ state.qty++; document.getElementById('qVal').textContent=state.qty; updateFreeShip(); updateWA(); });
  document.getElementById('cartBtn')?.addEventListener('click',openCart);
  document.getElementById('cartBtnMobile')?.addEventListener('click',openCart);
  document.getElementById('cartClose')?.addEventListener('click',closeCart);
  document.getElementById('cartBackdrop')?.addEventListener('click',closeCart);
  document.getElementById('cartContinue')?.addEventListener('click',closeCart);
  document.getElementById('clearCat')?.addEventListener('click',()=>{ state.category=null; document.getElementById('clearCat').style.display='none'; applyFilters(); renderCategories(); });
  document.getElementById('sortSelect')?.addEventListener('change',(e)=>{ state.sort=e.target.value; applyFilters(); });
  document.getElementById('availFilter')?.addEventListener('change',(e)=>{ state.showAvailableOnly=e.target.checked; applyFilters(); });
  const searchD = document.getElementById('searchD');
  const searchM = document.getElementById('searchM');
  const onSearch = (v)=>{ state.search=v; applyFilters(); };
  searchD?.addEventListener('input',(e)=>{ onSearch(e.target.value); if(searchM) searchM.value=e.target.value; });
  searchM?.addEventListener('input',(e)=>{ onSearch(e.target.value); if(searchD) searchD.value=e.target.value; });
  document.addEventListener('click',(e)=>{
    const box = document.getElementById('searchSuggest');
    if(!e.target.closest('#searchD') && !e.target.closest('#searchSuggest')){ if(box) box.style.display='none'; }
  });
  loadSheet();
});
