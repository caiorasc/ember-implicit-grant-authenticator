import OAuth2ImplicitGrant from 'ember-simple-auth/authenticators/oauth2-implicit-grant';
import { isPresent } from '@ember/utils';

// Decode JWT token
const _decode = str => {
    if (typeof atob === 'function') {
        return atob(str);
    } else if (typeof FastBoot === 'object') {
        try {
            const buffer = FastBoot.require('buffer');
            return buffer.Buffer.from(str, 'base64').toString('utf-8');
        } catch (err) {
            throw new Error('buffer must be available for decoding base64 strings in FastBoot. Make sure to add buffer to your fastbootDependencies.');
        }
    } else {
        throw new Error('Neither atob nor the FastBoot global are avaialble. Unable to decode base64 strings.');
    }
};

function _parseHashFragments(locationHash) {
    let params = {};
    const query = locationHash.substring(locationHash.indexOf('?'));
    const regex = /([^#?&=]+)=([^&]*)/g;
    let match; // decode all parameter pairs

    while ((match = regex.exec(query)) !== null) {
        params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
    }

    return params;
}

export default OAuth2ImplicitGrant.extend({
    authenticate(hash) {
        let parsedhash = _parseHashFragments(hash);

        if (isPresent(parsedhash.access_token))
            parsedhash.token_data = this._getTokenData(parsedhash.access_token);

        return this._super(parsedhash);
    },

    _getTokenData(token) {
        const payload = token.split('.')[1];
        const decodedPayload = _decode(payload.replace(/-/g, '+').replace(/_/g, '/'));
        const tokenData = decodeURIComponent(window.escape(decodedPayload));

        try {
            return JSON.parse(tokenData);
        } catch (error) {
            return tokenData;
        }
    }
});