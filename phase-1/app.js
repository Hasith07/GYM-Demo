// Utility: Random Number Generator
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ========== CLOCK & DATE ==========
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  
  document.getElementById('clock').textContent = timeStr;
  document.getElementById('date').textContent = dateStr;
}
setInterval(updateTime, 1000);
updateTime();

// ========== MOCK DATA & INITIALIZATION ==========

// 1. KPI Data Updates
function updateKPIs() {
  // Members
  const members = random(200, 300);
  document.getElementById('kv-members').textContent = members;
  
  // Capacity Ring
  const capacity = random(40, 95);
  document.getElementById('kv-capacity').textContent = `${capacity}%`;
  const ring = document.getElementById('capacity-ring');
  const dash = (capacity / 100) * 100;
  ring.style.strokeDasharray = `${dash} ${100 - dash}`;
  
  // Energy
  document.getElementById('kv-energy').textContent = `${random(70, 95)} kW`;
  
  // Score
  document.getElementById('kv-score').textContent = random(88, 99);
}
setInterval(updateKPIs, 5000);
updateKPIs();

// 2. Simple Sparklines (using Canvas)
function drawSparkline(canvasId, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  
  const points = Array.from({length: 10}, () => random(10, h - 5));
  
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.moveTo(0, h);
  
  points.forEach((y, i) => {
    const x = (i / (points.length - 1)) * w;
    ctx.lineTo(x, h - y);
  });
  
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Gradient fill
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, `${color}40`); // 40 is hex alpha
  gradient.addColorStop(1, `${color}00`);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function initSparklines() {
  drawSparkline('spark-members', '#00f5d4');
  drawSparkline('spark-energy', '#7209b7');
  drawSparkline('spark-score', '#4cc9f0');
}
initSparklines();
setInterval(initSparklines, 3000);

// 3. Heatmap Simulation (Canvas)
function drawHeatmap() {
  const canvas = document.getElementById('heatmap-canvas');
  if(!canvas) return;
  
  // Make it visually interesting
  const ctx = canvas.getContext('2d');
  // Set dimensions based on parent
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight || 300;
  
  const w = canvas.width;
  const h = canvas.height;
  
  // Background grid
  ctx.fillStyle = '#0f111a';
  ctx.fillRect(0,0,w,h);
  
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for(let i=0; i<w; i+=40) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,h); ctx.stroke(); }
  for(let i=0; i<h; i+=40) { ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(w,i); ctx.stroke(); }
  
  // Draw random "hotspots"
  const colors = [
    'rgba(0, 245, 212, 0.6)', // Cyan (Low)
    'rgba(76, 201, 240, 0.7)', // Blue (Med)
    'rgba(255, 190, 11, 0.8)', // Yellow (High)
    'rgba(239, 35, 60, 0.9)'   // Red (Full)
  ];
  
  for(let i=0; i<15; i++) {
    const x = random(20, w-20);
    const y = random(20, h-20);
    const radius = random(30, 80);
    const colorIdx = random(0, 3);
    
    const grad = ctx.createRadialGradient(x,y,0, x,y,radius);
    grad.addColorStop(0, colors[colorIdx]);
    grad.addColorStop(1, 'transparent');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x,y,radius,0, Math.PI*2);
    ctx.fill();
  }
}
window.addEventListener('resize', drawHeatmap);
setTimeout(drawHeatmap, 100);
setInterval(drawHeatmap, 4000);

// 4. Zone Summary
const zones = [
  { name: 'Free Weights', occ: '85%', status: 'Crowded', class: 'status-crowded' },
  { name: 'Cardio Deck', occ: '42%', status: 'Optimal', class: 'status-optimal' },
  { name: 'Studio A', occ: '10%', status: 'Empty', class: 'status-optimal' }
];

function renderZones() {
  const container = document.getElementById('zone-summary');
  if(!container) return;
  container.innerHTML = zones.map(z => `
    <div class="zone-item">
      <div class="zone-name">${z.name}</div>
      <div class="zone-occ">${z.occ}</div>
      <div class="zone-status ${z.class}">${z.status}</div>
    </div>
  `).join('');
}
renderZones();

