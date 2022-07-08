const KEY_SIZE_BYTES = 64;
const SALT_SIZE_BYTES = 16;

const convertBufferToHex = (buffer) => {
    return (
        [...new Uint8Array(buffer)]
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('')
    );
};

const convertHexToBuffer = (hexString) => {
    return Uint8Array.from(
        hexString.match(/[0-9a-f]{1,2}/gi).map((byte) => parseInt(byte, 16))
    );
};

const deriveKeyFromPassword = async (password, saltBuffer) => {
    const textEncoder = new TextEncoder('utf-8');
    const passwordBuffer = textEncoder.encode(password);
    saltBuffer = saltBuffer || window.crypto.getRandomValues(new Uint8Array(SALT_SIZE_BYTES));

    const plaintextKey = await window.crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const pbkdf2Buffer = await window.crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: saltBuffer,
            iterations: 100000,
            hash: 'SHA-256'
        },
        plaintextKey,
        KEY_SIZE_BYTES * 8
    );

    const salt = convertBufferToHex(saltBuffer);
    const key = convertBufferToHex(pbkdf2Buffer);

    return { key, salt };
}

export { deriveKeyFromPassword }