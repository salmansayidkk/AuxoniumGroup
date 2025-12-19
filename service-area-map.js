/* ===================================================================
   INTERACTIVE UAE SERVICE AREA MAP
   Visual coverage map with response times
   =================================================================== */

class ServiceAreaMap {
  constructor() {
    this.emirates = {
      dubai: {
        name: 'Dubai',
        nameAr: 'دبي',
        responseTime: '2-3 hours',
        projects: 15,
        coverage: '100%',
        color: '#0ea5e9',
        areas: ['Dubai Marina', 'Downtown', 'DIFC', 'JLT', 'Business Bay', 'Silicon Oasis', 'Deira', 'Bur Dubai']
      },
      abudhabi: {
        name: 'Abu Dhabi',
        nameAr: 'أبوظبي',
        responseTime: '1-2 hours',
        projects: 20,
        coverage: '100%',
        color: '#10b981',
        areas: ['Al Reem Island', 'Yas Island', 'Saadiyat', 'Al Reef', 'Khalifa City', 'Mussafah']
      },
      sharjah: {
        name: 'Sharjah',
        nameAr: 'الشارقة',
        responseTime: '2-3 hours',
        projects: 10,
        coverage: '100%',
        color: '#8b5cf6',
        areas: ['Al Nahda', 'Al Qasimia', 'Al Majaz', 'Industrial Areas', 'University City']
      },
      ajman: {
        name: 'Ajman',
        nameAr: 'عجمان',
        responseTime: '2-3 hours',
        projects: 0,
        coverage: '100%',
        color: '#f59e0b',
        areas: ['Ajman Free Zone', 'Al Nuaimiya', 'Al Rashidiya']
      },
      rak: {
        name: 'Ras Al Khaimah',
        nameAr: 'رأس الخيمة',
        responseTime: '3-4 hours',
        projects: 0,
        coverage: '95%',
        color: '#06b6d4',
        areas: ['RAK City', 'Al Hamra', 'Al Marjan Island']
      },
      fujairah: {
        name: 'Fujairah',
        nameAr: 'الفجيرة',
        responseTime: '4-5 hours',
        projects: 0,
        coverage: '90%',
        color: '#ec4899',
        areas: ['Fujairah City', 'Dibba', 'Kalba']
      },
      uaq: {
        name: 'Umm Al Quwain',
        nameAr: 'أم القيوين',
        responseTime: '3-4 hours',
        projects: 0,
        coverage: '85%',
        color: '#eab308',
        areas: ['UAQ City', 'Falaj Al Mualla']
      }
    };
    
    this.selectedEmirate = null;
  }
  
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div style="max-width: 1400px; margin: 0 auto;">
        <!-- Section Header -->
        <div style="text-align: center; margin-bottom: 4rem;">
          <span style="display: inline-block; background: rgba(14, 165, 233, 0.15); color: #0ea5e9; padding: 0.5rem 1.5rem; border-radius: 999px; font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem;">
            🗺️ UAE-Wide Coverage
          </span>
          <h2 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; color: white; margin-bottom: 1rem;">
            Serving All Seven Emirates
          </h2>
          <p style="color: #94a3b8; font-size: 1.125rem; max-width: 600px; margin: 0 auto;">
            Fast response times and professional service across the UAE
          </p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; align-items: start;">
          <!-- Emirates List -->
          <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1.5rem; padding: 2rem;">
            <h3 style="font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 1.5rem;">
              Select Emirate
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem;" id="emiratesList">
              ${Object.keys(this.emirates).map(key => this.renderEmirateButton(key)).join('')}
            </div>
            
