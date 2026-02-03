// Rate Data Structure
const RATES = {
    // Fixed monthly charges by meter size
    fixedCharges: {
        '5/8': { year1: 15.00, year2: 15.75, year3: 16.54 },
        '3/4': { year1: 22.50, year2: 23.63, year3: 24.81 },
        '1': { year1: 37.50, year2: 39.38, year3: 41.34 }
    },
    
    // Tiered usage rates per 1,000 gallons
    usageRates: {
        year1: [
            { min: 0, max: 5000, rate: 2.50 },
            { min: 5001, max: 10000, rate: 3.00 },
            { min: 10001, max: 20000, rate: 3.50 },
            { min: 20001, max: Infinity, rate: 4.00 }
        ],
        year2: [
            { min: 0, max: 5000, rate: 2.63 },
            { min: 5001, max: 10000, rate: 3.15 },
            { min: 10001, max: 20000, rate: 3.68 },
            { min: 20001, max: Infinity, rate: 4.20 }
        ],
        year3: [
            { min: 0, max: 5000, rate: 2.76 },
            { min: 5001, max: 10000, rate: 3.31 },
            { min: 10001, max: 20000, rate: 3.86 },
            { min: 20001, max: Infinity, rate: 4.41 }
        ]
    }
};

// Calculate usage charges based on tiered rates
function calculateUsageCharges(gallons, yearRates) {
    let remainingGallons = gallons;
    let totalCharge = 0;
    const breakdown = [];

    for (const tier of yearRates) {
        if (remainingGallons <= 0) break;

        const tierMax = tier.max === Infinity ? Infinity : tier.max;
        const tierMin = tier.min;
        const tierCapacity = tierMax === Infinity ? Infinity : tierMax - tierMin + 1;
        
        const gallonsInTier = Math.min(remainingGallons, tierCapacity);
        
        if (gallonsInTier > 0) {
            // Calculate charge for this tier (rate is per 1,000 gallons)
            const charge = (gallonsInTier / 1000) * tier.rate;
            totalCharge += charge;
            
            breakdown.push({
                gallons: gallonsInTier,
                rate: tier.rate,
                charge: charge,
                tierDesc: tierMax === Infinity 
                    ? `${tierMin.toLocaleString()}+ gallons`
                    : `${tierMin.toLocaleString()} - ${tierMax.toLocaleString()} gallons`
            });
            
            remainingGallons -= gallonsInTier;
        }
    }

    return { totalCharge, breakdown };
}

// Calculate total bill for a specific year
function calculateYearBill(gallons, meterSize, year) {
    const yearKey = `year${year}`;
    const fixedCharge = RATES.fixedCharges[meterSize][yearKey];
    const yearRates = RATES.usageRates[yearKey];
    
    const { totalCharge: usageCharge, breakdown } = calculateUsageCharges(gallons, yearRates);
    const totalBill = fixedCharge + usageCharge;
    
    return {
        fixedCharge,
        usageCharge,
        totalBill,
        breakdown
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Display calculation breakdown
function displayBreakdown(year, meterSize, gallons) {
    const result = calculateYearBill(gallons, meterSize, year);
    const breakdownSection = document.getElementById('breakdown-section');
    const breakdownYear = document.getElementById('breakdown-year');
    const breakdownContent = document.getElementById('breakdown-content');
    
    breakdownYear.textContent = `Year ${year}`;
    
    let html = '';
    
    // Fixed charge
    html += `
        <div class="breakdown-item">
            <span class="breakdown-label">Fixed Monthly Charge (${meterSize}" meter)</span>
            <span class="breakdown-value">${formatCurrency(result.fixedCharge)}</span>
        </div>
    `;
    
    // Usage charges by tier
    html += `
        <div class="breakdown-item">
            <span class="breakdown-label"><strong>Usage Charges</strong></span>
            <span class="breakdown-value"></span>
        </div>
    `;
    
    result.breakdown.forEach(tier => {
        html += `
            <div class="breakdown-item" style="padding-left: 1rem;">
                <span class="breakdown-label">
                    ${tier.gallons.toLocaleString()} gallons @ ${formatCurrency(tier.rate)}/1,000 gal
                    <br>
                    <small style="color: var(--text-secondary);">${tier.tierDesc}</small>
                </span>
                <span class="breakdown-value">${formatCurrency(tier.charge)}</span>
            </div>
        `;
    });
    
    // Subtotal for usage
    html += `
        <div class="breakdown-item">
            <span class="breakdown-label">Usage Subtotal</span>
            <span class="breakdown-value">${formatCurrency(result.usageCharge)}</span>
        </div>
    `;
    
    // Total
    html += `
        <div class="breakdown-item total">
            <span class="breakdown-label">Total Monthly Bill</span>
            <span class="breakdown-value">${formatCurrency(result.totalBill)}</span>
        </div>
    `;
    
    breakdownContent.innerHTML = html;
    breakdownSection.style.display = 'block';
    
    // Scroll to breakdown
    breakdownSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Main calculation function
function calculateBill() {
    const gallonsInput = document.getElementById('gallons');
    const meterSizeInput = document.getElementById('meter-size');
    
    const gallons = parseInt(gallonsInput.value);
    const meterSize = meterSizeInput.value;
    
    // Validation
    if (!gallons || gallons < 0) {
        alert('Please enter a valid water usage amount in gallons.');
        gallonsInput.focus();
        return;
    }
    
    if (!meterSize) {
        alert('Please select a meter size.');
        meterSizeInput.focus();
        return;
    }
    
    // Calculate for all three years
    const year1Result = calculateYearBill(gallons, meterSize, 1);
    const year2Result = calculateYearBill(gallons, meterSize, 2);
    const year3Result = calculateYearBill(gallons, meterSize, 3);
    
    // Display results
    document.getElementById('year1-total').textContent = formatCurrency(year1Result.totalBill);
    document.getElementById('year2-total').textContent = formatCurrency(year2Result.totalBill);
    document.getElementById('year3-total').textContent = formatCurrency(year3Result.totalBill);
    
    // Show results section
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block';
    
    // Hide breakdown initially
    document.getElementById('breakdown-section').style.display = 'none';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Store current calculation for breakdown
    window.currentCalculation = { gallons, meterSize };
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Calculate button
    document.getElementById('calculate-btn').addEventListener('click', calculateBill);
    
    // Allow Enter key to submit
    document.getElementById('gallons').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateBill();
        }
    });
    
    // Details buttons
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const year = parseInt(e.target.dataset.year);
            if (window.currentCalculation) {
                displayBreakdown(
                    year,
                    window.currentCalculation.meterSize,
                    window.currentCalculation.gallons
                );
            }
        });
    });
    
    // Close breakdown button
    document.getElementById('close-breakdown').addEventListener('click', () => {
        document.getElementById('breakdown-section').style.display = 'none';
    });
});
