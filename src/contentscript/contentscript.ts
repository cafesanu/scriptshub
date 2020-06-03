import './contentscript.scss';

// ==UserScript==
// @name         amazon error 1
// @namespace    https://www.amazon.com
// @description  amazon error 1
// @match        https://www.amazon.com/gp/ordering/checkout/errors/were-sorry.html
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.onload = () => {
    const consoleColor = 'background: #222; color: #0f0';

    console.log(`%c Error occurred, starting loop again`, consoleColor);

    window.open('https://www.amazon.com/gp/cart/view.html', '_self');
  }
})();

// ==UserScript==
// @name         amazon error 2
// @namespace    https://www.amazon.com
// @description  amazon error 2
// @match        https://www.amazon.com/errors/500.html
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.onload = () => {
    const consoleColor = 'background: #222; color: #0f0';

    console.log(`%c Error occurred, starting loop again`, consoleColor);

    window.open('https://www.amazon.com/gp/cart/view.html', '_self');
  }
})();

// ==UserScript==
// @name         amazon fresh redirect
// @namespace    https://www.amazon.com
// @description  amazon fresh redirect
// @match        https://www.amazon.com/gp/yourstore?ie=UTF8&ref=ox_checkout_redirects_yourstore
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.onload = () => {
  const consoleColor = 'background: #222; color: #0f0';

  console.info('%c Window 1 available', consoleColor);

  document.getElementById('nav-cart').click();
}
})();

// ==UserScript==
// @name         amazon fresh step 1
// @namespace    https://www.amazon.com
// @description  amazon fresh step 1
// @match        https://www.amazon.com/gp/cart/view.html*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.onload = () => {
    const consoleColor = 'background: #222; color: #0f0';

    console.info('%c Window 1 available', consoleColor);

    const checkoutButton = document.getElementsByClassName('a-button-input');
    if(checkoutButton.length > 0) {
      checkoutButton[0].click();
    }
  }
})();

// ==UserScript==
// @name         amazon fresh step 2
// @namespace    https://www.amazon.com
// @description  amazon fresh step 2
// @match        https://www.amazon.com/alm/byg*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.onload = () => {
    const consoleColor = 'background: #222; color: #0f0';

    console.log('Window 2 available', consoleColor);

    const continueButton = document.getElementsByClassName('byg-continue-button');

    if(continueButton.length > 0) {
      continueButton[0].getElementsByTagName('a')[0].click();
    }
  }
})();

// ==UserScript==
// @name         amazon fresh step 3
// @namespace    https://www.amazon.com
// @description  amazon fresh step 3
// @match        https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  window.onload = () => {
    const consoleColor = 'background: #222; color: #0f0';

    console.log('%c Window 3 available', consoleColor);
    window.open('https://www.amazon.com/gp/buy/shipoptionselect/handlers/display.html?hasWorkingJavascript=1', '_self');
  }

})();

// ==UserScript==
// @name         amazon fresh step 4
// @namespace    https://www.amazon.com
// @description  amazon fresh step 4
// @match        https://www.amazon.com/gp/buy/shipoptionselect/handlers/display.html?hasWorkingJavascript=1
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  window.onload = () => {
      const consoleColor = 'background: #222; color: #0f0';
      const title = [
          '🔴🔴🔴🔴🔴🔴🔴🔴🔴',
          '🟡🟡🟡🟡🟡🟡🟡🟡🟡',
          '🟢🟢🟢🟢🟢🟢🟢🟢🟢'
      ];
      const reloadUrl = 'https://www.amazon.com/gp/buy/shipoptionselect/handlers/display.html?hasWorkingJavascript=1';
      const reloadErrorUrl = 'https://www.amazon.com/gp/cart/view.html';
      try {
          document.getElementsByClassName('celwidget')[0].innerHTML += '<div class="counter" style="font-size:40px;color:red;position:absolute;top:30px;right:30px">Clicking days</div>'
          console.log('%c Window 4 available', consoleColor);
          let slotAvailable = false;

          function timer(ms) {
              return new Promise(res => {
                  try {
                      return setTimeout(res, ms);
                  } catch (error) {
                      console.error(error);
                      window.open(reloadErrorUrl, '_self');
                  }
              });
          }

          function insertSoundIfSlotAvailable() {
              const slot = document.getElementsByClassName('ufss-slotgroup-container');
              if (slot.length > 0) {
                  slotAvailable = true;
                  console.log('%c Playing Audio', consoleColor);
                  const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/6528');

                  audio.play();

                  let titleIndex = 1;

                  setInterval(function() {
                      document.title = title[titleIndex % title.length];
                      titleIndex++;
                  }, 500);

              }
          }

          async function clickElem(elem, index) {
              document.getElementsByClassName('counter')[0].innerHTML = `Clicking day ${index+1}`;

              console.log(`%c elem ${index} clicked`, consoleColor);
              elem.click();
              insertSoundIfSlotAvailable();

              await timer(3000);

          }

          async function notice() {
              try {
                  const dayWindow = [...document.getElementsByClassName('ufss-date-select-toggle-container')];
                  for (let i = 0; i < dayWindow.length; i++) {
                      if (!slotAvailable) {
                          await clickElem(dayWindow[i], i);
                      }
                  }
                  if (!slotAvailable) {
                      let reloadSeconds = 7;

                      console.log(`%c Reloading in ${reloadSeconds} seconds`, consoleColor);

                      const intervalId = setInterval(() => {
                          if (reloadSeconds === 0) {
                              clearInterval(intervalId);
                              if (window.location.href === reloadUrl) {
                                  console.log('%c Reloading', consoleColor);
                                  window.open(reloadUrl, '_self')
                              }
                          } else {
                              reloadSeconds--;
                              document.getElementsByClassName('counter')[0].innerHTML = `No time slots found: Reloading In: ${reloadSeconds}`;
                          }
                      }, 1000);

                      setTimeout(() => {
                          try {
                              if (window.location.href === reloadUrl) {
                                  console.log('%c Reloading', consoleColor);
                                  window.open(reloadUrl, '_self')
                              }
                          } catch (error) {
                              console.error(error);
                              window.open(reloadErrorUrl, '_self');
                          }
                      }, reloadSeconds * 1000);
                  }
              } catch (error) {
                  console.error(error);
                  window.open(reloadErrorUrl, '_self');
              }

          }
          notice();
      } catch (error) {
          console.error(error);
          window.open(reloadErrorUrl, '_self');
      }
  }
})();

