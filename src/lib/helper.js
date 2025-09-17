// import { apiList, callGet } from '@/axios/api';

import { getToken } from "./auth";

// import moment from 'moment';
// import { getToken } from './auth';
// import { filterActions } from './constants';

const SMALL_MENU_KEY = 'SMALL_MENU';
const TIP_EMPLOYEE_KEY = 'SEE_TIP_ADD_EMPLOYEE';

export const UNAUTH_PAGES = [
  '/',
  '/guest',
  '/guest/employees',
  '/guest/services',
  '/guest/time',
  '/guest/confirm',
  '/thanks',
  '/login',
  '/register',
  '/reset-password',
  '/profile',
  '/dan',
  '/welcome-free',
  '/welcome-free/info',
  '/introduction',
  '/terms',
  '/privacy',
  '/TATAX',
  '/zzz',
];

export const checkAuthPage = () => {
  // const unauth_pages = ['/garnet', '/guest/*'];
  // const pathname = '/guest/asd';

  // const isUnauthPage = (pathname) => {
  //   return unauth_pages.some((route) => {
  //     if (route.endsWith('/*')) {
  //       const baseRoute = route.replace('/*', '');
  //       return pathname === baseRoute || pathname.startsWith(baseRoute + '/');
  //     }

  //     return pathname === route;
  //   });
  // };

  const pathname = window.location.pathname;

  if (getToken() || UNAUTH_PAGES.includes(pathname)) {
    return true;
  } else {
    return false;
  }
};

export const createUUID = () => {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const res = char === 'x' ? random : (random & 0x3) | 0x8;

    return res.toString(16);
  });
};

export const phoneOnChange = (e, onChange) => {
  let newValue = e.target.value;

  newValue = newValue.replace(/\D/g, '');

  if (String(newValue).length <= 8 && onChange) {
    e.target.value = newValue;

    onChange(e);
    return;
  } else {
    e.target.value = String(newValue).slice(0, 8);

    return e;
  }
};

export const copyClipboard = async (value, errorMsg = '') => {
  if (value) {
    try {
      await navigator.clipboard.writeText(value);

      Notification.success({ title: 'Амжилттай хуулагдлаа' });
    } catch (err) {
      Notification.error({ title: 'Хуулахад алдаа гарлаа' });
    }
  } else {
    errorMsg && Notification.error({ title: errorMsg });
  }
};

export const getIfEmpty = (value, enableNull = false) => {
  if (!value || value === 'undefined' || value === 'null') {
    if (enableNull === true) {
      return null;
    } else {
      return value === 0 || value === '0' ? 0 : 'Хоосон';
    }
  } else {
    return value;
  }
};

export const formatMinutesToTime = (minutes) => {
  if (minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const hourStr = hrs > 0 ? `${hrs} цаг` : '';
    const minStr = mins > 0 ? `${mins} мин` : '';

    return [hourStr, minStr].filter(Boolean).join(' ');
  }
};

export const formatAmount = (value, noCurrency) => {
  let res = {
    formatted: '',
    parse: '',
  };

  if (value) {
    const strValue = String(value);
    const digits = strValue.replace(/\D/g, ''); // Remove non-digit characters

    res = {
      formatted:
        digits.replace(/\B(?=(\d{3})+(?!\d))/g, '’') + (noCurrency ? '' : '₮'), // Add commas
      parse: strValue.replace(/’/g, ''), // Remove commas
    };
  }

  return res;
};

export const getSmallMenu = () => {
  return localStorage.getItem(SMALL_MENU_KEY);
};

export const enableSmallMenu = () => {
  localStorage.setItem(SMALL_MENU_KEY, 'YES');
};

export const disableSmallMenu = () => {
  localStorage.removeItem(SMALL_MENU_KEY);
};

export const getTipAddEmployee = () => {
  return localStorage.getItem(TIP_EMPLOYEE_KEY);
};

export const enableTipAddEmployee = () => {
  localStorage.setItem(TIP_EMPLOYEE_KEY, 'YES');
};

export const disableTipAddEmployee = () => {
  localStorage.removeItem(TIP_EMPLOYEE_KEY);
};

export const fetchMenu = async (setMenu) => {
  const res = await callGet(apiList.permissionMenu);

  if (res && res?.items?.length > 0) {
    const isMenu = res.items.filter((item) => item.is_menu);

    let MENU = [];
    let _menu = {};

    isMenu.map((item) => {
      const parentID = item.parent_id;

      if (parentID) {
        if (_menu[parentID]) {
          if (!_menu[parentID].children) {
            _menu[parentID].children = [];

            delete _menu[parentID].link;
          }

          _menu[parentID].children.push(item);
        }
      } else {
        _menu[item.id] = item;
      }
    });

    MENU = Object.values(_menu).sort((a, b) => a.sort_order - b.sort_order);

    setMenu(MENU);
  }
};

