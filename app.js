// Modern QuarryPro 2025 JavaScript

class QuarryProApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAnimations();
    this.initializeCharts();
    this.setupNavigation();
    this.handleLoading();
    this.initializeCounters();
    this.setupNotifications();
    this.setupFAB();
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => this.handleNavigation(e));
    });

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
    }

    // User profile
    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
      userProfile.addEventListener('click', () => this.toggleUserMenu());
    }

    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
      notificationBtn.addEventListener('click', () => this.toggleNotifications());
    }

    // Close notifications
    const closeNotifications = document.getElementById('closeNotifications');
    if (closeNotifications) {
      closeNotifications.addEventListener('click', () => this.closeNotifications());
    }

    // Chart controls
    document.querySelectorAll('.chart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleChartPeriodChange(e));
    });

    // Window events
    window.addEventListener('scroll', () => this.handleScroll());
    window.addEventListener('resize', () => this.handleResize());

    // FAB actions
    document.querySelectorAll('.fab-item').forEach(item => {
      item.addEventListener('click', (e) => this.handleFABAction(e));
    });
  }

  handleLoading() {
    // Simulate app loading
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }
    }, 2000);
  }

  setupNavigation() {
    const hash = window.location.hash.substring(1) || 'dashboard';
    this.showSection(hash);
  }

  handleNavigation(e) {
    e.preventDefault();
    const section = e.currentTarget.getAttribute('data-section');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');

    // Show section
    this.showSection(section);
    
    // Update URL
    window.history.pushState({}, '', `#${section}`);
  }

  showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      this.animateSection(targetSection);
    }
  }

  animateSection(section) {
    const cards = section.querySelectorAll('[data-aos]');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.animation = 'slideInRight 0.6s ease-out forwards';
      }, index * 100);
    });
  }

  handleScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  handleResize() {
    // Handle responsive behavior
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    navLinks.classList.toggle('mobile-active');
    mobileMenuBtn.classList.toggle('active');
  }

  closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    navLinks.classList.remove('mobile-active');
    mobileMenuBtn.classList.remove('active');
  }

  toggleUserMenu() {
    // Implementation for user menu dropdown
    console.log('User menu toggled');
  }

  initializeCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    const observerOptions = {
      threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-value'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  }

  initializeCharts() {
    this.initProductionChart();
    this.initEquipmentChart();
  }

  initProductionChart() {
    const canvas = document.getElementById('productionChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Sample data for production trends
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Production (tons)',
        data: [2400, 2800, 2600, 3200, 2900, 2700, 2847],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    };

    this.drawLineChart(ctx, data);
  }

  initEquipmentChart() {
    const canvas = document.getElementById('equipmentChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Sample data for equipment status
    const data = {
      labels: ['Operational', 'Maintenance', 'Offline'],
      datasets: [{
        data: [18, 4, 1],
        backgroundColor: ['#4ade80', '#fbbf24', '#f87171'],
        borderWidth: 0
      }]
    };

    this.drawDoughnutChart(ctx, data);
  }

  drawLineChart(ctx, data) {
    const canvas = ctx.canvas;
    const { width, height } = canvas;
    
    ctx.clearRect(0, 0, width, height);
    
    // Simple line chart implementation
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const max = Math.max(...data.datasets[0].data);
    const min = Math.min(...data.datasets[0].data);
    const range = max - min;
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw data line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.datasets[0].data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.datasets[0].data.length - 1)) * index;
      const y = height - padding - ((value - min) / range) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#667eea';
    data.datasets[0].data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.datasets[0].data.length - 1)) * index;
      const y = height - padding - ((value - min) / range) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  drawDoughnutChart(ctx, data) {
    const canvas = ctx.canvas;
    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    const innerRadius = radius * 0.6;
    
    ctx.clearRect(0, 0, width, height);
    
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    let currentAngle = -Math.PI / 2;
    
    data.datasets[0].data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      // Draw slice
      ctx.fillStyle = data.datasets[0].backgroundColor[index];
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fill();
      
      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelRadius = radius - 30;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toString(), labelX, labelY);
      
      currentAngle += sliceAngle;
    });
  }

  handleChartPeriodChange(e) {
    e.preventDefault();
    
    // Update active button
    e.currentTarget.parentElement.querySelectorAll('.chart-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Refresh chart data (implementation depends on data source)
    const period = e.currentTarget.getAttribute('data-period');
    console.log(`Chart period changed to: ${period}`);
    
    // Simulate data refresh
    setTimeout(() => {
      this.initProductionChart();
    }, 300);
  }

  setupNotifications() {
    // Simulate real-time notifications
    setInterval(() => {
      this.addRandomNotification();
    }, 30000); // Every 30 seconds
  }

  addRandomNotification() {
    const notifications = [
      {
        type: 'warning',
        title: 'Equipment Maintenance Due',
        message: 'Excavator EX-005 requires scheduled maintenance',
        icon: 'fas fa-exclamation-triangle'
      },
      {
        type: 'success',
        title: 'Production Target Met',
        message: 'Zone B has exceeded daily production target',
        icon: 'fas fa-check'
      },
      {
        type: 'info',
        title: 'Weather Alert',
        message: 'Heavy rain expected in 2 hours',
        icon: 'fas fa-cloud-rain'
      }
    ];

    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    
    // Update notification badge
    const badge = document.querySelector('.notification-badge');
    if (badge) {
      const current = parseInt(badge.textContent) || 0;
      badge.textContent = current + 1;
    }

    // Add to notification panel
    this.addNotificationToPanel(randomNotification);
  }

  addNotificationToPanel(notification) {
    const notificationList = document.querySelector('.notification-list');
    if (!notificationList) return;

    const notificationHtml = `
      <div class="notification-item unread">
        <div class="notification-icon ${notification.type}">
          <i class="${notification.icon}"></i>
        </div>
        <div class="notification-content">
          <p class="notification-title">${notification.title}</p>
          <p class="notification-message">${notification.message}</p>
          <p class="notification-time">Just now</p>
        </div>
      </div>
    `;

    notificationList.insertAdjacentHTML('afterbegin', notificationHtml);
  }

  toggleNotifications() {
    const notificationPanel = document.getElementById('notificationPanel');
    if (notificationPanel) {
      notificationPanel.classList.toggle('active');
    }
  }

  closeNotifications() {
    const notificationPanel = document.getElementById('notificationPanel');
    if (notificationPanel) {
      notificationPanel.classList.remove('active');
    }
  }

  setupFAB() {
    const fab = document.getElementById('fab');
    const fabMenu = document.getElementById('fabMenu');
    
    if (fab && fabMenu) {
      fab.addEventListener('click', () => {
        fabMenu.classList.toggle('active');
      });

      // Close FAB menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!fab.contains(e.target) && !fabMenu.contains(e.target)) {
          fabMenu.classList.remove('active');
        }
      });
    }
  }

  handleFABAction(e) {
    const action = e.currentTarget.getAttribute('data-action');
    
    switch (action) {
      case 'add-equipment':
        this.showModal('Add Equipment', 'Equipment addition form would appear here');
        break;
      case 'create-report':
        this.showModal('Create Report', 'Report creation form would appear here');
        break;
      case 'schedule-maintenance':
        this.showModal('Schedule Maintenance', 'Maintenance scheduling form would appear here');
        break;
    }

    // Close FAB menu
    const fabMenu = document.getElementById('fabMenu');
    if (fabMenu) {
      fabMenu.classList.remove('active');
    }
  }

  showModal(title, content) {
    // Simple modal implementation
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <p>${content}</p>
        </div>
        <div class="modal-footer">
          <button class="action-btn secondary">Cancel</button>
          <button class="action-btn primary">Confirm</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const modalStyles = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease-out;
      }
      
      .modal-content {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        max-width: 500px;
        width: 90%;
        animation: slideInUp 0.3s ease-out;
      }
      
      .modal-header {
        padding: var(--space-xl);
        border-bottom: 1px solid var(--glass-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .modal-body {
        padding: var(--space-xl);
      }
      
      .modal-footer {
        padding: var(--space-xl);
        border-top: 1px solid var(--glass-border);
        display: flex;
        gap: var(--space-md);
        justify-content: flex-end;
      }
      
      .modal-close {
        background: none;
        border: none;
        color: var(--muted-text);
        font-size: 1.5rem;
        cursor: pointer;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideInUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;

    if (!document.getElementById('modal-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'modal-styles';
      styleSheet.textContent = modalStyles;
      document.head.appendChild(styleSheet);
    }

    // Close modal functionality
    const closeModal = () => {
      modal.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.action-btn.secondary').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  initializeAnimations() {
    // Initialize AOS (Animate On Scroll) alternative
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-aos-delay')) || 0;
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(element);
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuarryProApp();
});

// Add additional CSS animations
const additionalStyles = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);