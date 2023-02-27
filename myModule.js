//myModule.js

// Define a function called `getDate` which exports the current date with specified format options
exports.getDate = function() {
  // Create a new `Date` object to represent the current date and time
  const today = new Date();

  // Create an options object to specify the format for the date string
  const options = {
    weekday: 'long', // Display the full weekday name (e.g. "Monday")
    day: 'numeric', // Display the day of the month as a number (e.g. "1")
    month: 'long' // Display the full month name (e.g. "January")
  };

  // Use the `toLocaleDateString` method to format the date according to the specified options
  // The first argument "en-US" specifies the locale to use for formatting
  return today.toLocaleDateString("en-US", options);
};





// Define a function called `getDay` which exports the current day with specified format options
exports.getDay = function() {
  // Create a new `Date` object to represent the current date and time
  const today = new Date();

  // Create an options object to specify the format for the day string
  const options = {
    weekday: 'long' // Display the full weekday name (e.g. "Monday")
  };

  // Use the `toLocaleDateString` method to format the day according to the specified options
  // The first argument "en-US" specifies the locale to use for formatting
  return today.toLocaleDateString("en-US", options);
};

   

   
   

