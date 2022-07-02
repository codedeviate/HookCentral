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
       HookCentral.mutate("test", "Whazzup");
     }
     const sendGlobalTest = () => {
       HookCentral.globalMutate("test", "Whazzup from far away", false);
     }
     const sendTest = () => {
       HookCentral.globalMutate("test", "Whazzup to all of you", true);
     }
   </script>
  </body>
 </html>
```
