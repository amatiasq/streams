/**
 * @returns {Promise<Array>}
 */
export default function toArray() {
  var result = [];

  return new Promise((resolve, reject) => {
    this.subscribe(
      value => result.push(value),
      reject,
      () => resolve(result)
    );
  });
}
