// Permet de gérer les interactions avec l'utilisateur, selection des elements de la page
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
let buttonNext = document.getElementById("next");
let buttonPrevious = document.getElementById("previous");
let buttonSubmit = document.getElementById("submit");
let title = document.getElementById("flow-title");
let packages = document.querySelectorAll('[name="package"]');

// Permet de définir les variables (ordre alphabétique)s
let basicTheftMonthlyValue = "";
let basicTheftAnnualValue = "";
let basicDamageMonthlyValue = "";
let basicDamageAnnualValue = "";
let bikeBrand = "";
let bikeDate = "";
let bikeInvoice = "";
let bikeModel = "";
let bikeprice = 0;
let choosenPackage = "";
let classicMonthlyValue = "";
let classicMonthlyAnnualValue = "";
let classicAnnualValue = "";
let classicAnnualMonthlyValue = "";
let comfortMonthlyValue = "";
let comfortMonthlyAnnualValue = "";
let comfortAnnualValue = "";
let comfortAnnualMonthlyValue = "";
let email = "";
let lockInvoice = "";
let premiumMonthlyValue = "";
let premiumMonthlyAnnualValue = "";
let premiumAnnualValue = "";
let premiumAnnualMonthlyValue = "";
let premiumSplitting = "";
let stepName = "PRICE_ZIP";
let stepNumber = 0;
let quote = "";
let zipcode = "";
let tabs = false;
dataLayer.push({ 'step' : 'PRICE_ZIP' });

// Désactiver le bouton next
buttonNext.style.pointerEvents = "none";
buttonNext.style.opacity = "0.5";

// Permet de définir les utm parameters
let utmParameters = {
	utm_source: "",
	utm_medium: "",
	utm_campaign: "",
};
let pageUrl = location.pathname;

// update the utm variable from the url
function updateUtm() {
	let queryString = window.location.search;
	let URLSearchParams_wb = new URLSearchParams(queryString);
	utmParameters.utm_source = URLSearchParams_wb.get("utm_source");
	utmParameters.utm_medium = URLSearchParams_wb.get("utm_medium");
	utmParameters.utm_campaign = URLSearchParams_wb.get("utm_campaign");
}

// Permet de mettre à jour la variable bikeprice
function updateBikeprice(event) {
	bikeprice = this.value;
	checkButton();
}

// Permet de mettre à jour la variable zipcode
function updateZipcode() {
	zipcode = this.value;
	checkButton();
}

// Permet de mettre à jour la variable email
function updateEmail() {
	email = this.value;
	checkButton();
}

