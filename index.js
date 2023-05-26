let basicTheftMonthly = document.getElementById("basicTheftMonthly");
let basicTheftAnnual = document.getElementById("basicTheftAnnual");
let basicDamageMonthly = document.getElementById("basicDamageMonthly");
let basicDamageAnnual = document.getElementById("basicDamageAnnual");
let classicMonthly = document.getElementById("classicMonthly");
let classicMonthlyAnnual = document.getElementById("classicMonthlyAnnual");
let classicAnnual = document.getElementById("classicAnnual");
let classicAnnualMonthly = document.getElementById("classicAnnualMonthly");
let comfortMonthly = document.getElementById("comfortMonthly");
let comfortMonthlyAnnual = document.getElementById("comfortMonthlyAnnual");
let comfortAnnual = document.getElementById("comfortAnnual");
let comfortAnnualMonthly = document.getElementById("comfortAnnualMonthly");
let premiumMonthly = document.getElementById("premiumMonthly");
let premiumMonthlyAnnual = document.getElementById("premiumMonthlyAnnual");
let premiumAnnual = document.getElementById("premiumAnnual");
let premiumAnnualMonthly = document.getElementById("premiumAnnualMonthly");

let basicTheftMonthlyValue;
let basicTheftAnnualValue;
let basicDamageMonthlyValue;
let basicDamageAnnualValue;
let classicMonthlyValue;
let classicMonthlyAnnualValue;
let classicAnnualValue;
let classicAnnualMonthlyValue;
let comfortMonthlyValue;
let comfortMonthlyAnnualValue;
let comfortAnnualValue;
let comfortAnnualMonthlyValue;
let premiumMonthlyValue;
let premiumMonthlyAnnualValue;
let premiumAnnualValue;
let premiumAnnualMonthlyValue;

let quote = "";
let stepNumber = 0;
let stepName = "PRICE_ZIP";

const buttonNext = document.getElementById("next");
buttonNext.style.pointerEvents = "none";
buttonNext.style.opacity = "0.5";
const buttonPrevious = document.getElementById("previous");
const buttonSubmit = document.getElementById("submit");

let title = document.getElementById("title");

let bikeprice = 0;
let zipcode = "";
let email = "";
let choosenPackage = "";
let packages = document.querySelectorAll('[name="package"]');
let bikeModel = "";
let bikeBrand = "";
let bikeDate = "";
let bikeInvoice = "";
let lockInvoice = "";
let premiumSplitting = "";

function updateBikeprice(event) {
	bikeprice = this.value;
	checkButton();
}
document.getElementById("bikeprice").oninput = updateBikeprice;
document.getElementById("bikeprice").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
        e.preventDefault();
	}
});

function updateZipcode() {
	zipcode = this.value;
	checkButton();
}
document.getElementById("zipcode").oninput = updateZipcode;
document.getElementById("zipcode").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
        e.preventDefault();
	}
});

function updateEmail() {
	email = this.value;
	checkButton();
}
document.getElementById("email").oninput = updateEmail;
document.getElementById("email").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
        e.preventDefault();
	}
});

function handlechoosenPackage(event) {
	choosenPackage = event.target.value;
	switch (choosenPackage) {
		case "BASIC_THEFT_A":
			choosenPackage = 5;
			premiumSplitting = 12;
			break;
		case "BASIC_THEFT_M":
			choosenPackage = 5;
			premiumSplitting = 1;
			break;
		case "BASIC_DAMAGE_A":
			choosenPackage = 6;
			premiumSplitting = 12;
			break;
		case "BASIC_DAMAGE_M":
			choosenPackage = 6;
			premiumSplitting = 1;
			break;
		case "CLASSIC_A":
			choosenPackage = 7;
			premiumSplitting = 12;
			break;
		case "CLASSIC_M":
			choosenPackage = 7;
			premiumSplitting = 1;
			break;
		case "COMFORT_A":
			choosenPackage = 8;
			premiumSplitting = 12;
			break;
		case "COMFORT_M":
			choosenPackage = 8;
			premiumSplitting = 1;
			break;
		case "PREMIUM_A":
			choosenPackage = 9;
			premiumSplitting = 12;
			break;
		case "PREMIUM_M":
			choosenPackage = 9;
			premiumSplitting = 1;
			break;
		default:
			break;
	}

	checkButton();
}
packages.forEach(function (pack) {
	pack.addEventListener("change", handlechoosenPackage);
});

function updateBikeModel() {
	bikeModel = this.value;
	checkButton();
}
document.getElementById("bikeModel").oninput = updateBikeModel;
document.getElementById("bikeModel").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
        e.preventDefault();
	}
});

function updateBikeBrand() {
	bikeBrand = this.value;
	checkButton();
}
document.getElementById("bikeBrand").oninput = updateBikeBrand;
document.getElementById("bikeBrand").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
        e.preventDefault();
	}
});

