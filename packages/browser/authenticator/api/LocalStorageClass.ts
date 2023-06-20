class LocalStorageClass {
  domainName?: string;

  init(domainName: string) {
    this.domainName = domainName;
  }

  setItem(key: string, value: string) {
    if (typeof window !== "undefined")
      localStorage.setItem(`${this.domainName}_${key}`, value);
  }

  getItem(key: string) {
    try {
      if (typeof window !== "undefined")
        return localStorage.getItem(`${this.domainName}_${key}`);
      throw new Error("LocalStorage not initialized");
    } catch (error) {
      return undefined;
    }
  }

  removeItem(key: string) {
    if (typeof window !== "undefined")
      localStorage.removeItem(`${this.domainName}_${key}`);
  }
}

export default LocalStorageClass;
