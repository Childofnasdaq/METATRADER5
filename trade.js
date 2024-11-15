const puppeteer = require('puppeteer');

async function startTrading(login, password, symbol, lotSize, stopLoss, takeProfit) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Open MetaTrader Web Terminal
  await page.goto('https://web.metatrader.app/terminal/');

  // Wait for login form to load and login
  await page.waitForSelector('input[name="login"]');
  await page.type('input[name="login"]', login);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  
  console.log("Logged in successfully.");

  // Wait for the page to load after login
  await page.waitForNavigation();
  
  // Execute trading logic here (example to open a buy trade)
  await page.goto('https://web.metatrader.app/terminal/trading'); // Trading page

  // Here we assume you have the trade order input selectors
  await page.type('input[name="symbol"]', symbol);
  await page.type('input[name="lotSize"]', lotSize);
  await page.type('input[name="stopLoss"]', stopLoss);
  await page.type('input[name="takeProfit"]', takeProfit);
  
  // Submit the order (Assumed button selector, adjust as necessary)
  await page.click('button#placeTrade');

  console.log("Trade placed successfully.");

  // Close the browser
  await browser.close();
}

module.exports = async function(req, res) {
  const { login, password, symbol, lotSize, stopLoss, takeProfit } = req.body;

  if (!login || !password || !symbol || !lotSize || !stopLoss || !takeProfit) {
    return res.status(400).send('Missing required parameters');
  }

  try {
    await startTrading(login, password, symbol, lotSize, stopLoss, takeProfit);
    res.send('Trade placed successfully.');
  } catch (error) {
    console.error('Error placing trade:', error);
    res.status(500).send('Error placing trade');
  }
};