            <!-- Quick Stats -->
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div style="text-align: center; padding: 1rem; background: rgba(14, 165, 233, 0.1); border-radius: 0.75rem;">
                  <div style="font-size: 1.75rem; font-weight: 800; color: #0ea5e9;">45+</div>
                  <div style="font-size: 0.875rem; color: #94a3b8;">Projects</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 0.75rem;">
                  <div style="font-size: 1.75rem; font-weight: 800; color: #10b981;">24/7</div>
                  <div style="font-size: 0.875rem; color: #94a3b8;">Support</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Map Visualization & Details -->
          <div>
            <!-- Simplified UAE Map -->
            <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1.5rem; padding: 3rem; margin-bottom: 2rem; position: relative; min-height: 500px;">
              <div style="text-align: center; margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: white;">
                  🇦🇪 United Arab Emirates
                </h3>
              </div>
              
              <!-- Visual Map Representation -->
              <div style="position: relative; max-width: 600px; margin: 0 auto;">
                <svg viewBox="0 0 400 300" style="width: 100%; height: auto;">
                  <!-- Abu Dhabi -->
                  <path id="map-abudhabi" 
                        d="M 20,180 L 120,180 L 140,220 L 80,240 L 20,220 Z" 
                        fill="rgba(16, 185, 129, 0.2)" 
                        stroke="rgba(16, 185, 129, 0.5)" 
                        stroke-width="2" 
                        style="cursor: pointer; transition: all 0.3s;"
                        onmouseenter="this.setAttribute('fill', 'rgba(16, 185, 129, 0.4)')"
                        onmouseleave="this.setAttribute('fill', 'rgba(16, 185, 129, 0.2)')"
                        onclick="serviceAreaMap.selectEmirate('abudhabi')"/>
                  <text x="70" y="210" fill="white" font-size="12" font-weight="bold" text-anchor="middle">Abu Dhabi</text>
                  
                  <!-- Dubai -->
                  <path id="map-dubai" 
                        d="M 140,140 L 220,140 L 240,180 L 200,200 L 140,180 Z" 
                        fill="rgba(14, 165, 233, 0.2)" 
                        stroke="rgba(14, 165, 233, 0.5)" 
                        stroke-width="2" 
                        style="cursor: pointer; transition: all 0.3s;"
                        onmouseenter="this.setAttribute('fill', 'rgba(14, 165, 233, 0.4)')"
                        onmouseleave="this.setAttribute('fill', 'rgba(14, 165, 233, 0.2)')"
                        onclick="serviceAreaMap.selectEmirate('dubai')"/>
                  <text x="180" y="170" fill="white" font-size="12" font-weight="bold" text-anchor="middle">Dubai</text>
                  
                  <!-- Sharjah -->
                  <path id="map-sharjah" 
                        d="M 220,100 L 280,100 L 290,140 L 260,150 L 220,140 Z" 
                        fill="rgba(139, 92, 246, 0.2)" 
                        stroke="rgba(139, 92, 246, 0.5)" 
                        stroke-width="2" 
                        style="cursor: pointer; transition: all 0.3s;"
                        onmouseenter="this.setAttribute('fill', 'rgba(139, 92, 246, 0.4)')"
                        onmouseleave="this.setAttribute('fill', 'rgba(139, 92, 246, 0.2)')"
                        onclick="serviceAreaMap.selectEmirate('sharjah')"/>
                  <text x="250" y="125" fill="white" font-size="12" font-weight="bold" text-anchor="middle">Sharjah</text>
                  
                  <!-- Ajman -->
                  <path id="map-ajman" 
                        d="M 280,80 L 320,80 L 325,110 L 305,120 L 280,100 Z" 
                        fill="rgba(245, 158, 11, 0.2)" 
                        stroke="rgba(245, 158, 11, 0.5)" 
                        stroke-width="2" 
                        style="cursor: pointer; transition: all 0.3s;"
                        onmouseenter="this.setAttribute('fill', 'rgba(245, 158, 11, 0.4)')"
                        onmouseleave="this.setAttribute('fill', 'rgba(245, 158, 11, 0.2)')"
                        onclick="serviceAreaMap.selectEmirate('ajman')"/>
                  <text x="300" y="100" fill="white" font-size="10" font-weight="bold" text-anchor="middle">Ajman</text>
                  
