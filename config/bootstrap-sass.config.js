// Example file. Copy this to your project. Change then names of the referenced files or comment them out.
// Convention is to name sass partials to start with an "_"
module.exports = {
  verbose: false, // Set to true to show diagnostic information

  // IMPORTANT: Set next two configuration so you can customize
  // bootstrapCustomizations: gets loaded before bootstrap so you can configure the variables used by bootstrap
  // mainSass: gets loaded after bootstrap, so you can override a bootstrap style.
  // NOTE, these are optional.

  // Use preBootstrapCustomizations to change $brand-primary. Ensure this preBootstrapCustomizations does not
  // depend on other bootstrap variables.
  // preBootstrapCustomizations: "./app/components/core/bootstrap/_variables.scss",

  // Use bootstrapCustomizations to utilize other sass variables defined in preBootstrapCustomizations or the
  // _variables.scss file. This is useful to set one customization value based on another value.
  // bootstrapCustomizations: "./app/components/core/bootstrap/_variables.scss",

  //mainSass: "./_main.scss",

  // Default for the style loading
  styleLoader: "style-loader!css-loader!sass-loader",
  //
  // If you want to use the ExtractTextPlugin
  //   and you want compressed
  //     styleLoader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
  //
  // If you want expanded CSS
  //   styleLoader: ExtractTextPlugin.extract("style-loader", "css-loader!sass?outputStyle=expanded"),

  scripts: {
    'affix': false,
    'alert': false,
    'button': false,
    'carousel': false,
    'collapse': false,
    'dropdown': false,
    'modal': false,
    'popover': false,
    'scrollspy': false,
    'tab': false,
    'tooltip': false,
    'transition': false
  },
  styles: {
    "mixins": true,

    "normalize": true,
    "print": true,

    "scaffolding": true,
    "type": true,
    "code": false,
    "grid": true,
    "tables": false,
    "forms": true,
    "buttons": true,

    "component-animations": true,
    "glyphicons": false,
    "dropdowns": true,
    "button-groups": true,
    "input-groups": true,
    "navs": true,
    "navbar": true,
    "breadcrumbs": false,
    "pagination": false,
    "pager": false,
    "labels": false,
    "badges": false,
    "jumbotron": false,
    "thumbnails": false,
    "alerts": false,
    "progress-bars": false,
    "media": false,
    "list-group": false,
    "panels": true,
    "wells": false,
    "close": true,

    "modals": false,
    "tooltip": false,
    "popovers": false,
    "carousel": false,

    "utilities": true,
    "responsive-utilities": true
  }
};

