/* ===================================================================
   BOOKING SYSTEM - APPOINTMENT SCHEDULING
   Calendly-style booking widget with real-time availability
   =================================================================== */

class BookingSystem {
  constructor() {
    this.availableSlots = this.generateAvailableSlots();
    this.selectedSlot = null;
    this.bookingData = {
      name: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      time: '',
      location: '',
      notes: ''
    };
  }
  
  generateAvailableSlots() {
    const slots = [];
    const today = new Date();
    const workingHours = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    
    // Generate slots for next 7 days (excluding Fridays)
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Fridays (day 5)
      if (date.getDay() === 5) continue;
      
      const daySlots = {
        date: date,
        dateString: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        times: workingHours.map(time => ({
          time: time,
          available: Math.random() > 0.3, // Simulate some booked slots
          isToday: i === 0,
          isTomorrow: i === 1
        }))
      };
      
      slots.push(daySlots);
    }
    
    return slots;
  }
  
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto;">
        <!-- Booking Header -->
        <div style="text-align: center; margin-bottom: 3rem;">
          <div style="display: inline-block; background: rgba(14, 165, 233, 0.15); color: #0ea5e9; padding: 0.5rem 1.5rem; border-radius: 999px; font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem;">
            📅 Free Site Visit
          </div>
          <h2 style="font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 1rem;">
            Schedule Your Site Visit
          </h2>
          <p style="color: #94a3b8; font-size: 1.125rem;">
            Book a convenient time for our team to visit and assess your project
          </p>
        </div>
        
        <!-- Booking Steps -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
          <div style="text-align: center; padding: 1.5rem; background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 1rem;">
            <div style="width: 3rem; height: 3rem; margin: 0 auto 1rem; background: linear-gradient(135deg, #0ea5e9, #0284c7); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem; color: white;">1</div>
            <div style="font-weight: 700; color: white; margin-bottom: 0.5rem;">Select Date & Time</div>
            <div style="font-size: 0.875rem; color: #94a3b8;">Choose a convenient slot</div>
          </div>
          <div style="text-align: center; padding: 1.5rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1rem;">
            <div style="width: 3rem; height: 3rem; margin: 0 auto 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem; color: white;">2</div>
            <div style="font-weight: 700; color: white; margin-bottom: 0.5rem;">Provide Details</div>
            <div style="font-size: 0.875rem; color: #94a3b8;">Tell us about your project</div>
          </div>
          <div style="text-align: center; padding: 1.5rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1rem;">
            <div style="width: 3rem; height: 3rem; margin: 0 auto 1rem; background: rgba(255, 255, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem; color: white;">3</div>
            <div style="font-weight: 700; color: white; margin-bottom: 0.5rem;">Confirmation</div>
            <div style="font-size: 0.875rem; color: #94a3b8;">Get instant confirmation</div>
          </div>
        </div>
        
        <!-- Booking Form Container -->
        <div id="bookingFormContainer">
          ${this.renderDateSelection()}
        </div>
      </div>
    `;
  }
  
  renderDateSelection() {
    return `
      <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1.5rem; padding: 2rem;">
        <h3 style="font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 1.5rem; text-align: center;">
          Select Date & Time
        </h3>
        
        <!-- Date Picker -->
        <div style="margin-bottom: 2rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.75rem;">
            ${this.availableSlots.slice(0, 7).map((slot, index) => `
              <button onclick="bookingSystem.selectDate(${index})" 
                      class="date-btn"
                      id="date-btn-${index}"
                      style="padding: 1rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 0.75rem; color: white; cursor: pointer; transition: all 0.3s; text-align: center;">
                <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.25rem;">
                  ${slot.dayName}
                </div>
                <div style="font-size: 1.125rem; font-weight: 700;">
                  ${slot.date.getDate()}
                </div>
                <div style="font-size: 0.75rem; color: #94a3b8;">
                  ${slot.date.toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </button>
            `).join('')}
          </div>
        </div>
        
        <!-- Time Slots (Initially Hidden) -->
        <div id="timeSlotContainer" style="display: none;">
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 2rem; margin-top: 1rem;">
            <h4 style="font-size: 1.125rem; font-weight: 700; color: white; margin-bottom: 1rem;">
              Available Time Slots
            </h4>
            <div id="timeSlotsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.75rem;">
              <!-- Time slots loaded dynamically -->
            </div>
          </div>
        </div>
        
        <!-- Details Form (Initially Hidden) -->
        <div id="detailsFormContainer" style="display: none;">
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 2rem; margin-top: 2rem;">
            <h4 style="font-size: 1.125rem; font-weight: 700; color: white; margin-bottom: 1.5rem;">
              Your Details
            </h4>
            
            <form id="bookingDetailsForm" style="display: grid; gap: 1.25rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                  <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
                    Full Name *
                  </label>
                  <input type="text" 
                         id="booking-name" 
                         required
                         style="width: 100%; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.75rem; color: white; font-size: 1rem;"
                         placeholder="Ahmed Al-Mansouri">
                </div>
                <div>
                  <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
                    Phone / WhatsApp *
                  </label>
                  <input type="tel" 
                         id="booking-phone" 
                         required
                         style="width: 100%; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.75rem; color: white; font-size: 1rem;"
                         placeholder="+971 50 123 4567">
                </div>
              </div>
              
              <div>
                <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
                  Email Address
                </label>
                <input type="email" 
                       id="booking-email"
                       style="width: 100%; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.75rem; color: white; font-size: 1rem;"
                       placeholder="ahmed@company.ae">
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                  <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
                    Service Required *
                  </label>
                  <select id="booking-service" 
                          required
                          style="width: 100%; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.75rem; color: white; font-size: 1rem;">
                    <option value="">Select service</option>
                    <option value="electrical">⚡ Electrical Services</option>
                    <option value="ac">❄️ AC Services</option>
                    <option value="fitout">🧱 Fitout Services</option>
                    <option value="it">💻 IT Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
                    Location *
                  </label>
                  <select id="booking-location" 
                          required
                          style="width: 100%; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.75rem; color: white; font-size: 1rem;">
                    <option value="">Select emirate</option>
                    <option value="dubai">Dubai</option>
                    <option value="abudhabi">Abu Dhabi</option>
                    <option value="sharjah">Sharjah</option>
                    <option value="ajman">Ajman</option>
                    <option value="rak">Ras Al Khaimah</option>
                    <option value="fujairah">Fujairah</option>
                    <option value="uaq">Umm Al Quwain</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label style="display: block; color: #cbd5e1; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">
                  Additional Notes
                </label>
                <textarea id="booking-notes" 
                          rows="3"
                          style="width: 100%; padding: 0.875rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 0.75rem; color: white; font-size: 1rem; resize: vertical;"
                          placeholder="Tell us more about your project..."></textarea>
              </div>
              
              <!-- Selected Appointment Summary -->
              <div id="appointmentSummary" style="background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 1rem; padding: 1.5rem; margin-top: 1rem;">
                <div style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 1rem;">Your Appointment:</div>
                <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
                  <div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 0.25rem;">DATE</div>
                    <div style="font-weight: 700; color: white;" id="summary-date">-</div>
                  </div>
                  <div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 0.25rem;">TIME</div>
                    <div style="font-weight: 700; color: white;" id="summary-time">-</div>
                  </div>
                  <div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 0.25rem;">TYPE</div>
                    <div style="font-weight: 700; color: white;">Free Site Visit</div>
                  </div>
                </div>
              </div>
              
              <button type="submit" 
                      style="width: 100%; padding: 1rem 2rem; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; border: none; border-radius: 0.75rem; font-weight: 700; font-size: 1.125rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 14px rgba(14, 165, 233, 0.25); margin-top: 1rem;">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  
  selectDate(index) {
    // Update button states
    document.querySelectorAll('.date-btn').forEach((btn, i) => {
      if (i === index) {
        btn.style.background = 'rgba(14, 165, 233, 0.2)';
        btn.style.borderColor = 'rgba(14, 165, 233, 0.4)';
      } else {
        btn.style.background = 'rgba(255, 255, 255, 0.05)';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }
    });
    
    // Load time slots for selected date
    const slot = this.availableSlots[index];
    this.bookingData.date = slot.dateString;
    
    const container = document.getElementById('timeSlotContainer');
    const grid = document.getElementById('timeSlotsGrid');
    
    grid.innerHTML = slot.times.map(time => {
      if (!time.available) {
        return `
          <button disabled 
                  style="padding: 0.875rem; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 0.75rem; color: #475569; cursor: not-allowed; text-align: center; opacity: 0.5;">
            ${time.time}
            <div style="font-size: 0.75rem; margin-top: 0.25rem;">Booked</div>
          </button>
        `;
      }
      
      return `
        <button onclick="bookingSystem.selectTime('${time.time}')" 
                class="time-btn"
                data-time="${time.time}"
                style="padding: 0.875rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 0.75rem; color: white; cursor: pointer; transition: all 0.3s; text-align: center; font-weight: 600;">
          ${time.time}
          ${time.isToday ? '<div style="font-size: 0.75rem; color: #10b981; margin-top: 0.25rem;">Today</div>' : ''}
          ${time.isTomorrow ? '<div style="font-size: 0.75rem; color: #0ea5e9; margin-top: 0.25rem;">Tomorrow</div>' : ''}
        </button>
      `;
    }).join('');
    
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  selectTime(time) {
    this.bookingData.time = time;
    
    // Update button states
    document.querySelectorAll('.time-btn').forEach(btn => {
      if (btn.getAttribute('data-time') === time) {
        btn.style.background = 'rgba(16, 185, 129, 0.2)';
        btn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      } else {
        btn.style.background = 'rgba(255, 255, 255, 0.05)';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }
    });
    
    // Show details form
    const detailsContainer = document.getElementById('detailsFormContainer');
    detailsContainer.style.display = 'block';
    
    // Update summary
    document.getElementById('summary-date').textContent = this.bookingData.date;
    document.getElementById('summary-time').textContent = time;
    
    // Scroll to form
    setTimeout(() => {
      detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    // Setup form submission
    const form = document.getElementById('bookingDetailsForm');
    form.onsubmit = (e) => this.submitBooking(e);
  }
  
  submitBooking(e) {
    e.preventDefault();
    
    // Collect form data
    this.bookingData.name = document.getElementById('booking-name').value;
    this.bookingData.phone = document.getElementById('booking-phone').value;
    this.bookingData.email = document.getElementById('booking-email').value;
    this.bookingData.service = document.getElementById('booking-service').value;
    this.bookingData.location = document.getElementById('booking-location').value;
    this.bookingData.notes = document.getElementById('booking-notes').value;
    
    // Create WhatsApp message
    const message = `🗓️ *Site Visit Booking*\n\n` +
                   `*Name:* ${this.bookingData.name}\n` +
                   `*Phone:* ${this.bookingData.phone}\n` +
                   `*Email:* ${this.bookingData.email}\n` +
                   `*Service:* ${this.bookingData.service}\n` +
                   `*Location:* ${this.bookingData.location}\n` +
                   `*Date:* ${this.bookingData.date}\n` +
                   `*Time:* ${this.bookingData.time}\n` +
                   `*Notes:* ${this.bookingData.notes || 'None'}`;
    
    // Send to WhatsApp
    window.open(`https://wa.me/971563536545?text=${encodeURIComponent(message)}`, '_blank');
    
    // Show confirmation
    this.showConfirmation();
  }
  
  showConfirmation() {
    const container = document.getElementById('bookingFormContainer');
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <div style="width: 5rem; height: 5rem; margin: 0 auto 2rem; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; animation: scaleIn 0.5s ease;">
          ✓
        </div>
        <h3 style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 1rem;">
          Booking Confirmed!
        </h3>
        <p style="color: #94a3b8; font-size: 1.125rem; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
          We've received your booking for ${this.bookingData.date} at ${this.bookingData.time}. 
          Our team will contact you shortly to confirm.
        </p>
        
        <div style="background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 1rem; padding: 2rem; max-width: 500px; margin: 0 auto 2rem;">
          <div style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 1rem;">Appointment Details:</div>
          <div style="text-align: left;">
            <div style="margin-bottom: 0.75rem;">
              <span style="color: #64748b;">Date:</span>
              <span style="color: white; font-weight: 700; margin-left: 0.5rem;">${this.bookingData.date}</span>
            </div>
            <div style="margin-bottom: 0.75rem;">
              <span style="color: #64748b;">Time:</span>
              <span style="color: white; font-weight: 700; margin-left: 0.5rem;">${this.bookingData.time}</span>
            </div>
            <div style="margin-bottom: 0.75rem;">
              <span style="color: #64748b;">Service:</span>
              <span style="color: white; font-weight: 700; margin-left: 0.5rem;">${this.bookingData.service}</span>
            </div>
          </div>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button onclick="location.reload()" 
                  style="padding: 0.875rem 1.75rem; background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 0.75rem; cursor: pointer; font-weight: 600;">
            Book Another
          </button>
          <a href="/" 
             style="display: inline-block; padding: 0.875rem 1.75rem; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; border-radius: 0.75rem; text-decoration: none; font-weight: 600; box-shadow: 0 4px 14px rgba(14, 165, 233, 0.25);">
            Back to Home
          </a>
        </div>
      </div>
    `;
  }
}

// Initialize booking system globally
let bookingSystem;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('booking-system')) {
    bookingSystem = new BookingSystem();
    bookingSystem.render('booking-system');
  }
});

// Add scale-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes scaleIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
