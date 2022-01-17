export async function sleep(ms: number = 300, silent: boolean = false) {
    return await new Promise(resolve => setTimeout(() => {
        if (!silent) {
            console.log(`sleep end (${ms} ms)`);
        }
        resolve(null)
    }, ms))
    // await new Promise((res) => setTimeout(() => res(null), 4000))
}
