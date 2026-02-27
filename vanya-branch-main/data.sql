
CREATE DATABASE IF NOT EXISTS kultivator_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kultivator_db;

CREATE TABLE IF NOT EXISTS parts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    article VARCHAR(50) UNIQUE NOT NULL,
    part_number VARCHAR(100) NOT NULL,
    name VARCHAR(500) NOT NULL,
    model VARCHAR(20) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_model (model),
    INDEX idx_part_number (part_number),
    INDEX idx_article (article)
);

CREATE TABLE IF NOT EXISTS specifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parameter_name VARCHAR(500) NOT NULL,
    kpu9_value VARCHAR(100),
    kpu12_value VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-15-000', 'КПУ 9.15.000', 'Стяжка', 'КПУ-9', 935.65);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-11-000', 'КПУ 9.11.000', 'Комплект электрооборудования', 'КПУ-9', 5768.78);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-00-076', 'КПУ 9.00.076', 'Щиток сигнальный', 'КПУ-9', 413.78);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-00-070', 'КПУ 9.00.070', 'Комплект оборудования щитков передних', 'КПУ-9', 4884.24);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-00-060', 'КПУ 9.00.060', 'Комплект оборудования щитков задних', 'КПУ-9', 4972.46);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-13-000', 'КПУ 9.13.000', 'Комплект оборудования с двухточечной навеской', 'КПУ-9', 5872.91);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-17-000', 'КПУ 9.17.000', 'Комплект оборудования с прицепной пётлей', 'КПУ-9', 5577.29);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-08-030', 'КПУ 9.08.030', 'Секция боронки и КПУ 9.08.030 в сборе с крепежом', 'КПУ-9', 2635.63);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-08-010', 'КПУ 9.08.010', 'Секции боронок КПУ 9.08.010 и КПУ 9.08.010-01', 'КПУ-9', 1904.99);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-08-030', 'КПУ 9.08.030', 'Кронштейн КПУ 9.08.030', 'КПУ-9', 675.33);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-08-020', 'КПУ 9.08.020', 'Секция боронки', 'КПУ-9', 3477.86);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-08-000', 'КПУ 9.08.000', 'Комплект боронок КПУ 9.08.000 (для КПУ-9)', 'КПУ-9', 5067.35);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-06-030-01', 'КПУ 9.06.030-01', 'Тяга в сборе с креплением', 'КПУ-9', 2176.50);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-06-030', 'КПУ 9.06.030', 'Тяга в сборе с креплением', 'КПУ-9', 2347.71);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-06-000A', 'КПУ 9.06.000А', 'Комплект катков КПУ 9.06.000А (Для КПУ-9)', 'КПУ-9', 5499.37);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-06-100A', 'КПУ 9.06.100А', 'Каток КПУ 9.06.100А', 'КПУ-9', 2750.79);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-12-010-03', 'КПУ 9.12.010-03', 'Подвеска', 'КПУ-9', 1505.85);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-12-010-02', 'КПУ 9.12.010-02', 'Подвеска', 'КПУ-9', 1423.47);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-12-010-01', 'КПУ 9.12.010-01', 'Подвеска', 'КПУ-9', 1666.86);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-12-010', 'КПУ 9.12.010', 'Подвеска', 'КПУ-9', 1259.62);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-12-000', 'КПУ 9.12.000', 'Комплект подвесок КПУ 9.12.000 (Для КПУ-9)', 'КПУ-9', 5211.10);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-05-010', 'КПУ 9.05.010', 'Секция выравнивателя КПУ 9.05.010', 'КПУ-9', 2458.45);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-05-010-01', 'КПУ 9.05.010-01', 'Секция выравнивателей КПУ 9.05.010-01', 'КПУ-9', 3525.62);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-05-070', 'КПУ 9.05.070', 'Выравниватель', 'КПУ-9', 1307.65);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-05-000', 'КПУ 9.05.000', 'Комплект выравнивателей КПУ 9.05.000 (Для КПУ-9)', 'КПУ-9', 5413.26);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-00-010', 'КПУ 9.00.010', 'Колесо опорное в сборе с винтом', 'КПУ-9', 2031.64);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-02-000', 'КПУ 9.02.000', 'Подкат транспортных колёс в сборе с осями', 'КПУ-9', 764.81);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-03-010', 'КПУ 9.03.010', 'Сница', 'КПУ-9', 1729.71);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-01-030', 'КПУ 9.01.030', 'Крыло в сборе с крепежом', 'КПУ-9', 4665.12);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-01-010', 'КПУ 9.01.010', 'Рама в сборе с КПУ 9.01.020 Приставка и крепежом', 'КПУ-9', 15091.41);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-00-408', 'КПУ 9.00.408', 'Кронштейн в сборе с креплением (для КПУ 9.06.030-01)', 'КПУ-9', 727.30);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-01-010', 'КПУ 9.01.010', 'КПУ 9.01.010 в сборе с крыльями', 'КПУ-9', 2236.95);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-00-090', 'КПУ 9.00.090', 'Держатель для шлангов', 'КПУ-9', 1181.53);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-00-085', 'КПУ 9.00.085', 'Оси в сборе', 'КПУ-9', 1813.96);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-00-080', 'КПУ 9.00.080', 'Оси в сборе', 'КПУ-9', 733.93);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU9-KPU-9-00-040A', 'КПУ 9.00.040А', 'Винт в сборе', 'КПУ-9', 501.63);


INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-06-100A', 'КПУ 9.06.100А', 'Каток КПУ 9.06.100А (для КПУ 12)', 'КПУ-12', 2240.54);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-06-100A-02', 'КПУ 9.06.100А-02', 'Каток КПУ 9.06.100А-02 (для КПУ 12)', 'КПУ-12', 2348.44);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-08-000-01', 'КПУ 9.08.000-01', 'Комплект боронок КПУ 9.08.000-01 (для КПУ-12)', 'КПУ-12', 5477.69);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-05-000-01', 'КПУ 9.05.000-01', 'Комплект выравнивателей КПУ 9.05.000-01 (Для КПУ-12)', 'КПУ-12', 4849.39);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-06-000A', 'КПУ 9.06.000А', 'Комплект катков КПУ 9.06.000А (Для КПУ-12)', 'КПУ-12', 4521.27);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-12-000-01', 'КПУ 9.12.000-01', 'Комплект подвесок КПУ 9.12.000-01 (Для КПУ-12)', 'КПУ-12', 5394.89);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-010', 'КПУ 9.00.010', 'Колесо опорное в сборе с винтом (для КПУ 12)', 'КПУ-12', 1629.55);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-040A', 'КПУ 9.00.040А', 'Винт в сборе (для КПУ 12)', 'КПУ-12', 670.18);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-060', 'КПУ 9.00.060', 'Комплект оборудования щитков задних (Для КПУ 12)', 'КПУ-12', 5202.94);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-070', 'КПУ 9.00.070', 'Комплект оборудования щитков передних (Для КПУ 12)', 'КПУ-12', 5348.91);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-076', 'КПУ 9.00.076', 'Щиток сигнальный (Для КПУ 12)', 'КПУ-12', 585.44);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-080', 'КПУ 9.00.080', 'Оси в сборе (для КПУ 12)', 'КПУ-12', 799.17);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-085', 'КПУ 9.00.085', 'Оси в сборе (для КПУ 12)', 'КПУ-12', 2401.34);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-090', 'КПУ 9.00.090', 'Держатель для шлангов (для КПУ 12)', 'КПУ-12', 1102.31);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-408', 'КПУ 9.00.408', 'Кронштейн в сборе с креплением (для КПУ 12.06.030-01)', 'КПУ-12', 938.66);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-00-408', 'КПУ 9.00.408', 'Кронштейн в сборе с креплением (для КПУ 12.06.030)', 'КПУ-12', 793.79);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-01-010', 'КПУ 9.01.010', 'КПУ 9.01.010 в сборе с крыльями (для КПУ 12)', 'КПУ-12', 2652.47);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-01-010', 'КПУ 9.01.010', 'КПУ 9.01.010 в сборе с крыльями и закрылками (для КПУ 12)', 'КПУ-12', 827.84);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-01-010', 'КПУ 9.01.010', 'Рама в сборе с КПУ 12.01.020 Приставка и крепежом (для КПУ 12)', 'КПУ-12', 12556.46);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-01-030', 'КПУ 9.01.030', 'Крыло в сборе с крепежом (для КПУ 12)', 'КПУ-12', 4494.65);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-01-060', 'КПУ 9.01.060', 'Закрылок (для КПУ 12)', 'КПУ-12', 1206.77);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-02-000', 'КПУ 9.02.000', 'Подкат транспортных колёс в сборе с осями (для КПУ 12)', 'КПУ-12', 1425.35);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-03-010', 'КПУ 9.03.010', 'Сница (для КПУ 12)', 'КПУ-12', 1502.64);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-05-070', 'КПУ 9.05.070', 'Выравниватель (для КПУ 12)', 'КПУ-12', 1316.59);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-06-030', 'КПУ 9.06.030', 'Тяга в сборе с креплением (Для КПУ-12)', 'КПУ-12', 2189.87);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-06-030-01', 'КПУ 9.06.030-01', 'Тяга в сборе с креплением (Для КПУ-12)', 'КПУ-12', 1644.05);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-08-020', 'КПУ 9.08.020', 'Секция боронки (Для КПУ 12)', 'КПУ-12', 3496.24);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-11-000', 'КПУ 9.11.000', 'Комплект электрооборудования (Для КПУ 12)', 'КПУ-12', 5010.27);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-12-010', 'КПУ 9.12.010', 'Подвеска (для КПУ 12)', 'КПУ-12', 1394.99);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-12-010-01', 'КПУ 9.12.010-01', 'Подвеска (для КПУ 12)', 'КПУ-12', 1703.60);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-12-010-02', 'КПУ 9.12.010-02', 'Подвеска (для КПУ 12)', 'КПУ-12', 1238.87);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-12-010-03', 'КПУ 9.12.010-03', 'Подвеска (для КПУ 12)', 'КПУ-12', 1657.40);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-13-000', 'КПУ 9.13.000', 'Комплект оборудования с двухточечной навеской (Для КПУ 12)', 'КПУ-12', 5115.54);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-15-000', 'КПУ 9.15.000', 'Стяжка (Для КПУ 12)', 'КПУ-12', 1145.58);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-17-000', 'КПУ 9.17.000', 'Комплект оборудования с прицепной пётлей (Для КПУ 12)', 'КПУ-12', 4360.60);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-08-030', 'КПУ 9.08.030', 'Кронштейн КПУ 9.08.030 (Для КПУ 12)', 'КПУ-12', 934.53);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-08-010', 'КПУ 9.08.010', 'Секции боронок КПУ 9.08.010 и КПУ 9.08.010-01 (Для КПУ 12)', 'КПУ-12', 900.54);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-08-030', 'КПУ 9.08.030', 'Секция боронки и КПУ 9.08.030 в сборе с крепежом (Для КПУ 12)', 'КПУ-12', 3395.22);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-05-010-01', 'КПУ 9.05.010-01', 'Секция выравнивателей КПУ 9.05.010-01 (для КПУ 12)', 'КПУ-12', 3582.10);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-05-010', 'КПУ 9.05.010', 'Секция выравнивателя КПУ 9.05.010 (для КПУ 12)', 'КПУ-12', 2774.07);

