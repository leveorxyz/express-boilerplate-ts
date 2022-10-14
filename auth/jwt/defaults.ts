const configs = {
  accessExpire: 24 * 60 * 60, // 1 day default access token expiration
  refreshExpire: 30 * 24 * 60 * 60, // 30 days default refresh token expire
  secret: "unsafeSecret", // default unsafe secret
};

export default configs;
