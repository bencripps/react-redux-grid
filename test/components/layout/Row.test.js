import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Cell } from './../../../src/components/layout/Cell.jsx';
import { setup, mockStore, mockReducer } from './../../util/index';
import { cellData, gridColumns } from './../../util/data';