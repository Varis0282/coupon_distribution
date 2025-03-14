import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const COOKIE_NAME = 'coupon_user_id';
const COOKIE_EXPIRY_DAYS = 30;

export const getCookieId = (): string => {
  let cookieId = Cookies.get(COOKIE_NAME);
  
  if (!cookieId) {
    cookieId = uuidv4();
    Cookies.set(COOKIE_NAME, cookieId, { expires: COOKIE_EXPIRY_DAYS });
  }
  
  return cookieId;
};

export const clearCookieId = (): void => {
  Cookies.remove(COOKIE_NAME);
}; 