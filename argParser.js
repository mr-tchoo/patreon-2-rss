function parseArgs() {
    // Initialize arrays to store creators and key-value pairs
    const creators = [];
    const options = {};

    // Iterate through command line arguments starting from index 2
    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];
        
        // Check if argument starts with "--" indicating a key-value pair
        if (arg.startsWith("--")) {
            // Split the argument by the "=" character
            const keyValue = arg.substring(2).split("=");
            
            // Check if a value is provided after the "=" character
            if (keyValue.length === 2) {
            const key = keyValue[0];
            const value = keyValue[1];
            options[key] = value;
            } else {
            // Handle the case when there is no value provided after "="
            console.log(`Invalid argument format: ${arg}`);
            }
        } else {
            // Argument doesn't start with "--", so it's a standalone value
            creators.push(arg);
        }
    }

    return [
        creators,
        options,
    ];

}

module.exports = parseArgs;