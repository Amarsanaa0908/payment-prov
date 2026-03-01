// Buy it Now Interceptor
(function() {
  'use strict';

  const MERCHANT_ID = 'e8c07206-21f6-4eb0-9ed5-033350cce0c7';
  const API_URL = 'https://api.atlas-trip.com/api/v4/merchant/create';
  const PAYMENT_URL = 'https://payment.ecomify.mn/merchant';

  function init() {
    interceptBuyItNow();
    
    // Watch for dynamically loaded buttons
    const observer = new MutationObserver(interceptBuyItNow);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function interceptBuyItNow() {
    const selectors = [
      '.shopify-payment-button',
      '.shopify-payment-button__button',
      '[data-shopify="payment-button"]',
      '.dynamic-checkout__buttons button'
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(button => {
        if (button.dataset.intercepted) return;
        button.dataset.intercepted = 'true';
        button.addEventListener('click', handleBuyItNowClick, true);
      });
    });
  }

  async function handleBuyItNowClick(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const button = event.target.closest('button') || event.target;
    
    // Get product data directly from the form (NOT from /cart.js)
    const productData = getProductDataFromForm(button);

    if (!productData?.variantId) {
      alert('Please select an option');
      return;
    }

    // Show loading
    button.disabled = true;
    const originalHTML = button.innerHTML;
    button.innerHTML = '<span>Processing...</span>';

    try {
      // Same format as your existing code
      const items = [{
        variantId: String(productData.variantId),
        quantity: String(productData.quantity)
      }];

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: MERCHANT_ID, items: items })
      });

      const data = await response.json();

      // Redirect to your payment page (same as your existing flow)
      window.location.href = `${PAYMENT_URL}/${MERCHANT_ID}/${data.data}`;

    } catch (error) {
      console.error('Error:', error);
      button.disabled = false;
      button.innerHTML = originalHTML;
      alert('Something went wrong. Please try again.');
    }
  }

  function getProductDataFromForm(button) {
    // Find the product form
    const form = button.closest('form[action*="/cart/add"]')
                || button.closest('form.product-form')
                || button.closest('.product-form')?.querySelector('form')
                || document.querySelector('form[action*="/cart/add"]');

    if (form) {
      const variantInput = form.querySelector('[name="id"]');
      const quantityInput = form.querySelector('[name="quantity"]');
      
      return {
        variantId: variantInput?.value,
        quantity: parseInt(quantityInput?.value || '1', 10)
      };
    }

    // Fallback: try to get from URL or page data
    const urlParams = new URLSearchParams(window.location.search);
    const variantFromUrl = urlParams.get('variant');
    
    if (variantFromUrl) {
      return { variantId: variantFromUrl, quantity: 1 };
    }

    // Another fallback: Shopify meta
    if (typeof meta !== 'undefined' && meta.product) {
      return {
        variantId: meta.product.variants[0]?.id,
        quantity: 1
      };
    }

    return null;
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// themeliquid
// right after </body>
{/* <script src="{{ 'buy-it-now-interceptor.js' | asset_url }}" defer></script> */}

function tt(){
    console.log("clicked on checkout")

    let data = [];

    fetch('/cart.js')
  .then((res) => res.json())
  .then((cart) => {
    
    for (let i = 0; i < cart.items.length; i++) {
      data.push({
        variantId: String(cart.items[i].id),
        quantity: String(cart.items[i].quantity)
      })
    }

    const id = 'e8c07206-21f6-4eb0-9ed5-033350cce0c7';
    const requestBody = {
      id: id,
      items: data
    }


    fetch('https://api.atlas-trip.com/api/v4/merchant/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((res) => res.json())
      .then((data) => {
        var baseUrl = "https://payment.ecomify.mn/merchant/e8c07206-21f6-4eb0-9ed5-033350cce0c7/"
        window.location.href = baseUrl + data.data
      })
  });

    return


  }

//   {%- else -%}
//               <div class="cart__ctas" {{ block.shopify_attributes }}>
//                 <button
//                   type="button"
//                   onclick="tt()"
//                   id="checkout"
//                   class="cart__checkout-button button"
//                   name="checkout"
//                   {% if cart == empty %}
//                     disabled
//                   {% endif %}
//                   form="cart"
//                 >
//                   {{ 'sections.cart.checkout' | t }}
//                 </button>
//               </div>

//               {%- if additional_checkout_buttons -%}
//                 <div class="cart__dynamic-checkout-buttons additional-checkout-buttons">
//                   {{ content_for_additional_checkout_buttons }}
//                 </div>
//               {%- endif -%}