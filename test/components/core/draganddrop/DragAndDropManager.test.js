/* eslint-enable describe it sinon */

import expect from 'expect';
import
    DragAndDropManager
from './../../../../src/components/core/draganddrop/DragAndDropManager';

describe('The grid draganddrop manager', () => {

    it('Should return the default manager', () => {

        const manager = new DragAndDropManager();
        const defaults = manager.initDragable();

        expect(
            defaults.draggable
        ).toEqual(true);

        expect(
            defaults.className
        ).toEqual('react-grid-drag-handle');

    });

    it('Should allow overrides', () => {

        const manager = new DragAndDropManager();

        const defaults = manager.initDragable({
            draggable: false,
            className: 'custom-drag'
        });

        expect(
            defaults.draggable
        ).toEqual(false);

        expect(
            defaults.className
        ).toEqual('custom-drag');

    });

    it('Should fire events', () => {

        const manager = new DragAndDropManager();

        const defaults = manager.initDragable({
            draggable: false,
            className: 'custom-drag'
        });

    });

});
