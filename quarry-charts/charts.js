// Quarry Management Dashboard 2025 JavaScript
class QuarryDashboard {
    constructor() {
        this.charts = {};
        this.chartColors = {
            primary: ['#667eea', '#764ba2'],
            secondary: ['#f093fb', '#f5576c'],
            success: ['#4facfe', '#00f2fe'],
            warning: ['#ffecd2', '#fcb69f'],
            danger: ['#ff9a9e', '#fecfef'],
            info: ['#a8edea', '#fed6e3']
        };
        this.init();
    }

    init() {
        Chart.defaults.color = 'rgba(255, 255, 255, 0.8)';
        Chart.defaults.font.family = 'Inter';
        Chart.defaults.plugins.legend.labels.usePointStyle = true;
        Chart.defaults.plugins.legend.labels.padding = 20;
        
        this.createProductionChart();
        this.createEquipmentChart();
        this.createSafetyChart();
        this.createMaterialChart();
        this.createEnvironmentChart();
        this.createCostChart();
        this.bindEvents();
    }

    createGradient(ctx, colorArray, vertical = false) {
        const gradient = ctx.createLinearGradient(
            0, vertical ? 0 : 0,
            vertical ? 0 : ctx.canvas.width,
            vertical ? ctx.canvas.height : 0
        );
        gradient.addColorStop(0, colorArray[0]);
        gradient.addColorStop(1, colorArray[1]);
        return gradient;
    }

    createProductionChart() {
        const ctx = document.getElementById('productionChart').getContext('2d');
        const gradient = this.createGradient(ctx, this.chartColors.primary, true);
        
        this.charts.production = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Production (Tons)',
                    data: [1200, 1450, 1300, 1600, 1400, 1100, 900],
                    borderColor: gradient,
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }, {
                    label: 'Target',
                    data: [1300, 1300, 1300, 1300, 1300, 1300, 1300],
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createEquipmentChart() {
        const ctx = document.getElementById('equipmentChart').getContext('2d');
        
        this.charts.equipment = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Maintenance', 'Idle', 'Repair'],
                datasets: [{
                    data: [15, 3, 2, 1],
                    backgroundColor: [
                        this.createGradient(ctx, this.chartColors.success),
                        this.createGradient(ctx, this.chartColors.warning),
                        this.createGradient(ctx, this.chartColors.info),
                        this.createGradient(ctx, this.chartColors.danger)
                    ],
                    borderWidth: 3,
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    hoverBorderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createSafetyChart() {
        const ctx = document.getElementById('safetyChart').getContext('2d');
        
        this.charts.safety = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Safety Score',
                    data: [95, 98, 92, 96, 99, 97],
                    backgroundColor: this.createGradient(ctx, this.chartColors.success, true),
                    borderColor: this.chartColors.success[0],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createMaterialChart() {
        const ctx = document.getElementById('materialChart').getContext('2d');
        
        this.charts.material = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Granite', 'Limestone', 'Sand', 'Gravel', 'Other'],
                datasets: [{
                    data: [35, 28, 18, 12, 7],
                    backgroundColor: [
                        this.createGradient(ctx, this.chartColors.primary),
                        this.createGradient(ctx, this.chartColors.secondary),
                        this.createGradient(ctx, this.chartColors.success),
                        this.createGradient(ctx, this.chartColors.warning),
                        this.createGradient(ctx, this.chartColors.info)
                    ],
                    borderWidth: 3,
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    hoverBorderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createEnvironmentChart() {
        const ctx = document.getElementById('environmentChart').getContext('2d');
        
        this.charts.environment = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Water Usage', 'Dust Control', 'Noise Level', 'Habitat Protection', 'Waste Management', 'Energy Efficiency'],
                datasets: [{
                    label: 'Current Score',
                    data: [85, 92, 78, 88, 95, 82],
                    borderColor: this.chartColors.success[0],
                    backgroundColor: 'rgba(79, 172, 254, 0.2)',
                    borderWidth: 3,
                    pointBackgroundColor: this.chartColors.success[0],
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 11
                            }
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.6)',
                            backdropColor: 'transparent'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    createCostChart() {
        const ctx = document.getElementById('costChart').getContext('2d');
        
        this.charts.cost = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Labor', 'Fuel', 'Equipment', 'Maintenance', 'Transport', 'Other'],
                datasets: [{
                    label: 'Cost ($000s)',
                    data: [450, 320, 280, 150, 200, 100],
                    backgroundColor: [
                        this.createGradient(ctx, this.chartColors.primary, true),
                        this.createGradient(ctx, this.chartColors.secondary, true),
                        this.createGradient(ctx, this.chartColors.success, true),
                        this.createGradient(ctx, this.chartColors.warning, true),
                        this.createGradient(ctx, this.chartColors.danger, true),
                        this.createGradient(ctx, this.chartColors.info, true)
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            callback: function(value) {
                                return '$' + value + 'k';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    bindEvents() {
        // Time period controls
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateProductionChart(e.target.dataset.period);
            });
        });

        // Auto-refresh data every 30 seconds
        setInterval(() => {
            this.refreshAllCharts();
        }, 30000);

        // Add resize listener for responsive charts
        window.addEventListener('resize', () => {
            Object.values(this.charts).forEach(chart => {
                chart.resize();
            });
        });
    }

    updateProductionChart(period) {
        const chart = this.charts.production;
        let newData, newLabels;

        switch(period) {
            case 'week':
                newLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                newData = [1200, 1450, 1300, 1600, 1400, 1100, 900];
                break;
            case 'month':
                newLabels = ['W1', 'W2', 'W3', 'W4'];
                newData = [5200, 5800, 5400, 4900];
                break;
            case 'year':
                newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
                newData = [22000, 24500, 23800, 21200];
                break;
        }

        chart.data.labels = newLabels;
        chart.data.datasets[0].data = newData;
        chart.update('active');
    }

    refreshAllCharts() {
        // Simulate real-time data updates
        Object.values(this.charts).forEach(chart => {
            if (chart.config.type === 'line') {
                chart.data.datasets[0].data = chart.data.datasets[0].data.map(value => 
                    Math.max(0, value + (Math.random() - 0.5) * 100)
                );
            }
            chart.update('none');
        });
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuarryDashboard();
});

// Add smooth scrolling and other enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading states
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        container.classList.add('loading');
        setTimeout(() => {
            container.classList.remove('loading');
        }, 2000);
    });

    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    });

    document.querySelectorAll('.chart-card').forEach(card => {
        observer.observe(card);
    });
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);