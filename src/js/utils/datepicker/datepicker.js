import datepicker from 'js-datepicker';

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

const dateOptions = {
  id: 1,
  minDate: new Date(),
  customDays: weekDays,
  customMonths: months,
  formatter: (input, date, instance) => {
    input.value = date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

const setDatepicker = selectorName => datepicker(selectorName, dateOptions);

export default setDatepicker;
