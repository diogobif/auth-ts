export default {
  port: 3000,
  host: "localhost",
  saltWorkFactor: 10,
  accessTokenTtl: "1y",
  refreshTokenTtl: "1y",
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIICXQIBAAKBgQCvs/v56TDF8Q3QhFXedzqCR2x+GTTfdkjxXzXWc+pduTK3nD9x
  iig/wdgjdec6i9GTkuWlL8oyRjVC/lfect4aMzCHNF4CanZV/HWr82C3x7FECYcC
  cTukdj7LxTzFYvpoZ/FbNRqsgK38js3Q3bifQGAaKdjb+Jn91xxDzJro6wIDAQAB
  AoGATyaCZXNiEFlmAsAKurv1NIkeW7PZOK1dcLaWVzRCqNPsAAC4J9q4BPi6+EZ9
  0sb3s0Yig4aCzKEKD1LqnIAcgusL7XFnsFPy/4iIVVe6MVxOaMAH4AJLXzRsp2qv
  MSSKkKA0DvDw0XWjFXQ+Se0gb7glpi0QsdLb/g6fw284iQkCQQDpDOQV2cBBzx2a
  Iw/2SRaetdjKAfOz5qEY/40UDzeOSWIf9Tfv8l9e2IQ9f14sVT2HFFhuxLE+K/40
  mBUuHoP/AkEAwQFj7eMqxpQ8G6u94kSCzEEVOdfm5NftOnoLs9WwsP6jmKE+tLJ9
  pvvztvYR0sKya/IRU4UKe+CQMiFhwxHrFQJBAMHOY5u8Q0M3H5IAWJTjQTlpVsjf
  iLByOkSUuNkWsofUhRK4lfUoZaF1g7u0wTczCADerZAoaJGgej14wBxjajcCQAJ5
  ShaaesngzIRuRxjHWAXWL7d2FPeJ7Ph65/t+Ga2rFd22817Nit7BC/akYMYayL6p
  c59mbSP5VN/PnbkqWaECQQDX854U8YkersNNc0i3nX0iCgM9Cw6F95AJhG3pnmLx
  okGvYI36EpsjYU2lbZYEqJ+W2H58awyhGlrAtaRUXiR4
  -----END RSA PRIVATE KEY-----`,
  db: {
    host: "localhost",
    user: "root",
    password: "",
    database: "auth",
  },
};
