{
  appDir: "../",
  baseUrl: "./roots",
  dir: "./output",
  optimize: "uglify",
  optimizeCss: "standard",
  mainConfigFile: "../init.js",
  removeCombined: false,
  fileExclusionRegExp: /build\/*|\.git\/*/,
  modules: [
    {
      name: "stem/main",
      include: ['stem/BaseBodhi', 'stem/BodhiManager',
      'stem/CausalityManager', 'stem/LayoutManager',
      'stem/MapManager', 'stem/MapModule',
      'stem/PanelManager', 'stem/utils', 'jquery', 'jquery-ui'],
      exclude: ['openlayers/ol']
    }
  ]
}