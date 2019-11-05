export function importAll(r: any) {
  return r.keys().map(r);
}

/**
 * Get Wilaya name and shipping price out of wilaya
 * @param wilaya `String`
 * @param defaultPrice `Number`
 */
export function parseWilayaShipping(
  wilaya: string,
  defaultPrice?: number
): [string, (number | null)] {
  const wilayaName = wilaya.substring(0, wilaya.indexOf("("));
  let price = wilaya
    .replace(wilayaName, "")
    .replace("(", "")
    .replace(")", "");
  if (isNaN(parseInt(price))) return [wilayaName, defaultPrice || null];
  else return [wilayaName, parseInt(price)];
}

export function randomTimeKey(): string {
  const random = Math.floor(Date.now() + Math.random()).toString();

  return random.substr(random.length - 6);
}
