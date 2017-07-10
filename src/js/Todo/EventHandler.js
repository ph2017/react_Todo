var EventHandler = (function() {
        //events存储事件及回调函数对象，例：
        //{event1:[{handler:handler1},{handler:handler2}], event2:[{handler:handler1},{handler:handler2}]}
        var events = {};

        function on(event, handler) {
            var exitEvent = events.hasOwnProperty(event);
            if (exitEvent) {
                events[event].push({
                    'handler': handler
                });
            } else {
                events[event] = [{
                    'handler': handler
                }];

            }
        }

        function fire(event, args) {
            var exitEvent = events.hasOwnProperty(event);
            if (exitEvent) {
                for (var i = 0, len = events[event].length; i < len; i++) {
                    events[event][i].handler(args);
                }
            } else {
                console.log('no event(' + event + ') exist');
            }
        }

        function off(event) {
            var exitEvent = events.hasOwnProperty(event);
            if (exitEvent) {
                delete events[event];
            }
        }

        function one(event, callback) {
            on(event, function() {
                callback();
                off(event);
            })
        }

        return {
            on: on,
            fire: fire,
            off: off,
            one: one
        }
    })();

    export default EventHandler