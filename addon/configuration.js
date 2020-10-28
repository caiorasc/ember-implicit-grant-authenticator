const DEFAULTS = {
    grantType: "code",
    responseType: "token"
};

export default {
    host: null,
    clientId: null,
    grantType: DEFAULTS.grantType,
    responseType: DEFAULTS.responseType,
    scope: null,
    authEndpoint: null,
    tokenEndpoint: null,
    userinfoEndpoint: null,
    endsessionEnpoint: null,

    load(config) {
        this.host = config.host;
        this.clientId = config.clientId;
        this.grantType = config.grantType != undefined ? config.grantType : DEFAULTS.grantType;
        this.responseType = config.responseType != undefined ? config.responseType : DEFAULTS.responseType;
        this.scope = config.scope;
        this.authEndpoint = config.authEndpoint;
        this.tokenEndpoint = config.tokenEndpoint;
        this.userinfoEndpoint = config.userinfoEndpoint;
        this.endsessionEnpoint = config.endsessionEnpoint;
    },
};