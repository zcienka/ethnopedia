import i18next from "i18next"
import login_en from "./translations/en/login.json"
import login_pl from "./translations/pl/login.json"
import navbar_en from "./translations/en/navbar.json"
import navbar_pl from "./translations/pl/navbar.json"
import sidebar_en from "./translations/en/sidebar.json"
import sidebar_pl from "./translations/pl/sidebar.json"
import table_en from "./translations/en/table.json"
import table_pl from "./translations/pl/table.json"
import { initReactI18next } from "react-i18next"

export const resources = {
    pl: {
        login: login_pl,
        navbar: navbar_pl,
        sidebar: sidebar_pl,
        table: table_pl,
    },
    en: {
        login: login_en,
        navbar: navbar_en,
        sidebar: sidebar_en,
        table: table_en,
    },
} as const

i18next.use(initReactI18next).init({
    lng: "pl",
    debug: true,
    resources: resources,
    interpolation: {
        escapeValue: false,
    },
})
