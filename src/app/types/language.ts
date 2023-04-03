const languages = ['lv', 'en', 'ru'] as const;

export type Languages = {
  [K in typeof languages[number]]: string;
};

export type Language = typeof languages[number];

export type LocaleString = {
  _type: 'localeString';
} & Languages;