// Permet de mettre à jour la variable choosenPackage
function handlechoosenPackage(event) {
	choosenPackage = event.target.value;
	let e = document.getElementById("next");
	e.scrollIntoView({
		block: "start",
		behavior: "smooth",
		inline: "start",
	});
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

// Permet de mettre à jour la variable bikeModel
function updateBikeModel() {
	bikeModel = this.value;
	checkButton();
}

// Permet de mettre à jour la variable bikeBrand
function updateBikeBrand() {
	bikeBrand = this.value;
	checkButton();
}

// Permet de mettre à jour la variable bikeDate
function updateBikeDate() {
	let input = this.value;
	let day = input.substring(0, 2);
	let month = input.substring(3, 5);
	let year = input.substring(6, 10);
	bikeDate = `${year}-${month}-${day}T00:00:00.000Z`;
	checkButton();
}

// Permet de mettre à jour la variable bikeInvoice
function updateBikeInvoice() {
	bikeInvoice = this.checked;
	checkButton();
}

// Permet de mettre à jour la variable lockInvoice
function updateLockInvoice() {
	lockInvoice = this.checked;
	checkButton();
}

// Permet de vérifier si le bouton next doit être activé ou non
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
		if (choosenPackage == "") {
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

// Permet de scroller vers le haut de la page quand le boutom next est cliqué
function scrollTop() {
	let anchor = document.getElementById("flow-title");
	anchor.scrollIntoView({
		block: "start",
		behavior: "smooth",
		inline: "start",
	});
}

// Permet de gerer le click sur le bouton next
function updateNextStatus() {
	switch (stepNumber) {
		case 0:
			// hide title and show another one with differetn id and content
			title.innerHTML = "Sélectionnez la protection qui vous convient&nbsp;<span>&#129309</span>";
			stepName = "OFFER";
			stepNumber++;
			dataLayer.push({ 'step' : 'OFFER' });
			getQS(bikeprice, zipcode, email)
				.then(() => getPrice(quote))
				.then(() => {
					updateUtm();
				})
				.catch((error) => {
					console.log(error);
				});
			scrollTop();
			checkButton();
			break;
		case 1:
			title.innerHTML = "Parlez nous de votre vélo&nbsp;<span>&#9997</span>";
			stepName = "MY_BIKE";
			stepNumber++;
			dataLayer.push({ 'step' : 'MY_BIKE' });
			updateQSMyBike(quote);
			scrollTop();
			checkButton();
			break;
		case 2:
			title.innerHTML = "Votre contrat est prêt&nbsp;!&nbsp;<span>&#127881</span>";
			stepName = "AUTH";
			dataLayer.push({ 'step' : 'AUTH' });
			stepNumber++;
			buttonPrevious.style.marginBottom = "0";
			updateQSAuth(quote);
			scrollTop();
			checkButton();
			break;
		default:
			break;
	}
}

// Permet de gerer le click sur le bouton previous
function updatePreviousStatus() {
	switch (stepNumber) {
		case 3:
			title.innerHTML = "Parlez nous de votre vélo&nbsp;<span>&#9997</span>";
			stepName = "MY_BIKE";
			stepNumber--;
			buttonPrevious.style.marginBottom = "-50px";
			checkButton();
			break;
		case 2:
			title.innerHTML = "Sélectionnez la protection qui vous convient&nbsp;<span>&#129309</span>";
			stepName = "OFFER";
			stepNumber--;
			buttonPrevious.style.marginBottom = "-50px";
			checkButton();
			break;
		case 1:
			title.innerHTML = "Simulez le prix de votre assurance vélo&nbsp;<span>&#128640</span>";
			stepName = "PRICE_ZIP";
			stepNumber--;
			buttonPrevious.style.marginBottom = "-50px";
			checkButton();
			break;
		default:
			break;
	}
}

// Permet de récupérer le quote serial
function getQS(prixVelo, codePostal, email) {
	return new Promise((resolve, reject) => {
		fetch("https://insurance.api.sharelock.co/quotes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				vehicle: {
					price: prixVelo,
				},
				client: {
					zipcode: codePostal,
					email: email,
				},
				tracking: {
					source: "WEBFLOW",
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

// Permet de récupérer les prix
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
						if (packageObj?.monthly && packageObj.monthly?.priceWithTaxes) {
							basicTheftMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
						} else {
							tabs = true;
						}
						basicTheftAnnualValue = packageObj.annual.priceWithTaxes.toFixed(2);
						break;
					case "BASIC_DAMAGE":
						if (packageObj?.monthly && packageObj.monthly?.priceWithTaxes) {
							basicDamageMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
						} else {
							tabs = true;
						}
						basicDamageAnnualValue = packageObj.annual.priceWithTaxes.toFixed(2);
						break;
					case "CLASSIC":
						if (packageObj?.monthly && packageObj.monthly?.priceWithTaxes) {
							classicMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
							classicMonthlyAnnualValue = (
								packageObj.monthly.priceWithTaxes * 12
							).toFixed(2);
						} else {
							tabs = true;
						}
						classicAnnualValue = packageObj.annual.priceWithTaxes.toFixed(2);
						classicAnnualMonthlyValue = (packageObj.annual.priceWithTaxes / 12).toFixed(
							2
						);
						break;
					case "COMFORT":
						if (packageObj?.monthly && packageObj.monthly?.priceWithTaxes) {
							comfortMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
							comfortMonthlyAnnualValue = (
								packageObj.monthly.priceWithTaxes * 12
							).toFixed(2);
						} else {
							tabs = true;
						}
						comfortAnnualValue = packageObj.annual.priceWithTaxes.toFixed(2);
						comfortAnnualMonthlyValue = (packageObj.annual.priceWithTaxes / 12).toFixed(
							2
						);
						break;
					case "PREMIUM":
						if (packageObj?.monthly && packageObj.monthly?.priceWithTaxes) {
							premiumMonthlyValue = packageObj.monthly.priceWithTaxes.toFixed(2);
							premiumMonthlyAnnualValue = (
								packageObj.monthly.priceWithTaxes * 12
							).toFixed(2);
						} else {
							tabs = true;
						}
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
		.then(() => {
			if (tabs) {
				document.getElementById("assurance-content-mensuel").style.display = "flex";
				document.getElementById("assurance-content-mensuel").innerHTML =
					"<h3>Souscription Mensuelle non disponible &#x1F641;</h3>";
			}
		})
		.then(() => addContact())
		.catch((error) => {
			console.log(error);
		});
}

// Permet d'afficher le bon format pour les prix
function showPrice(price) {
	return price.toString().concat("€");
}

// Permet d'ajouter le contact dans Sendinblue et d'envoyer un mail avec MAKE
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
			utmParameters,
			pageUrl,
		}),
	}).catch((error) => {
		console.log(error);
	});
}

