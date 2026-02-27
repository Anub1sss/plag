import type { Part } from "./parts-data"

/**
 * Маппинг номеров деталей к конкретным изображениям
 * Формат: "КПУ 9.XX.XXX" или "КПУ 9.XX.XXX-XX"
 */
const partNumberImageMap: Record<string, string> = {
  // Бороны (harrows) - КПУ 9.08.XXX
  "КПУ 9.08.030": "/svg/agroluxharrow-12/-01.png", // Секция боронки
  "КПУ 9.08.010": "/svg/agroluxharrow-12/-02.png", // Секции боронок
  "КПУ 9.08.020": "/svg/agroluxharrow-12/890--09.png", // Секция боронки
  "КПУ 9.08.000": "/svg/agroluxharrow-12/IMG_8774.png", // Комплект боронок
  "КПУ 9.08.000-01": "/svg/agroluxharrow-12/890--11.png", // Комплект боронок -01
  
  // Культиваторы - комплекты оборудования
  "КПУ 9.13.000": "/svg/cultivator/890--07.png", // Комплект оборудования с двухточечной навеской
  "КПУ 9.17.000": "/svg/cultivator/890--11.png", // Комплект оборудования с прицепной петлей
  
  // Культиваторы - основные детали
  "КПУ 9.15.000": "/svg/cultivator/890--12.png", // Стяжка
  "КПУ 9.11.000": "/svg/cultivator/890--14.png", // Комплект электрооборудования
  
  // Щитки
  "КПУ 9.00.076": "/svg/cultivator/IMG-20230315-WA0018.jpg", // Щиток сигнальный
  "КПУ 9.00.070": "/svg/cultivator/IMG-20230315-WA0018.jpg", // Комплект оборудования щитков передних
  "КПУ 9.00.060": "/svg/cultivator/IMG-20230315-WA0031.jpg", // Комплект оборудования щитков задних
  
  // Тяги
  "КПУ 9.06.030": "/svg/cultivator/IMG-20230315-WA0014_.jpg", // Тяга в сборе
  "КПУ 9.06.030-01": "/svg/cultivator/IMG-20230315-WA0034_.jpg", // Тяга в сборе с креплением
  
  // Подвески
  "КПУ 9.12.010": "/svg/cultivator/IMG-20230315-WA0010_.jpg", // Подвеска базовая
  "КПУ 9.12.010-01": "/svg/cultivator/IMG-20230315-WA0009.jpg", // Подвеска 01
  "КПУ 9.12.010-02": "/svg/cultivator/IMG-20230315-WA0038_.jpg", // Подвеска 02
  "КПУ 9.12.010-03": "/svg/cultivator/IMG-20230315-WA0012.jpg", // Подвеска 03
  "КПУ 9.12.000": "/svg/cultivator/IMG-20230315-WA0026.jpg", // Комплект подвесок
  "КПУ 9.12.000-01": "/svg/cultivator/IMG-20230315-WA0030_.jpg", // Комплект подвесок -01
  
  // Катки
  "КПУ 9.06.000А": "/svg/cultivator/IMG-20230315-WA0026.jpg", // Комплект катков
  "КПУ 9.06.100А": "/svg/cultivator/IMG-20230315-WA0031.jpg", // Каток
  "КПУ 9.06.100А-02": "/svg/cultivator/IMG-20230315-WA0048_.jpg", // Каток -02
  
  // Выравниватели
  "КПУ 9.05.010": "/svg/cultivator/IMG-20230315-WA0008_.jpg", // Секция выравнивателя
  "КПУ 9.05.010-01": "/svg/cultivator/IMG-20230315-WA0010_.jpg", // Секция выравнивателей -01
  "КПУ 9.05.070": "/svg/cultivator/IMG-20230315-WA0012.jpg", // Выравниватель
  "КПУ 9.05.000": "/svg/cultivator/IMG-20230315-WA0018.jpg", // Комплект выравнивателей
  "КПУ 9.05.000-01": "/svg/cultivator/IMG-20230315-WA0026.jpg", // Комплект выравнивателей -01
  "КПУ 9.05.020": "/svg/cultivator/IMG-20230315-WA0034_.jpg", // Секция выравнивателя 020
  
  // Колеса и оси
  "КПУ 9.00.010": "/svg/cultivator/IMG-20230327-WA0027.jpg", // Колесо опорное
  "КПУ 9.00.080": "/svg/cultivator/IMG-20230327-WA0031.jpg", // Оси в сборе
  "КПУ 9.00.085": "/svg/cultivator/IMG-20230327-WA0032.jpg", // Оси в сборе
  "КПУ 9.00.040А": "/svg/cultivator/IMG-20230328-WA0027.jpg", // Винт в сборе
  
  // Рама и крылья
  "КПУ 9.01.010": "/svg/cultivator/IMG-20230329-WA0015.jpg", // Рама в сборе
  "КПУ 9.01.030": "/svg/cultivator/IMG-20230329-WA0016.jpg", // Крыло в сборе
  "КПУ 9.01.060": "/svg/cultivator/IMG-20230329-WA0017.jpg", // Закрылок
  
  // Подкат
  "КПУ 9.02.000": "/svg/cultivator/IMG-20230329-WA0018.jpg", // Подкат транспортных колес
  
  // Сница
  "КПУ 9.03.010": "/svg/cultivator/IMG-20230329-WA0019.jpg", // Сница
  
  // Кронштейны
  "КПУ 9.00.408": "/svg/cultivator/IMG-20230330-WA0006_.jpg", // Кронштейн в сборе
}

