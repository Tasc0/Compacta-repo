// QuarryPro Sales Analytics JavaScript - 2025
class SalesAnalytics {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        this.setupNavigation();
        this.initCharts();
        this.startRealTimeUpdates();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Update navigation
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Update sections
                sections.forEach(s => s.classList.remove('active'));
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    initCharts() {
        this.createRevenueChart();
        this.createQuarterlyChart();
        this.createRegionChart();
        this.createAcquisitionChart();
        this.createCLVChart();
        this.createProductCharts();
        this.createTeamChart();
        this.createPipelineChart();
        this.createForecastChart();
    }

    createRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: [180000, 210000, 190000, 240000, 280000, 260000, 300000, 320000, 280000, 350000, 380000, 420000],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: this.getBaseChartOptions('Revenue Trend (2025)')
        });
    }

    createQuarterlyChart() {
        const ctx = document.getElementById('quarterlyChart');
        if (!ctx) return;

        this.charts.quarterly = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
                datasets: [{
                    label: 'Revenue',
                    data: [580000, 760000, 900000, 1150000, 620000],
                    backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#43e97b', '#4facfe'],
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: this.getBaseChartOptions('Quarterly Performance')
        });
    }

    createRegionChart() {
        const ctx = document.getElementById('regionChart');
        if (!ctx) return;

        this.charts.region = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Other'],
                datasets: [{
                    data: [45, 25, 20, 7, 3],
                    backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#43e97b', '#4facfe'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                ...this.getBaseChartOptions('Revenue by Region'),
                cutout: '70%'
            }
        });
    }

    createAcquisitionChart() {
        const ctx = document.getElementById('acquisitionChart');
        if (!ctx) return;

        this.charts.acquisition = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'New Customers',
                    data: [45, 52, 48, 61, 73, 69, 78, 85, 79, 92, 98, 105],
                    borderColor: '#4facfe',
                    backgroundColor: 'rgba(79, 172, 254, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: this.getBaseChartOptions('Customer Acquisition')
        });
    }

    createCLVChart() {
        const ctx = document.getElementById('clvChart');
        if (!ctx) return;

        this.charts.clv = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Tier 1', 'Tier 2', 'Tier 3', 'Enterprise'],
                datasets: [{
                    label: 'Average CLV',
                    data: [5000, 12000, 25000, 85000],
                    backgroundColor: ['#43e97b', '#f093fb', '#764ba2', '#667eea'],
                    borderRadius: 8
                }]
            },
            options: this.getBaseChartOptions('Customer Lifetime Value')
        });
    }

    createProductCharts() {
        // Equipment Chart
        const equipmentCtx = document.getElementById('equipmentChart');
        if (equipmentCtx) {
            this.charts.equipment = new Chart(equipmentCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Excavators', 'Crushers', 'Conveyors', 'Others'],
                    datasets: [{
                        data: [40, 30, 20, 10],
                        backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#43e97b'],
                        borderWidth: 0
                    }]
                },
                options: { ...this.getBaseChartOptions(), cutout: '65%' }
            });
        }

        // Software Chart
        const softwareCtx = document.getElementById('softwareChart');
        if (softwareCtx) {
            this.charts.software = new Chart(softwareCtx, {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: 'Licenses',
                        data: [450, 620, 780, 1847],
                        borderColor: '#4facfe',
                        backgroundColor: 'rgba(79, 172, 254, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: this.getBaseChartOptions()
            });
        }

        // Services Chart
        const servicesCtx = document.getElementById('servicesChart');
        if (servicesCtx) {
            this.charts.services = new Chart(servicesCtx, {
                type: 'bar',
                data: {
                    labels: ['Maintenance', 'Training', 'Support', 'Consulting'],
                    datasets: [{
                        data: [80000, 95000, 75000, 70000],
                        backgroundColor: ['#43e97b', '#f093fb', '#764ba2', '#667eea'],
                        borderRadius: 6
                    }]
                },
                options: this.getBaseChartOptions()
            });
        }
    }

    createTeamChart() {
        const ctx = document.getElementById('teamChart');
        if (!ctx) return;

        this.charts.team = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Prospecting', 'Qualifying', 'Presenting', 'Closing', 'Follow-up', 'Upselling'],
                datasets: [{
                    label: 'Team Average',
                    data: [85, 78, 92, 88, 75, 83],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 2
                }, {
                    label: 'Top Performers',
                    data: [95, 88, 98, 94, 85, 92],
                    borderColor: '#43e97b',
                    backgroundColor: 'rgba(67, 233, 123, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                ...this.getBaseChartOptions('Team Performance Metrics'),
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        angleLines: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: { color: '#636e72', font: { size: 12 } }
                    }
                }
            }
        });
    }

    createPipelineChart() {
        const ctx = document.getElementById('pipelineChart');
        if (!ctx) return;

        this.charts.pipeline = new Chart(ctx, {
            type: 'funnel',
            data: {
                labels: ['Prospects', 'Qualified', 'Proposal', 'Closing'],
                datasets: [{
                    data: [1200000, 890000, 645000, 420000],
                    backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#43e97b'],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: this.getBaseChartOptions('Sales Pipeline Value')
        });
    }

    createForecastChart() {
        const ctx = document.getElementById('forecastChart');
        if (!ctx) return;

        this.charts.forecast = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Actual',
                    data: [420000, 385000, 440000, 465000, 520000, 490000, null, null, null, null, null, null],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: false
                }, {
                    label: 'Forecast',
                    data: [null, null, null, null, null, 490000, 545000, 580000, 620000, 655000, 690000, 725000],
                    borderColor: '#43e97b',
                    backgroundColor: 'rgba(67, 233, 123, 0.1)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    fill: false
                }]
            },
            options: this.getBaseChartOptions('Sales Forecast vs Actual')
        });
    }

    getBaseChartOptions(title = '') {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: !!title,
                    text: title,
                    font: { size: 16, weight: 'bold' },
                    color: '#2d3436'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#636e72',
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#636e72' }
                },
                y: {
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { color: '#636e72' }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        };
    }

    startRealTimeUpdates() {
        setInterval(() => {
            this.updateStats();
        }, 30000); // Update every 30 seconds
    }

    updateStats() {
        // Simulate real-time data updates
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            const changeElement = card.querySelector('.stat-change');
            if (changeElement) {
                // Add subtle animation to indicate data refresh
                changeElement.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    changeElement.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    // Method to export charts as images
    exportChart(chartName) {
        if (this.charts[chartName]) {
            const url = this.charts[chartName].toBase64Image();
            const link = document.createElement('a');
            link.download = `${chartName}-chart.png`;
            link.href = url;
            link.click();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SalesAnalytics();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Animate stat cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card, .chart-container, .product-card').forEach(el => {
        observer.observe(el);
    });

    // Add click handlers for interactive elements
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });
});