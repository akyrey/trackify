/***
 * Custom wrapper for LocalStorage accessing
 */
export class LocalStorage {
  /***
   * Manage data, obfuscate and save to localStorage.
   *   If data is empty, undefined or null deletes the key
   *
   * @param {string} key
   * @param data
   */
  static setKey(key: string, data: any): void {
    if (data !== 0 && typeof data !== 'boolean' && !data) {
      this.dropKey(key);
    } else {
      let theData = '';
      if (typeof data === 'object') {
        theData = JSON.stringify(data);
      } else {
        theData = data;
      }
      theData = this.genHash(key) + btoa(theData);

      localStorage.setItem(key, theData);
    }
  }

  /***
   * Delete key:value pair with the given key from localstorage
   *
   * @param {string} key
   */
  static dropKey(key: string): void {
    localStorage.removeItem(key);
  }

  /***
   * Get saved data, deobfuscate and then return the original value as object or string
   *
   * @param {string} key
   * @returns {string}
   */
  static getKey(key: string): any {
    let data: string | null = localStorage.getItem(key);

    if (data) {
      data = data.substr(key.length);
      data = atob(data);

      try {
        return JSON.parse(data);
      } catch (ex) {
        return data;
      }
    }

    return data;
  }

  /***
   * Generate an hash based on key length
   *
   * @param {string} key
   * @returns {string}
   */
  static genHash(key: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let hash = '';

    while (hash.length < key.length) {
      hash += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return hash;
  }
}
