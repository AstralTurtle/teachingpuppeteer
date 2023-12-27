const puppeteer = require("puppeteer");

let links = [
	"https://a.co/d/gxzHqin",

	"https://a.co/d/9L88wto",

	"https://a.co/d/f3UI2ww",
];
let prices = [];

async function getPrice(link) {
	const browser = await puppeteer.launch({ headless: "new" });
	const page = await browser.newPage();
	await page.goto(link);
	try {
		let price = await page.evaluate(() => {
			let price = document.querySelector(".a-price-whole").innerText;
			return Number.parseInt(price);
		});
		prices.push(price);
	} catch (err) {
		console.log("error: ", err);
	}
	browser.close();
}

async function main() {
	return Promise.all(links.map((link) => getPrice(link))).then(() => {
		console.log(prices);
		console.log(Math.min(...prices));
	});
}

main();
