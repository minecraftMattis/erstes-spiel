def setzeSpringen():
    global stehen, springen, ducken
    stehen = False
    springen = True
    ducken = False
def setzeDucken():
    global stehen, springen, ducken
    stehen = False
    springen = False
    ducken = True

def on_button_pressed_a():
    if ende == False:
        setzeDucken()
        led.unplot(0, 2)
        led.unplot(0, 3)
        led.plot(0, 4)
        basic.pause(2000)
        led.plot(0, 3)
        setzeStehen()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    if ende == False:
        setzeStehen()
        led.plot(0, 4)
        led.plot(0, 3)
        led.unplot(0, 2)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    if ende == False:
        setzeSpringen()
        led.plot(0, 2)
        led.plot(0, 3)
        led.unplot(0, 4)
        basic.pause(2000)
        led.unplot(0, 2)
        led.plot(0, 4)
        setzeStehen()
input.on_button_pressed(Button.B, on_button_pressed_b)

def gegnerGetroffen():
    if gegnerY == 2 and gegnerX == 0:
        return springen == True
    elif gegnerY == 3 and gegnerX == 0:
        return springen == True or stehen == True
    elif gegnerY == 4 and gegnerX == 0:
        return ducken == True or stehen == True
    else:
        return False
def setzeStehen():
    global stehen, springen, ducken
    stehen = True
    springen = False
    ducken = False
zufall = 0
gegnerY = 0
ducken = False
springen = False
stehen = False
ende = False
gegnerX = 0
gegnerX = 5
gegnerDa = False
ende = False
setzeStehen()
basic.show_leds("""
    . . . . .
    . . . . .
    . . . . .
    # . . . .
    # . . . .
    """)
geschwindigkeit = 1000

def on_forever():
    global ende
    if gegnerGetroffen() and ende == False:
        ende = True
        basic.show_icon(IconNames.ANGRY)
        music.play(music.tone_playable(330, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(175, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
basic.forever(on_forever)

def on_forever2():
    global gegnerX, gegnerDa, geschwindigkeit, gegnerY
    if ende == False:
        if gegnerDa == True:
            led.unplot(gegnerX, gegnerY)
            gegnerX += -1
            led.plot(gegnerX, gegnerY)
            if gegnerX < 0:
                gegnerDa = False
                geschwindigkeit += -50
            basic.pause(1000)
        if gegnerDa == False and zufall > 0:
            gegnerY = zufall
            gegnerX = 4
            led.plot(gegnerX, gegnerY)
            gegnerDa = True
            basic.pause(geschwindigkeit)
basic.forever(on_forever2)

def on_forever3():
    global zufall
    zufall = randint(2, 4)
    basic.pause(100)
basic.forever(on_forever3)
