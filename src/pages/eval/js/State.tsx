import { useCookies } from 'react-cookie';

interface PersistentStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: any) => void;
}

class LocalStorage implements PersistentStorage {
  getItem(key: string) {
    const item = localStorage.getItem(key);

    if (item === null) return undefined;

    if (item === 'null') return null;
    if (item === 'undefined') return undefined;

    try {
      return JSON.parse(item);
    } catch {}

    return item;
  }
  setItem(key: string, value: any) {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

class MockStorage implements PersistentStorage {
  getItem() {
    return null;
  }
  setItem() {}
}

const persistentStorage = window?.localStorage ? new LocalStorage() : new MockStorage();

const clearAll = () => {
  const [cookie, setCookie, removeCookie] = useCookies([
    'FosIsDemo',
    'IsFos_VFinished',
    'TestState',
    'IsFosFinished',
  ]);
  removeCookie('FosIsDemo');
  removeCookie('IsFos_VFinished');
  removeCookie('TestState');
  removeCookie('IsFosFinished');
  persistentStorage.setItem('allResults', null);
  persistentStorage.setItem('allResultsV', null);
  persistentStorage.setItem('curGroupID', null);
  persistentStorage.setItem('curGroupID_V', null);
};

export { persistentStorage, clearAll };
