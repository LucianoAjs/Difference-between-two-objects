const diffBetweenTwoObjects = (function () {
  return {
    keysToDiff: [],
    map: function (old, current) {
      for (const [key, value] of Object.entries(current)) {
        if (old.hasOwnProperty(key)) {
          if (this.isObject(value)) {
            this.map(old[key], value);
            if (JSON.stringify(old[key]) !== JSON.stringify(value)) {
              this.keysToDiff.push(key);
            }
          }
          if (this.isValue(value)) {
            if (value !== old[key]) {
              this.keysToDiff.push(key);
            }
          }
        } else {
          this.keysToDiff.push(key);
        }
      }
      return this.keysToDiff;
    },
    compactObjectByKey: function (old, current) {
      this.keysToDiff = [];
      this.map(old, current);

      for (const key of Object.keys(current)) {
        if (this.keysToDiff.includes(key)) {
          if (this.isObject(current[key]) && !this.isArray(current[key])) {
            this.compactObjectByKey(old[key], current[key]);
          }
        } else {
          delete current[key];
        }
      }

      return current;
    },
    isArray: function (x) {
      return Array.isArray(x);
    },
    isObject: function (x) {
      return typeof x === 'object';
    },
    isValue: function (x) {
      return !this.isArray(x) && !this.isObject(x);
    },
  };
})();
