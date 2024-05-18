# Run
## Using Docker
If you're on a system, that's not supported by playwright, then you can build the Docker image and run playwright inside it.

### Build
`docker build -t gottfried-aqa-test .`

### Run
1. run the container
`docker run -it -v .:/app gottfried-aqa-test bash`

2. inside the running container
`cd /app && npx playwright test`

# Tests results
## Cart
The test sometimes fails at line `31` or line `47` with no cart popping up. 

I haven't observed such behavior while testing manually. 

Perhaps, this is caused by me running the test inside Docker. I'm not sure why this behavior occurs.

I've verified all the other steps to work correctly, so besides this issue, the test should pass.