(function () {
    //Defining CSS
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '60%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 443,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#C6A62F',
        },
        stick1: {
            left: 0,
            top: 253
        },
        stick2: {
            left: 888.5,
            top: 253

        },
        score1Div: {
            width: 100,
            height: 100,
            background: '#ff0000',
            position: 'fixed',
            top: '50%',
            left: '15%',
        },
        score2Div: {
            width: 100,
            height: 100,
            background: '#ff0000',
            position: 'fixed',
            top: '50%',
            left: '75%',
        },
        score1Val: {
            color: 'white',
            fontSize: '50px',

        },
        score2Val: {
            color: 'black',
            fontSize: '50px'
        },

    };
    //Defining game logic global variables
    var CONSTS = {

        gameSpeed: 20,
        score1: 0,
        score2: 0,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 0,

    };
    //Checking localStorage
    function isResumable() {

        if (localStorage.getItem("score1") == null) {
            CONSTS.score1 = 0;
        } else {
            CONSTS.score1 = localStorage.getItem("score1");
        }
        if (localStorage.getItem("score2") == null) {
            CONSTS.score2 = 0;
        } else {
            CONSTS.score2 = localStorage.getItem("score2");
        }
    }

    //Start trigger
    function start() {
        isResumable();             //Controlling localStorage
        draw();                   //First setting up the game arena
        setEvents();             //Listening Events
        roll(0, 0); //Rolling the ball with starter conditions
        loop();                 //Getting into main game loop
    }
    //Drawing the scene
    function draw() {
        $('<div/>', {id: 'score1-div'}).css(CSS.score1Div).appendTo('body');
        $('<p/>', {id: 'score1-val'}).css(CSS.score1Val).appendTo('#score1-div').text(CONSTS.score1);
        $('<div/>', {id: 'score2-div'}).css(CSS.score2Div).appendTo('body');
        $('<p/>', {id: 'score2-val'}).css(CSS.score2Val).appendTo('#score2-div').text(CONSTS.score2);
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick))
            .appendTo('#pong-game');
        $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick))
            .appendTo('#pong-game');
    }
    //Listening events
    function setEvents() {

        $(document).on('keydown', function (e) {
            if (e.keyCode == 87) {
                if (CSS.stick1.top > 0) {
                    CONSTS.stick1Speed = -10;
                }
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = 0;
            }
        });
        $(document).on('keydown', function (e) {
            if (e.keyCode == 83) {
                if (CSS.stick1.top < 515) {
                    CONSTS.stick1Speed = +10;
                }
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 0;
            }
        });
        $(document).on('keydown', function (e) {
            if (e.keyCode == 38) {
                if (CSS.stick2.top > 0) {
                    CONSTS.stick2Speed = -10;
                }
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 38) {
                CONSTS.stick2Speed = 0;
            }
        });
        $(document).on('keydown', function (e) {
            if (e.keyCode == 40) {
                if (CSS.stick2.top < 515) {
                    CONSTS.stick2Speed = +10;
                }
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 0;
            }
        });

        /*  I was going to use this part to add an extra feature about saving game state with p but i decided to polish my core game then focusing on extra features.
            $(document).on('keydown', function (e) {
                    if (e.keyCode == 80) {

                        var cookie1 = "score1="+CONSTS.score1+";path=/http://corporate.lcwaikiki.com/hakkimizda"
                        var cookie2 = "score2="+CONSTS.score2+";path=/http://corporate.lcwaikiki.com/hakkimizda"

                        document.cookie = cookie1;
                        document.cookie = cookie2;
                        console.log('cookie1')
                        console.log('cookie2')
                        console.log('cookieSaved')


                    }
                });*/

    }
    //Our main game loop that controls stick and ball positions and plus collision check
    function loop() {

        window.pongLoop = setInterval(function () {

            if (CSS.stick1.top < 10) {
                CSS.stick1.top = 0
            }
            if (CSS.stick1.top > 515) {
                CSS.stick1.top = 515
            }
            if (CSS.stick2.top < 10) {
                CSS.stick2.top = 0
            }
            if (CSS.stick2.top > 515) {
                CSS.stick2.top = 515
            }

            if (CSS.stick1.top + CONSTS.stick1Speed < 0) {
                CSS.stick1.top = 0;
            } else if (CSS.stick1.top + CONSTS.stick1Speed > 515) {
                CSS.stick1.top = 515;
            } else {
                CSS.stick1.top += CONSTS.stick1Speed;
            }
            $('#stick-1').css('top', CSS.stick1.top);


            if (CSS.stick2.top + CONSTS.stick2Speed < 0) {
                CSS.stick2.top = 0;
            } else if (CSS.stick2.top + CONSTS.stick2Speed > 515) {
                CSS.stick2.top = 515;
            } else {
                CSS.stick2.top += CONSTS.stick2Speed;
            }
            $('#stick-2').css('top', CSS.stick2.top);


            if (CSS.ball.top + CONSTS.ballTopSpeed < 0) {
                CSS.ball.top = (CSS.ball.top + CONSTS.ballTopSpeed) * -1
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;

            } else if (CSS.ball.top + CONSTS.ballTopSpeed > CSS.arena.height - CSS.ball.height) {
                let lowestBallLocation = CSS.arena.height - CSS.ball.height;
                CSS.ball.top = 2 * lowestBallLocation - CSS.ball.top - CONSTS.ballTopSpeed
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;

            }
            CSS.ball.top += CONSTS.ballTopSpeed * 1.2;
            CSS.ball.left += CONSTS.ballLeftSpeed * 1.2;
            $('#pong-ball').css({top: CSS.ball.top, left: CSS.ball.left});
            $('#pong-ballt1').css({top: CSS.ball.top-5, left: CSS.ball.left-5});
            $('#pong-ballt2').css({top: CSS.ball.top-7, left: CSS.ball.left-7});

            if (CSS.ball.left <= CSS.stick.width) {
                CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || roll(0, ++CONSTS.score2);
            }

            if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
                CSS.ball.top > CSS.stick2.top && CSS.ball.top < CSS.stick2.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || roll(++CONSTS.score1, 0);
            }


        }, CONSTS.gameSpeed);
    }
