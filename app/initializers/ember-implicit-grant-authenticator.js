import ENV from '../config/environment';
import Configuration from 'ember-implicit-grant-authenticator/configuration';

export function initialize(application) {
  const config = ENV['ember-implicit-grant-authenticator'] || {};
  Configuration.load(config);

  application.inject('route', 'implicitGrantAuthenticator', 'service:implicit-grant-authenticator');
}

export default {
  name: 'ember-implicit-grant-authenticator',
  initialize
};