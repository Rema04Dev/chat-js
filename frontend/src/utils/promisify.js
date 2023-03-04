export default (fn) => (...args) => new Promise(
  (resolve, reject) => {
    fn(...args, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  },
);
