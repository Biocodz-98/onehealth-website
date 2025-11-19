document.addEventListener("DOMContentLoaded", function () {
  var paymentFrame = document.getElementById("paymentFrame");
  // if (paymentFrame) {
  //   paymentFrame.addEventListener("click", function () {
  //     hidePopups();
  //   });
  // }
  if (paymentFrame) {
    paymentFrame.addEventListener("click", function () {
      // Get form data
      const firstName = document.getElementById("first-name").value;
      const lastName = document.getElementById("Last-name").value; // Fixed typo from "Last-name" to "last-name"
      const email = document.getElementById("email").value;
      const mobileNumber = document.getElementById(
        "Whatsapp-enabled-number"
      ).value;
      const address = document.getElementById("Delivery-address").value;
      const radios = document.querySelectorAll('input[name="Preference"]');

      // Initialize variable to store selected value
      let selectedValue = "";

      // Loop through radio buttons to find the checked one
      radios.forEach((radio) => {
        if (radio.checked) {
          selectedValue = radio.value;
        }
      });

      // API endpoint and API key
      const apiUrl = "https://api.brevo.com/v3/contacts";

      // Prepare data object
      const data = {
        email: email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          SMS: mobileNumber,
          ADDRESS: address,
          PREFERRED: selectedValue,
        },
        emailBlacklisted: false,
        smsBlacklisted: false,
        listIds: [102],
      };

      let text =
        "New Imani breast pump pre-order request from " +
        firstName +
        " " +
        lastName +
        ", Email: " +
        email +
        ", Phone number: " +
        mobileNumber +
        ", Address: " +
        address +
        ", Preference: " +
        selectedValue;

      sendSlackNotification(text);

      payStackPayment(data);

      // Prepare headers
      const headers = {
        "Content-Type": "application/json",
        "api-key":
          "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",
      };

      // Make POST request using fetch API
      fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status !== 201) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || "An error occurred");
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data["id"]) {
            // If the response contains an ID, it means success
            alert("Success! The contact has been added.");
          } else {
            // Handle unexpected success response
            alert(
              "Error occured while adding contact. Code: " +
                data.code +
                " , Message: " +
                data.message
            );
          }
        })
        .catch((error) => {
          console.error("Error during fetch:", error);
          alert("Error: " + error.message);
        });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var paymentFinished = document.getElementById("paymentFinished");
  if (paymentFinished) {
    paymentFinished.addEventListener("click", function () {
      hideFinishPopups();
    });
  }
});

function sendSlackNotification(text) {
  // Your Slack webhook URL
  const url = "https://dev.onehealthng.com/api/imani/slack/send-message";

  // Message payload
  const message = {
    channel: "imani-staging",
    content: text,
  };

  // Send POST request to Slack webhook URL
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function payStackPayment(data) {
  const url = "https://api.paystack.co/transaction/initialize";

  const payload = {
    email: data.email,
    firstName: data.attributes.FIRSTNAME,
    lastName: data.attributes.LASTNAME,
    phone: data.attributes.SMS,
    currency: "NGN",
    amount: "9000000",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer sk_test_49eaaead9cdc581cdf7732f96741eba91cf6427f", test secret key
      Authorization: "Bearer sk_live_f0429b0ee67eb19af068ad816a31cc72b1818bd2", //live secret key
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      if (data.data.access_code) {
        const popup = new PaystackPop();
        popup.resumeTransaction(data.data.access_code);
        let response = verifyPayStackPayment(data.data.reference);
        console.log("Response: " + response);
        hidePopups();
      }
    })
    .then((data) => {
      alert(verifyPayStackPayment(data.reference));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function verifyPayStackPayment(data) {
  const url = "https://api.paystack.co/transaction/verify/" + data;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer sk_test_49eaaead9cdc581cdf7732f96741eba91cf6427f", test
      Authorization: "Bearer sk_live_f0429b0ee67eb19af068ad816a31cc72b1818bd2", //Live
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      return data.data.status;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function hidePopups() {
  // Get the element with the ID 'paymentPopup'
  var element = document.getElementById("paymentPopup");

  if (element) {
    element.style.opacity = "0";
    element.style.setProperty('display', 'none', 'important');
  }
  modal.style.display = "block";
}


function hideFinishPopups() {
  modal.style.display = "none";
  setTimeout(function() {
    window.location.href = 'index.html';
}, 1000);
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}