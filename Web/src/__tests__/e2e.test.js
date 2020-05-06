const faker = require('faker');
const puppeteer = require('puppeteer');

// import {puppeteer} from 'puppeteer';

const pageUrl = 'https://studybuddy-5828.appspot.com/';

let browser 
let page

beforeAll(async () => {
     browser = await puppeteer.launch(
      {
        headless: false, 
        slowMo: 250, 
      }
    )
    page = await browser.newPage()
  })



describe('My Page', () => {
    it('should be a successful login', async () => {
            
                await page.goto(pageUrl);
                await page.waitForSelector('#sub');
        
                await page.click('input[name=username]')
                await page.type('input[name=username]', 'reshma')
                await page.click('input[name=password]')
                await page.type('input[name=password]', 'qwert')
                await page.click('button[name=submit]')
           
                await page.waitForSelector('[data-testid="posts"]')
            }, 1600000);

            it('should be a unsuccessful login', async () => {
                await page.goto(pageUrl);
                await page.waitForSelector('#sub');
        
                await page.click('input[name=username]')
                await page.type('input[name=username]', 'pri')
                await page.click('input[name=password]')
                await page.type('input[name=password]', 'qwert')
                await page.click('button[name=submit]')

                page.on('dialog', async dialog => {
                    console.log('here');
                    await dialog.accept();
                });
                
            }, 1600000);

        it('should be a successful signup', async () => {

            
                    await page.goto(pageUrl);
                    await page.waitForSelector('#sub');
                    await page.click('#sign');

                    await page.waitForSelector('#signUp');
                    

                    await page.click('input[name=username]')
                    await page.type('input[name=username]', 'priyanka')
                    await page.click('input[name=email]')
                    await page.type('input[name=email]', 'priyanka@gmail.com')
                    await page.click('input[name=password]')
                    await page.type('input[name=password]', 'qwert')
                    await page.click('input[name=Confirmpassword]')
                    await page.type('input[name=Confirmpassword]', 'qwert')
                    await page.click('button[name=submit]')

                    await page.waitForSelector('#userEdit')

                    await page.click('#logout');
                    await page.waitForSelector('#sub');
    
                    
                }, 1600000);

            it('should be a unsuccessful signup', async () => {

            
                        await page.goto(pageUrl);
                        await page.waitForSelector('#sub');
                        await page.click('#sign');
    
                        await page.waitForSelector('#signUp');
                        
    
                        await page.click('input[name=username]')
                        await page.type('input[name=username]', 'priya')
                        await page.click('input[name=email]')
                        await page.type('input[name=email]', 'priya@gmail.com')
                        await page.click('input[name=password]')
                        await page.type('input[name=password]', 'qwert')
                        await page.click('input[name=Confirmpassword]')
                        await page.type('input[name=Confirmpassword]', 'qwerty')
                        await page.click('button[name=submit]')
    
                        page.on('dialog', async dialog => {
                            console.log('here');
                            await dialog.accept();
                        });
        
                        
                    }, 1600000);

        
            
        });


afterAll(() => {
  browser.close()
})