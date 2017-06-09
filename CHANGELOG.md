# Change Log

## [5.3.0](https://github.com/bencripps/react-redux-grid/tree/5.3.0) (2017-06-09)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.1.14...5.3.0)

**Merged pull requests:**

- Fix PropTypes warning [\#164](https://github.com/bencripps/react-redux-grid/pull/164) ([geertplaisier](https://github.com/geertplaisier))
- Makes tree expand/collapse buttons easier to click [\#163](https://github.com/bencripps/react-redux-grid/pull/163) ([geertplaisier](https://github.com/geertplaisier))
- Added filterFields to Sorting [\#162](https://github.com/bencripps/react-redux-grid/pull/162) ([Vanderslice](https://github.com/Vanderslice))
- Added will-change: transform to prevent repaints on scroll [\#159](https://github.com/bencripps/react-redux-grid/pull/159) ([Vanderslice](https://github.com/Vanderslice))

## [5.1.14](https://github.com/bencripps/react-redux-grid/tree/5.1.14) (2017-04-15)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.1.13...5.1.14)

**Fixed bugs:**

- Partially editable grid [\#152](https://github.com/bencripps/react-redux-grid/issues/152)

**Merged pull requests:**

- Update USING\_CUSTOM\_EDITORS.md [\#156](https://github.com/bencripps/react-redux-grid/pull/156) ([geertplaisier](https://github.com/geertplaisier))
- State getter should return state when it is nested in an immutable object [\#153](https://github.com/bencripps/react-redux-grid/pull/153) ([florisvink](https://github.com/florisvink))

## [5.1.13](https://github.com/bencripps/react-redux-grid/tree/5.1.13) (2017-03-31)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.1.12...5.1.13)

**Closed issues:**

- Grid Row Indexes are not set/unset on SelectAll DeselectAll Actions [\#138](https://github.com/bencripps/react-redux-grid/issues/138)

**Merged pull requests:**

- add bithound excellent scores [\#139](https://github.com/bencripps/react-redux-grid/pull/139) ([partizanos](https://github.com/partizanos))
- adding docs: Actions, Bulk Selection, Types; expose ActionTypes [\#136](https://github.com/bencripps/react-redux-grid/pull/136) ([headwinds](https://github.com/headwinds))

## [5.1.12](https://github.com/bencripps/react-redux-grid/tree/5.1.12) (2017-03-07)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.1.10...5.1.12)

**Implemented enhancements:**

- addNewRow\(\) : Insertion after a particular row. [\#126](https://github.com/bencripps/react-redux-grid/issues/126)

**Fixed bugs:**

- DISMISS\_EDITOR and ADD\_NEW\_ROW set total incorrectly [\#132](https://github.com/bencripps/react-redux-grid/issues/132)
- addNewRow\\(\\) : Insertion after a particular row. [\#126](https://github.com/bencripps/react-redux-grid/issues/126)
- updateGetter in lastUpdate.js doesn't support passing reducerKeys via the grid props [\#123](https://github.com/bencripps/react-redux-grid/issues/123)

**Closed issues:**

- No Data Available [\#127](https://github.com/bencripps/react-redux-grid/issues/127)

**Merged pull requests:**

- bug/pager - DISMISS\_EDITOR, REMOVE\_ROW, and ADD\_NEW\_ROW now set total correctly [\#133](https://github.com/bencripps/react-redux-grid/pull/133) ([Vanderslice](https://github.com/Vanderslice))
- Changes are made to insert a new row into a specific location of grid by passing rowIndex parameter to addNewRow\(ADD\_NEW\_ROW\) action. [\#129](https://github.com/bencripps/react-redux-grid/pull/129) ([underwater222](https://github.com/underwater222))

## [5.1.10](https://github.com/bencripps/react-redux-grid/tree/5.1.10) (2017-02-24)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.1.9...5.1.10)

**Implemented enhancements:**

- Question: Events for editor with mode='grid' [\#98](https://github.com/bencripps/react-redux-grid/issues/98)
- Question: validation on cell being edited [\#96](https://github.com/bencripps/react-redux-grid/issues/96)
- Add support for nested grid reducers [\#106](https://github.com/bencripps/react-redux-grid/pull/106) ([drownbes](https://github.com/drownbes))

**Fixed bugs:**

- btoa call fails with UTF-8 encoded chracter in keyFromObject function [\#125](https://github.com/bencripps/react-redux-grid/issues/125)
- 5.1.9 fails due absence of redux-logger [\#102](https://github.com/bencripps/react-redux-grid/issues/102)
- Styling problem: no down arrow is shown when change sorting order [\#97](https://github.com/bencripps/react-redux-grid/issues/97)
- Question: validation on cell being edited [\#96](https://github.com/bencripps/react-redux-grid/issues/96)

**Closed issues:**

- pager plugin does not update table when fetching new data [\#121](https://github.com/bencripps/react-redux-grid/issues/121)
- v5.1.9 requires redux-logger but only in dev-dependencies [\#119](https://github.com/bencripps/react-redux-grid/issues/119)
- provide data for tree view does not work still not working [\#118](https://github.com/bencripps/react-redux-grid/issues/118)
- Document update - pass rowId to update cell value [\#117](https://github.com/bencripps/react-redux-grid/issues/117)
- Is it posible to skip/override default styles applied in JS? [\#110](https://github.com/bencripps/react-redux-grid/issues/110)
- provide data for tree view does not work [\#109](https://github.com/bencripps/react-redux-grid/issues/109)

**Merged pull requests:**

- feat\(row\): added a row renderer via plugin [\#115](https://github.com/bencripps/react-redux-grid/pull/115) ([darlenya](https://github.com/darlenya))
- Fix duplicated examples [\#105](https://github.com/bencripps/react-redux-grid/pull/105) ([katopz](https://github.com/katopz))
- Second attempt to fix issue \#88, so that demo is easy to run for peop… [\#104](https://github.com/bencripps/react-redux-grid/pull/104) ([jstafford](https://github.com/jstafford))

## [5.1.9](https://github.com/bencripps/react-redux-grid/tree/5.1.9) (2017-02-10)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.1.7...5.1.9)

**Implemented enhancements:**

- Make isCreate available for custom editors [\#100](https://github.com/bencripps/react-redux-grid/issues/100)

**Fixed bugs:**

- npm run demo fails to work properly [\#88](https://github.com/bencripps/react-redux-grid/issues/88)

**Closed issues:**

- s [\#94](https://github.com/bencripps/react-redux-grid/issues/94)

**Merged pull requests:**

- editor: bugfix - Made isCreate available to editors [\#101](https://github.com/bencripps/react-redux-grid/pull/101) ([Vanderslice](https://github.com/Vanderslice))
- remove use of bind, as suggested in http://www.benjamincripps.com/pos… [\#93](https://github.com/bencripps/react-redux-grid/pull/93) ([jstafford](https://github.com/jstafford))
- add support for \[redux-devtools-extension\]\(https://github.com/zalmoxsus/redux-devtools-extension\), [\#92](https://github.com/bencripps/react-redux-grid/pull/92) ([jstafford](https://github.com/jstafford))
- fix warnings seen when running npm install by adding jasmine-core as … [\#91](https://github.com/bencripps/react-redux-grid/pull/91) ([jstafford](https://github.com/jstafford))
- fix issue \#88 by fixing the path to bundle.js in index.html, [\#90](https://github.com/bencripps/react-redux-grid/pull/90) ([jstafford](https://github.com/jstafford))

## [5.1.7](https://github.com/bencripps/react-redux-grid/tree/5.1.7) (2017-02-02)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.1.6...5.1.7)

## [5.1.6](https://github.com/bencripps/react-redux-grid/tree/5.1.6) (2017-02-01)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.1.2...5.1.6)

**Merged pull requests:**

- new tests \(PagerActios, throttle checkbox\) & README reference links for NPM [\#84](https://github.com/bencripps/react-redux-grid/pull/84) ([headwinds](https://github.com/headwinds))

## [5.1.2](https://github.com/bencripps/react-redux-grid/tree/5.1.2) (2017-01-20)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.1.0...5.1.2)

**Implemented enhancements:**

- Add support for state to be an ImmutableJS Map [\#71](https://github.com/bencripps/react-redux-grid/issues/71)
- Namespace the actions [\#16](https://github.com/bencripps/react-redux-grid/issues/16)
- quickly build and run the demo [\#81](https://github.com/bencripps/react-redux-grid/pull/81) ([headwinds](https://github.com/headwinds))

**Fixed bugs:**

- quickly build and run the demo [\#81](https://github.com/bencripps/react-redux-grid/pull/81) ([headwinds](https://github.com/headwinds))

**Merged pull requests:**

- Remove `store` from props declaration -- will be pulled from context [\#82](https://github.com/bencripps/react-redux-grid/pull/82) ([bencripps](https://github.com/bencripps))

## [5.1.0](https://github.com/bencripps/react-redux-grid/tree/5.1.0) (2017-01-04)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.0.2...5.1.0)

**Merged pull requests:**

- Feature/css optional [\#80](https://github.com/bencripps/react-redux-grid/pull/80) ([bencripps](https://github.com/bencripps))
- support the global sortable option in handleColumnClick [\#79](https://github.com/bencripps/react-redux-grid/pull/79) ([whatisboom](https://github.com/whatisboom))
- Add stylint process, clean up stylus code [\#78](https://github.com/bencripps/react-redux-grid/pull/78) ([bencripps](https://github.com/bencripps))
- Move Api from plugins to Util, add testing for AJAX actions [\#76](https://github.com/bencripps/react-redux-grid/pull/76) ([bencripps](https://github.com/bencripps))

## [5.0.2](https://github.com/bencripps/react-redux-grid/tree/5.0.2) (2016-12-17)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.0.1...5.0.2)

**Implemented enhancements:**

- Support ImmutableJS Map as root state object [\#72](https://github.com/bencripps/react-redux-grid/pull/72) ([whatisboom](https://github.com/whatisboom))

## [5.0.1](https://github.com/bencripps/react-redux-grid/tree/5.0.1) (2016-12-16)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/5.0.0...5.0.1)

## [5.0.0](https://github.com/bencripps/react-redux-grid/tree/5.0.0) (2016-12-16)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v3.1.4...5.0.0)

**Implemented enhancements:**

- Please add rowDrop event as per \#59 [\#60](https://github.com/bencripps/react-redux-grid/issues/60)
- Theming with bootstrap, etc. [\#51](https://github.com/bencripps/react-redux-grid/issues/51)
- Infinite Scroll: Enhancement [\#2](https://github.com/bencripps/react-redux-grid/issues/2)

**Fixed bugs:**

- data property is not connected [\#30](https://github.com/bencripps/react-redux-grid/issues/30)

**Merged pull requests:**

- Added PropType validation of 'any' for emptyDataMessage [\#74](https://github.com/bencripps/react-redux-grid/pull/74) ([whatisboom](https://github.com/whatisboom))
- pageIndex fix [\#70](https://github.com/bencripps/react-redux-grid/pull/70) ([Velderon](https://github.com/Velderon))
- fix utf8 in column names [\#69](https://github.com/bencripps/react-redux-grid/pull/69) ([Velderon](https://github.com/Velderon))
- Simplify getNewRowId function. [\#68](https://github.com/bencripps/react-redux-grid/pull/68) ([dpassen](https://github.com/dpassen))
- Added npmignore to override gitignore when publishing [\#67](https://github.com/bencripps/react-redux-grid/pull/67) ([taco](https://github.com/taco))
- Tree DnD fixes with drop and cancel drop [\#66](https://github.com/bencripps/react-redux-grid/pull/66) ([taco](https://github.com/taco))
- Removing dist from source control [\#65](https://github.com/bencripps/react-redux-grid/pull/65) ([taco](https://github.com/taco))
- Added HANDLE\_BEFORE\_TREE\_CHILD\_CREATE event for trees [\#64](https://github.com/bencripps/react-redux-grid/pull/64) ([taco](https://github.com/taco))
- README.MD minor text update [\#63](https://github.com/bencripps/react-redux-grid/pull/63) ([whatisboom](https://github.com/whatisboom))
- Show default sort caret [\#62](https://github.com/bencripps/react-redux-grid/pull/62) ([KucharJ](https://github.com/KucharJ))
- Action Namespaces [\#55](https://github.com/bencripps/react-redux-grid/pull/55) ([taco](https://github.com/taco))

## [v3.1.4](https://github.com/bencripps/react-redux-grid/tree/v3.1.4) (2016-10-06)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v3.1.3...v3.1.4)

## [v3.1.3](https://github.com/bencripps/react-redux-grid/tree/v3.1.3) (2016-10-05)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v3.1.2...v3.1.3)

## [v3.1.2](https://github.com/bencripps/react-redux-grid/tree/v3.1.2) (2016-10-05)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v3.1.1...v3.1.2)

## [v3.1.1](https://github.com/bencripps/react-redux-grid/tree/v3.1.1) (2016-10-04)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v3.1.0...v3.1.1)

## [v3.1.0](https://github.com/bencripps/react-redux-grid/tree/v3.1.0) (2016-10-04)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v3.0.1...v3.1.0)

**Merged pull requests:**

- Feature/infinite [\#61](https://github.com/bencripps/react-redux-grid/pull/61) ([bencripps](https://github.com/bencripps))

## [v3.0.1](https://github.com/bencripps/react-redux-grid/tree/v3.0.1) (2016-09-30)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v3.0.0...v3.0.1)

## [v3.0.0](https://github.com/bencripps/react-redux-grid/tree/v3.0.0) (2016-09-30)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.4.1...v3.0.0)

**Merged pull requests:**

- Performance and Pager Improvements,  [\#57](https://github.com/bencripps/react-redux-grid/pull/57) ([bencripps](https://github.com/bencripps))

## [v2.4.1](https://github.com/bencripps/react-redux-grid/tree/v2.4.1) (2016-09-27)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.4.0...v2.4.1)

## [v2.4.0](https://github.com/bencripps/react-redux-grid/tree/v2.4.0) (2016-09-27)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.3.3...v2.4.0)

**Merged pull requests:**

- Added tree drag and drop functionality [\#54](https://github.com/bencripps/react-redux-grid/pull/54) ([taco](https://github.com/taco))

## [v2.3.3](https://github.com/bencripps/react-redux-grid/tree/v2.3.3) (2016-09-23)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.3.2...v2.3.3)

**Implemented enhancements:**

- Adding a SORT event [\#49](https://github.com/bencripps/react-redux-grid/issues/49)

## [v2.3.2](https://github.com/bencripps/react-redux-grid/tree/v2.3.2) (2016-08-29)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.3.1...v2.3.2)

**Merged pull requests:**

- Updated eslint and fixed some dev dependencies [\#50](https://github.com/bencripps/react-redux-grid/pull/50) ([taco](https://github.com/taco))

## [v2.3.1](https://github.com/bencripps/react-redux-grid/tree/v2.3.1) (2016-08-26)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.3.0...v2.3.1)

## [v2.3.0](https://github.com/bencripps/react-redux-grid/tree/v2.3.0) (2016-08-26)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.2.6...v2.3.0)

**Merged pull requests:**

- Feature/casing [\#48](https://github.com/bencripps/react-redux-grid/pull/48) ([bencripps](https://github.com/bencripps))

## [v2.2.6](https://github.com/bencripps/react-redux-grid/tree/v2.2.6) (2016-08-25)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.2.5...v2.2.6)

## [v2.2.5](https://github.com/bencripps/react-redux-grid/tree/v2.2.5) (2016-08-25)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.2.4...v2.2.5)

**Closed issues:**

- emptyDataMessage [\#46](https://github.com/bencripps/react-redux-grid/issues/46)

## [v2.2.4](https://github.com/bencripps/react-redux-grid/tree/v2.2.4) (2016-08-24)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.2.3...v2.2.4)

**Closed issues:**

- Typo in createFromKey [\#45](https://github.com/bencripps/react-redux-grid/issues/45)

## [v2.2.3](https://github.com/bencripps/react-redux-grid/tree/v2.2.3) (2016-08-19)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.2.2...v2.2.3)

## [v2.2.2](https://github.com/bencripps/react-redux-grid/tree/v2.2.2) (2016-08-19)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.2.1...v2.2.2)

## [v2.2.1](https://github.com/bencripps/react-redux-grid/tree/v2.2.1) (2016-08-19)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.2.0...v2.2.1)

## [v2.2.0](https://github.com/bencripps/react-redux-grid/tree/v2.2.0) (2016-08-18)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.1.0...v2.2.0)

**Merged pull requests:**

- add stateful manager, add stateful args to all col actions, update tests [\#44](https://github.com/bencripps/react-redux-grid/pull/44) ([bencripps](https://github.com/bencripps))

## [v2.1.0](https://github.com/bencripps/react-redux-grid/tree/v2.1.0) (2016-08-16)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.0.4...v2.1.0)

**Merged pull requests:**

- Add Tree Functionality to Grid [\#43](https://github.com/bencripps/react-redux-grid/pull/43) ([bencripps](https://github.com/bencripps))

## [v2.0.4](https://github.com/bencripps/react-redux-grid/tree/v2.0.4) (2016-08-11)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.0.3...v2.0.4)

**Implemented enhancements:**

- Custom sorting [\#41](https://github.com/bencripps/react-redux-grid/issues/41)

## [v2.0.3](https://github.com/bencripps/react-redux-grid/tree/v2.0.3) (2016-08-10)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.0.2...v2.0.3)

**Closed issues:**

- Bad file name breaks the build [\#40](https://github.com/bencripps/react-redux-grid/issues/40)

**Merged pull requests:**

- Add babel-plugin for Array.from [\#42](https://github.com/bencripps/react-redux-grid/pull/42) ([bencripps](https://github.com/bencripps))

## [v2.0.2](https://github.com/bencripps/react-redux-grid/tree/v2.0.2) (2016-08-09)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.0.1...v2.0.2)

## [v2.0.1](https://github.com/bencripps/react-redux-grid/tree/v2.0.1) (2016-08-09)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v2.0.0...v2.0.1)

**Closed issues:**

- Error trying to compile the library [\#39](https://github.com/bencripps/react-redux-grid/issues/39)
- Request: make project ready for distribution [\#36](https://github.com/bencripps/react-redux-grid/issues/36)

## [v2.0.0](https://github.com/bencripps/react-redux-grid/tree/v2.0.0) (2016-08-08)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v.1.9.3...v2.0.0)

**Closed issues:**

- Question: Is it possible to set a custom key to each row? [\#33](https://github.com/bencripps/react-redux-grid/issues/33)

**Merged pull requests:**

- Rework build process to create dist, remove fonts, update README [\#37](https://github.com/bencripps/react-redux-grid/pull/37) ([bencripps](https://github.com/bencripps))

## [v.1.9.3](https://github.com/bencripps/react-redux-grid/tree/v.1.9.3) (2016-08-06)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.9.3...v.1.9.3)

## [v1.9.3](https://github.com/bencripps/react-redux-grid/tree/v1.9.3) (2016-08-06)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.9.2...v1.9.3)

## [v1.9.2](https://github.com/bencripps/react-redux-grid/tree/v1.9.2) (2016-08-05)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.9.1...v1.9.2)

**Fixed bugs:**

- Sortable is not working! [\#29](https://github.com/bencripps/react-redux-grid/issues/29)

## [v1.9.1](https://github.com/bencripps/react-redux-grid/tree/v1.9.1) (2016-08-04)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.9.0...v1.9.1)

## [v1.9.0](https://github.com/bencripps/react-redux-grid/tree/v1.9.0) (2016-07-27)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.8.0...v1.9.0)

**Implemented enhancements:**

- multiple grid interaction question [\#26](https://github.com/bencripps/react-redux-grid/issues/26)

**Fixed bugs:**

- unable to save when multiple grids are available [\#25](https://github.com/bencripps/react-redux-grid/issues/25)
- Does not refresh after SET\_DATA action [\#19](https://github.com/bencripps/react-redux-grid/issues/19)

**Closed issues:**

- working with a simple rest service [\#21](https://github.com/bencripps/react-redux-grid/issues/21)

**Merged pull requests:**

- removing filter/filter menu plugin [\#28](https://github.com/bencripps/react-redux-grid/pull/28) ([bencripps](https://github.com/bencripps))
- Fix local sort [\#20](https://github.com/bencripps/react-redux-grid/pull/20) ([kkwak](https://github.com/kkwak))

## [v1.8.0](https://github.com/bencripps/react-redux-grid/tree/v1.8.0) (2016-07-01)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.7.0...v1.8.0)

**Implemented enhancements:**

- Add .edtiorconfig to project [\#17](https://github.com/bencripps/react-redux-grid/issues/17)

**Merged pull requests:**

- Add editor config [\#18](https://github.com/bencripps/react-redux-grid/pull/18) ([taco](https://github.com/taco))
- Added syntax highlighting to README.md [\#15](https://github.com/bencripps/react-redux-grid/pull/15) ([taco](https://github.com/taco))

## [v1.7.0](https://github.com/bencripps/react-redux-grid/tree/v1.7.0) (2016-06-22)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.6.0...v1.7.0)

**Merged pull requests:**

- Added some perf improvements to shouldComponentUpdate [\#14](https://github.com/bencripps/react-redux-grid/pull/14) ([taco](https://github.com/taco))

## [v1.6.0](https://github.com/bencripps/react-redux-grid/tree/v1.6.0) (2016-06-15)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.5.0...v1.6.0)

**Merged pull requests:**

- feature/immutable-state [\#13](https://github.com/bencripps/react-redux-grid/pull/13) ([bencripps](https://github.com/bencripps))
- adding suppoer for dataIndex as a string array [\#12](https://github.com/bencripps/react-redux-grid/pull/12) ([bencripps](https://github.com/bencripps))

## [v1.5.0](https://github.com/bencripps/react-redux-grid/tree/v1.5.0) (2016-05-31)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.4.0...v1.5.0)

**Merged pull requests:**

- Merge in feature/perf to remove extraneous connected components [\#11](https://github.com/bencripps/react-redux-grid/pull/11) ([bencripps](https://github.com/bencripps))

## [v1.4.0](https://github.com/bencripps/react-redux-grid/tree/v1.4.0) (2016-05-23)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/feaute/statekey...v1.4.0)

**Merged pull requests:**

- Add stateKey as required parameter, update tests, update docs [\#10](https://github.com/bencripps/react-redux-grid/pull/10) ([bencripps](https://github.com/bencripps))

## [feaute/statekey](https://github.com/bencripps/react-redux-grid/tree/feaute/statekey) (2016-05-04)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.3.0...feaute/statekey)

## [v1.3.0](https://github.com/bencripps/react-redux-grid/tree/v1.3.0) (2016-04-30)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/1.3.0...v1.3.0)

## [1.3.0](https://github.com/bencripps/react-redux-grid/tree/1.3.0) (2016-04-30)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/1.2.0...1.3.0)

**Fixed bugs:**

- trying to hook up my own store [\#9](https://github.com/bencripps/react-redux-grid/issues/9)

## [1.2.0](https://github.com/bencripps/react-redux-grid/tree/1.2.0) (2016-03-27)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.2.0...1.2.0)

## [v1.2.0](https://github.com/bencripps/react-redux-grid/tree/v1.2.0) (2016-03-27)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/v1.1.0...v1.2.0)

## [v1.1.0](https://github.com/bencripps/react-redux-grid/tree/v1.1.0) (2016-03-27)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/1.1.0...v1.1.0)

## [1.1.0](https://github.com/bencripps/react-redux-grid/tree/1.1.0) (2016-01-23)
[Full Changelog](https://github.com/bencripps/react-redux-grid/compare/1.0.5...1.1.0)

## [1.0.5](https://github.com/bencripps/react-redux-grid/tree/1.0.5) (2016-01-18)


\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*