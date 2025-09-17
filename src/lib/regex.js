export const onlyNumberRegex = (length) => {
  return {
    regex: new RegExp(`^\\d{${length}}$`),
    msg: `${length} ширхэг тоо бичнэ үү`,
  };
};

export const facebookRegex = {
  regex:
    /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com|fb\.me|fb\.watch|m\.facebook\.com)\/.*/,
  msg: 'Зөвхөн Facebook хаяг бичнэ үү',
};

export const instagramRegex = {
  regex: /^(https?:\/\/)?(www\.)?(instagram\.com|m\.instagram\.com)\/.*/,
  msg: 'Зөвхөн Instagram хаяг бичнэ үү',
};

export const webRegex = {
  regex: /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/,
  msg: 'Зөв линк бичнэ үү',
};

export const passwordRegex = {
  regex:
    /^(?=.*[\W_])(?=.*\d)(?=.*[A-Z])[A-Za-z0-9!@#%^&*()_+{}[\]:;<>,.?/~`'"\-|=№₮¥$\\]*$/,
  msg: 'Ядаж 1 том үсэг, жижиг үсэг, тоо, тусгай тэмдэгт ашиглана уу',
};

export const nameUppercaseRegex = {
  regex: /^[А-ЯӨҮЁ]{1}[а-яөүё]*(-[А-ЯӨҮЁ]{1}[а-яөүё]*)?$/,
  msg: 'Эхний үсгийг томоор бичнэ үү (Анар, Амарсанаа, Сэр-Од)',
};

export const nameCyrillicRegex = {
  regex: /^[а-яА-ЯөӨүҮёЁ-\s]*$/,
  msg: 'Зөвхөн кириллээр бичнэ үү',
};

export const registerRegex = {
  regex: /^[А-ЯӨҮ]{2}\d{8}$/,
  msg: 'Эхний 2 үсгийг томоор, 8 ширхэг тоо бичнэ үү',
};

export const emailRegex = {
  regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  msg: 'Зөв форматаар бичнэ үү',
};

export const cyrillicRegex = {
  regex: /^[а-яА-ЯөӨүҮёЁ_.?,\s]+$/,
  msg: 'Зөвхөн кирилл үсэг ашиглана уу',
};

export const cyrillicNumberSymbolsRegex = {
  regex: /^[а-яА-ЯөӨүҮёЁ0-9,-@:%,._+~#=[\]"/!$^&*(){};<>/'`|\\?№₮¥,\s]*$/,
  msg: 'Зөвхөн крилл үсэг болон тоо, тусгай тэмдэгт ашиглана уу',
};
