import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import mmconf from '@mmstudio/config';

const config = mmconf as {
	file: {
		secret: string;
	}
};

const iv = config.file.secret;
const key = createHash('md5').update(iv).digest('hex');	// 长度32
const algorithm = 'aes-256-gcm';	// 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm'
const encrypter = createCipheriv(algorithm, key, iv);
const decrypter = createDecipheriv(algorithm, key, iv);

/**
 * 加密文件
 */
export function encrypt(buf: Buffer) {
	return encrypter.update(buf);
}

/**
 * 解密文件
 */
export function decrypt(buf: Buffer) {
	return decrypter.update(buf);
}

export default {
	encrypt,
	decrypt
};
