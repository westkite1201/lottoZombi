const puppeteer = require("puppeteer");



// 사용시 인위적인 딜레이를 주기위한 함수

function delay( timeout ) {
  return new Promise(( resolve ) => {
    setTimeout( resolve, timeout );
  });
}

// ElementHandle method:

  /**
   * @return {!Promise<?Puppeteer.Frame>}
   */
  
  getFrame  = async() =>{ 
    const nodeInfo = await this._client.send('DOM.describeNode', {
      objectId: this._remoteObject.objectId
    }).catch(error => void debugError(error));

    if (typeof nodeInfo.node.frameId === 'string') {
      for (const frame of this._page.frames()) {
        if (nodeInfo.node.frameId === frame._id)
          return frame;
      }
      return null;
    } else {
      return null;
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
   
    await page.goto("https://el.dhlottery.co.kr/game/TotalGame.jsp?LottoId=LO40",{ waitUntil : "networkidle0" })
    await page.evaluate(() =>{ 
        console.log(`url is ${location.href}`) 
        console.log( document.querySelector('#num2') ) 
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