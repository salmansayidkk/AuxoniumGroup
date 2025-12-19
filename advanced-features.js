/* ===================================================================
   AUXONIUM - ADVANCED FEATURES & INTERACTIVITY
   Enterprise-Level JavaScript Features
   =================================================================== */

/* === 1. DYNAMIC PRICING CALCULATOR === */
class PricingCalculator {
  constructor() {
    this.services = {
      'electrical': { base: 300, perSqm: 25, complexity: { low: 1, medium: 1.3, high: 1.6 } },
      'ac': { base: 400, perSqm: 35, complexity: { low: 1, medium: 1.4, high: 1.8 } },
      'fitout': { base: 600, perSqm: 60, complexity: { low: 1, medium: 1.5, high: 2.0 } },
      'it': { base: 350, perSqm: 30, complexity: { low: 1, medium: 1.4, high: 1.7 } }
    };
    
    this.locations = {
      'dubai': 1.0,
      'abudhabi': 1.0,
      'sharjah': 1.0,
      'ajman': 1.0,
      'other': 1.0
    };
  }
  
  calculate(service, sqm, complexity, location, urgency) {
    const serviceData = this.services[service];
    if (!serviceData) return { min: 0, max: 0 };
    
    let basePrice = serviceData.base + (serviceData.perSqm * sqm);
    basePrice *= serviceData.complexity[complexity];
    basePrice *= this.locations[location];
    
    if (urgency === 'urgent') basePrice *= 1.25;
    if (urgency === 'scheduled') basePrice *= 0.95;
    
    const min = Math.round(basePrice * 0.85);
    const max = Math.round(basePrice * 1.15);
    
    return { min, max };
  }
  
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1.5rem; padding: 2rem; max-width: 600px; margin: 0 auto;">
        <h3 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(135deg, #0ea5e9, #10b981); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">
          💰 Get Instant Quote
        </h3>
        <p style="color: #94a3b8; margin-bottom: 2rem; font-size: 0.9375rem;">
          Estimate your project cost in seconds
        </p>
        
        <!-- Service Selection -->
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
            Service Type
          </label>
          <select id="calc-service" style="width: 100%; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.75rem; color: white; font-size: 1rem;">
            <option value="electrical" style="background: #1e293b; color: white;">⚡ Electrical Services</option>
            <option value="ac" style="background: #1e293b; color: white;">❄️ AC Services</option>
            <option value="fitout" style="background: #1e293b; color: white;">🧱 Fitout Services</option>
            <option value="it" style="background: #1e293b; color: white;">💻 IT Services</option>
          </select>
        </div>
        
        <!-- Project Size -->
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
            Project Size: <span id="sqm-value" style="color: #0ea5e9;">50</span> sqm
          </label>
          <input type="range" id="calc-size" min="10" max="500" value="50" step="10" 
                 style="width: 100%; height: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; outline: none; appearance: none; cursor: pointer;"
                 oninput="document.getElementById('sqm-value').textContent = this.value">
        </div>
        
        <!-- Complexity -->
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.75rem; font-size: 0.875rem;">
            Project Complexity
          </label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
            <button onclick="selectComplexity('low', this)" class="complexity-btn active" data-value="low" 
                    style="padding: 0.75rem; background: rgba(14, 165, 233, 0.2); border: 1px solid rgba(14, 165, 233, 0.4); border-radius: 0.5rem; color: white; cursor: pointer; font-weight: 600; transition: all 0.3s;">
              Low
            </button>
            <button onclick="selectComplexity('medium', this)" class="complexity-btn" data-value="medium"
                    style="padding: 0.75rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 0.5rem; color: white; cursor: pointer; font-weight: 600; transition: all 0.3s;">
              Medium
            </button>
            <button onclick="selectComplexity('high', this)" class="complexity-btn" data-value="high"
                    style="padding: 0.75rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 0.5rem; color: white; cursor: pointer; font-weight: 600; transition: all 0.3s;">
              High
            </button>
          </div>
        </div>
        
        <!-- Location -->
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
            Location
          </label>
          <select id="calc-location" style="width: 100%; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.75rem; color: white; font-size: 1rem;">
            <option value="abudhabi" selected style="background: #1e293b; color: white;">Abu Dhabi</option>
            <option value="dubai" style="background: #1e293b; color: white;">Dubai</option>
            <option value="sharjah" style="background: #1e293b; color: white;">Sharjah</option>
            <option value="ajman" style="background: #1e293b; color: white;">Ajman</option>
            <option value="other" style="background: #1e293b; color: white;">Other Emirates</option>
          </select>
        </div>
        
        <!-- Urgency -->
        <div style="margin-bottom: 2rem;">
          <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
            Timeline
          </label>
          <select id="calc-urgency" style="width: 100%; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.75rem; color: white; font-size: 1rem;">
            <option value="scheduled" style="background: #1e293b; color: white;">Scheduled (Best Price)</option>
            <option value="normal" style="background: #1e293b; color: white;">Normal</option>
            <option value="urgent" style="background: #1e293b; color: white;">Urgent (24-48 Hours)</option>
          </select>
        </div>
        
        <!-- Result -->
        <div id="calc-result" style="background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(16, 185, 129, 0.15)); border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 1rem; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem; display: none;">
          <div style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.5rem;">Estimated Cost</div>
          <div id="price-range" style="font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #0ea5e9, #10b981); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem;">
            AED 2,500 - 3,500
          </div>
          <div style="font-size: 0.8125rem; color: #64748b;">
            ✓ Free consultation included
          </div>
        </div>
        
        <!-- CTA Buttons -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <button onclick="calculatePrice()" style="padding: 1rem 1.5rem; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; border: none; border-radius: 0.75rem; font-weight: 700; cursor: pointer; font-size: 1rem; transition: all 0.3s; box-shadow: 0 4px 14px rgba(14, 165, 233, 0.25);">
            Calculate Price
          </button>
          <button onclick="requestDetailedQuote()" style="padding: 1rem 1.5rem; background: transparent; color: white; border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 0.75rem; font-weight: 700; cursor: pointer; font-size: 1rem; transition: all 0.3s;">
            Get Exact Quote
          </button>
        </div>
        
        <div style="text-align: center; margin-top: 1rem; font-size: 0.8125rem; color: #64748b;">
          Final price may vary based on site inspection
        </div>
      </div>
    `;
  }
}

// Initialize pricing calculator
let pricingCalc = new PricingCalculator();
let selectedComplexity = 'low';

function selectComplexity(value, btn) {
  selectedComplexity = value;
  document.querySelectorAll('.complexity-btn').forEach(b => {
    b.style.background = 'rgba(255, 255, 255, 0.05)';
    b.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  });
  btn.style.background = 'rgba(14, 165, 233, 0.2)';
  btn.style.borderColor = 'rgba(14, 165, 233, 0.4)';
}

function calculatePrice() {
  const service = document.getElementById('calc-service').value;
  const sqm = parseInt(document.getElementById('calc-size').value);
  const location = document.getElementById('calc-location').value;
  const urgency = document.getElementById('calc-urgency').value;
  
  const result = pricingCalc.calculate(service, sqm, selectedComplexity, location, urgency);
  
  const resultDiv = document.getElementById('calc-result');
  const priceRange = document.getElementById('price-range');
  
  resultDiv.style.display = 'block';
  priceRange.textContent = `AED ${result.min.toLocaleString()} - ${result.max.toLocaleString()}`;
  
  // Animate the result
  resultDiv.style.animation = 'none';
  setTimeout(() => {
    resultDiv.style.animation = 'fadeInUp 0.5s ease';
  }, 10);
}

function requestDetailedQuote() {
  const service = document.getElementById('calc-service').value;
  const sqm = document.getElementById('calc-size').value;
  const location = document.getElementById('calc-location').value;
  
  const message = `Hi! I'd like a detailed quote for ${service} service. Project size: ${sqm} sqm in ${location}. Can we discuss?`;
  window.open(`https://wa.me/971563536545?text=${encodeURIComponent(message)}`, '_blank');
}

/* === 2. LIVE CHAT STATUS SYSTEM === */
class LiveChatStatus {
  constructor() {
    this.operators = [
      { name: 'Sayed', avatar: 'S', status: 'online', responseTime: '2 min' },
      { name: 'Sara', avatar: 'Sa', status: 'online', responseTime: '5 min' },
      { name: 'Support Team', avatar: '🛠️', status: 'online', responseTime: '3 min' }
    ];
    this.currentOperator = this.operators[0];
  }
  
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const operator = this.currentOperator;
    const statusColor = operator.status === 'online' ? '#10b981' : '#94a3b8';
    
