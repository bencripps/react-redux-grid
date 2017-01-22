# FONT AWESOME AND REACT-REDUX-GRID

The grid expects FontAwesome to be available, as the core CSS utilizes a subset of the icons for things like sort-arrows and grid action icons.

The grid component doesn't ship with fonts since that's a bad practice. For the grid to work correcrly, you will need to make FontAwesome available either via build process, or linking to them externally. Here is a list of all icons currently utilized by grid:

```styl
icondictionary = {
  'arrows-v': '\F07D',
  'search': '\F002',
  'close': '\F00D',
  'chevron-down': '\F078',
  'chevron-right': '\F054',
  'filter': '\F0b0',
  'action': '\F142',
  'sort-up': '\F0D8',
  'sort-down': '\F0D7',
}
```

Please see font awesome's documentation for more [information](http://fontawesome.io/)
