export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  specialization: string;
  experience: string;
  description: string;
  image?: string;
}

export type Specialty = 
  | 'THERAPIST'
  | 'CARDIOLOGIST'
  | 'NEUROLOGIST'
  | 'PEDIATRICIAN'
  | 'SURGEON'
  | 'ALL';

export const specialtyLabels: Record<Specialty, string> = {
  ALL: 'Все специальности',
  THERAPIST: 'Терапевт',
  CARDIOLOGIST: 'Кардиолог',
  NEUROLOGIST: 'Невролог',
  PEDIATRICIAN: 'Педиатр',
  SURGEON: 'Хирург',
};

export const doctors: Doctor[] = [
  // Терапевты
  {
    id: '1',
    firstName: 'Алина',
    lastName: 'Коваль',
    patronymic: 'Сергеевна',
    specialization: 'THERAPIST',
    experience: '12 лет',
    description: 'Диагностика и лечение ОРЗ, хронических заболеваний, вакцинация',
    image: 'assets/images/alina.webp',
  },
  {
    id: '2',
    firstName: 'Данияр',
    lastName: 'Мухамедов',
    specialization: 'THERAPIST',
    experience: '8 лет',
    description: 'Амбулаторная терапия, профилактика заболеваний, диагностика',
    image: 'assets/images/daniyar.webp',
  },
  {
    id: '3',
    firstName: 'Айжан',
    lastName: 'Нурмаганбетова',
    specialization: 'THERAPIST',
    experience: '10 лет',
    description: 'Комплексная терапия, лечение пациентов с гипертонией',
    image: 'assets/images/aizhan.png',
  },

  // Кардиологи
  {
    id: '4',
    firstName: 'Тимур',
    lastName: 'Алиев',
    patronymic: 'Сергеевич',
    specialization: 'CARDIOLOGIST',
    experience: '15 лет',
    description: 'Лечение ИБС, ЭКГ, консультации по сердечно-сосудистым заболеваниям',
    image: 'assets/images/timur.webp',
  },
  {
    id: '5',
    firstName: 'Гульнара',
    lastName: 'Сулейменова',
    specialization: 'CARDIOLOGIST',
    experience: '11 лет',
    description: 'Кардиоскрининг, эхокардиография, реабилитация после инфаркта',
    image: 'assets/images/gulnara.webp',
  },
  {
    id: '6',
    firstName: 'Марат',
    lastName: 'Абдрахманов',
    specialization: 'CARDIOLOGIST',
    experience: '9 лет',
    description: 'Диагностика и лечение аритмии, гипертонии',
    image: 'assets/images/marat.webp',
  },

  // Неврологи
  {
    id: '7',
    firstName: 'Эльмира',
    lastName: 'Байжанова',
    specialization: 'NEUROLOGIST',
    experience: '13 лет',
    description: 'Мигрени, бессонница, постинсультное восстановление',
    image: 'assets/images/elmira.webp',
  },
  {
    id: '8',
    firstName: 'Руслан',
    lastName: 'Оспанов',
    specialization: 'NEUROLOGIST',
    experience: '10 лет',
    description: 'Радикулит, остеохондроз, невропатия',
    image: 'assets/images/ruslan.webp',
  },
  {
    id: '9',
    firstName: 'Жанна',
    lastName: 'Карибаева',
    specialization: 'NEUROLOGIST',
    experience: '7 лет',
    description: 'ЭЭГ диагностика, вестибулярные расстройства',
    image: 'assets/images/zhanna.webp',
  },

  // Педиатры
  {
    id: '10',
    firstName: 'Нурия',
    lastName: 'Асельбек',
    specialization: 'PEDIATRICIAN',
    experience: '10 лет',
    description: 'Наблюдение за детьми от 0 до 12 лет, вакцинация, ОРВИ',
    image: 'assets/images/nuriya.webp',
  },
  {
    id: '11',
    firstName: 'Гульнар',
    lastName: 'Ахметова',
    specialization: 'PEDIATRICIAN',
    experience: '8 лет',
    description: 'Аллергии, диспансеризация, консультации родителей',
    image: 'assets/images/gulnar.webp',
  },
  {
    id: '12',
    firstName: 'Сергей',
    lastName: 'Романов',
    specialization: 'PEDIATRICIAN',
    experience: '6 лет',
    description: 'Работа с новорожденными, хронические детские заболевания',
    image: 'assets/images/sergey.webp',
  },

  // Хирурги
  {
    id: '13',
    firstName: 'Аскар',
    lastName: 'Нуртаев',
    specialization: 'SURGEON',
    experience: '14 лет',
    description: 'Общая хирургия, лапароскопия',
    image: 'assets/images/askar.webp',
  },
  {
    id: '14',
    firstName: 'Айгуль',
    lastName: 'Калиева',
    specialization: 'SURGEON',
    experience: '12 лет',
    description: 'Малые хирургические вмешательства, перевязки',
    image: 'assets/images/aigul.webp',
  },
  {
    id: '15',
    firstName: 'Мурад',
    lastName: 'Хамитов',
    specialization: 'SURGEON',
    experience: '9 лет',
    description: 'Послеоперационное сопровождение, амбулаторные операции',
    image: 'assets/images/murad.webp',
  },
]; 