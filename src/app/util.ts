export default class Util {
    /**
     * Taken from: https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h     The hue
     * @param   {number}  s     The saturation
     * @param   {number}  l     The lightness
     * @return  {Array}         The RGB representation
     */
    static HSL2RGB(h: number, s: number, l: number): Array<number> {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = Util.HUE2RGB(p, q, h + 1 / 3);
            g = Util.HUE2RGB(p, q, h);
            b = Util.HUE2RGB(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    /**
     * Used with the HSL2RGB function
     * @param {number}  p 
     * @param {number}  q 
     * @param {number}  t 
     * @return {number}     A component value between 0 and 1
     */
    static HUE2RGB(p, q, t): number {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    /**
     * Turns a value from 0-255 into its appropriate hex code
     * @param {number} c    Number between 0-255
     * @return {string}     A hex code derrived from a single color component value
     */
    static Component2Hex(c: number): string {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    /**
     * Turns RGB components into a Hex code
     * @param {number} r    Number between 0-255
     * @param {number} g    Number between 0-255
     * @param {number} b    Number between 0-255
     * @return {string}     A hex code derrived from RGB values
     */
    static RGB2Hex(r: number, g: number, b: number) {
        return "#" + Util.Component2Hex(r) + Util.Component2Hex(g) + Util.Component2Hex(b);
    }
    
    /*
    * @param   {number}  h     The hue
    * @param   {number}  s     The saturation
    * @param   {number}  l     The lightness
    * @return  {Array}         The RGB representation
    */ 
    static HSL2Hex(h: number, s: number, l: number): string {
        const rgb = Util.HSL2RGB(h, s, l);
        return Util.RGB2Hex(rgb[0], rgb[1], rgb[2]);
    }
}