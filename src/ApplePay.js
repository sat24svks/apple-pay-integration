import React, { useState, useEffect } from "react";

function ApplePayButton({ amount }) {
  const [applePayAvailable, setApplePayAvailable] = useState(false);

  useEffect(() => {
    // Check if Apple Pay is available in the current environment
    if (window.ApplePaySession) {
      var merchantIdentifier = "com.magilhub.customerapp";
      var promise =
        window.ApplePaySession.canMakePaymentsWithActiveCard(
          merchantIdentifier
        );
      promise.then(function (canMakePayments) {
        if (canMakePayments)
          // Display Apple Pay button here.
          setApplePayAvailable(true);
      });
    }
  }, []);

  const onApplePayButtonClick = () => {
    // Configure your Apple Pay request
    const paymentRequest = {
      countryCode: "US",
      currencyCode: "USD",
      supportedNetworks: ["visa", "masterCard", "amex"],
      merchantCapabilities: ["supports3DS"],
      total: {
        label: "Magil Hub",
        amount: amount,
      },
    };

    const session = new window.ApplePaySession(1, paymentRequest);

    session.onvalidatemerchant = (event) => {
      // Validate the merchant
      // Use event.validationURL to send the validation request to your server
    };

    session.onpaymentauthorized = (event) => {
      // Process the payment on your server
      // Use event.payment.token to get the payment token

      //const paymentToken = event.payment.token;

      // Complete the payment
      session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
    };

    session.begin();
  };

  return (
    <div>
      {applePayAvailable ? (
        <button onClick={onApplePayButtonClick}>Pay with Apple Pay</button>
      ) : (
        <p>Apple Pay is not available in this environment.</p>
      )}
    </div>
  );
}

export default ApplePayButton;