                  <!-- RAK -->
                  <path id="map-rak" 
                        d="M 320,40 L 380,40 L 385,80 L 350,90 L 325,70 Z" 
                        fill="rgba(6, 182, 212, 0.2)" 
                        stroke="rgba(6, 182, 212, 0.5)" 
                        stroke-width="2" 
                        style="cursor: pointer; transition: all 0.3s;"
                        onmouseenter="this.setAttribute('fill', 'rgba(6, 182, 212, 0.4)')"
                        onmouseleave="this.setAttribute('fill', 'rgba(6, 182, 212, 0.2)')"
                        onclick="serviceAreaMap.selectEmirate('rak')"/>
                  <text x="350" y="65" fill="white" font-size="10" font-weight="bold" text-anchor="middle">RAK</text>
                  
                  <!-- Fujairah -->
                  <path id="map-fujairah" 
                        d="M 340,120 L 380,130 L 380,170 L 350,175 L 330,155 Z" 
                        fill="rgba(236, 72, 153, 0.2)" 
                        stroke="rgba(236, 72, 153, 0.5)" 
                        stroke-width="2" 
                        style="cursor: pointer; transition: all 0.3s;"
                        onmouseenter="this.setAttribute('fill', 'rgba(236, 72, 153, 0.4)')"
                        onmouseleave="this.setAttribute('fill', 'rgba(236, 72, 153, 0.2)')"
                        onclick="serviceAreaMap.selectEmirate('fujairah')"/>
                  <text x="355" y="150" fill="white" font-size="10" font-weight="bold" text-anchor="middle">Fujairah</text>
                  
                  <!-- UAQ -->
                  <path id="map-uaq" 
                        d="M 280,60 L 320,60 L 325,85 L 305,90 L 280,70 Z" 
                        fill="rgba(234, 179, 8, 0.2)" 
                        stroke="rgba(234, 179, 8, 0.5)" 
                        stroke-width="2" 
                        style="cursor: pointer; transition: all 0.3s;"
                        onmouseenter="this.setAttribute('fill', 'rgba(234, 179, 8, 0.4)')"
                        onmouseleave="this.setAttribute('fill', 'rgba(234, 179, 8, 0.2)')"
                        onclick="serviceAreaMap.selectEmirate('uaq')"/>
                  <text x="300" y="75" fill="white" font-size="9" font-weight="bold" text-anchor="middle">UAQ</text>
                </svg>
              </div>
              
              <div style="text-align: center; margin-top: 2rem; color: #64748b; font-size: 0.875rem;">
                Click on any emirate to view coverage details
              </div>
            </div>
            
            <!-- Selected Emirate Details -->
            <div id="emirateDetails" style="display: none;">
              <!-- Content loaded dynamically -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  renderEmirateButton(emirateKey) {
    const emirate = this.emirates[emirateKey];
    return `
      <button onclick="serviceAreaMap.selectEmirate('${emirateKey}')" 
              id="emirate-btn-${emirateKey}"
              style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 0.75rem; cursor: pointer; transition: all 0.3s; text-align: left;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 0.75rem; height: 0.75rem; background: ${emirate.color}; border-radius: 50%;"></div>
          <div>
            <div style="font-weight: 700; color: white; font-size: 1rem;">${emirate.name}</div>
            <div style="font-size: 0.75rem; color: #94a3b8;">⚡ ${emirate.responseTime}</div>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    `;
  }
  