// Permet de mettre à jour le quote serial lors du choix de l'offre vers l'ajout du vélo
function updateQSMyBike(quoteSerial) {
	fetch(`https://insurance.api.sharelock.co/quotes/${quoteSerial}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			choosenPackage: {
				id: choosenPackage,
				accessory_step: 0,
			},
			client: {
				zipcode: zipcode,
				email: email,
			},
			// personal_lock : {
			// 	brand: "Marque", 
			// 	model: "Modèle", 
			// }, 
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

// Permet de mettre à jour le quote serial lors du choix de l'offre vers la page de connexion
function updateQSAuth(quoteSerial) {
	fetch(`https://insurance.api.sharelock.co/quotes/${quoteSerial}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			choosenPackage: {
				id: choosenPackage,
				accessory_step: 0,
			},
			client: {
				zipcode: zipcode,
				email: email,
			},
			// personal_lock : {
			// 	brand: "Marque", 
			// 	model: "Modèle", 
			// }, 
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

// Permet de gerer les clicks sur les boutons next et previous
buttonNext.addEventListener("click", updateNextStatus);
buttonPrevious.addEventListener("click", updatePreviousStatus);

// Permet de gerer les inputs et empecher le submit avec la touche entrée
document.getElementById("bikeprice").oninput = updateBikeprice;
document.getElementById("bikeprice").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
	}
});
document.getElementById("zipcode").oninput = updateZipcode;
document.getElementById("zipcode").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
	}
});
document.getElementById("email").oninput = updateEmail;
document.getElementById("email").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
	}
});
document.getElementById("bikeModel").oninput = updateBikeModel;
document.getElementById("bikeModel").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
	}
});
document.getElementById("bikeBrand").oninput = updateBikeBrand;
document.getElementById("bikeBrand").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
	}
});
document.getElementById("bikeDate").oninput = updateBikeDate;
document.getElementById("bikeDate").addEventListener("keydown", (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
	}
});
document.getElementById("bikeInvoice").addEventListener("change", updateBikeInvoice);
document.getElementById("lockInvoice").addEventListener("change", updateLockInvoice);

// Permet de gerer le choix de l'offre
packages.forEach(function (pack) {
	pack.addEventListener("change", handlechoosenPackage);
});

// Permet de gerer le click sur le bouton submit pour rediriger vers la page de connexion
buttonSubmit.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.keyCode === 13) {
		return;
	}
	window.location.href = `https://portal.sharelock.co/onboarding?QS=${quote}`;
});
