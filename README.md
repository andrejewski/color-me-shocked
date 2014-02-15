color-me-shocked
================

a better color converter

![color-me-shocked screenshot](https://raw.github.com/andrejewski/color-me-shocked/master/dist/screenshot.png)

[See Color Me Shocked in Action](http://chrisandrejewski.com/project/color-me-shocked/)

Before color-me-shocked, I had to go to Google, type "rgb to hex" or "hex to rgb" or "hsv to cmyk." Then input my value and then hit "convert." That's like 4 steps. 3 steps too many. This got rather tedious and all the flipping back and forth was making me work too hard. With a peaking interest in color theory and a "kill tons of birds with one stone" attitude, I sat down to solve this problem. Simply put, color-me-shocked is a color converter that updates in real-time as you type into multiple color formats all at once. It isn't prefect but it is pretty cool to use and I'm satified with it.

## Details

Color-me-shocked supports the following color formats:
- Hexidecimal
- RGB (Red-Green-Blue)
- CMYK (Cyan-Magenta-Yellow-Black)
- HSV (Hue-Saturation-Value)
- Custom Formatting

Custom Formating uses %_ to denote color variables. Examples being:
- `#%x` which would yield `#ffffff`
- `rgb(%r,%g,%b)` which would yield `rgb(255,255,255)`
- `%c %m %y %k %h %s %v` which would yield something also

## Colophon

Color-me-shocked was developed using Backbone.js (and Underscore.js) and Handlebars. It is designed to be run, not only online, but offline. It requires no internet connection. The code is written in CoffeeScript. My reasoning for CoffeeScript is to allow this repository to serve as a learning resource as well as a tool for those who would like to improve it. The color conversion functions are written in a very abstract form (as close to Haskell as I could) as to be reproducible in other languages and just darn better to read. 

Thanks for using color-me-shocked. Or for at least reading this far down into the README.

Follow me on [twitter](http://twitter.com/compooter) and check-out my other [repositories](http://github.com/andrejewski) if I've earned it.
