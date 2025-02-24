const puppeteer = require('puppeteer');

async function swapTokens() {
    const browser = await puppeteer.launch({ headless: false }); // Mở trình duyệt có giao diện để theo dõi
    const page = await browser.newPage();
    await page.goto('https://bebop.xyz/trade?network=monad&sell=MON&buy=WMON', { waitUntil: 'networkidle2' });

    try {
        for (let i = 0; i < 100; i++) {
            console.log(`Thực hiện swap lần ${i + 1}`);

            // Tìm và bấm nút Swap
            const swapButton = await page.$x("//button[contains(text(),'Swap')]");
            if (swapButton.length > 0) {
                await swapButton[0].click();
                await page.waitForTimeout(2000);
            } else {
                console.log("Không tìm thấy nút Swap.");
                break;
            }

            // Xác nhận giao dịch (nếu có popup)
            const confirmButton = await page.$x("//button[contains(text(),'Confirm')]");
            if (confirmButton.length > 0) {
                await confirmButton[0].click();
                await page.waitForTimeout(2000);
            } else {
                console.log("Không tìm thấy nút Confirm, bỏ qua.");
            }

            await page.waitForTimeout(5000); // Chờ giao dịch hoàn tất
        }
    } catch (error) {
        console.error("Lỗi:", error);
    } finally {
        await browser.close();
    }
}

swapTokens();
