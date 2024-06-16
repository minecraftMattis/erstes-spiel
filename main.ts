input.onButtonPressed(Button.A, function () {
    led.unplot(0, 2)
    led.unplot(0, 3)
    led.plot(0, 4)
    basic.pause(4000)
    led.plot(0, 3)
})
input.onButtonPressed(Button.AB, function () {
    led.plot(0, 4)
    led.plot(0, 3)
    led.unplot(0, 2)
})
input.onButtonPressed(Button.B, function () {
    led.plot(0, 3)
    led.plot(0, 2)
    led.unplot(0, 4)
    basic.pause(2000)
    led.plot(0, 4)
    led.unplot(0, 2)
})
let zufall = 0
let gegnerY = 0
let gegnerX = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    # . . . .
    # . . . .
    `)
let gegnerDa = false
let ende = false
let geschwindigkeit = 1000
basic.forever(function () {
    if (ende == false) {
        for (let index = 0; index < 4; index++) {
            if (gegnerDa == true) {
                led.unplot(gegnerX, gegnerY)
                gegnerX += -1
                led.plot(gegnerX, gegnerY)
                basic.pause(1000)
            }
        }
        if (gegnerDa == true) {
            led.unplot(gegnerX, gegnerY)
            basic.pause(1000)
            gegnerDa = false
        }
        if (gegnerDa == false) {
            gegnerY = zufall
            gegnerX = 4
            led.plot(gegnerX, gegnerY)
            gegnerDa = true
            basic.pause(geschwindigkeit)
        }
    }
})
basic.forever(function () {
    zufall = randint(3, 4)
    basic.pause(100)
})
