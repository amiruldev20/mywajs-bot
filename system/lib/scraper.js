/*
import {
    exec
} from 'node:child_process'
import puppeteer from 'puppeteer'

export default new class scrape {

async igv1(link, msg) {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920x1080",
    ],
  });
  const page = await browser.newPage();

  await page.goto("https://id.savefrom.net/246", {
    waitUntil: "networkidle2",
  });
  try {
    await page.type("#sf_url", `${link}`);
    await page.click("#sf_submit");

    await page.waitForSelector(
      "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
    );
    
    const element = await page.$(
      "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
    );
    const text = await (await element.getProperty("href")).jsonValue();

    const judul = await page.$(
      "#sf_result > div > div.result-box.video > div.info-box > div.meta > div"
    );
    const judul1 = await (await judul.getProperty("title")).jsonValue();
    
    const res = {
        creator: 'Amirul Dev',
        caption: judul1,
        media: text
    }
    return res
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
}

async savfb(link, msg) {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1920x1080",
      ],
    });
    const page = await browser.newPage();
  
    await page.goto("https://id.savefrom.net/download-from-facebook", {
      waitUntil: "networkidle2",
    });
    try {
      await page.type("#sf_url", `${link}`);
      await page.click("#sf_submit");
  
      await page.waitForSelector(
        "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
      );
      
      const element = await page.$(
        "#sf_result > div > div.result-box.video > div.info-box > div.link-box.single > div.def-btn-box > a"
      );
      const text = await (await element.getProperty("href")).jsonValue();
  
      const judul = await page.$(
        "#sf_result > div > div.result-box.video > div.info-box > div.meta > div"
      );
      const judul1 = await (await judul.getProperty("title")).jsonValue();
      
      return `Title: ${judul1}
  Url: ${text}
  
  ${judul}`
    } catch (error) {
      throw error;
    } finally {
      await browser.close();
    }
  }
  }
  
*/