// ==UserScript==
// @name         Peapod find spot and checkout
// @namespace    https://www.peapod.com/
// @version      0.1
// @match        https://www.peapod.com/product-search/script
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const consoleColor = 'background: #222; color: #0f0';

  const wait = (milliseconds) => {
    return new Promise(res => setTimeout(res, milliseconds));
  }

  const waitAndGetElementByClass = async(className, milliseconds = 1000) => {
      let numMillisecondsWaiting = 0;
      let elem = [];
      while(elem.length === 0) {
          if(numMillisecondsWaiting > 8000) {
              window.location.reload();
          }
          console.log(`%c waiting for "${className}"`, consoleColor)
          await wait(milliseconds);
          elem = document.getElementsByClassName(className);
          numMillisecondsWaiting += milliseconds;
      }
      console.log(`%c elem "${className}" found`, consoleColor);
      return elem;
  }

  const getAvailableSlots = async () => {
      const timeSlots = await waitAndGetElementByClass('time-slot');
      return [...timeSlots].filter((elem) => !elem.className.includes('unavailable'));
  }

  const step1 = async () => {
      //Step 1 - Open Cart Modal
      const cartButtonElem = await waitAndGetElementByClass('global-header_cart-button-container');
      cartButtonElem[0].click();
  }

  const step2 = async () => {
      //Step 2 - Go To Checkout
      const checkoutElem = await waitAndGetElementByClass('navigation-footer_control omega');
      checkoutElem[0].querySelectorAll(".button--third")[0].click();
  }

  const step3 = async () => {
      //Step 3 - Select Delivery as method
      const shippingMethodButtons = await waitAndGetElementByClass('button--prime');
      shippingMethodButtons[1].click();
  }

  const step4 = async () => {
      //Step 4 - Run loop until a available time slot is found an click first available
      const originalAvailableSlots = await getAvailableSlots();

      let slotFound;

      for (let i = 0; i < originalAvailableSlots.length; i++) {
          const availableSlots = await getAvailableSlots();
          let slot = availableSlots[i];
          slot.click();
          await wait(300);
          await waitAndGetElementByClass('slot-calendar-day', 800);
          slotFound = document.evaluate("//button[text()='Select']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

          if(slotFound) {
              i = originalAvailableSlots.length;
          } else if(i === originalAvailableSlots.length - 1){
              await wait(5000);
              i = -1;
          }
      }
      const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/6528');

      audio.play();
      slotFound.click();
  }

  const step5 = async () => {
      //Step 5 - Wait until the slot is actually Reserved
      await waitAndGetElementByClass('button--third', 1200);
      const checkoutButton = document.getElementsByClassName('button button-width--lg button--third');
      checkoutButton[0].click();
  }

  const step6 = async () => {
      //Step 6 - Give 10 dollar tip
      const tipButton = await waitAndGetElementByClass('tip-button increment');
      for (let i = 0; i < 10; i++) {
          tipButton[0].click();
          console.log(`%c tip button clicked`, consoleColor)
          await wait(200);
      }
  }

  const step7 = async () => {
      //Step 6 - Place Ordder
      const placeOrderButtonWrapper = await waitAndGetElementByClass('checkout-button-wrapper');
      placeOrderButtonWrapper[0].querySelectorAll(".button--third")[0].click();
  }

  window.onload = async() => {
      await step1();
      await step2();
      await step3();
      await step4();
      await step5();
      await step6();
      await step7();
  };
})();
