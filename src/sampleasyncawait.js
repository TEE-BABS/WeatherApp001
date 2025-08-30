function completePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello2")
        }, 5000)
    })
}

function completePromise2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello4")
        }, 2000)
    })
}

async function main() {
    console.log("Hello1")
    console.log(await completePromise())
    console.log("Hello3")
    console.log(await completePromise2())
}
main()