/**
 * Маппинг по ключевым словам в названии (если точного совпадения нет)
 */
const nameKeywordImageMap: Array<{ keywords: string[]; image: string }> = [
  // Бороны
  { keywords: ["борона", "боронка", "9.08.030"], image: "/svg/agroluxharrow-12/-01.png" },
  { keywords: ["борона", "боронка", "9.08.010"], image: "/svg/agroluxharrow-12/-02.png" },
  { keywords: ["борона", "боронка", "9.08.020"], image: "/svg/agroluxharrow-12/890--09.png" },
  { keywords: ["комплект боронок", "9.08.000"], image: "/svg/agroluxharrow-12/IMG_8774.png" },
  { keywords: ["кронштейн", "9.08.030"], image: "/svg/agroluxharrow-12/-01.png" },
  
  // Навески
  { keywords: ["навеска", "двухточечная", "9.13"], image: "/svg/cultivator/890--07.png" },
  { keywords: ["прицепная", "петля", "9.17"], image: "/svg/cultivator/890--11.png" },
  
  // Стяжки
  { keywords: ["стяжка", "9.15"], image: "/svg/cultivator/890--12.png" },
  
  // Электрооборудование
  { keywords: ["электрооборудование", "электричество", "9.11"], image: "/svg/cultivator/890--14.png" },
  
  // Щитки
  { keywords: ["щиток", "сигнальный", "9.00.076"], image: "/svg/cultivator/IMG-20230315-WA0018.jpg" },
  { keywords: ["щиток", "передний", "9.00.070"], image: "/svg/cultivator/IMG-20230315-WA0018.jpg" },
  { keywords: ["щиток", "задний", "9.00.060"], image: "/svg/cultivator/IMG-20230315-WA0031.jpg" },
  
  // Тяги
  { keywords: ["тяга", "9.06.030-01"], image: "/svg/cultivator/IMG-20230315-WA0034_.jpg" },
  { keywords: ["тяга", "9.06.030"], image: "/svg/cultivator/IMG-20230315-WA0014_.jpg" },
  
  // Подвески
  { keywords: ["подвеска", "9.12.010-03"], image: "/svg/cultivator/IMG-20230315-WA0012.jpg" },
  { keywords: ["подвеска", "9.12.010-02"], image: "/svg/cultivator/IMG-20230315-WA0038_.jpg" },
  { keywords: ["подвеска", "9.12.010-01"], image: "/svg/cultivator/IMG-20230315-WA0009.jpg" },
  { keywords: ["подвеска", "9.12.010"], image: "/svg/cultivator/IMG-20230315-WA0010_.jpg" },
  { keywords: ["комплект подвесок", "9.12.000"], image: "/svg/cultivator/IMG-20230315-WA0026.jpg" },
  
  // Катки
  { keywords: ["каток", "9.06.100А-02"], image: "/svg/cultivator/IMG-20230315-WA0048_.jpg" },
  { keywords: ["каток", "9.06.100А"], image: "/svg/cultivator/IMG-20230315-WA0031.jpg" },
  { keywords: ["комплект катков", "9.06.000А"], image: "/svg/cultivator/IMG-20230315-WA0026.jpg" },
  
  // Выравниватели
  { keywords: ["выравниватель", "9.05.020"], image: "/svg/cultivator/IMG-20230315-WA0034_.jpg" },
  { keywords: ["выравниватель", "9.05.010-01"], image: "/svg/cultivator/IMG-20230315-WA0010_.jpg" },
  { keywords: ["выравниватель", "9.05.010"], image: "/svg/cultivator/IMG-20230315-WA0008_.jpg" },
  { keywords: ["выравниватель", "9.05.070"], image: "/svg/cultivator/IMG-20230315-WA0012.jpg" },
  { keywords: ["комплект выравнивателей", "9.05.000-01"], image: "/svg/cultivator/IMG-20230315-WA0026.jpg" },
  { keywords: ["комплект выравнивателей", "9.05.000"], image: "/svg/cultivator/IMG-20230315-WA0018.jpg" },
  
  // Колеса
  { keywords: ["колесо", "опорное", "9.00.010"], image: "/svg/cultivator/IMG-20230327-WA0027.jpg" },
  { keywords: ["оси", "9.00.085"], image: "/svg/cultivator/IMG-20230327-WA0032.jpg" },
  { keywords: ["оси", "9.00.080"], image: "/svg/cultivator/IMG-20230327-WA0031.jpg" },
  { keywords: ["винт", "9.00.040А"], image: "/svg/cultivator/IMG-20230328-WA0027.jpg" },
  
  // Рама
  { keywords: ["рама", "9.01.010"], image: "/svg/cultivator/IMG-20230329-WA0015.jpg" },
  { keywords: ["крыло", "9.01.030"], image: "/svg/cultivator/IMG-20230329-WA0016.jpg" },
  { keywords: ["закрылок", "9.01.060"], image: "/svg/cultivator/IMG-20230329-WA0017.jpg" },
  
  // Подкат
  { keywords: ["подкат", "9.02.000"], image: "/svg/cultivator/IMG-20230329-WA0018.jpg" },
  
  // Сница
  { keywords: ["сница", "9.03.010"], image: "/svg/cultivator/IMG-20230329-WA0019.jpg" },
  
  // Кронштейн
  { keywords: ["кронштейн", "9.00.408"], image: "/svg/cultivator/IMG-20230330-WA0006_.jpg" },
]

