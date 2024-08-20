export interface AuthConfig {
  issuer: string;                  // The URL of the Identity Provider
  redirectUri: string;             // The URL of the SPA to redirect the user to after login
  clientId: string;                // The SPA's ID, registered with the auth-server
  responseType: string;            // The response type to use for the auth request
  scope: string;                   // The scopes that the client should request
  showDebugInformation: boolean;   // Option to show debug information in the console
  //timeoutFactor: number;
  //checkOrigin: boolean;
  dummyClientSecret?: string;
}

