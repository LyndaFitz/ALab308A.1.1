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