function updateBikeDate() {
	let input = this.value;
	let day = input.substring(0, 2);
	let month = input.substring(3, 5);
	let year = input.substring(6, 10);
	bikeDate = `${year}-${month}-${day}T00:00:00.000Z`;
	checkButton();
}
document.getElementById("bikeDate").oninput = updateBikeDate;
document.getElementById("bikeDate").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
        e.preventDefault();
	}
});

function updateBikeInvoice() {
	bikeInvoice = this.checked;
	checkButton();
}
document.getElementById("bikeInvoice").addEventListener("change", updateBikeInvoice);

function updateLockInvoice() {
	lockInvoice = this.checked;
	checkButton();
}
document.getElementById("lockInvoice").addEventListener("change", updateLockInvoice);

function checkButton() {
	if (stepNumber == 0) {
		if (bikeprice >= 1 && zipcode.length === 5 && email.length >= 1 && email.includes("@")) {
			buttonNext.style.pointerEvents = "auto";
			buttonNext.style.opacity = "1";
		} else {
			buttonNext.style.pointerEvents = "none";
			buttonNext.style.opacity = "0.5";
		}
	}
	if (stepNumber == 1) {
		if (choosenPackage === undefined) {
			buttonNext.style.pointerEvents = "none";
			buttonNext.style.opacity = "0.5";
		} else {
			buttonNext.style.pointerEvents = "auto";
			buttonNext.style.opacity = "1";
		}
	}
	if (stepNumber == 2) {
		if (
			bikeModel.length >= 1 &&
			bikeBrand.length >= 1 &&
			bikeDate.length >= 1 &&
			bikeInvoice &&
			lockInvoice
		) {
			buttonNext.style.pointerEvents = "auto";
			buttonNext.style.opacity = "1";
		} else {
			buttonNext.style.pointerEvents = "none";
			buttonNext.style.opacity = "0.5";
		}
	}
}

function updateNextStatus() {
	switch (stepNumber) {
		case 0:
			getQS()
				.then(() => getPrice(quote))
				.catch((error) => {
					console.log(error);
				});
			title.innerHTML = "Sélectionnez la protection qui vous convient <span>&#129309</span>";
			stepName = "OFFER";
			stepNumber++;
			checkButton();
			break;
		case 1:
			title.innerHTML = "Parlez nous de votre vélo <span>&#9997</span>";
			stepName = "MY_BIKE";
			stepNumber++;
			updateQSMyBike(quote);
			checkButton();
			break;
		case 2:
			title.innerHTML = "Votre contrat est prêt ! <span>&#127881</span>";
			stepName = "AUTH";
			stepNumber++;
			updateQSAuth(quote);
			checkButton();
			break;
		default:
			break;
	}
}

function updatePreviousStatus() {
	switch (stepNumber) {
		case 3:
			title.innerHTML = "Parlez nous de votre vélo <span>&#9997</span>";
			stepName = "MY_BIKE";
			stepNumber--;
			checkButton();
			break;
		case 2:
			title.innerHTML = "Sélectionnez la protection qui vous convient <span>&#129309</span>";
			stepName = "OFFER";
			stepNumber--;
			checkButton();
			break;
		case 1:
			title.innerHTML = "Simulez le prix de votre assurance vélo  <span>&#128640</span>";
			stepName = "PRICE_ZIP";
			stepNumber--;
			checkButton();
			break;
		default:
			break;
	}
}

