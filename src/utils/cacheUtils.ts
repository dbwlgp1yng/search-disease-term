const now = new Date().getTime();

// 데이터를 세션 스토리지에 저장하고 만료 시간(분)을 설정하는 함수
export const setSessionStorageWithExpiry = <T>(key: string, data: T, expiryInMinutes: number) => {
  const expiryTime = now + expiryInMinutes * 60 * 1000;
  const item = {
    data: data,
    expiry: expiryTime,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
  setTimeout(() => {
    sessionStorage.removeItem(key);
  }, expiryInMinutes * 60 * 1000);
};

// 세션 스토리지에서 데이터를 가져오고 만료 여부를 체크하는 함수
export const getSessionStorageWithExpiry = (key: string) => {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  if (now > item.expiry) {
    sessionStorage.removeItem(key);
    return null;
  }
  return item.data;
};