/**
 * Изображения по категориям (fallback)
 */
const categoryImages: Record<string, string[]> = {
  cultivators: [
    "/svg/kultivatory/Каток_КПУ_9.06.100А-02_(для_КПУ_12).svg",
    "/svg/kultivatory/Каток_КПУ_9.06.100А.svg",
    "/svg/kultivatory/Каток_КПУ_9.06.100А_(для_КПУ_12).svg",
    "/svg/kultivatory/Комплект_боронок_КПУ_9.08.000-01_(для_КПУ-12).svg",
    "/svg/kultivatory/Комплект_боронок_КПУ_9.08.000_(для_КПУ-9).svg",
    "/svg/kultivatory/Комплект_выравнивателей_КПУ_9.05.000-01_(Для_КПУ-12).svg",
    "/svg/kultivatory/Комплект_выравнивателей_КПУ_9.05.000_(Для_КПУ-9).svg",
    "/svg/kultivatory/Комплект_катков_КПУ_9.06.000А_(Для_КПУ-12).svg",
    "/svg/kultivatory/Комплект_катков_КПУ_9.06.000А_(Для_КПУ-9).svg",
    "/svg/kultivatory/Комплект_подвесок_КПУ_9.12.000-01_(Для_КПУ-12).svg",
    "/svg/kultivatory/Комплект_подвесок_КПУ_9.12.000_(Для_КПУ-9).svg",
    "/svg/kultivatory/КПУ-12.svg",
    "/svg/kultivatory/КПУ-9.svg",
    "/svg/kultivatory/КПУ_9.00.010_Колесо_опорное_в_сборе_с_винтом.svg",
    "/svg/kultivatory/КПУ_9.00.010_Колесо_опорное_в_сборе_с_винтом_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.00.040А_Винт_в_сборе.svg",
    "/svg/kultivatory/КПУ_9.00.040А_Винт_в_сборе_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.00.060_Комплект_оборудования_щитков_задних.svg",
    "/svg/kultivatory/КПУ_9.00.060_Комплект_оборудования_щитков_задних_(Для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.00.070_Комплект_оборудования_щитков_передних.svg",
    "/svg/kultivatory/КПУ_9.00.070_Комплект_оборудования_щитков_передних_(Для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.00.076_Щиток_сигнальный.svg",
    "/svg/kultivatory/КПУ_9.00.076_Щиток_сигнальный_(Для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.00.080_Оси_в_сборе.svg",
    "/svg/kultivatory/КПУ_9.00.080_Оси_в_сборе_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.00.085_Оси_в_сборе.svg",
    "/svg/kultivatory/КПУ_9.00.085_Оси_в_сборе_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.00.090_Держатель_для_шлангов.svg",
    "/svg/kultivatory/КПУ_9.00.090_Держатель_для_шлангов_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.00.408_Кронштейн_в_сборе_с_креплением_(для_КПУ_12.06.030).svg",
    "/svg/kultivatory/КПУ_9.00.408_Кронштейн_в_сборе_с_креплением_(для_КПУ_12.06.030-01).svg",
    "/svg/kultivatory/КПУ_9.00.408_Кронштейн_в_сборе_с_креплением_(для_КПУ_9.06.030-01).svg",
    "/svg/kultivatory/КПУ_9.01.010_в_сборе_с_крыльями.svg",
    "/svg/kultivatory/КПУ_9.01.010_в_сборе_с_крыльями_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.01.010_в_сборе_с_крыльями_и_закрылками_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.01.010_Рама_в_сборе_с_КПУ_12.01.020_Приставка_и_крепежом_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.01.010_Рама_в_сборе_с_КПУ_9.01.020_Приставка_и_крепежом.svg",
    "/svg/kultivatory/КПУ_9.01.030_Крыло_в_сборе_с_крепежом.svg",
    "/svg/kultivatory/КПУ_9.01.030_Крыло_в_сборе_с_крепежом_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.01.060_Закрылок_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.02.000_Подкат_транспортных_колёс_в_сборе_с_осями.svg",
    "/svg/kultivatory/КПУ_9.02.000_Подкат_транспортных_колёс_в_сборе_с_осями_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.03.010_Сница.svg",
    "/svg/kultivatory/КПУ_9.03.010_Сница_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.05.070_Выравниватель.svg",
    "/svg/kultivatory/КПУ_9.05.070_Выравниватель_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.06.030-01_Тяга_в_сборе_с_креплением.svg",
    "/svg/kultivatory/КПУ_9.06.030-01_Тяга_в_сборе_с_креплением_(Для_КПУ-12).svg",
    "/svg/kultivatory/КПУ_9.06.030_Тяга_в_сборе_с_креплением.svg",
    "/svg/kultivatory/КПУ_9.06.030_Тяга_в_сборе_с_креплением_(Для_КПУ-12).svg",
    "/svg/kultivatory/КПУ_9.08.020_Секция_боронки.svg",
    "/svg/kultivatory/КПУ_9.08.020_Секция_боронки_(Для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.11.000_Комплект_электрооборудования.svg",
    "/svg/kultivatory/КПУ_9.11.000_Комплект_электрооборудования_(Для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.12.010-01_Подвеска.svg",
    "/svg/kultivatory/КПУ_9.12.010-01_Подвеска_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.12.010-02_Подвеска.svg",
    "/svg/kultivatory/КПУ_9.12.010-02_Подвеска_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.12.010-03_Подвеска.svg",
    "/svg/kultivatory/КПУ_9.12.010-03_Подвеска_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.12.010_Подвеска.svg",
    "/svg/kultivatory/КПУ_9.12.010_Подвеска_(для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.13.000_Комплект_оборудования_с_двухточечной_навеской.svg",
    "/svg/kultivatory/КПУ_9.13.000_Комплект_оборудования_с_двухточечной_навеской_(Для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.15.000_Стяжка.svg",
    "/svg/kultivatory/КПУ_9.15.000_Стяжка_(Для_КПУ_12).svg",
    "/svg/kultivatory/КПУ_9.17.000_Комплект_оборудования_с_прицепной_пётлей.svg",
    "/svg/kultivatory/КПУ_9.17.000_Комплект_оборудования_с_прицепной_пётлей_(Для_КПУ_12).svg",
    "/svg/kultivatory/Кронштейн_КПУ_9.08.030.svg",
    "/svg/kultivatory/Кронштейн_КПУ_9.08.030_(Для_КПУ_12).svg",
    "/svg/kultivatory/Секции_боронок_КПУ_9.08.010_и_КПУ_9.08.010-01.svg",
    "/svg/kultivatory/Секции_боронок_КПУ_9.08.010_и_КПУ_9.08.010-01_(Для_КПУ_12).svg",
    "/svg/kultivatory/Секция_боронки_и_КПУ_9.08.030_в_сборе_с_крепежом.svg",
    "/svg/kultivatory/Секция_боронки_и_КПУ_9.08.030_в_сборе_с_крепежом_(Для_КПУ_12).svg",
    "/svg/kultivatory/Секция_выравнивателей_КПУ_9.05.010-01.svg",
    "/svg/kultivatory/Секция_выравнивателей_КПУ_9.05.010-01_(для_КПУ_12).svg",
    "/svg/kultivatory/Секция_выравнивателя_КПУ_9.05.010.svg",
    "/svg/kultivatory/Секция_выравнивателя_КПУ_9.05.010_(для_КПУ_12).svg",
    "/svg/kultivatory/Секция_выравнивателя_КПУ_9.05.020_(для_КПУ_12).svg",
    "/svg/cultivator/890--07.png",
    "/svg/cultivator/IMG-20230315-WA0018.jpg",
    "/svg/cultivator/IMG-20230315-WA0023.jpg",
    "/svg/cultivator/IMG-20230315-WA0031.jpg",
    "/svg/cultivator/IMG-20230315-WA0014_.jpg",
    "/svg/cultivator/IMG-20230315-WA0034_.jpg",
    "/svg/cultivator/IMG-20230315-WA0026.jpg",
  ],
  harrows: [
    "/svg/borony/borona-pruzhinnaya-shirokozakhvatnaya-bpsh-25.png",
    "/svg/borony/borona-zubovaya-shirokozakhvatnaya-bzsh-15-21.png",
    "/svg/borony/borona-zubovaya-shirokozakhvatnaya-bzsh-21kh2m-bzsh-25kh2.png",
    "/svg/agroluxharrow-12/-01.png",
    "/svg/agroluxharrow-12/-02.png",
    "/svg/agroluxharrow-12/890--09.png",
    "/svg/agroluxharrow-12/IMG_8774.png",
    "/svg/agroluxharrow-12/photo.png",
    "/svg/agroluxharrow-12/IMG-20230307-WA0006.jpg",
    "/svg/agroluxharrow-12/IMG-20230307-WA0013.jpg"
  ],
  seeders: [
    
  ],
  plows: [
    "/svg/plugi/Брус_для_ППО-5_(4+1).svg",
    "/svg/plugi/Брус_для_ППО-6_(5+1).svg",
    "/svg/plugi/Брус_для_ППО-7_(6+1).svg",
    "/svg/plugi/Брус_для_ППО-8_(7+1).svg",
    "/svg/plugi/Брус_для_ППО-9_(8+1).svg",
    "/svg/plugi/Брус_ППО_1.01.010_для_ППО-7_(6+1).svg",
    "/svg/plugi/Брус_ППО_1.05.000_для_ППО-7_(6+1)_On_land.svg",
    "/svg/plugi/Брус_ППО_6.01.010_для_ППО-6_(5+1).svg",
    "/svg/plugi/Брус_ППО_6.05.000-01_для_ППО-5_(4+1)_On_land.svg",
    "/svg/plugi/Брус_ППО_6.05.000_для_ППО-6_(5+1)_On_land.svg",
    "/svg/plugi/Брус_ППО_7.03.000.svg",
    "/svg/plugi/Брус_ППО_7.03.000_и_Усилитель_тяги_ППО_7.33.000.svg",
    "/svg/plugi/Брус_ППО_7.04.000_(Для_ППО-8_(7+1).svg",
    "/svg/plugi/Брус_ППО_7.32.000_для_ППО-8_(7+1)_On_land.svg",
    "/svg/plugi/Брус_ППО_9.01.010_для_ППО-9_(8+1).svg",
    "/svg/plugi/Брус_ППО_9.05.000_для_ППО-9_(8+1)_On_land.svg",
    "/svg/plugi/Колесо.svg",
    "/svg/plugi/Колесо_on_land.svg",
    "/svg/plugi/Колесо_для_ППО-5_(4+1).svg",
    "/svg/plugi/Колесо_опорное_ППО_7.37.000А.svg",
    "/svg/plugi/Комплект_для_агрегатирования_ППО_5.01.020.svg",
    "/svg/plugi/Комплект_для_агрегатирования_ППО_7.01.020.svg",
    "/svg/plugi/Комплект_для_агрегатирования_ППО_7.01.030.svg",
    "/svg/plugi/Комплект_для_агрегатирования_ППО_7.01.040.svg",
    "/svg/plugi/Комплект_ножей_дисковых_ППО_7.42.000.svg",
    "/svg/plugi/Комплект_осветительного_оборудования_ППО_7.44.000.svg",
    "/svg/plugi/Комплект_предплужников_ППО_1.41.000_для_ППО-7_(6+1).svg",
    "/svg/plugi/Комплект_предплужников_ППО_5.41.000_для_ППО-5_(4+1).svg",
    "/svg/plugi/Комплект_предплужников_ППО_6.41.000_для_ППО-6_(5+1).svg",
    "/svg/plugi/Комплект_предплужников_ППО_7.41.000_для_ППО-8_(7+1).svg",
    "/svg/plugi/Комплект_предплужников_ППО_9.41.000_для_ППО-9_(8+1).svg",
    "/svg/plugi/Корпус_ППО_40.000.svg",
    "/svg/plugi/Навеска_ППО_7.01.000_для_ППО-8_(7+1)_и_ППО-8_(7+1)_On_land.svg",
    "/svg/plugi/Нож_дисковый.svg",
    "/svg/plugi/ППО_-_Винт_регулировочный.svg",
    "/svg/plugi/ППО_5.01.000_Навеска.svg",
    "/svg/plugi/ППО_7.08.000_Приставка.svg",
    "/svg/plugi/ППО_7.25.000_Опора.svg",
    "/svg/plugi/ППО_9.00.000-01_Плуг_оборотный_ППО-9_On_land.svg",
    "/svg/plugi/ППО_9.00.000_-_Плуг_оборотный_ППО-9.svg",
    "/svg/plugi/Предплужник_ППО_41.000.svg",
    "/svg/plugi/Рычаг_ППО_7.05.000.svg",
    "/svg/plugi/Рычаг_ППО_7.12.000.svg",
    "/svg/plugi/Рычаг_ППО_7.34.000.svg",
    "/svg/plugi/Стойка_ППО_7.19.000.svg",
    "/svg/plugi/Ступица_в_сборе_ППО_7.17.100.svg"
  ],
  "soil-compactors": [
    "/svg/pochvouplotniteli/pochvouplotnitel-pu-70n.png",
    "/svg/pochvouplotniteli/pochvouplotnitel-pu-70p.png"
  ],
  "deep-rippers": [
    "/svg/glubokorykhliteli/Пальцы_навески_трактора_+_крепёж.svg",
    "/svg/glubokorykhliteli/ЩГН_00.000_Щелерез-глубокорыхлитель_навесной_ЩГН-4.svg",
    "/svg/glubokorykhliteli/ЩГН_00.100_База.svg",
    "/svg/glubokorykhliteli/ЩГН_20.000_Колесо_в_сборе.svg",
    "/svg/glubokorykhliteli/ЩГН_30.000_+_крепёж.svg",
    "/svg/glubokorykhliteli/ЩГН_30.000_Рабочий_орган.svg",
    "/svg/glubokorykhliteli/ЩГН_40.000_Каток_кольчато-шпоровый_(укрупненными_узлами).svg",
    "/svg/glubokorykhliteli/ЩГН_40.000_Крепёж_и_детали.svg",
    "/svg/glubokorykhliteli/ЩГН_45.000А_Опора_малая.svg",
    "/svg/glubokorykhliteli/ЩГН_60.000+ЩГН_50.000+ЩГН_70.000.svg",
    "/svg/glubokorykhliteli/ЩГН_80.000_Гидросистема.svg",
    "/svg/glubokorykhliteli/glubokorykhlitel-shchelerez-gshch-4p.png"
  ],
}

