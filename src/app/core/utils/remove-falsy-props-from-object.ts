export const removeFalsyPropValueFromObject = <T extends object>(obj: T): object => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === null || obj[prop] === undefined || ((obj[prop] as unknown) as keyof T) === 0) {
        delete obj[prop];
      }
    }
  }
  return obj;
};