    container.innerHTML = `
      <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1rem; padding: 1.5rem; display: flex; align-items: center; gap: 1rem; max-width: 500px; margin: 0 auto;">
        <!-- Operator Avatar -->
        <div style="position: relative; flex-shrink: 0;">
          <div style="width: 4rem; height: 4rem; background: linear-gradient(135deg, #0ea5e9, #10b981); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; color: white;">
            ${operator.avatar}
          </div>
          <div style="position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px; background: ${statusColor}; border: 2px solid #0f172a; border-radius: 50%; animation: pulse 2s ease infinite;"></div>
        </div>
        
        <!-- Status Info -->
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 1.125rem; color: white; margin-bottom: 0.25rem;">
            ${operator.name}
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.25rem;">
            <div style="width: 8px; height: 8px; background: ${statusColor}; border-radius: 50%;"></div>
            <span style="color: ${statusColor}; font-weight: 600;">Online now</span>
          </div>
          <div style="font-size: 0.75rem; color: #64748b;">
            ⚡ Usually responds in ${operator.responseTime}
          </div>
        </div>
        
        <!-- Chat CTA -->
        <button onclick="openLiveChat()" style="padding: 0.875rem 1.5rem; background: linear-gradient(135deg, #25D366, #128C7E); color: white; border: none; border-radius: 0.75rem; font-weight: 700; cursor: pointer; white-space: nowrap; transition: all 0.3s; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          Chat Now
        </button>
      </div>
    `;
  }
}

