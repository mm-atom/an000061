import { CipherGCM, createCipheriv, createDecipheriv, createHash, DecipherGCM } from 'crypto';

let encrypter: CipherGCM;
let decrypter: DecipherGCM;

/**
 * 加密文件
 */
export function encrypt(buf: Buffer) {
	return getEncrypter().update(buf);
}

/**
 * 解密文件
 */
export function decrypt(buf: Buffer) {
	return getDecrypter().update(buf);
}

export default {
	encrypt,
	decrypt
};

function getEncrypter() {
	if (!decrypter) {
		const iv = process.env.FILE_SECRET!;
		const key = createHash('md5').update(iv).digest('hex');	// 长度32
		const algorithm = 'aes-256-gcm';	// 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm'
		encrypter = createCipheriv(algorithm, key, iv);
	}
	return encrypter;
}

function getDecrypter() {
	if (!decrypter) {
		const iv = process.env.FILE_SECRET!;
		const key = createHash('md5').update(iv).digest('hex');	// 长度32
		const algorithm = 'aes-256-gcm';	// 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm'
		decrypter = createDecipheriv(algorithm, key, iv);
	}
	return decrypter;
}
