function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) return parseInt(i) + 1;
  }
  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
    if (uiBHK[i].checked) return parseInt(i) + 1;
  }
  return -1;
}

function showError(msg) {
  var err = document.getElementById("uiError");
  err.innerText = msg;
  err.style.display = "block";
}

function clearError() {
  document.getElementById("uiError").style.display = "none";
}

function onReset() {
  document.getElementById("uiSqft").value = 1000;
  document.getElementById("uiLocations").selectedIndex = 0;
  document.getElementById("uiEstimatedPrice").style.display = "none";
  document.getElementById("sqftHint").innerText = "";
  clearError();

  // Reset radios to default (BHK=2, Bath=2)
  document.getElementById("bhk2").checked = true;
  document.getElementById("bath2").checked = true;
}

function onClickedEstimatePrice() {
  clearError();

  var sqft = parseFloat(document.getElementById("uiSqft").value);
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations").value;

  // ── Validation ──
  if (!sqft || sqft < 100 || sqft > 10000) {
    showError("Please enter a valid area between 100 and 10,000 sq. ft.");
    return;
  }
  if (!location) {
    showError("Please select a location.");
    return;
  }
  if (bathrooms > bhk + 2) {
    showError("Bathrooms seem too many for the selected BHK. Please check.");
    return;
  }

  var url = "http://127.0.0.1:5000/predict_home_price";

  $.post(url, {
    area: sqft,
    bhk: bhk,
    bathroom: bathrooms,
    location: location
  }, function (data, status) {
    var price = data.estimated_price;
    var pricePerSqft = (price * 100000 / sqft).toFixed(0); // convert lakh to rupees then per sqft

    document.getElementById("resultPrice").innerText = price + " Lakh";
    document.getElementById("resultSqft").innerText = "₹" + Number(pricePerSqft).toLocaleString('en-IN') + " per sq. ft.";
    document.getElementById("uiEstimatedPrice").style.display = "block";
  }).fail(function () {
    showError("Could not connect to server. Make sure the Flask server is running.");
  });
}

// ── Live sqft hint ──
document.addEventListener("DOMContentLoaded", function () {
  var sqftInput = document.getElementById("uiSqft");
  if (sqftInput) {
    sqftInput.addEventListener("input", function () {
      var val = parseFloat(this.value);
      var hint = document.getElementById("sqftHint");
      if (val < 100) hint.innerText = "Too small";
      else if (val > 10000) hint.innerText = "Very large property";
      else hint.innerText = "";
    });
  }
});

function onPageLoad() {
  var url = "http://127.0.0.1:5000/get_location_names";
  $.get(url, function (data, status) {
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      $('#uiLocations').append('<option value="" disabled selected>Choose a location</option>');
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
