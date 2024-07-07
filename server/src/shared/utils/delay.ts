export async function delay(time: number = 1000) {
  return new Promise((res, _) => setTimeout(res, time));
}
