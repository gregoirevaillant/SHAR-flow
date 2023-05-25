let basicTheftM = document.getElementById("basicTheftMonthly");
let basicTheftA = document.getElementById("basicTheftAnnual");
let basicDamageM = document.getElementById("basicDamageMonthly");
let basicDamageA = document.getElementById("basicDamageAnnual");
let classicM = document.getElementById("classicMonthly");
let classicMA = document.getElementById("classicMonthlyAnnual");
let classicA = document.getElementById("classicAnnual");
let classicAM = document.getElementById("classicAnnualMonthly");
let comfortM = document.getElementById("comfortMonthly");
let comfortMA = document.getElementById("comfortMonthlyAnnual");
let comfortA = document.getElementById("comfortAnnual");
let comfortAM = document.getElementById("comfortAnnualMonthly");
let premiumM = document.getElementById("premiumMonthly");
let premiumMA = document.getElementById("premiumMonthlyAnnual");
let premiumA = document.getElementById("premiumAnnual");
let premiumAM = document.getElementById("premiumAnnualMonthly");

let basicTheftMV;
let basicTheftAV;
let basicDamageMV;
let basicDamageAV;
let classicMV;
let classicMAV;
let classicAV;
let classicAMV;
let comfortMV;
let comfortMAV;
let comfortAV;
let comfortAMV;
let premiumMV;
let premiumMAV;
let premiumAV;
let premiumAMV;

let quote = "";
let stepNumber = 0;
let stepName = "PRICE_ZIP";

const buttonNext = document.getElementById("next");
buttonNext.classList.add("disable");
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

function updateBikeprice() {
	bikeprice = this.value;
	checkButton();
}
document.getElementById("bikeprice").oninput = updateBikeprice;

function updateZipcode() {
	zipcode = this.value;
	checkButton();
}
document.getElementById("zipcode").oninput = updateZipcode;

function updateEmail() {
	email = this.value;
	checkButton();
}
document.getElementById("email").oninput = updateEmail;

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

function updateBikeBrand() {
	bikeBrand = this.value;
	checkButton();
}
document.getElementById("bikeBrand").oninput = updateBikeBrand;

function updateBikeDate() {
	bikeDate = this.value;
	bikeDate = new Date(bikeDate);
	checkButton();
}
document.getElementById("bikeDate").oninput = updateBikeDate;

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
			buttonNext.classList.remove("disable");
		} else {
			buttonNext.classList.add("disable");
		}
	}
	if (stepNumber == 1) {
		if (choosenPackage === undefined) {
			buttonNext.classList.add("disable");
		} else {
			buttonNext.classList.remove("disable");
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
			buttonNext.classList.remove("disable");
		} else {
			buttonNext.classList.add("disable");
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
				let m = packageObj.monthly;
				let a = packageObj.annual;
				switch (packageObj.package.code) {
					case "BASIC_THEFT":
						basicTheftMV = m.priceWithTaxes.toFixed(2);
						basicTheftAV = a.priceWithTaxes.toFixed(2);
						break;
					case "BASIC_DAMAGE":
						basicDamageMV = m.priceWithTaxes.toFixed(2);
						basicDamageAV = a.priceWithTaxes.toFixed(2);
						break;
					case "CLASSIC":
						classicMV = m.priceWithTaxes.toFixed(2);
						classicMAV = (m.priceWithTaxes * 12).toFixed(2);
						classicAV = a.priceWithTaxes.toFixed(2);
						classicAMV = (a.priceWithTaxes / 12).toFixed(2);
						break;
					case "COMFORT":
						comfortMV = m.priceWithTaxes.toFixed(2);
						comfortMAV = (m.priceWithTaxes * 12).toFixed(2);
						comfortAV = a.priceWithTaxes.toFixed(2);
						comfortAMV = (a.priceWithTaxes / 12).toFixed(2);
						break;
					case "PREMIUM":
						premiumMV = m.priceWithTaxes.toFixed(2);
						premiumMAV = (m.priceWithTaxes * 12).toFixed(2);
						premiumAV = a.priceWithTaxes.toFixed(2);
						premiumAMV = (a.priceWithTaxes / 12).toFixed(2);
						break;
					default:
						break;
				}
			}
			basicTheftM.innerHTML = showPrice(basicTheftMV);
			basicTheftA.innerHTML = showPrice(basicTheftAV);
			basicDamageM.innerHTML = showPrice(basicDamageMV);
			basicDamageA.innerHTML = showPrice(basicDamageAV);
			classicM.innerHTML = showPrice(classicMV);
			classicMA.innerHTML = showPrice(classicMAV);
			classicA.innerHTML = showPrice(classicAV);
			classicAM.innerHTML = showPrice(classicAMV);
			comfortM.innerHTML = showPrice(comfortMV);
			comfortMA.innerHTML = showPrice(comfortMAV);
			comfortA.innerHTML = showPrice(comfortAV);
			comfortAM.innerHTML = showPrice(comfortAMV);
			premiumM.innerHTML = showPrice(premiumMV);
			premiumMA.innerHTML = showPrice(premiumMAV);
			premiumA.innerHTML = showPrice(premiumAV);
			premiumAM.innerHTML = showPrice(premiumAMV);
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
			basicTheftMV,
			basicTheftAV,
			basicDamageMV,
			basicDamageAV,
			classicMV,
			classicMAV,
			classicAV,
			classicAMV,
			comfortMV,
			comfortMAV,
			comfortAV,
			comfortAMV,
			premiumMV,
			premiumMAV,
			premiumAV,
			premiumAMV,
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
                bycicode: "",
                brand: bikeBrand,
                model: bikeModel,
                price: bikeprice,
                purchaseDate: bikeDate,
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
