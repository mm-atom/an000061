const fs = require('fs/promises');
const test = require('ava');
const { loadEnvConfig } = require('@next/env');
const { default: an61 } = require('../dist/index');

test.before(() => {
	loadEnvConfig('./');
});

test('encrypt', async (t) => {
	const buf = await fs.readFile('./tests/test.jpg');
	const buf1 = an61.encrypt(buf);
	const buf2 = an61.decrypt(buf1);
	await fs.writeFile('./tests/t.jpg', buf2);
	t.deepEqual(buf, buf2);
});
