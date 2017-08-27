export default function getUniqId(length) {
  let uniqId = '';
  let range = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    uniqId += range.charAt(Math.floor(Math.random() * range.length));

  return uniqId;
}
