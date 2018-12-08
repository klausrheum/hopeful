function logIt(msg, meta, dest_override) {
  var redirectAll = ""; // or "" 
  
  if (meta === undefined) meta = {tag: "???", "dest": "L"};
  if (meta.dest === undefined) metadest = "L";
  if (dest_override !== undefined) meta.dest = dest_override;
  
  var output = {};
  output.text = meta.tag + "> " + msg; 
  output.dest = meta.dest;

  if (redirectAll != false) {
    output.dest = redirectAll;
  }
  
  if (output.dest == "L") {
    Logger.log(output.text);
  }
  
  if (output.dest == "C") {
    console.info(output.text);
  }
  
  return output;
}

/**
Logs the time taken to execute 'myFunction'.
https://developers.google.com/apps-script/guides/logging
https://developers.google.com/apps-script/reference/base/console 
*/

function measuringExecutionTime() {
  // A simple INFO log message, using sprintf() formatting.
  console.info('Timing the %s function (%d arguments)', 'myFunction', 1);

  // Log a JSON object at a DEBUG level. The log is labeled
  // with the message string in the log viewer, and the JSON content
  // is displayed in the expanded log structure under "structPayload".
  var parameters = {
      isValid: true,
      content: 'some string',
      timestamp: new Date()
  };
  console.log({message: 'Function Input', initialData: parameters});

  var label = 'myFunction() time'; // Labels the timing log entry.
  console.time(label); // Starts the timer.
  try {
    myFunction(parameters); // Function to time.
  } catch (e) {
    // Logs an ERROR message.
    console.error('myFunction() yielded an error: ' + e);
  }
  console.timeEnd(label); // Stops the timer, logs execution duration.
}

/* 
https://stackoverflow.com/questions/2031163/when-to-use-the-different-log-levels

  Trace - Only when I would be "tracing" the code and trying to find one part of a function specifically.
Y Debug / Log - Information that is diagnostically helpful to people more than just developers (IT, sysadmins, etc.).
Y Info - Generally useful information to log (service start/stop, configuration assumptions, etc). Info I want to always have available but usually don't care about under normal circumstances. This is my out-of-the-box config level.
Y Warn - Anything that can potentially cause application oddities, but for which I am automatically recovering. (Such as switching from a primary to backup server, retrying an operation, missing secondary data, etc.)
Y Error - Any error which is fatal to the operation, but not the service or application (can't open a required file, missing data, etc.). These errors will force user (administrator, or direct user) intervention. These are usually reserved (in my apps) for incorrect connection strings, missing services, etc.
  Fatal - Any error that is forcing a shutdown of the service or application to prevent data loss (or further data loss). I reserve these only for the most heinous errors and situations where there is guaranteed to have been data corruption or loss.
*/