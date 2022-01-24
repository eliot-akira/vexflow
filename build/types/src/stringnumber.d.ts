import { FontInfo } from './font';
import { Modifier } from './modifier';
import { ModifierContextState } from './modifiercontext';
import { Note } from './note';
export declare class StringNumber extends Modifier {
    static get CATEGORY(): string;
    static TEXT_FONT: Required<FontInfo>;
    static format(nums: StringNumber[], state: ModifierContextState): boolean;
    radius: number;
    protected last_note?: Note;
    protected string_number: string;
    protected x_offset: number;
    protected y_offset: number;
    protected dashed: boolean;
    protected leg: number;
    constructor(number: string);
    setLineEndType(leg: number): this;
    setStringNumber(number: string): this;
    setOffsetX(x: number): this;
    setOffsetY(y: number): this;
    setLastNote(note: Note): this;
    setDashed(dashed: boolean): this;
    draw(): void;
}