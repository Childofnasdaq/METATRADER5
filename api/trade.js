import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { login, password, symbol, lotSize, tp, sl } = req.body;

        // Start Puppeteer and launch the browser
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Open MetaTrader 5 Web Terminal
        await page.goto('https://web.metatrader.app/terminal/');

        // Wait for the login form to load and input credentials
        await page.waitForSelector('input[name="login"]');
        await page.type('input[name="login"]', login);
        await page.type('input[name="password"]', password);
        await page.click('button[type="submit"]');

        // Wait for the login process to complete
        await page.waitForNavigation();

        console.log('Logged in successfully!');

        // Example: Automate placing a buy trade
        await page.waitForSelector('selector-for-market-selector'); // Change to correct selector for market
        await page.select('selector-for-market-selector', symbol); // Select the symbol

        // Wait for the 'Buy' button to load and click it
        await page.waitForSelector('selector-for-buy-button'); // Replace with actual selector
        await page.click('selector-for-buy-button'); // Click buy to execute the trade

        // Example: Set lot size, take profit, stop loss
        await page.waitForSelector('selector-for-lot-size'); // Replace with actual selector
        await page.type('selector-for-lot-size', lotSize);

        await page.waitForSelector('selector-for-TP'); // Replace with actual selector
        await page.type('selector-for-TP', tp);

        await page.waitForSelector('selector-for-SL'); // Replace with actual selector
        await page.type('selector-for-SL', sl);

        // Execute the trade
        await page.click('selector-for-execute-button'); // Replace with actual execute button

        console.log('Trade executed successfully!');

        await browser.close();

        // Respond with success message
        res.status(200).json({ message: 'Trade placed successfully!' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
