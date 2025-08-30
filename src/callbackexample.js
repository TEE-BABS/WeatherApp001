function task1(callback) {
    setTimeout(() => {
        console.log("Task 1 finsihed")
        callback()
    }, 2000)
}

function task2(callback) {
    setTimeout(() => {
        console.log("Task 2 finsihed")
        callback()
    }, 3000)
}

function task3(callback) {
    setTimeout(() => {
        console.log("Task 3 finsihed")
        callback()
    }, 1000)
}

task1(() => {
    task2(() => {
        task3(() => {
            console.log("All tasks completed!!!")
        })
    })
})

