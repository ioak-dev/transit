import format from 'date-fns/format';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDate = new Date().getDate();

const dateFormatWithoutYear = 'MMM d';
const dateFormat = 'MMM d, yyyy';

const dateTimeFormatWithoutYear = "MMM d, hh':'mmaaa";
// const dateTimeFormatWithoutYearAndMonth = "d, hh':'mmaaa";
const dateTimeFormatWithoutYearAndMonthAndDate = "hh':'mmaaa";
const dateTimeFormat = 'MMM d, yyyy';

export const formatDateText = (dateText: string) => {
  if (dateText) {
    const date = new Date(dateText);
    return format(
      date,
      date.getFullYear() === currentYear ? dateFormatWithoutYear : dateFormat
    );
  }
  return '';
};

export const formatDate = (date: Date) => {
  if (date) {
    return format(
      date,
      date.getFullYear() === currentYear ? dateFormatWithoutYear : dateFormat
    );
  }
  return '';
};

export const days = (dateText: string) => {
  if (dateText) {
    const date = new Date(dateText);
    return (date.getTime() - new Date().getTime()) / (1000 * 3600 * 24);
  }
  return 0;
};

export const formatDateTimeText = (dateText: Date) => {
  if (dateText) {
    const date = new Date(dateText);
    let formatString = dateTimeFormat;
    console.log(date.getFullYear(), date.getMonth(), date.getDate());
    if (
      date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth &&
      date.getDate() === currentDate
    ) {
      console.log('*********1');
      formatString = dateTimeFormatWithoutYearAndMonthAndDate;
    }
    // else if (
    //   date.getFullYear() === currentYear &&
    //   date.getMonth() === currentMonth
    // )
    // {
    //   formatString = dateTimeFormatWithoutYearAndMonth;
    // }
    else if (date.getFullYear() === currentYear) {
      formatString = dateTimeFormatWithoutYear;
    }
    return format(date, formatString);
  }
  return '';
};
