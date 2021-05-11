const puppeteer = require("puppeteer");

const script = require("./script");

const PAGINA = "https://www.oblio.eu/expenses/issue/";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

require("dotenv").config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.goto(PAGINA, {
    waitUntil: "networkidle2",
  });

  while (true) {
    const url = page.url();

    switch (url) {
      case "https://www.oblio.eu/login":
        await page.evaluate(
          (username, password) => {
            document.getElementById("username").value = username;
            document.getElementById("password").value = password;
            document
              .querySelectorAll(
                "button.btn.btn-primary.btn-icon[type='submit']"
              )[0]
              .click();
          },
          process.env.OBLIOUSER,
          process.env.OBLIOPASS
        );
        await page.waitForNavigation({ waitUntil: "networkidle2" });

        break;
      case PAGINA:
        try {
          const injected = await page.evaluate(() => {
            return injected;
          });
        } catch (err) {
          try {
            await page.evaluate(script);

            await page.evaluate(() => {
              const injected = true;
            });
          } catch (err) {}
        }

        break;

      default:
        break;
    }

    await wait(1000);
  }

  // await browser.close();
})();