function openLiveChat() {
  window.open('https://wa.me/971563536545?text=Hi! I need assistance', '_blank');
}

/* === 3. SOCIAL PROOF NOTIFICATIONS === */
class SocialProofNotifications {
  constructor() {
    this.notifications = [
      { name: 'Omar K.', location: 'Dubai Marina', service: 'electrical quote', time: '2 minutes ago', avatar: 'O' },
      { name: 'Fatima A.', location: 'Abu Dhabi', service: 'AC installation', time: '5 minutes ago', avatar: 'F' },
      { name: 'Ahmed M.', location: 'Sharjah', service: 'fitout services', time: '8 minutes ago', avatar: 'A' },
      { name: 'Sarah L.', location: 'Dubai', service: 'IT setup quote', time: '12 minutes ago', avatar: 'S' },
      { name: 'Mohammed H.', location: 'Ajman', service: 'electrical repair', time: '15 minutes ago', avatar: 'M' }
    ];
    this.currentIndex = 0;
    this.isVisible = false;
  }
  
  show() {
    const notification = this.notifications[this.currentIndex];
    const existing = document.getElementById('social-proof-popup');
    
    if (existing) {
      existing.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => existing.remove(), 300);
    }
    
    const popup = document.createElement('div');
    popup.id = 'social-proof-popup';
    popup.style.cssText = `
      position: fixed;
      bottom: 6rem;
      left: 1.5rem;
      z-index: 9997;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 1rem;
      padding: 1rem 1.25rem;
      max-width: 350px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.5s ease forwards;
      cursor: pointer;
    `;
    