//Rolling the ball, deciding the fate
    function roll(score1, score2) {

        localStorage.setItem("score1", score1);
        localStorage.setItem("score2", score2);
        $('#score1-val').text(CONSTS.score1)
        $('#score2-val').text(CONSTS.score2)

        /*
            Im not so sure about resetting positions so i am leaving this code commented
                CSS.stick1.top= 253;
                CSS.stick2.top= 253;
                                                     */

        if (score1 == 5 || score2 == 5) {
            if (score1 == 5) {
                confirm('Player One Won !')

            } else {
                confirm(`Player Two Won !`)

            }
            reset()
        } else {

            CSS.ball.top = 250;
            CSS.ball.left = 443;

            var side = -1;

            if (Math.random() < 0.5) {
                side = 1;
            }

            CONSTS.ballTopSpeed = Math.random() * -2 - 3;
            CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
        }

    }
//Resetting all making sure of a clear game
    function reset() {
        localStorage.setItem("score1", '0');
        localStorage.setItem("score2", '0');
        CONSTS.gameSpeed = 20;
        CONSTS.score1 = 0;
        CONSTS.score2 = 0;
        CONSTS.stick1Speed = 0;
        CONSTS.stick2Speed = 0;
        CONSTS.ballTopSpeed = 0;
        CONSTS.ballLeftSpeed = 0;
        CSS.stick1.top = 253;
        CSS.stick2.top = 253;
        $("#score1-div").remove();
        $("#score2-div").remove();
        $("#score1-val").remove();
        $("#score2-val").remove();
        $("#pong-game").remove();
        $("#pong-line").remove();
        $("#pong-ball").remove();
        clearInterval(window.pongLoop);
        start();
    }
//Lets start the engine !
    start();
})();