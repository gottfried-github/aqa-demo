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