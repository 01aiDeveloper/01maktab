const tg = {
  token: '8681761590:AAEy4tpTPsxKwxCuITTVXhyNMAlsB4dzMiY',
  chat_id: '-1003860585930',
};

export interface IMessage {
  name: string;
  phone: string;
  message?: string;
}

export function sendMessage(data: IMessage) {
  const currentDate = new Date();
  const message =
    '👤 Ismi: ' + data.name +
    '\n\n📞 Tel: ' + data.phone +
    (data.message ? '\n\n💬 Xabar: ' + data.message : '') +
    '\n\n🕐 Vaqti: ' + currentDate.toLocaleString('uz-UZ');

  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${encodedMessage}`;

  try {
    const xht = new XMLHttpRequest();
    xht.onreadystatechange = function () {
      if (xht.readyState === XMLHttpRequest.DONE) {
        if (JSON.parse(xht.responseText).ok) {
          return { message: true };
        }
      }
    };
    xht.open('GET', url);
    xht.send();
    return { message: "So'rovingiz qabul qilindi", success: true };
  } catch {
    return { success: false, message: 'Qandaydir hatolik bor' };
  }
}

export function sendEmail(email: string) {
  const currentDate = new Date();
  const message =
    '💬 Email: ' + email +
    '\n\n🕐 Vaqti: ' + currentDate.toLocaleString('uz-UZ');

  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${encodedMessage}`;

  try {
    const xht = new XMLHttpRequest();
    xht.onreadystatechange = function () {
      if (xht.readyState === XMLHttpRequest.DONE) {
        if (JSON.parse(xht.responseText).ok) {
          return { message: true };
        }
      }
    };
    xht.open('GET', url);
    xht.send();
    return { message: "So'rovingiz qabul qilindi", success: true };
  } catch {
    return { success: false, message: 'Qandaydir hatolik bor' };
  }
}
