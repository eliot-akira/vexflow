import { Element } from './element';
import { StaveNote } from './stavenote';
/**
 * PedalMarking implements different types of pedal markings. These notation
 * elements indicate to the performer when to depress and release the a pedal.
 *
 * In order to create "Sostenuto", and "una corda" markings, you must set
 * custom text for the release/depress pedal markings.
 */
export declare class PedalMarking extends Element {
    /** To enable logging for this class. Set `VexFlow.PedalMarking.DEBUG` to `true`. */
    static DEBUG: boolean;
    static get CATEGORY(): string;
    protected line: number;
    protected type: number;
    protected customDepressText: string;
    protected customReleaseText: string;
    renderOptions: {
        color: string;
        bracketHeight: number;
        textMarginRight: number;
        bracketLineWidth: number;
    };
    protected notes: StaveNote[];
    /** Glyph data */
    static readonly GLYPHS: Record<string, string>;
    /** Pedal type as number. */
    static readonly type: {
        TEXT: number;
        BRACKET: number;
        MIXED: number;
    };
    /** Pedal type as string. */
    static readonly typeString: Record<string, number>;
    /**
     * Create a sustain pedal marking. Returns the defaults PedalMarking.
     * Which uses the traditional "Ped" and "*"" markings.
     */
    static createSustain(notes: StaveNote[]): PedalMarking;
    /** Create a sostenuto pedal marking */
    static createSostenuto(notes: StaveNote[]): PedalMarking;
    /** Create an una corda pedal marking */
    static createUnaCorda(notes: StaveNote[]): PedalMarking;
    constructor(notes: StaveNote[]);
    /** Set pedal type. */
    setType(type: string | number): this;
    /**
     * Set custom text for the `depress`/`release` pedal markings. No text is
     * set if the parameter is falsy.
     */
    setCustomText(depress: string, release?: string): this;
    /** Set the staff line to render the markings on. */
    setLine(line: number): this;
    /** Draw the bracket based pedal markings. */
    drawBracketed(): void;
    /**
     * Draw the text based pedal markings. This defaults to the traditional
     * "Ped" and "*"" symbols if no custom text has been provided.
     */
    drawText(): void;
    /** Render the pedal marking in position on the rendering context. */
    draw(): void;
}
