import { createCipheriv, createDecipheriv, createHash } from 'crypto';

export default {
	/**
	 * 加密文件
	 */
	encrypt(buf: Buffer) {
		const iv = process.env.FILE_SECRET!;
		const key = createHash('md5').update(iv).digest('hex');	// 长度32
		const algorithm = 'aes-256-gcm';	// 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm'
		return createCipheriv(algorithm, key, iv).update(buf);
	},
	/**
	 * 解密文件
	 */
	decrypt(buf: Buffer) {
		const iv = process.env.FILE_SECRET!;
		const key = createHash('md5').update(iv).digest('hex');	// 长度32
		const algorithm = 'aes-256-gcm';	// 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm'
		return createDecipheriv(algorithm, key, iv).update(buf);
	}
};
