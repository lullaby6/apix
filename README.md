# apix

`apix` is a lightweight JavaScript utility for making HTTP requests with built-in support for retries, timeouts, and automatic JSON parsing.

## Installation

#### NPM

Install the library using NPM:

```bash
npm i @lullaby6/apix
```

#### Import

```js
// CommonJS
const apix = require('@lullaby6/apix');

// ES Modules
import apix from '@lullaby6/apix';
```

#### CDN

```html
<script src='https://cdn.jsdelivr.net/gh/lullaby6/apix/apix.min.js'></script>
```

#### Download

<a href="https://cdn.jsdelivr.net/gh/lullaby6/apix/apix.min.js" target="_blank">Download</a> and include the downloaded file in your project:

```html
<script src="/path/to/apix.min.js"></script>
```

## Usage

```js
const data = await apix('https://api.example.com/data');
console.log(data);
```

With custom options:

```js
const data = await apix('https://api.example.com/data', {
    method: 'POST',
    body: { key: 'value' },
    headers: { 'Authorization': 'Bearer token' },
    timeout: 5000, // 5 seconds timeout
    retries: 3, // Retry up to 3 times
    retryDelay: 2000 // Wait 2 seconds before retrying
});
```

### Timeout

You can specify a timeout in milliseconds using the `timeout` option. If the request exceeds this duration, it will be automatically aborted.

By default the `timeout` is 10s.

```js
const data = await apix('https://api.example.com/slow-endpoint', { timeout: 3000 });
console.log(data);
```

### Retries

`apix` supports automatic retries for failed requests. You can configure the maximum number of retry attempts and the delay between retries using `retries` and `retryDelay` options.

By default the `retries` is 0 and the `retrayDelay` is 1s.

```js
const data = await apix('https://api.example.com/unstable-endpoint', {
    retries: 5, // Retry up to 5 times
    retryDelay: 1000 // Wait 1 second between retries
});
console.log(data);
```

## License

MIT

