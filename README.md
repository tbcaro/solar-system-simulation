# Solar System - CIS 377 Assignment 5 (Graphics)

For the Cube assignment I created a 3D simulation of the solar system.

To do this I leveraged a 3D javascript library called threejs.
link: https://threejs.org/

The simulation features a central star to mimic our own Sun (sol),
all 8 planets and the outermost dwarf planet Pluto, and allows the
user to rotate using the left-mouse button, pan with the right mouse
button, and zoom with the scroll wheel.

The planets have rotational velocity as well as orbital velocity and revolve
around the central 'Sun'.

For simplification purposes all planets orbit on the same plane (y = 0).
The simulation is also simplified with numbers being educated estimates as
well as some relative rounding considering the great size and distance discrepencies.
This model is not meant to 100% accurately portray the solar system.

To find the relative numbers for the planetary data used in the simulation,
I used the popular online resource Wikipedia.
links:
- https://en.wikipedia.org/wiki/Mercury_(planet)
- https://en.wikipedia.org/wiki/Venus
- https://en.wikipedia.org/wiki/Earth
- https://en.wikipedia.org/wiki/Mars
- https://en.wikipedia.org/wiki/Jupiter
- https://en.wikipedia.org/wiki/Saturn
- https://en.wikipedia.org/wiki/Uranus
- https://en.wikipedia.org/wiki/Neptune

To determine the appropriate color that I wanted to use for each planet, I used
the site color-hex for the pallete.
link: http://www.color-hex.com/

I derived much inspiration from an existing solar system codepen I found.
link: https://codepen.io/cl4ws0n/pen/eJjQzx
