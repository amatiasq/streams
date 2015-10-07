/**
 * @returns {Promise<null>}
 */
export default function toPromise() {
  return new Promise(
    (resolve, reject) => this.subscribe(null, reject, resolve)
  );
}
