# "OG" name generator
##### A generator for those horrible "OG" names

To preface, the code in this project is disgusting because I made in 30 minutes + 2 stupid hours for the skin renderer.
<sub><sup>(I've never used image buffers with canvases and ofc StackOverflow doesn't know how to use them either)</sup></sub>

The project structure is from Intellij Webstorm's Express generator, I used cause this was a stupid 30 minute project and
I'm not making an express site from scratch for that.

## Usage

1. Download or clone this repo
2. Run `node bin/www.js`
3. Navigate to `localhost:3000` in your browser
4. Insert name and select at least one of the "OG"-ifier features

You can also add any 1.8+ Minecraft skin under `public/images`

## Notes + License

I used the skin renderer from [Crafatar](https://github.com/crafatar/crafatar/blob/master/lib/renders.js)
(Which is licensed under MIT) - I wrote none of it

All skins in `public/images` are from [minecraftskins.com](https://minecraftskins.com), I just downloaded random sweaty
skins, I didn't take note of exactly which ones I downloaded.

If for some reason you decide to publicly use and display images/gifs of this project (why though?), please provide a link to this 
github page or at least credit me.

This project itself is licensed under GNU GPLv3.