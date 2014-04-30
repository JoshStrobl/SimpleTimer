# SimpleTimer

## About

SimpleTimer is a lightweight (*as in 2kb compressed*) Javascript timer "framework" written in [Typescript](http://typescriptlang.org) that abstracts setInterval and setTimeout functionality. SimpleTimer allows you to:

1. Create autostarting or non-autostarting timers.
2. Have a timer that runs only once.
3. Start, pause, stop your timer on the fly

### Download

You can [download the files](https://github.com/JoshStrobl/SimpleTimer/zipball/master), run the test(s), etc.

### License

SimpleTimer is licensed under the Apache v2 License.

## How can I help?

### Buy me a beer

Beer in Finland isn't really cheap. No really, the Finnish government has a rather high tax on alcohol. Want features? (*not really sure what...but I welcome ideas*) Feel free to buy me a beer. You can use [Gumroad](https://gum.co/upeo) to pitch in a couple dollars. You won't really get anything special in return, except my thanks.

### Other ways

File bug reports, post a discussion, share it on social networks. You can add me on [Google+](https://plus.google.com/+JoshuaStrobl) or follow me on [Twitter](https://twitter.com/JoshStrobl).

## Using SimpleTimer

The following options are available when defining / creating a timer:
```
"action" : Function (required) - The function that is executed per timer tick
"autostart" Boolean (not required, defaults to false) - Whether to autostart the timer or not
"duration" : Number (required) - The delay per tick in milliseconds
"once" : Boolean (not required, defaults to false) - Run the timer once
```

Example Timer construction:
```
var iLikeBacon = new SimpleTimer(
    {
        "action" : function(){
            console.log("I like bacon!");
        },
        "autostart" : true,
        "duration" : 5000
    }
);
```

In the timer above, we are executing an action every 5 seconds (5000ms) on a new SimpleTimer that has autostarted.

### Properties

Only one property so far:
```
timerActive : Boolean - Is the timer active
```

### Methods
```
start() - Start the timer
pause() - Pause the timer
restart() - Restart the timer
stop() - Stop the timer
```