/**
 * Получает путь к изображению товара на основе его данных
 */
export function getProductImage(product: Part): string {
  const name = product.name.toLowerCase()
  const partNumber = product.partNumber.toLowerCase()
  const article = product.article.toLowerCase()
  const category = product.category?.toLowerCase() || ""
  
  // 1. Проверяем точное совпадение по номеру детали
  if (partNumberImageMap[product.partNumber]) {
    return partNumberImageMap[product.partNumber]
  }
  
  // 2. Проверяем совпадение без учета регистра
  const partNumberLower = product.partNumber.toLowerCase()
  for (const [key, value] of Object.entries(partNumberImageMap)) {
    if (key.toLowerCase() === partNumberLower) {
      return value
    }
  }
  
  // 3. Проверяем по артикулу (извлекаем номер детали из артикула)
  const articleMatch = article.match(/kpu-9-(\d+)-(\d+)(?:-(\d+))?(?:-([a-z0-9]+))?/i)
  if (articleMatch) {
    const [, group1, group2, group3, variant] = articleMatch
    let partNumFromArticle = `КПУ 9.${group1}.${group2.padStart(3, "0")}`
    if (group3) partNumFromArticle += `-${group3}`
    if (partNumberImageMap[partNumFromArticle]) {
      return partNumberImageMap[partNumFromArticle]
    }
  }
  
  // 4. Проверяем по ключевым словам в названии и номере детали
  for (const mapping of nameKeywordImageMap) {
    const allKeywords = [...mapping.keywords, ...mapping.keywords.map((k) => k.toLowerCase())]
    if (
      allKeywords.some(
        (keyword) =>
          name.includes(keyword.toLowerCase()) ||
          partNumber.includes(keyword.toLowerCase()) ||
          article.includes(keyword.toLowerCase())
      )
    ) {
      return mapping.image
    }
  }
  
  // 5. Используем изображение по категории на основе ID для разнообразия
  let images: string[] = []
  
  if (category === "harrows" || name.includes("борона") || name.includes("боронка")) {
    images = categoryImages.harrows
  } else if (category === "seeders" || name.includes("сеялка") || name.includes("szs")) {
    images = categoryImages.seeders
  } else if (category === "plows" || name.includes("плуг") || name.includes("сница")) {
    images = categoryImages.plows
  } else if (category === "soil-compactors" || name.includes("каток")) {
    images = categoryImages["soil-compactors"]
  } else if (category === "deep-rippers" || name.includes("выравниватель")) {
    images = categoryImages["deep-rippers"]
  } else {
    images = categoryImages.cultivators
  }
  
  if (images.length > 0) {
    const imageIndex = (product.id - 1) % images.length
    return images[imageIndex]
  }
  
  // 6. Fallback на SVG иконку
  return "/svg/cultivator/Tilda_Icons_26snw_wh.svg"
}

/**
 * Получает fallback изображение если основное не найдено
 */
export function getFallbackImage(): string {
  return "/placeholder.svg"
}
