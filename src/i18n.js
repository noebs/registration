import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "welcome": "Welcome to React and react-i18next",
      "name": "Your name",
      "id": "ID Type (1 default)",
      "id_number": "ID number",
      "city": "City",
      "mobile": "Mobile number",
      "password": "Password",
      "submit": "Submit",
      "tm": "Noebs and Solus are registered trademarks. Solus is a certified payment processor by CBOS.",
      "sign_in": "Already have an account? Sign in",
      "marketing": "Do you want to receive marketing and promotional materials?"
    
    }
  },
  ar: {
    translation: {
      "welcome": "Bienvenue à React et react-i18next",
      "name": "ادخل اسمك",
      "id": "نوع الاثبات (جواز \\ رقم وطني)",
      "id_number": "رقم البطاقة (الرقم الوطني، رقم الجواز)",
      "city": "المدينة",
      "mobile": "رقم الهاتف",
      "password": "كلمة السر",
      "submit": "ارسال",
      "tm": "Noebs and Solus are registered trademarks. Solus is a certified payment processor by CBOS.",
      "sign_in": "لديك حساب مسبقاً؟ تسجيل الدخول",
      "marketing": "هل تود استقبال رسائل تسويقية؟"


    }
  }
};

i18n
  .use(LanguageDetector) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;