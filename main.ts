input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        `)
})
input.onButtonPressed(Button.AB, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        # . . . .
        `)
})
input.onButtonPressed(Button.B, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        # . . . .
        # . . . .
        . . . . .
        `)
})
let gegner = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    # . . . .
    # . . . .
    `)
let gegnerDa = false
basic.forever(function () {
    if (gegnerDa == false) {
        gegner = randint(2, 4)
        led.plot(4, gegner)
        gegnerDa = true
    }
})
