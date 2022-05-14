const getMilliseconds = () => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const mount = week * 4;
  const year = mount * 12;

  return {
    second,
    minute,
    hour,
    day,
    week,
    mount,
    year,
  };
};

export enum VariantsFormsts {
  mount = 5,
  week = 4,
  day = 3,
  hour = 2,
  minute = 1,
  time = 'time',
}

interface DateFromZFormatParams {
  date: string | undefined,
  variantsFormsts: VariantsFormsts,
}

const dateFromZFormat = ({ date, variantsFormsts }: DateFromZFormatParams): string => {
  if (!date) {
    return '';
  }

  const currentDate = Date.parse(new Date().toDateString());
  const newDate = Date.parse(date);

  const { day, week, mount } = getMilliseconds();

  if (variantsFormsts === VariantsFormsts.time) {
    const minutes = new Date(date).getMinutes();
    const minutesContent = `${minutes}`.length === 1 ? `0${minutes}` : minutes;

    return `${new Date(date).getHours()}:${minutesContent}`;
  }

  // Дни
  if (variantsFormsts <= VariantsFormsts.day) {
    const count = Math.round((currentDate - newDate) / day);

    if (count <= 0) {
      return 'Сегодня';
    }
    if (count === 1) {
      return 'Вчера';
    }
    if (count === 2) {
      return 'Позавчера';
    }
  }

  // Неделя
  if (variantsFormsts <= VariantsFormsts.week) {
    const count = Math.round((currentDate - newDate) / week);

    if (count <= 0) {
      return 'На этой неделе';
    }
    if (count === 1) {
      return 'Больше недели назад';
    }
  }

  // Месяц
  if (variantsFormsts <= VariantsFormsts.mount) {
    const count = Math.round((currentDate - newDate) / mount);

    if (count <= 0) {
      return 'Меньше месяца назад';
    }
    if (count === 1) {
      return 'Больше месяца назад';
    }
  }

  return 'шо?';
};

export default dateFromZFormat;
