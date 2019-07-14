const puppeteer = require("puppeteer");


// 사용시 인위적인 딜레이를 주기위한 함수

function delay( timeout ) {
  return new Promise(( resolve ) => {
    setTimeout( resolve, timeout );
  });
}


class AlertNotExistError extends Error {
}
 acceptAlertAfterAction =  async(page, cb) => {
    const browser = await page.browser();
    const isCalled = false;
    let event;
    function onEvent(resolve) {
        return function (dialog) {
            dialog.accept();
            isCalled = true;
            resolve();
        }
    }
    try {
        await new Promise((resolve, reject) => {
            event = onEvent(resolve);
            browser.on(event);
            cb();
            setTimeout(() => {
                if(!isCalled) reject(new AlertNotExistError());
            }, 3000);
        });
    } catch (error) {
        throw error;
    } finally {
        browser.off(event);
    }
}


puppeteer.launch({
	  headless : false	// 헤드리스모드의 사용여부를 묻는다.
	, devtools : true	// 개발자 모드의 사용여부를 묻는다.

}).then(async browser => {
	const page = await browser.newPage();

	await page.goto( "https://dhlottery.co.kr/user.do?method=login&returnUrl=", { waitUntil : "networkidle0" } );
	// 아이디와 암호를 입력한다.
	await page.type( "#userId", "" );
  await page.type( "#article > div:nth-child(2) > div > form > div > div.inner > fieldset > div.form > input[type=password]:nth-child(2)", "" );
  
	await delay(1000);
    
    await page.click("#article > div:nth-child(2) > div > form > div > div.inner > fieldset > div.form > a")
    // 로그인 SUBMIT 기능
    await page.waitForNavigation( {waitUntil: 'networkidle0'} );
    // await delay(1000);
    // await page.click("#gnb > ul > li.gnb1")
    // await delay(1000);
    // await page.click("#gnb > ul > li.gnb1 > div > ul > li.gnb1_1 > a")
 
    await delay(1000);
  
    //iframe src로 직접 이동 
    await page.goto("https://ol.dhlottery.co.kr/olotto/game/game645.do",{ waitUntil : "networkidle0" })
  
    await page.click("#num2"); //자동 번호 발급 선택
                              //현재 수량은 디폴트 
    
                    
    await page.click("#btnSelectNum") //확인버튼 
    await page.waitFor("#btnBuy");
    await page.click('#btnBuy');




    await page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
    });
  

});


// Test script:

// const puppeteer = require('puppeteer');

// (async() => {
//     try {
//         const browser = await puppeteer.launch({
//             headless: false,
//             timeout: 10000
//         });

//         const page = await browser.newPage();

//         await page.setViewport({
//             width: 1280,
//             height: 800
//         });

//         await page.goto('https://schelkun.github.io/padding-link/frame.html');

//         const frameElement = await page.$('iframe');

//         const frame = await frameElement.getFrame();

//         const deepElement = await frame.$('iframe');

//         const deepFrame = await deepElement.getFrame();

//         deepFrame.evaluate(() => {
//             document.body.innerHTML = '<span style="color: green;">Done!</span>';
//         });

//     } catch (e) {
//         console.log(e);
//     }
// })();