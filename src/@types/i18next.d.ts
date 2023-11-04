import global from "../translations/en/global.json"
import { resources } from "../i18n"

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translations"
        resources: typeof resources
    }
}
export {}
