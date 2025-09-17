// Quarry Management System JavaScript
class QuarryManager {
    constructor() {
        this.initializeApp();
        this.loadSampleData();
        this.initializeCharts();
        this.bindEvents();
    }

    initializeApp() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Set default dates
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        
        document.getElementById('startDate').value = startOfYear.toISOString().split('T')[0];
        document.getElementById('endDate').value = today.toISOString().split('T')[0];
        
        if (document.getElementById('reportStartDate')) {
            document.getElementById('reportStartDate').value = startOfYear.toISOString().split('T')[0];
            document.getElementById('reportEndDate').value = today.toISOString().split('T')[0];
        }
    }

    loadSampleData() {
        this.productionData = [
            { date: '2024-01-01', material: 'limestone', quantity: 2450, grade: 'A', shift: 'morning', supervisor: 'John Smith' },
            { date: '2024-01-02', material: 'granite', quantity: 1890, grade: 'B', shift: 'afternoon', supervisor: 'Sarah Johnson' },
            { date: '2024-01-03', material: 'sandstone', quantity: 3200, grade: 'A', shift: 'night', supervisor: 'Mike Wilson' },
            { date: '2024-01-04', material: 'limestone', quantity: 2800, grade: 'A', shift: 'morning', supervisor: 'John Smith' },
            { date: '2024-01-05', material: 'granite', quantity: 2100, grade: 'B', shift: 'afternoon', supervisor: 'Sarah Johnson' }
        ];

        this.recentActivities = [
            { time: '09:15 AM', activity: 'Production Started', status: 'Active', details: 'Limestone quarrying began in Zone A' },
            { time: '08:45 AM', activity: 'Equipment Check', status: 'Completed', details: 'Daily inspection of Excavator CAT-320' },
            { time: '08:30 AM', activity: 'Shift Handover', status: 'Completed', details: 'Morning shift briefing completed' },
            { time: '08:00 AM', activity: 'Safety Briefing', status: 'Completed', details: 'Daily safety meeting with all personnel' },
            { time: '07:45 AM', activity: 'Weather Check', status: 'Completed', details: 'Weather conditions suitable for operations' }
        ];

        this.loadRecentActivities();
        this.loadProductionTable();
    }

    loadRecentActivities() {
        const tbody = document.getElementById('recentActivities');
        if (!tbody) return;

        tbody.innerHTML = this.recentActivities.map(activity => `
            <tr>
                <td>${activity.time}</td>
                <td>${activity.activity}</td>
                <td><span class="status ${activity.status.toLowerCase()}">${activity.status}</span></td>
                <td>${activity.details}</td>
            </tr>
        `).join('');
    }

    loadProductionTable() {
        const tbody = document.getElementById('productionTable');
        if (!tbody) return;

        tbody.innerHTML = this.productionData.map(item => `
            <tr>
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td>${item.material.charAt(0).toUpperCase() + item.material.slice(1)}</td>
                <td>${item.quantity.toLocaleString()} tonnes</td>
                <td>Grade ${item.grade}</td>
                <td>${item.shift.charAt(0).toUpperCase() + item.shift.slice(1)}</td>
                <td>${item.supervisor}</td>
                <td>
                    <button class="btn-secondary" onclick="editProduction()">Edit</button>
                    <button class="btn-danger" onclick="deleteProduction()">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    initializeCharts() {
        this.initProductionChart();
        this.initRevenueChart();
        this.initMaterialChart();
        this.initEquipmentChart();
    }

    initProductionChart() {
        const ctx = document.getElementById('productionChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Production (tonnes)',
                    data: [65000, 72000, 68000, 75000, 70000, 73500],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString() + 't';
                            }
                        }
                    }
                }
            }
        });
    }

    initRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [13000000, 14400000, 13600000, 15000000, 14000000, 14700000],
                    backgroundColor: '#27ae60',
                    borderColor: '#219a52',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    initMaterialChart() {
        const ctx = document.getElementById('materialChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Limestone', 'Granite', 'Sandstone'],
                datasets: [{
                    data: [45, 30, 25],
                    backgroundColor: ['#3498db', '#e74c3c', '#f39c12'],
                    borderColor: ['#2980b9', '#c0392b', '#e67e22'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }

    initEquipmentChart() {
        const ctx = document.getElementById('equipmentChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Excavator', 'Crusher', 'Loader', 'Drill', 'Truck'],
                datasets: [{
                    label: 'Utilization %',
                    data: [95, 0, 88, 92, 85],
                    borderColor: '#9b59b6',
                    backgroundColor: 'rgba(155, 89, 182, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.getAttribute('href').substring(1));
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Form submissions
        this.bindFormEvents();

        // Window click events for modals
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    bindFormEvents() {
        // Production form
        const productionForm = document.querySelector('#productionModal form');
        if (productionForm) {
            productionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProductionEntry();
            });
        }

        // Equipment form
        const equipmentForm = document.querySelector('#equipmentModal form');
        if (equipmentForm) {
            equipmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveEquipment();
            });
        }

        // Incident form
        const incidentForm = document.querySelector('#incidentModal form');
        if (incidentForm) {
            incidentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveIncident();
            });
        }
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    saveProductionEntry() {
        const formData = {
            date: document.getElementById('prodDate').value,
            material: document.getElementById('materialType').value,
            quantity: parseInt(document.getElementById('quantity').value),
            grade: document.getElementById('qualityGrade').value,
            shift: document.getElementById('shift').value,
            supervisor: document.getElementById('supervisor').value
        };

        this.productionData.unshift(formData);
        this.loadProductionTable();
        this.closeModal('productionModal');
        this.showNotification('Production entry saved successfully!', 'success');
        
        // Reset form
        document.querySelector('#productionModal form').reset();
    }

    saveEquipment() {
        const formData = {
            name: document.getElementById('equipmentName').value,
            type: document.getElementById('equipmentType').value,
            model: document.getElementById('equipmentModel').value,
            purchaseDate: document.getElementById('purchaseDate').value,
            serviceInterval: document.getElementById('serviceInterval').value
        };

        console.log('Equipment saved:', formData);
        this.closeModal('equipmentModal');
        this.showNotification('Equipment added successfully!', 'success');
        
        // Reset form
        document.querySelector('#equipmentModal form').reset();
    }

    saveIncident() {
        const formData = {
            date: document.getElementById('incidentDate').value,
            severity: document.getElementById('severityLevel').value,
            location: document.getElementById('incidentLocation').value,
            description: document.getElementById('incidentDescription').value,
            personnel: document.getElementById('personnelInvolved').value
        };

        console.log('Incident reported:', formData);
        this.closeModal('incidentModal');
        this.showNotification('Safety incident reported successfully!', 'warning');
        
        // Reset form
        document.querySelector('#incidentModal form').reset();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Global functions for HTML event handlers
function openModal(modalId) {
    quarryManager.openModal(modalId);
}

function closeModal(modalId) {
    quarryManager.closeModal(modalId);
}

function updateDashboard() {
    quarryManager.showNotification('Dashboard updated successfully!', 'success');
}

function generateReport() {
    const reportType = document.getElementById('reportType').value;
    quarryManager.showNotification(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated!`, 'info');
}