// 5. Traffic Chart (Simple Canvas implementation)
function drawTrafficChart() {
  const canvas = document.getElementById('traffic-chart');
  if(!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
  const w = canvas.width;
  const h = canvas.height;
  
  const hours = ['6a','8a','10a','12p','2p','4p','6p','8p','10p'];
  const data = [20, 60, 45, 30, 40, 85, 95, 60, 25];
  
  ctx.clearRect(0,0,w,h);
  
  const padding = 30;
  const chartW = w - padding * 2;
  const chartH = h - padding * 2;
  const maxVal = 100;
  
  // Axes
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath();
  ctx.moveTo(padding, h - padding);
  ctx.lineTo(w - padding, h - padding);
  ctx.stroke();
  
  // Draw Line
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = padding + (i / (data.length - 1)) * chartW;
    const y = h - padding - (val / maxVal) * chartH;
    if(i===0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  });
  ctx.strokeStyle = '#4cc9f0';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Labels
  ctx.fillStyle = '#a0aabf';
  ctx.font = '12px Outfit';
  ctx.textAlign = 'center';
  hours.forEach((hr, i) => {
    const x = padding + (i / (hours.length - 1)) * chartW;
    ctx.fillText(hr, x, h - 10);
  });
}
window.addEventListener('resize', drawTrafficChart);
setTimeout(drawTrafficChart, 100);

// 6. AI Recommendations
const aiData = [
  { icon: '❄️', title: 'HVAC Optimization', desc: 'Lowering AC in Cardio Zone by 2°C can save 12% energy while maintaining comfort.', priority: 'med' },
  { icon: '⚠️', title: 'Equipment Wear', desc: 'Treadmill #04 motor showing irregular patterns. Preventative maintenance suggested.', priority: 'high' },
  { icon: '🧘', title: 'Class Adjustment', desc: 'High demand detected for Evening Yoga. Suggest adding a 7PM slot tomorrow.', priority: 'med' }
];

function renderAI() {
  const container = document.getElementById('ai-recs');
  if(!container) return;
  container.innerHTML = aiData.map(ai => `
    <div class="rec-item priority-${ai.priority}">
      <div class="rec-icon">${ai.icon}</div>
      <div class="rec-content">
        <h4>${ai.title}</h4>
        <p>${ai.desc}</p>
      </div>
    </div>
  `).join('');
}
renderAI();

document.getElementById('refresh-ai')?.addEventListener('click', () => {
  showToast('Fetching latest AI insights...', 'info');
  setTimeout(() => {
    // Shuffle or change slightly to simulate new data
    renderAI();
    showToast('Insights updated successfully.', 'success');
  }, 1000);
});

// 7. Equipment List
const eqData = [
  { name: 'Treadmill Array A', usage: '90% Use', status: 'online' },
  { name: 'Squat Rack 2', usage: 'Idle 10m', status: 'online' },
  { name: 'Cable Machine 4', usage: 'Repair Req', status: 'maintenance' },
  { name: 'Elliptical B', usage: 'Offline', status: 'offline' },
  { name: 'Rowing Machine 1', usage: '45% Use', status: 'online' },
];

function renderEquip() {
  const container = document.getElementById('equip-list');
  if(!container) return;
  container.innerHTML = eqData.map(eq => `
    <div class="equip-item">
      <div class="equip-info">
        <div class="eq-dot ${eq.status}"></div>
        <span class="eq-name">${eq.name}</span>
      </div>
      <span class="eq-usage">${eq.usage}</span>
    </div>
  `).join('');
}
renderEquip();

// 8. Forecast Bars
function renderForecast() {
  const container = document.getElementById('forecast-bars');
  if(!container) return;
  
  const now = new Date();
  const hours = [1, 2, 3].map(h => {
    let t = new Date(now);
    t.setHours(t.getHours() + h);
    return t.toLocaleTimeString('en-US', {hour: 'numeric'});
  });
  
  const values = [random(40,90), random(40,90), random(40,90)];
  
  container.innerHTML = hours.map((hr, i) => `
    <div class="f-bar-col">
      <div class="f-bar-wrapper">
        <div class="f-bar" style="height: ${values[i]}%"></div>
      </div>
      <span class="f-time">${hr}</span>
    </div>
  `).join('');
}
renderForecast();
setInterval(renderForecast, 60000); // update every minute

// ========== INTERACTIONS ==========

// Toast System
function showToast(message, type='info') {
  const container = document.getElementById('toast-container');
  if(!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'ℹ️';
  if(type === 'success') icon = '✅';
  if(type === 'error') icon = '❌';
  if(type === 'warning') icon = '⚠️';
  
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Quick Actions
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const actionName = btn.getAttribute('data-label');
    showToast(`Executing command: ${actionName}`, 'success');
  });
});

// Notifications
document.getElementById('notif-btn')?.addEventListener('click', () => {
  showToast('You have 3 new system alerts.', 'info');
});

// Mobile Nav
const mnavBtns = document.querySelectorAll('.mnav-btn');
mnavBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    mnavBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Simple mock logic for tabs
    const tab = btn.getAttribute('data-tab');
    document.body.setAttribute('data-tab', tab);
    showToast(`Switched to ${tab} view`, 'info');
  });
});
