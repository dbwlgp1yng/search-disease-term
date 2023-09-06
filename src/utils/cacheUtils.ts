export const setSessionStorageWithExpiry = <T>(key: string, data: T, expiryInMinutes: number) => {
  const now = new Date().getTime(); // 실행시점마다 현재 시간 다시 가져오기
  const expiryTime = now + expiryInMinutes * 60 * 1000; // 밀리초단위 변환
  const item = {
    data: data,
    expiry: expiryTime,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
  setTimeout(() => {
    sessionStorage.removeItem(key);
  }, expiryInMinutes * 60 * 1000);
};

export const getSessionStorageWithExpiry = (key: string) => {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date().getTime();
  if (now > item.expiry) {
    sessionStorage.removeItem(key);
    return null;
  }
  return item.data;
};