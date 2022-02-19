const diffBetweenTwoObjects = (function () {
  return {
    map: function (old, current) {
      for (const [key, value] of Object.entries(current)) {
        if (old.hasOwnProperty(key)) {
          if (
            (this.isObject(value) || this.isValue(value)) &&
            JSON.stringify(old[key]) === JSON.stringify(value)
          ) {
            delete current[key];
          }
          if (this.isObject(value)) {
            this.map(old[key], value);
          }
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
