document.getElementById('fibonacciForm').addEventListener('submit', (event)=> {
    event.preventDefault();
    const numberInput = document.getElementById('numberInput').value;
    const resultDiv = document.getElementById('result');
    try {
        const n = parseInt(numberInput, 10);
        const fibonacciNumber = fibonacci(n);
        resultDiv.innerHTML = `n-е число в последовательности Фибоначчи: ${fibonacciNumber}`;
    } catch (error) {
        console.log("error ", error.message);
    }
});

function fibonacci(n) {
    if (n === 1) {
        return 0;
    }
    if (n === 2) {
        return 1;
    }

    let a = 0, b = 1;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}