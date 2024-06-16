function setzeSpringen () {
    stehen = false
    springen = true
    ducken = false
}
function setzeDucken () {
    stehen = false
    springen = false
    ducken = true
}
input.onButtonPressed(Button.A, function () {
    if (ende == false) {
        setzeDucken()
        led.unplot(0, 2)
        led.unplot(0, 3)
        led.plot(0, 4)
        basic.pause(2000)
        led.plot(0, 3)
        setzeStehen()
    }
})
input.onButtonPressed(Button.AB, function () {
    if (ende == false) {
        setzeStehen()
        led.plot(0, 4)
        led.plot(0, 3)
        led.unplot(0, 2)
    }
})
input.onButtonPressed(Button.B, function () {
    if (ende == false) {
        setzeSpringen()
        led.plot(0, 2)
        led.plot(0, 3)
        led.unplot(0, 4)
        basic.pause(2000)
        led.unplot(0, 2)
        led.plot(0, 4)
        setzeStehen()
    }
})
function gegnerGetroffen () {
    if (gegnerY == 2 && gegnerX == 0) {
        return springen == true
    } else if (gegnerY == 3 && gegnerX == 0) {
        return springen == true || stehen == true
    } else if (gegnerY == 4 && gegnerX == 0) {
        return ducken == true || stehen == true
    } else {
        return false
    }
}
function setzeStehen () {
    stehen = true
    springen = false
    ducken = false
}
let zufall = 0
let gegnerY = 0
let ducken = false
let springen = false
let stehen = false
let ende = false
let gegnerX = 0
gegnerX = 5
let gegnerDa = false
ende = false
setzeStehen()
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    # . . . .
    # . . . .
    `)
let geschwindigkeit = 1000
basic.forever(function () {
    if (gegnerGetroffen() && ende == false) {
        ende = true
        basic.showIcon(IconNames.Angry)
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(175, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
})
basic.forever(function () {
    if (ende == false) {
        if (gegnerDa == true) {
            led.unplot(gegnerX, gegnerY)
            gegnerX += -1
            led.plot(gegnerX, gegnerY)
            if (gegnerX < 0) {
                gegnerDa = false
                geschwindigkeit += -50
            }
            basic.pause(1000)
        }
        if (gegnerDa == false && zufall > 0) {
            gegnerY = zufall
            gegnerX = 4
            led.plot(gegnerX, gegnerY)
            gegnerDa = true
            basic.pause(geschwindigkeit)
        }
    }
})
basic.forever(function () {
    zufall = randint(2, 4)
    basic.pause(100)
})
