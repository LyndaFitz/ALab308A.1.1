// Declare a global counter variable //
let counter = 2;

// Create a simple function that increments the variable
// And then calls itself recursively 

function incrementCounter() {
    counter = counter + 1;  
    console.log(counter);  
    if (counter < 10) {  
        incrementCounter();  // Call the function again (recursively)
    }
}

// Surround the intial function by a try/catch
try {
    incrementCounter();
} catch(error) {
    console.error("Stack overflow or other error occured:", error);}

// Within the catch, log the error and the value of the counter variable
try {
    incrementCounter(); 
} catch (error) {
    console.error("Error occurred:", error);  // Logging the error
    console.log("Counter value at the time of error:", counter);  // Log the value of the counter
}

// PART 2 ------------------------------------------------->
// Trampolines
// Writing a recursive function that compeltely flattens an array 

function flattenArray(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // Recursively flatten any nested arrays
            result = result.concat(flattenArray(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

const nestedArray = [1, [2, [3, [4, 5]]], 6];
console.log(flattenArray(nestedArray));  // Output: [1, 2, 3, 4, 5, 6]



// Trampoling the Recursive Function 
function trampoline(fn) {
    while (typeof fn === 'function') {
        fn = fn();  // Execute the function and reassign `fn` to whatever the function returns
    }
    return fn;
}

function flattenArrayTrampolined(arr) {
    let result = [];
    let index = 0;

    function step() {
        if (index >= arr.length) return result;  // Base case: no more items to process
        if (Array.isArray(arr[index])) {
            // If the current item is an array, return a function to flatten it
            return () => {
                let nestedResult = flattenArrayTrampolined(arr[index]);
                result = result.concat(nestedResult);
                index++;
                return step();  // Continue processing
            };
        } else {
            // If it's not an array, add the value to the result
            result.push(arr[index]);
            index++;
            return step();  // Continue processing
        }
    }

    return step;  // Return the first function call
}

// PART 3

// Utility function to check if a number is prime
function isPrime(num) {
    if (num < 2) return false;  // 0 and 1 are not prime numbers
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to calculate and add prime numbers to the HTML element
function displayPrimeNumbers(n) {
    const container = document.getElementById('primeNumbers');  // Get the div element
    let primes = [];

    // Function to find prime numbers and display them with deferred execution
    function findNextPrime(i) {
        if (i > n) {
            // Once done, show an alert indicating the calculation is finished
            alert('Prime number calculation finished!');
            return;  // Stop the recursion when i exceeds n
        }

        if (isPrime(i)) {
            primes.push(i);  // Add prime number to the array
            // Use setTimeout with 0 to allow the browser to render each prime
            setTimeout(() => {
                container.innerHTML += `${i} `;  // Display the prime in the div
            }, 0);
        }

        // Call the next iteration
        setTimeout(() => findNextPrime(i + 1), 0);
    }

    // Start with the number 2
    findNextPrime(2);
}

// Run the function with n = 10,000
displayPrimeNumbers(10000);
