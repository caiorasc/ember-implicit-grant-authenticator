import Service from '@ember/service';
import Configuration from '../configuration';
import location from '../utils/location';
import { inject as service } from '@ember/service';
import { randomString } from '../utils/random-string';

export default Service.extend({
  session: service(),

  authenticate() {
    const state = randomString(20);
    const nonce = randomString(20);

    const data = {
      state,
      nonce
    };

    this.get('session.store').persist(data);

    const queryUrl = {
      client_id: Configuration.clientId,
      grant_type: Configuration.grantType || "code",
      response_type: Configuration.responseType || "token",
      scope: Configuration.scope,
      redirect_uri: `${location().origin}/login-callback`,
      state: state,
      nonce: nonce,
    };

    const queryString = Object.keys(queryUrl)
      .map((k) => `${k}=${encodeURIComponent(queryUrl[k])}`)
      .join("&");

    location().replace(`${Configuration.host}${Configuration.authEndpoint}?${queryString}`);
  }
});
