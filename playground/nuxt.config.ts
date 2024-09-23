import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    'nuxt-oidc-auth',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
  ],

  telemetry: false,

  oidc: {
    defaultProvider: 'github',
    providers: {
      entra: {
        redirectUri: 'http://localhost:3000/auth/entra/callback',
        clientId: '',
        clientSecret: '',
        authorizationUrl: 'https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize',
        tokenUrl: 'https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token',
        userNameClaim: 'unique_name',
        nonce: true,
        responseType: 'code id_token',
        scope: ['profile', 'openid', 'offline_access', 'email'],
        logoutUrl: '',
        optionalClaims: ['unique_name', 'family_name', 'given_name', 'login_hint'],
        audience: '',
        additionalAuthParameters: {
          resource: '',
          prompt: 'select_account',
        },
        additionalLogoutParameters: {
          logoutHint: '',
        },
        exposeIdToken: true,
        exposeAccessToken: false,
        allowedClientAuthParameters: [
          'test',
        ],
      },
      auth0: {
        audience: 'test-api-oidc',
        responseType: 'code',
        redirectUri: 'http://localhost:3000/auth/auth0/callback',
        baseUrl: '',
        clientId: '',
        clientSecret: '',
        scope: ['openid', 'offline_access', 'profile', 'email'],
        additionalTokenParameters: {
          audience: 'test-api-oidc',
        },
        additionalAuthParameters: {
          audience: 'test-api-oidc',
        },
      },
      github: {
        redirectUri: 'http://localhost:3000/auth/github/callback',
        clientId: '',
        clientSecret: '',
        filterUserInfo: ['login', 'id', 'avatar_url', 'name', 'email'],
      },
      keycloak: {
        audience: 'account',
        baseUrl: '',
        clientId: '',
        clientSecret: '',
        redirectUri: 'http://localhost:3000/auth/keycloak/callback',
        exposeAccessToken: false,
        userNameClaim: 'preferred_username',
      },
      cognito: {
        clientId: '',
        redirectUri: 'http://localhost:3000/auth/cognito/callback',
        clientSecret: '',
        scope: ['openid', 'email', 'profile'],
        logoutRedirectUri: 'https://google.com',
        baseUrl: '',
      }
    },
    session: {
      expirationCheck: true,
      automaticRefresh: true,
      expirationThreshold: 3600,
    },
    middleware: {
      globalMiddlewareEnabled: true,
      customLoginPage: true,
    },
    devMode: {
      enabled: false,
      generateAccessToken: true,
      userName: 'Test User',
      userInfo: { providerName: 'test' },
      claims: { customclaim01: 'foo', customclaim02: 'bar' },
      issuer: 'dev-issuer',
      audience: 'dev-app',
      subject: 'dev-user',
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
  },

  unocss: {
    preflight: true,
    configFile: 'uno.config.ts'
  },

  devtools: { enabled: true },

  imports: {
    autoImport: true,
  },

  nitro: {
    preset: 'node-server',
    storage: { // Local file system storage for demo purposes
      oidc: {
        driver: 'fs',
        base: 'playground/oidcstorage',
      },
    },
  },

  compatibilityDate: '2024-08-28',
})
