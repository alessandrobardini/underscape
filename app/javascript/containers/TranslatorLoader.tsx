import { I18n } from 'i18n-js'
import translations from 'locales/translations.json';
import React, { useState, useEffect } from 'react'
import { matchPath } from 'react-router-dom'

export const TranslatorContext = React.createContext<Translator>(null)

type Translator = I18n

enum AllowedLocales {
  en = 'en',
  it = 'it'
}

export const TranslatorLoader: React.FC = ({ children }) => {
  const [i18n, setI18n] = useState(new I18n(translations, { locale: AllowedLocales.en }))
  const { params: { locale: localeFromUrl } } = matchPath(window.location.pathname, { path: '/app/:locale' }) || { params: { localeFromUrl: AllowedLocales.en }} as any

  useEffect(() => {
    if(Object.values(AllowedLocales).includes(localeFromUrl)) {
      setI18n(new I18n(translations, { locale: localeFromUrl }))
    } else if(i18n.locale !== AllowedLocales.en) {
      setI18n(new I18n(translations, { locale: AllowedLocales.en }))
    }
  }, [localeFromUrl])

  return <TranslatorContext.Provider value={i18n}>{children}</TranslatorContext.Provider>
}
