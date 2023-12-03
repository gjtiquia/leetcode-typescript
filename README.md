# TypeScript Unit Test Template

A minimal template for setting up a TypeScript project with unit tests with [ts-jest](https://kulshekhar.github.io/ts-jest/) and bundling with [tsup](https://tsup.egoist.dev/).

## Commands

Run the tests.

```bash
npm test
```

Compile `src/index.ts` into `dist/index.js` and run with `node`.

```bash
npm start
```

## Setup Steps

### 1. Unit Test Setup

Run to install the required packages. `ts-jest` is used for unit-testing TypeScript files.

```bash
npm install --save-dev jest typescript ts-jest @types/jest
```

Run to intialize `ts-jest`.

```bash
npx ts-jest config:init
```

Add the following to the `package.json`

```json
"scripts": {
    "test": "jest"
}
```

Create `tsconfig.json` file with the following configuration to allow the `import` syntax for ES6 modules.

```json
{
    "compilerOptions": {
        "strict": true,
        "module": "NodeNext",
        "target": "es6",
        "esModuleInterop": true,
        "moduleResolution": "NodeNext"
    }
}
```

### 2. Build Setup

Run to install the required packages. `tsup` is used as the bundler for compiling TypeScript into JavaScript.

```bash
npm install --save-dev tsup
```

Add the following to the `package.json`, where `start` is used to compile TypeScript into JavaScript then run the JavaScript with `node`.

```json
"scripts": {
    "start": "npm run build && node dist/index.js",
    "build": "tsup src/index.ts"
}
```
