export function setWithExpiry(key: string, value: string, ttl: number) {
  const item = {
    value: btoa(value),
    expiry: ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}


export function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return atob(item.value);
}

