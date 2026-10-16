export async function asyncDelay(milli: number = 0, verbose = false) {
  if (milli <= 0) return;
  if (verbose) {
    console.log(`Delaying for ${milli / 1000} seconds.`);
  }
  await new Promise(resolve => setTimeout(resolve, milli));
}