  selectEmirate(emirateKey) {
    const emirate = this.emirates[emirateKey];
    if (!emirate) return;
    
    this.selectedEmirate = emirateKey;
    
    // Update button states
    Object.keys(this.emirates).forEach(key => {
      const btn = document.getElementById(`emirate-btn-${key}`);
      if (btn) {
        if (key === emirateKey) {
          btn.style.background = `rgba(${this.hexToRgb(emirate.color)}, 0.2)`;
          btn.style.borderColor = emirate.color;
        } else {
          btn.style.background = 'rgba(255, 255, 255, 0.05)';
          btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
      }
    });
    
    // Update map highlighting
    Object.keys(this.emirates).forEach(key => {
      const path = document.getElementById(`map-${key}`);
      if (path) {
        const color = this.emirates[key].color;
        const rgb = this.hexToRgb(color);
        if (key === emirateKey) {
          path.setAttribute('fill', `rgba(${rgb}, 0.5)`);
          path.setAttribute('stroke', color);
          path.setAttribute('stroke-width', '3');
        } else {
          path.setAttribute('fill', `rgba(${rgb}, 0.2)`);
          path.setAttribute('stroke', `rgba(${rgb}, 0.5)`);
          path.setAttribute('stroke-width', '2');
        }
      }
    });
    
    // Show details
    const detailsContainer = document.getElementById('emirateDetails');
    detailsContainer.style.display = 'block';
    detailsContainer.innerHTML = `
      <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1.5rem; padding: 2rem; animation: fadeInUp 0.5s ease;">
        <div style="display: flex; align-items: start; justify-content: space-between; margin-bottom: 2rem;">
          <div>
            <h3 style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">
              ${emirate.name}
            </h3>
            <p style="color: #94a3b8; font-size: 1rem;">
              ${emirate.nameAr}
            </p>
          </div>
          <div style="width: 4rem; height: 4rem; background: ${emirate.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
            📍
          </div>
        </div>
        
        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
          <div style="background: rgba(${this.hexToRgb(emirate.color)}, 0.1); border: 1px solid rgba(${this.hexToRgb(emirate.color)}, 0.3); border-radius: 0.75rem; padding: 1.25rem; text-align: center;">
            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem;">Response Time</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: ${emirate.color};">⚡ ${emirate.responseTime}</div>
          </div>
          <div style="background: rgba(${this.hexToRgb(emirate.color)}, 0.1); border: 1px solid rgba(${this.hexToRgb(emirate.color)}, 0.3); border-radius: 0.75rem; padding: 1.25rem; text-align: center;">
            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem;">Projects Done</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: ${emirate.color};">${emirate.projects}+</div>
          </div>
          <div style="background: rgba(${this.hexToRgb(emirate.color)}, 0.1); border: 1px solid rgba(${this.hexToRgb(emirate.color)}, 0.3); border-radius: 0.75rem; padding: 1.25rem; text-align: center;">
            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem;">Coverage</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: ${emirate.color};">${emirate.coverage}</div>
          </div>
        </div>
        
        <!-- Coverage Areas -->
        <div>
          <h4 style="font-size: 1.125rem; font-weight: 700; color: white; margin-bottom: 1rem;">
            Coverage Areas
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            ${emirate.areas.map(area => `
              <span style="display: inline-flex; align-items: center; padding: 0.5rem 1rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 999px; color: #cbd5e1; font-size: 0.875rem;">
                ✓ ${area}
              </span>
            `).join('')}
          </div>
        </div>
        
        <!-- CTA -->
        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center;">
          <a href="https://wa.me/971563536545?text=I need services in ${emirate.name}" 
             style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: linear-gradient(135deg, ${emirate.color}, ${emirate.color}dd); color: white; border-radius: 0.75rem; text-decoration: none; font-weight: 700; box-shadow: 0 4px 14px rgba(${this.hexToRgb(emirate.color)}, 0.3);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Request Service in ${emirate.name}
          </a>
        </div>
      </div>
    `;
    
    // Scroll to details
    setTimeout(() => {
      detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
  
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '14, 165, 233';
  }
}

// Initialize service area map globally
let serviceAreaMap;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('service-area-map')) {
    serviceAreaMap = new ServiceAreaMap();
    serviceAreaMap.render('service-area-map');
  }
});
