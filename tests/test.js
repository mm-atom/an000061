const test = require('ava');
const { loadEnvConfig } = require('@next/env');
const { default: an61 } = require('../dist/index');

const vo = '01factory';
const vt = Buffer.from('XH/jv/86ds0T', 'base64');

test.before(() => {
	loadEnvConfig('./');
});

test('encrypt', (t) => {
	const r = an61.encrypt(Buffer.from(vo, 'utf-8'));
	t.deepEqual(r, vt);
});

test('dencrypt', (t) => {
	const r = an61.decrypt(vt);
	t.is(r.toString('utf-8'), vo);
});
