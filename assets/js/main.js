/**
 * Elystronics Repair Shop - Interactive Functionality
 * ITST 306: UX/UI and Cross Platform
 * Shop Technicians: Raul Z. Esperanza & Arman • Poblacion V, Sta. Cruz, Laguna
 * Hotline: 0917 112 0320
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
  initFaqAccordion();
  initServiceFilters();
  initQueryParamPrefill();
});

/* --------------------------------------------------------------------------
   MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileMenuClose');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   CONTACT & INQUIRY FORM (ENGLISH)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="customerName"]')?.value || form.querySelector('#contactName')?.value;
    const phone = form.querySelector('[name="customerPhone"]')?.value || form.querySelector('#contactPhone')?.value;
    const appliance = form.querySelector('[name="applianceType"]')?.value || form.querySelector('#contactAppliance')?.value || 'General Inquiry';
    const message = form.querySelector('[name="message"]')?.value || form.querySelector('#contactMessage')?.value || '';

    if (!name || !phone) {
      alert('Please provide your full name and a contact phone number.');
      return;
    }

    showContactConfirmationModal({
      name,
      phone,
      appliance,
      message
    });

    form.reset();
  });
}

function showContactConfirmationModal(data) {
  let modal = document.getElementById('contactConfirmationModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'contactConfirmationModal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(4px);
      z-index: 9999; display: flex; align-items: center; justify-content: center;
      padding: 1rem;
    `;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background: #fff; max-width: 500px; width: 100%; border-radius: 16px; padding: 2rem; box-shadow: 0 25px 50px rgba(0,0,0,0.3); border-top: 6px solid #F97316;">
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="width: 56px; height: 56px; background: #DCFCE7; color: #16A34A; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 28px;">✓</div>
        <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; color: #0F2744; margin-bottom: 0.25rem;">Inquiry Sent Successfully!</h3>
        <p style="color: #64748B; font-size: 0.9rem;">Thank you, <strong>${data.name}</strong>! Shop technicians Raul Z. Esperanza & Arman have received your request.</p>
      </div>

      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.5rem; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: #64748B;">Customer Name:</span>
          <strong>${data.name}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: #64748B;">Phone:</span>
          <strong>${data.phone}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
          <span style="color: #64748B;">Appliance / Subject:</span>
          <strong>${data.appliance}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #64748B;">Status:</span>
          <span style="color: #16A34A; font-weight: 700;">Received at Poblacion V Shop</span>
        </div>
      </div>

      <p style="font-size: 0.85rem; color: #475569; margin-bottom: 1.5rem; line-height: 1.5;">
        Shop technicians Raul Z. Esperanza & Arman will review your appliance symptoms and reach out to <strong>${data.phone}</strong> with initial diagnostic advice and cost estimates.
      </p>

      <div style="display: flex; gap: 0.75rem;">
        <a href="tel:09171120320" class="btn btn-secondary" style="flex: 1; text-align: center; text-decoration: none;">📞 Call Shop Now</a>
        <button id="closeContactModal" class="btn btn-primary" style="flex: 1;">Close</button>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  document.getElementById('closeContactModal').addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

/* --------------------------------------------------------------------------
   URL QUERY PARAM PREFILL FOR CONTACT FORM
   -------------------------------------------------------------------------- */
function initQueryParamPrefill() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const applianceSelect = document.getElementById('contactAppliance');

  if (!serviceParam || !applianceSelect) return;

  if (serviceParam.includes('tv')) {
    applianceSelect.value = 'Smart LED TV';
  } else if (serviceParam.includes('refrigerator')) {
    applianceSelect.value = 'Inverter Refrigerator';
  } else if (serviceParam.includes('washer') || serviceParam.includes('washing')) {
    applianceSelect.value = 'Washing Machine';
  } else if (serviceParam.includes('aircon')) {
    applianceSelect.value = 'Air Conditioner';
  } else if (serviceParam.includes('microwave')) {
    applianceSelect.value = 'Microwave Oven';
  } else if (serviceParam.includes('small')) {
    applianceSelect.value = 'Small Appliance';
  }
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   SERVICE FILTER TABS
   -------------------------------------------------------------------------- */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-grid-item');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      serviceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
