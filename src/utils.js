import crypto from 'crypto';

export const getHash = (str = '') => crypto.createHash('sha1').update(str).digest('hex');