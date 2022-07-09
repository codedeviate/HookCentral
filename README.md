# HookCentral
A simple centralized hook management that allows for communication both within a single page and between different instances through localStorage

## Usage
```html
 <!DOCTYPE html>
 <html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Simple test</title>
    <script type="text/javascript" src="../src/HookCentral.js"></script>
  </head>
  <body>
   <button onclick="sendLocalTest()">Local test</button>
   <button onclick="sendGlobalTest()">Global test</button>
   <button onclick="sendTest()">Test to all</button>
   <br />
   <div id="output"></div>
   <script>
     HookCentral.subscribe("test", (payload) => {
       const node = document.getElementById("output");
       node.innerText = node.innerText + "New incoming test event\nData: " + payload + "\n\n";
     });
     const sendLocalTest = () => {
       HookCentral.send("test", "Whazzup");
     }
     const sendGlobalTest = () => {
       HookCentral.globalSend("test", "Whazzup from far away", false);
     }
     const sendTest = () => {
       HookCentral.globalSend("test", "Whazzup to all of you", true);
     }
   </script>
  </body>
 </html>
```

## Methods

### subscribe(eventName)
Subscribe to the event defined by the eventName

### send(eventName, payload)
Send the payload as a local event tagged as eventName.

### globalSend(eventName, payload, sendLocal = true)
Send the payload as a global event tagged as eventName. If the sendLocal variable is set to true then the event is also sent as a local event (i.e. the same as using the send method)
