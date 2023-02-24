export const google = {
  client_id: '821480445754-tlsrjngiebcjk4baid2m7a6hp0g9f6l7.apps.googleusercontent.com',
  code_secret: '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',
  authorization_request: 'https://accounts.google.com/o/oauth2/v2/auth',
  token_request: 'https://oauth2.googleapis.com/token',
  redirection_url: 'http://localhost:4200/oauth2/callback',
  response_type: 'code',
  scope: 'openid email profile',
  access_type: 'offline',
  grant_type_authorization_code: 'authorization_code',
  grant_type_refresh_token: 'refresh_token',
  prompt: 'consent select_account',
  revoke_request: 'https://oauth2.googleapis.com/revoke'
}