function getQS(bikePrice, zipCode) {
	return new Promise((resolve, reject) => {
		fetch("https://insurance.api.sharelock.co/quotes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				vehicle: {
					price: bikeprice,
				},
				client: {
					zipcode: zipcode,
				},
				tracking: {
					source: "WEB",
					step: "OFFER",
				},
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				quote = response.serial;
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
}

function getPrice(quote) {
	fetch(`https://insurance.api.sharelock.co/pricing/${quote}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((response) => response.json())
		.then((response) => {
			for (const packageObj of response) {
				switch (packageObj.package.code) {
					case "BASIC_THEFT":
						basicTheftMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
						basicTheftAnnualValue = packageObj.annual.priceWithTaxes.toFixed(2);
						break;
					case "BASIC_DAMAGE":
						basicDamageMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
						basicDamageAnnualValue = packageObj.annual.priceWithTaxes.toFixed(2);
						break;
					case "CLASSIC":
						classicMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
						classicMonthlyAnnualValue = (
							packageObj.monthly.priceWithTaxes * 12
						).toFixed(2);
						classicAnnualValue = packageObj.annual.priceWithTaxes.toFixed(2);
						classicAnnualMonthlyValue = (packageObj.annual.priceWithTaxes / 12).toFixed(
							2
						);
						break;
					case "COMFORT":
						comfortMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
						comfortMonthlyAnnualValue = (
							packageObj.monthly.priceWithTaxes * 12
						).toFixed(2);
						comfortAnnualValue = packageObj.annual.priceWithTaxes.toFixed(2);
						comfortAnnualMonthlyValue = (packageObj.annual.priceWithTaxes / 12).toFixed(
							2
						);
						break;
					case "PREMIUM":
						premiumMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
						premiumMonthlyAnnualValue = (
							packageObj.monthly.priceWithTaxes * 12
						).toFixed(2);
						premiumAnnualValue = packageObj.annual.priceWithTaxes.toFixed(2);
						premiumAnnualMonthlyValue = (packageObj.annual.priceWithTaxes / 12).toFixed(
							2
						);
						break;
					default:
						break;
				}
			}
			basicTheftMonthly.innerHTML = showPrice(basicTheftMonthlyValue);
			basicTheftAnnual.innerHTML = showPrice(basicTheftAnnualValue);
			basicDamageMonthly.innerHTML = showPrice(basicDamageMonthlyValue);
			basicDamageAnnual.innerHTML = showPrice(basicDamageAnnualValue);
			classicMonthly.innerHTML = showPrice(classicMonthlyValue);
			classicMonthlyAnnual.innerHTML = showPrice(classicMonthlyAnnualValue);
			classicAnnual.innerHTML = showPrice(classicAnnualValue);
			classicAnnualMonthly.innerHTML = showPrice(classicAnnualMonthlyValue);
			comfortMonthly.innerHTML = showPrice(comfortMonthlyValue);
			comfortMonthlyAnnual.innerHTML = showPrice(comfortMonthlyAnnualValue);
			comfortAnnual.innerHTML = showPrice(comfortAnnualValue);
			comfortAnnualMonthly.innerHTML = showPrice(comfortAnnualMonthlyValue);
			premiumMonthly.innerHTML = showPrice(premiumMonthlyValue);
			premiumMonthlyAnnual.innerHTML = showPrice(premiumMonthlyAnnualValue);
			premiumAnnual.innerHTML = showPrice(premiumAnnualValue);
			premiumAnnualMonthly.innerHTML = showPrice(premiumAnnualMonthlyValue);
		})
		.then(() => addContact())
		.catch((error) => {
			console.log(error);
		});
}

function showPrice(price) {
	return price.toString().concat("€");
}

function addContact() {
	fetch("https://hook.eu1.make.com/lxvqgj1rseg3b704is4o0jpnwqdk2up5", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			email,
			zipcode,
			bikeprice,
			quote,
			basicTheftMonthlyValue,
			basicTheftAnnualValue,
			basicDamageMonthlyValue,
			basicDamageAnnualValue,
			classicMonthlyValue,
			classicMonthlyAnnualValue,
			classicAnnualValue,
			classicAnnualMonthlyValue,
			comfortMonthlyValue,
			comfortMonthlyAnnualValue,
			comfortAnnualValue,
			comfortAnnualMonthlyValue,
			premiumMonthlyValue,
			premiumMonthlyAnnualValue,
			premiumAnnualValue,
			premiumAnnualMonthlyValue,
		}),
	}).catch((error) => {
		console.log(error);
	});
}

function updateQSMyBike(quoteSerial) {
	console.log(quoteSerial);
	fetch(`https://insurance.api.sharelock.co/quotes/${quoteSerial}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			choosenPackage: {
				id: choosenPackage,
                accessory_step: "0",
			},
			client: {
				zipcode: zipcode,
			},
			policy: {
				premiumSplitting: premiumSplitting,
			},
			status: "OPEN",
			tracking: {
				source: "WEBFLOW",
				step: stepName,
			},
			vehicle: {
				price: bikeprice,
				type: "bicyle",
			},
		}),
	}).catch((error) => {
		console.log(error);
	});
}

function updateQSAuth(quoteSerial) {
	console.log(quoteSerial);
	fetch(`https://insurance.api.sharelock.co/quotes/${quoteSerial}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			choosenPackage: {
				id: choosenPackage,
                accessory_step: "0",
			},
			client: {
				zipcode: zipcode,
			},
			policy: {
				premiumSplitting: premiumSplitting,
			},
			status: "OPEN",
			tracking: {
				source: "WEBFLOW",
				step: stepName,
			},
			vehicle: {
				brand: bikeBrand,
				model: bikeModel,
				price: bikeprice,
				purchase_date: bikeDate,
				type: "bicyle",
			},
		}),
	}).catch((error) => {
		console.log(error);
	});
}

buttonSubmit.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.keyCode === 13) {
		return;
	}
	window.location.href = `https://portal.sharelock.co/onboarding?QS=${quote}`;
});

buttonNext.addEventListener("click", updateNextStatus);
buttonPrevious.addEventListener("click", updatePreviousStatus);
