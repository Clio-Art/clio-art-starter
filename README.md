# clio-art-starter
Starter Repository to develop and test your code to be launched on the ClioArt.io Platform

## Getting started

### Without node.js installed

The simplest way to get started is to open `src/index.html` in your browser and start to program your algorithm in the file `src/index.js`

### With node.js installed
 
First, install the packages required for the local environment with the command:

```bash
npm install
```

Then run the following command to start the local environment:

```bash
npm start
```

It will watch changes in the `src/` and it will reload browser window on every change so that you can iterate faster on your projects
Open [http://localhost:3000](http://localhost:3000) to see your project in the browser.

# Develop your token

Once the environment is started, you can edit the `src/index.js` file to start building your artwork. The `index.html` file is located in the `src/` folder.

You can import libraries by adding the library file in the `src/` folder and link those using relative paths in the `index.html`.

Any file in the `src/` folder will be added to the final project. 

## clio-art-snippet

clio-art requires you to use a javascript code snippet so that the platform can inject some code when tokens will be generated from your Generative Token. The code snippet is already in the `index.html` file of this boilerplate, so you don't have to add it yourself.

**During the development stages, the snippet will generate a random hash each time the page is refreshed**. This way, it helps you reproduce the conditions in which your token will be executed on Clio Art.

It creates 2 variables:
- `clioHash`: a random 64 characters hexadecimal string. This particular variable will be hardcoded with a static hash when someone mints a token from your Generative Token
- `rand()`: a PRNG function that generates deterministic PRN between 0 and 1. **Simply use it instead of Math.random()**.