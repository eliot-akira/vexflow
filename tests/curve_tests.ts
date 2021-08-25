// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// MIT License
//
// Curve Tests

import { VexFlowTests, concat, TestOptions } from './vexflow_test_helpers';
import { CurvePosition } from 'curve';
import { Factory } from 'factory';
import { StaveNote } from 'stavenote';
import { BuilderOptions } from 'easyscore';

const CurveTests = {
  Start(): void {
    QUnit.module('Curve');
    const run = VexFlowTests.runTests;
    run('Simple Curve', this.simple);
    run('Rounded Curve', this.rounded);
    run('Thick Thin Curves', this.thickThin);
    run('Top Curve', this.top);
  },

  simple: createTest(
    ['c4/8, f5, d5, g5', { stem: 'up' }], // beamGroup1
    ['d6/8, f5, d5, g5', { stem: 'down' }], // beamGroup2
    (f, notes) => {
      f.Curve({
        from: notes[0],
        to: notes[3],
        options: {
          cps: [
            { x: 0, y: 10 },
            { x: 0, y: 50 },
          ],
        },
      });

      f.Curve({
        from: notes[4],
        to: notes[7],
        options: {
          cps: [
            { x: 0, y: 10 },
            { x: 0, y: 20 },
          ],
        },
      });
    }
  ),

  rounded: createTest(
    ['c5/8, f4, d4, g5', { stem: 'up' }], // beamGroup1
    ['d5/8, d6, d6, g5', { stem: 'down' }], // beamGroup2
    (f, notes) => {
      f.Curve({
        from: notes[0],
        to: notes[3],
        options: {
          x_shift: -10,
          y_shift: 30,
          cps: [
            { x: 0, y: 20 },
            { x: 0, y: 50 },
          ],
        },
      });

      f.Curve({
        from: notes[4],
        to: notes[7],
        options: {
          cps: [
            { x: 0, y: 50 },
            { x: 0, y: 50 },
          ],
        },
      });
    }
  ),

  thickThin: createTest(
    ['c5/8, f4, d4, g5', { stem: 'up' }], // beamGroup1
    ['d5/8, d6, d6, g5', { stem: 'down' }], // beamGroup2
    (f, notes) => {
      f.Curve({
        from: notes[0],
        to: notes[3],
        options: {
          thickness: 10,
          x_shift: -10,
          y_shift: 30,
          cps: [
            { x: 0, y: 20 },
            { x: 0, y: 50 },
          ],
        },
      });

      f.Curve({
        from: notes[4],
        to: notes[7],
        options: {
          thickness: 0,
          cps: [
            { x: 0, y: 50 },
            { x: 0, y: 50 },
          ],
        },
      });
    }
  ),

  top: createTest(
    ['c5/8, f4, d4, g5', { stem: 'up' }], // beamGroup1
    ['d5/8, d6, d6, g5', { stem: 'down' }], // beamGroup2
    (f, notes) => {
      f.Curve({
        from: notes[0],
        to: notes[7],
        options: {
          x_shift: -3,
          y_shift: 10,
          position: CurvePosition.NEAR_TOP,
          position_end: CurvePosition.NEAR_HEAD,
          cps: [
            { x: 0, y: 20 },
            { x: 40, y: 80 },
          ],
        },
      });
    }
  ),
};

function createTest(
  beamGroup1: [string, BuilderOptions],
  beamGroup2: [string, BuilderOptions],
  setupCurves: (f: Factory, n: StaveNote[]) => void
) {
  return (options: TestOptions) => {
    const factory = VexFlowTests.makeFactory(options, 350, 200);
    const stave = factory.Stave({ y: 50 });
    const score = factory.EasyScore();

    // Use .reduce(concat) to flatten the two StaveNote[] into a single StaveNote[].
    const staveNotes = [
      score.beam(score.notes(...beamGroup1)), // group 1
      score.beam(score.notes(...beamGroup2)), // group 2
    ].reduce(concat);

    setupCurves(factory, staveNotes);

    const voices = [score.voice(staveNotes, { time: '4/4' })];
    factory.Formatter().joinVoices(voices).formatToStave(voices, stave);
    factory.draw();

    ok('Simple Curve');
  };
}

export { CurveTests };