function exportReport() {
    quarryManager.showNotification('Report exported to PDF!', 'success');
}

function editProduction() {
    quarryManager.showNotification('Edit functionality coming soon!', 'info');
}

function deleteProduction() {
    if (confirm('Are you sure you want to delete this production entry?')) {
        quarryManager.showNotification('Production entry deleted!', 'success');
    }
}

// Initialize the application
let quarryManager;
document.addEventListener('DOMContentLoaded', function() {
    quarryManager = new QuarryManager();
});

// Add some additional CSS for notifications dynamically
const notificationStyles = `
.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-left: 4px solid #3498db;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    z-index: 3000;
    animation: slideIn 0.3s ease-out;
}

.notification-success {
    border-left-color: #27ae60;
}

.notification-warning {
    border-left-color: #f39c12;
}

.notification-error {
    border-left-color: #e74c3c;
}

.notification button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 1rem;
    color: #95a5a6;
}

.notification button:hover {
    color: #2c3e50;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.status {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
}

.status.active {
    background: #d4edda;
    color: #155724;
}

.status.completed {
    background: #d1ecf1;
    color: #0c5460;
}

.btn-danger {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    color: white;
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    margin-left: 0.5rem;
}

.btn-danger:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 10px rgba(231, 76, 60, 0.3);
}
`;

// Inject the notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);