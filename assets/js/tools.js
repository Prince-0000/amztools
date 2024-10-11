// Conversion rate (You can update this based on the latest exchange rate)
const conversionRate = 0.012; // 1 Rupee = 0.012 USD

let currentCurrency = 'inr'; // Tracks the current selected currency (default INR)
let currentPrice = { inr: 0, usd: 0 }; // Stores the current price in both INR and USD

const paymentMethods = {
    paypal: {
        qrCode: 'path_to_paypal_qr_code.png', // Replace with actual QR code image path
        contact: 'moinzainab786@gmail.com',
    },
    upi: {
        qrCode: 'assets/images/upiqr.jpg', // Replace with actual QR code image path
        contact: 'toolswalaatoolswala@okhdfcbank',
    }
};

// Function to fetch tools
async function fetchTools() {

    try {
        console.log("in fetching tools")
        const response = await fetch('https://software-zobd.onrender.com/api/tool');  // Replace with your API endpoint
        const tools = await response.json();

        const toolContainer = document.querySelector('.all-tools');
        toolContainer.innerHTML = ''; // Clear the container

        tools.forEach(tool => {
            const toolElement = `
                <div class="col-md-4 mb-4 single-tool">
                    <div class="rounded bundleCard">
                        <div class="card-image">
                            <img class="img-fluid card-img" src="${tool.img}" alt="${tool.name}" />
                        </div>
                        <div class="card-body text-center pb-0 mt-4">
                            <h5>${tool.name}</h5>
                            <span class="badge tag p-3 card-price">₹ ${tool.month}</span>
                            <button class="btn mx-auto primary-button smooth-anchor mt-2 w-100 buy-button" data-tool-id="${tool._id}">
                                <i class="icon-arrow-right-circle"></i> Buy
                            </button>
                        </div>
                    </div>
                </div>
            `;
            toolContainer.innerHTML += toolElement;
        });

        // Add event listeners to the buy buttons
        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', event => {
                const toolId = event.currentTarget.getAttribute('data-tool-id');
                const selectedTool = tools.find(t => t._id === toolId);
                showModal(selectedTool);
            });
        });

    } catch (error) {
        console.error('Error fetching tools:', error);
    }
}

// Function to reset modal to default state
function resetModal() {
    currentCurrency = 'inr'; // Reset to INR currency
    document.querySelectorAll('.currency-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('#rupee-btn').classList.add('active'); // Default currency
    document.querySelectorAll('.pricing-btn').forEach(btn => btn.classList.remove('active')); // Reset pricing buttons
    document.querySelector('#monthly-btn').classList.add('active'); // Default to monthly pricing
}

// Function to update the price display based on the selected period and currency
function updatePriceDisplay(tool, priceType) {
    const priceInRupee = tool[priceType];
    const priceInDollar = (priceInRupee * conversionRate).toFixed(2);

    currentPrice = {
        inr: priceInRupee,
        usd: priceInDollar
    };

    const priceToShow = currentCurrency === 'usd' ? currentPrice.usd : currentPrice.inr;
    const currencySymbol = currentCurrency === 'usd' ? '$' : '₹';
    document.getElementById('priceDisplay').textContent = `${currencySymbol} ${priceToShow}`;
}

// Function to show the modal with tool data
function showModal(tool) {
    resetModal(); // Ensure defaults are set

    // Populate modal with the tool data
    document.getElementById('toolName').textContent = tool.name;
    document.getElementById('toolDescription').textContent = tool.description;
    updatePriceDisplay(tool, 'month'); // Default to monthly price

    // Attach event listeners to the pricing buttons
    document.querySelectorAll('.pricing-btn').forEach(button => {
        button.addEventListener('click', event => {
            document.querySelectorAll('.pricing-btn').forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');

            const priceType = event.currentTarget.getAttribute('data-price');
            updatePriceDisplay(tool, priceType);
        });
    });

    // Attach event listeners to currency buttons
    document.querySelectorAll('.currency-btn').forEach(button => {
        button.addEventListener('click', event => {
            document.querySelectorAll('.currency-btn').forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');

            currentCurrency = event.currentTarget.getAttribute('data-currency');
            const priceType = document.querySelector('.pricing-btn.active').getAttribute('data-price');
            updatePriceDisplay(tool, priceType); // Update price when currency is switched
        });
    });

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('toolModal'));
    modal.show();

    // Handle payment options
    document.getElementById('payWithPayPal').onclick = () => showPaymentInfo(tool, 'paypal', modal);
    document.getElementById('payWithUPI').onclick = () => showPaymentInfo(tool, 'upi', modal);

    // Reset modal on close
    const closeButton = document.querySelector('.btn-close');
    closeButton.addEventListener('click', () => {
        modal.hide();
        resetModal(); // Ensure defaults are set after close
    });
}

// Function to show the payment modal and close the first modal
function showPaymentInfo(tool, paymentMethod, toolModal) {
    const paymentDetails = paymentMethods[paymentMethod];
    if (paymentDetails) {
        document.getElementById('qrCode').src = paymentDetails.qrCode;
        const selectedPrice = document.getElementById('priceDisplay').textContent;

        // Display payment info and price
        document.getElementById('contactDetails').innerHTML = `
            ${paymentDetails.contact} <br>
            <strong>Total Price: ${selectedPrice}</strong>
        `;

        // Close the first modal and show the second modal
        toolModal.hide();
        const paymentModal = new bootstrap.Modal(document.getElementById('paymentInfoModal'));
        paymentModal.show();

        // Reset payment modal on close
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            paymentModal.hide();
        });
    }
}

// Fetch tools when the page loads
// window.onload = fetchTools;
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    fetchTools();  // Call your function here
});
