const origin = "http://localhost:8000";

//auth
export const REGISTER_USER_REQUEST = `${origin}/auth/register`;
export const LOGIN_USER_REQUEST = `${origin}/auth/login`;
export const LOGOUT_USER_REQUEST = `${origin}/auth/logout`;

//Profile Main
export const PROFILE_REQUEST = `${origin}/profile/me`;
export const HEADLINE_REQUEST = `${origin}/profile/headline`;
export const FOLLOWING_REQUEST = `${origin}/following`;

//Profile mini
export const NAME_REQUEST = `${origin}/profile/name`;
export const ZIPCODE_REQUEST = `${origin}/profile/zipcode`;
export const PHONE_NUMBER_REQUEST = `${origin}/profile/phoneNumber`;
export const EMAIL_REQUEST = `${origin}/profile/email`;
export const GENDER_REQUEST = `${origin}/profile/gender`;

//Avatar
export const AVATAR_REQUEST = `${origin}/profile/avatar`;

//Articles
export const ARTICLES_REQUEST = `${origin}/articles`;
export const ARTICLES_REQUEST_EFFICIENT = `${origin}/articles/efficient`;

//Request config
export const LOGIN_REQ_OPTIONS = {
  credentials: "include",
  withCredentials: true,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "*",
};