INSERT INTO parts (article, part_number, name, model, price) VALUES
('KPU12-KPU-9-05-020', 'КПУ 9.05.020', 'Секция выравнивателя КПУ 9.05.020 (для КПУ 12)', 'КПУ-12', 2598.32);

INSERT INTO specifications (parameter_name, kpu9_value, kpu12_value) VALUES
('Производительность за 1ч основного времени, га/ч, до', '13,5', '18,0'),
('Рабочая скорость движения на основных операциях, км/ч, не более', '15', NULL),
('Способ агрегирования', 'Прицепной', NULL),
('Дорожный просвет, мм, не менее', '300', NULL),
('Рабочая ширина захвата (конструкционная), м', '9', '12'),
('Глубина обработки, см, до', '12', NULL),
('Масса машины, кг, сухая (конструкционная)', '7050', '8700'),
('Габариты культиватора в рабочем положении, мм, (ШхДхВ), не более:', '9000х9000х1370', '12000х9000х1370'),
('Габариты культиватора в транспортном положении, мм, (ШхДхВ), не более:', '3000х8500х4000', '3000х8500х4000'),
('Высота рамы, см', '60', NULL),
('Количество стоек, шт.', '54', '72'),
('Количество рядов, шт.', '4', NULL),
('Расстояние между стойками, мм', '167', NULL),
('Диаметр катка, мм', '530', NULL),
('Диаметр зуба бороны, мм', '12', NULL),
('Количество выравнивателей, шт.', '36', '48'),
('Диаметр петли прицепной, мм', '60', NULL),
('Шины транспортных колес:', '500/55-20', NULL),
('Шины опорных колес:', '380/55-17', NULL);
