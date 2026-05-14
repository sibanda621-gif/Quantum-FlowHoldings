/**
 * Quantum Flow Holdings - Dashboard Application
 * Main application logic
 */

// Configuration
const CONFIG = {
    updateInterval: 5000, // Update every 5 seconds
    timezone: 'Africa/Johannesburg',
    chart: {
        symbol: 'OANDA:XAUUSD',
        interval: '15',
        theme: 'dark',
        style: '1',
    }
};

// State Management
const state = {
    sentiment: 65,
    latency: 14,
    activeBots: 3,
    isRunning: true,
};

/**
 * Initialize TradingView Chart
 */
function initChart() {
    try {
        if (typeof TradingView === 'undefined') {
            console.warn('TradingView library not loaded yet');
            setTimeout(initChart, 500);
            return;
        }

        new TradingView.widget({
            autosize: true,
            symbol: CONFIG.chart.symbol,
            interval: CONFIG.chart.interval,
            timezone: CONFIG.timezone,
            theme: CONFIG.chart.theme,
            style: CONFIG.chart.style,
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            hide_top_toolbar: true,
            save_image: false,
            container_id: 'tradingview_chart'
        });

        console.log('Chart initialized successfully');
    } catch (error) {
        console.error('Failed to initialize chart:', error);
    }
}

/**
 * Update market sentiment display
 * @param {number} value - Sentiment percentage (0-100)
 */
function updateSentiment(value) {
    if (value < 0 || value > 100) {
        console.warn('Sentiment value out of range');
        return;
    }

    state.sentiment = value;
    const sentimentBar = document.getElementById('sentiment-bar');
    const sentimentValue = document.getElementById('sentiment-value');

    sentimentBar.style.width = value + '%';
    sentimentValue.textContent = value + '%';

    // Change color based on sentiment
    if (value >= 60) {
        sentimentBar.classList.remove('bg-warning', 'bg-danger');
        sentimentBar.classList.add('bg-success');
    } else if (value >= 40) {
        sentimentBar.classList.remove('bg-success', 'bg-danger');
        sentimentBar.classList.add('bg-warning');
    } else {
        sentimentBar.classList.remove('bg-success', 'bg-warning');
        sentimentBar.classList.add('bg-danger');
    }
}

/**
 * Update bot latency display
 * @param {number} latency - Latency in milliseconds
 */
function updateLatency(latency) {
    state.latency = latency;
    const latencyValue = document.getElementById('latency-value');
    latencyValue.textContent = latency;

    // Update status badge
    const statusBadge = document.querySelector('.badge');
    if (latency < 20) {
        statusBadge.textContent = 'Optimal';
        statusBadge.className = 'badge bg-success';
    } else if (latency < 50) {
        statusBadge.textContent = 'Good';
        statusBadge.className = 'badge bg-info';
    } else {
        statusBadge.textContent = 'Warning';
        statusBadge.className = 'badge bg-warning';
    }
}

/**
 * Update active bots count
 * @param {number} count - Number of active bots
 */
function updateActiveBots(count) {
    state.activeBots = count;
    document.getElementById('active-bots').textContent = count;
}

/**
 * Update last update timestamp
 */
function updateTimestamp() {
    const lastUpdate = document.getElementById('last-update');
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    lastUpdate.textContent = timeString;
}

/**
 * Simulate metrics update (replace with real API calls)
 */
function simulateMetricsUpdate() {
    // Simulate slight variations in metrics
    const newSentiment = Math.max(30, Math.min(90, state.sentiment + (Math.random() - 0.5) * 10));
    const newLatency = Math.max(5, Math.min(100, state.latency + (Math.random() - 0.5) * 5));
    
    updateSentiment(Math.round(newSentiment));
    updateLatency(Math.round(newLatency));
    updateTimestamp();
}

/**
 * Emergency stop handler
 */
function handleEmergencyStop() {
    const btn = document.getElementById('emergency-stop');
    
    if (confirm('Are you sure you want to stop ALL trading bots? This action cannot be undone.')) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner me-2"></span>Stopping...';

        // Simulate API call
        setTimeout(() => {
            state.isRunning = false;
            btn.innerHTML = '<i class="fas fa-check me-2"></i>ALL BOTS STOPPED';
            btn.classList.add('disabled');
            console.log('All bots stopped');

            // Re-enable after 3 seconds for demo purposes
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>EMERGENCY STOP';
                btn.classList.remove('disabled');
                state.isRunning = true;
            }, 3000);
        }, 1000);
    }
}

/**
 * View invoices handler
 */
function handleViewInvoices() {
    console.log('Redirecting to invoices page...');
    // Replace with actual navigation
    // window.location.href = '/invoices';
    alert('Redirecting to Client Invoices...');
}

/**
 * Initialize event listeners
 */
function initEventListeners() {
    const emergencyStopBtn = document.getElementById('emergency-stop');
    const viewInvoicesBtn = document.getElementById('view-invoices');

    if (emergencyStopBtn) {
        emergencyStopBtn.addEventListener('click', handleEmergencyStop);
    }

    if (viewInvoicesBtn) {
        viewInvoicesBtn.addEventListener('click', handleViewInvoices);
    }
}

/**
 * Initialize periodic updates
 */
function initPeriodicUpdates() {
    // Update metrics every 5 seconds
    setInterval(simulateMetricsUpdate, CONFIG.updateInterval);
    
    // Initial update
    updateTimestamp();
}

/**
 * Main initialization
 */
function init() {
    console.log('Initializing Quantum Flow Dashboard...');

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }

    try {
        initChart();
        initEventListeners();
        initPeriodicUpdates();
        console.log('Dashboard initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// Start initialization
init();

// Export for testing/debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateSentiment,
        updateLatency,
        updateActiveBots,
        handleEmergencyStop,
        handleViewInvoices,
        CONFIG,
        state
    };
}
