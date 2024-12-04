export type SiteConfig = {
  name: string;
  description: string;
  defaultLang: string;
  locale: string;
  versionInfo: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    website: string;
    github: string;
  };
};
