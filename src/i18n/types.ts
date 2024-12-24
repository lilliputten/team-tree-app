export const localesList = ['en', 'ru'];
export type TLocale = (typeof localesList)[number];
export type TLocaleParams = { locale: TLocale };
export type TLocaleProps = { params: TLocaleParams };
export type TAwaitedLocaleParams = Promise<TLocaleParams>;
export type TAwaitedLocaleProps = { params: TAwaitedLocaleParams };