    popup.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 2.5rem; height: 2.5rem; background: linear-gradient(135deg, #0ea5e9, #10b981); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; flex-shrink: 0;">
          ${notification.avatar}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 600; font-size: 0.875rem; color: white; margin-bottom: 0.125rem;">
            ${notification.name} from ${notification.location}
          </div>
          <div style="font-size: 0.8125rem; color: #94a3b8;">
            just requested ${notification.service}
          </div>
        </div>
        <div style="font-size: 0.75rem; color: #64748b; white-space: nowrap;">
          ${notification.time}
        </div>
      </div>
    `;
    
    popup.onclick = () => {
      window.location.href = '#consultation';
      popup.remove();
    };
    
    document.body.appendChild(popup);
    this.isVisible = true;
    
    setTimeout(() => {
      if (popup.parentNode) {
        popup.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => popup.remove(), 300);
      }
      this.isVisible = false;
    }, 8000);
    
    this.currentIndex = (this.currentIndex + 1) % this.notifications.length;
  }
  
  start() {
    setTimeout(() => {
      this.show();
      setInterval(() => {
        if (!this.isVisible) {
          this.show();
        }
      }, 15000);
    }, 5000);
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    #social-proof-popup {
      left: 1rem !important;
      right: 1rem !important;
      max-width: calc(100vw - 2rem) !important;
      bottom: 5rem !important;
    }
  }
`;
document.head.appendChild(style);

/* === 4. EXIT INTENT POPUP === */
class ExitIntentPopup {
  constructor() {
    this.shown = false;
    this.init();
  }
  
  init() {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 10 && !this.shown && !localStorage.getItem('exitPopupShown')) {
        this.show();
      }
    });
  }
  
  show() {
    this.shown = true;
    localStorage.setItem('exitPopupShown', 'true');
    
    const overlay = document.createElement('div');
    overlay.id = 'exit-intent-overlay';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.3s ease;
    `;
    
    overlay.innerHTML = `
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 2px solid rgba(14, 165, 233, 0.3); border-radius: 1.5rem; padding: 3rem 2rem; max-width: 600px; width: 100%; position: relative; animation: slideInUp 0.4s ease; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
        <!-- Close Button -->
        <button onclick="document.getElementById('exit-intent-overlay').remove()" style="position: absolute; top: 1rem; right: 1rem; width: 2.5rem; height: 2.5rem; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 50%; color: white; font-size: 1.5rem; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center;">
          ✕
        </button>
        
        <!-- Content -->
        <div style="text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🎁</div>
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(135deg, #0ea5e9, #10b981); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">
            Wait! Special Offer
          </h2>
          <p style="color: #cbd5e1; font-size: 1.125rem; margin-bottom: 0.5rem; line-height: 1.6;">
            Get <strong style="color: #10b981; font-size: 1.5rem;">15% OFF</strong> your first service
          </p>
          <p style="color: #94a3b8; font-size: 0.9375rem; margin-bottom: 2rem;">
            + Free site inspection worth AED 200
          </p>
          
          <div style="background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem;">
            <div style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.5rem;">Promo Code:</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: #0ea5e9; letter-spacing: 0.1em; margin-bottom: 0.5rem;">
              FIRST15
            </div>
            <div style="font-size: 0.75rem; color: #64748b;">
              ✓ Valid for 48 hours • ✓ All services included
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <a href="https://wa.me/971563536545?text=Hi! I'd like to claim the FIRST15 discount" style="padding: 1rem 2rem; background: linear-gradient(135deg, #25D366, #128C7E); color: white; border: none; border-radius: 0.75rem; font-weight: 700; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: all 0.3s; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Claim Offer on WhatsApp
            </a>
            <button onclick="document.getElementById('exit-intent-overlay').remove()" style="padding: 0.75rem 1.5rem; background: transparent; color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 0.75rem; cursor: pointer; transition: all 0.3s;">
              No thanks, I'll pay full price
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
  }
}

/* === 5. AUTO-INITIALIZE ON PAGE LOAD === */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize social proof notifications
  const socialProof = new SocialProofNotifications();
  socialProof.start();
  
  // Initialize exit intent (desktop only)
  if (window.innerWidth > 768) {
    new ExitIntentPopup();
  }
  
  // Initialize pricing calculator if container exists
  if (document.getElementById('pricing-calculator')) {
    pricingCalc.render('pricing-calculator');
  }
  
  // Initialize live chat status if container exists
  if (document.getElementById('live-chat-status')) {
    const liveChat = new LiveChatStatus();
    liveChat.render('live-chat-status');
  }
});

/* === 6. SCROLL DEPTH TRACKING === */
let maxScrollDepth = 0;
window.addEventListener('scroll', function() {
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  if (scrollPercentage > maxScrollDepth) {
    maxScrollDepth = scrollPercentage;
    
    // Track milestones
    if (maxScrollDepth > 75 && !window.scrollMilestone75) {
      window.scrollMilestone75 = true;
      console.log('User scrolled 75% - highly engaged!');
      // Could trigger special offer here
    }
  }
});

/* === 7. SMART FORM AUTO-SAVE === */
function enableFormAutoSave(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    // Restore saved values
    const savedValue = localStorage.getItem(`form_${input.name}`);
    if (savedValue && input.value === '') {
      input.value = savedValue;
    }
    
    // Save on change
    input.addEventListener('change', () => {
      localStorage.setItem(`form_${input.name}`, input.value);
    });
  });
  
  // Clear on successful submit
  form.addEventListener('submit', () => {
    inputs.forEach(input => {
      localStorage.removeItem(`form_${input.name}`);
    });
  });
}

// Auto-save contact forms
setTimeout(() => {
  enableFormAutoSave('contactForm');
  enableFormAutoSave('drawerForm');
}, 1000);
