# Install Playwright
I use [Playwright](https://playwright.dev/) in this project. If your system isn't supported by it, you can install it inside a Docker container. See [Using Docker](#using-docker).

Now, first of all, clone the repo.

Then, inside the project's folder:

## Without Docker
```bash
npm i
npx playwright install
npx playwright install-deps
```

## Using Docker
### Build the image (this installs Playwright)
`docker build -t gottfried-aqa-test .`

### Run the tests
1. run the container

`docker run -it -v .:/app gottfried-aqa-test bash`

2. inside the running container

`cd /app && npx playwright test`

# Run
Either inside a Docker container or inside the project directory:

`npx playwright test`

# Generate and view Allure reports
```bash
# generates the report files
allure generate allure-results/ -o allure-report --clean

# this opens up a browser with the reports page
allure open allure-report/
```

# Tests comments
## Cart
The test sometimes fails at line [27](https://github.com/gottfried-github/aqa-demo/blob/master/tests/cart.spec.js#L27) or line [43](https://github.com/gottfried-github/aqa-demo/blob/master/tests/cart.spec.js#L43) with no cart popping up. 

I haven't observed such behavior while testing manually. 

Perhaps, this is caused by me running the test inside Docker. I'm not sure why this behavior occurs.

I've verified all the other steps to work correctly, so besides this issue, the test should pass.

## Search
I verify that there's at least one item where the title matches the title, given to the search input. 

This is because there could be items in the results, where the title doesn't match the given title at all or matches it partly, because the search might not neccesarily be exact or might be done not only on the title but also on, e.g., the description.

## Inverse price range
On the [site]('https://makeup.com.ua/ua/'), when the user inputs an inverse range (`from` value is greater than `to` value), although in the input itself the value gets corrected, it gets propped up to the URL search query and a filter tag is shown with the incorrect range.