export const getParamsTable = ({
  customQuery,
  filterMap,
  sortingCol,
  currentPage,
  pageSize,
  noParams = false,
  noPagination = false,
}) => {
  let query =
    (noParams ? '&' : '?') +
    (noPagination
      ? 'no_paginate=1&is_excel=1'
      : `page=${Number(currentPage) - 1}&size=${pageSize}`);

  let filters = '';
  const filterItems = [];

  if (filterMap.size > 0) {
    filters += '&filters=[';

    Array.from(filterMap).forEach(([key, obj]) => {
      if (
        obj.action === filterActions.CONTAINS ||
        obj.action === filterActions.EQUALS
      ) {
        filterItems.push(`["${key}", "${obj.action}", "${obj.filtering}"]`);
      }

      if (obj.action === filterActions.THAN_EQUAL) {
        const min = obj.filtering && `["${key}", ">=", "${obj.filtering}"]`;
        const max = obj.filteringTo && `["${key}", "<=", "${obj.filteringTo}"]`;

        filterItems.push(min + (min && max && ',') + max);
      }

      if (obj.action === filterActions.IN_RANGE) {
        filterItems.push(
          `["${key}", "${obj.action}", ["${obj.filtering}","${obj.filteringTo} 23:59:59%2B08:00"]]`
        );
      }
    });

    filters += String(filterItems) + ']';
  }

  const sortKey = Object.keys(sortingCol)[0];
  const sortType = sortingCol[sortKey];

  switch (sortType) {
    case 'asc':
      query += `&sort=${sortKey}`;
      break;
    case 'desc':
      query += `&sort=-${sortKey}`;
      break;

    default:
      break;
  }

  query += customQuery && `&${customQuery}`;

  return query + filters;
};

/* ============ CALENDAR API ============================================================ */
export const weekToMGL = ({ day, isShort = false }) => {
  switch (String(day).toLowerCase()) {
    case 'monday':
      return isShort ? 'Да' : 'Даваа';
    case 'tuesday':
      return isShort ? 'Мя' : 'Мягмар';
    case 'wednesday':
      return isShort ? 'Лх' : 'Лхагва';
    case 'thursday':
      return isShort ? 'Пү' : 'Пүрэв';
    case 'friday':
      return isShort ? 'Ба' : 'Баасан';
    case 'saturday':
      return isShort ? 'Бя' : 'Бямба';
    case 'sunday':
      return isShort ? 'Ня' : 'Ням';
    default:
      return '';
  }
};

export const generatePlanbyWeeks = (date) => {
  const _date = moment(date);
  const daysInMonth = moment(date).daysInMonth();

  const weeks = {};
  const intervals = {};

  let weekIndex = 1;

  /* daysInMonth хүртэл явж, 7 хоногийн дараалал бүрдүүлнэ */
  for (let day = 0; day < daysInMonth; day += 7) {
    const weekDays = []; // 7 хоногийн өдөр (дугаар) хадгалах массив

    /* 7 хоногт байх өдөр бүрийг нэмж, "day + i" нь тухайн 7 хоногийн өдөр */
    for (let i = 0; i < 7 && day + i < daysInMonth; i++) {
      weekDays.push(String(day + i + 1).padStart(2, '0')); // хоногийн дугаар
    }

    const weekStart = _date.clone().set({ date: 1 }).add(day, 'days');
    const weekEnd = weekStart.clone().add(weekDays.length - 1, 'days');

    weeks[weekIndex] = weekDays;
    intervals[weekIndex] =
      weekStart.format('MM/DD') + ' ~ ' + weekEnd.format('MM/DD');

    weekIndex++;
  }

  return { weeks, intervals };
};

const getCalendarNormalAPI = (mainAPI, defaultFilter, onTable) => {
  if (onTable) {
    return mainAPI + (defaultFilter ? `?&filters=[${defaultFilter}]` : '');
  }

  return mainAPI + (defaultFilter ? `?filters=[${defaultFilter}]` : '');
};

export const getOrderCalenderAPI = ({
  defaultFilter,
  subFilter,
  filterEmployees,
  filterService,
  onTable = false,
}) => {
  const _defaultFilter = defaultFilter ? defaultFilter + ',' : '';

  let mainAPI = `${apiList.order}/list`;
  let empFilter = '';
  let serFilter = '';

  if (filterEmployees?.length > 0 && filterService) {
    empFilter = `["employeeId","IN",[${filterEmployees.map(
      (item) => `"${item}"`
    )}]]`;

    serFilter = `["serviceIds","LIKE","${filterService}"]`;

    mainAPI =
      mainAPI +
      `?${
        onTable ? '' : ''
      }filters=[${_defaultFilter}${empFilter},${serFilter}]`;
  } else if (filterService && !filterEmployees?.length > 0) {
    serFilter = `["serviceIds","LIKE","${filterService}"]`;

    mainAPI =
      mainAPI + `?${onTable ? '' : ''}filters=[${_defaultFilter}${serFilter}]`;
  } else if (filterEmployees?.length > 0 && !filterService) {
    empFilter = `["employeeId","IN",[${filterEmployees.map(
      (item) => `"${item}"`
    )}]]`;

    mainAPI =
      mainAPI + `?${onTable ? '' : ''}filters=[${_defaultFilter}${empFilter}]`;
  } else {
    mainAPI = getCalendarNormalAPI(mainAPI, defaultFilter, onTable);
  }

  if (subFilter) {
    mainAPI = mainAPI + subFilter;
  }

  return mainAPI;
};
