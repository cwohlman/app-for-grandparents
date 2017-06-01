import { css, StyleSheet } from 'aphrodite'


const stylesheet = StyleSheet.create({
  card: {
    "display": "block",
    "width": "360px",
    "padding": "20px",
    "height": "480px",
    "margin-left": "auto",
    "margin-right": "auto",
  },
  banner_photo: {
    "width": "auto",
    "max-height": "300px",
  },
  banner_photo_container: {
    "display": "block",
    "text-align": "center",
  },
  heading: {
    "text-align": "center",
    "padding-bottom": "5px",
    "border-bottom": "1px solid black",
    "margin-bottom": "20px",
  },
  card_highlight_on_hover: {
    ":hover": {
      "box-shadow": "0px 0px 5px 0px #000",
    },
  },
  no_link_highlight: {
    "color": "inherit",
    "text-decoration": "none",
    ":hover": {
      "color": "inherit",
      "text-decoration": "none",
    }
  },
  card_header: {
    "text-align": "center",
    "font-size": "20px",
    "white-space": "nowrap",
    "overflow": "hidden",
  },
  card_action: {
    "text-align": "center",
    "font-weight": "bold",
    "padding": "20px",
    "max-height": "80px",
    "overflow": "hidden",
    "background": "#F8FFCB",
  },
  upload_container: {
    "width": "300px",
    "height": "300px",
    "margin-left": "auto",
    "margin-right": "auto",
    "line-height": "300px",
    "background": "#F0F0F0",
    "border": "1px solid #444",
    "border-radius": "10px",
  },
  upload_button: {
    "color": "#444",
    "font-style": "italic",
    "text-align": "center",
    "cursor": "pointer",
  },
  welcome: {
    "text-align": "center",
  },
  float_right: {
    "float": "right",
  },
});

const styles = {
  "Grandkids > Heading": [stylesheet.heading],
  "Grandkids > Child > Card": [stylesheet.card, stylesheet.card_highlight_on_hover],
  "Grandkids > Child > Name": stylesheet.card_header,
  "Grandkids > Child > Link": stylesheet.no_link_highlight,
  "Grandkids > Child > Birthday": stylesheet.card_action,
  "Grandkid > Heading": stylesheet.heading,
  "Grandkid > PhotoContainer": stylesheet.banner_photo_container,
  "Grandkid > Photo": stylesheet.banner_photo,
  "Grandkid > UploadButton": stylesheet.upload_button,
  "Grandkid > UploadContainer": [stylesheet.upload_button, stylesheet.upload_container],
  "Welcome": [stylesheet.welcome],
  "Login": [stylesheet.login],
  "Nav > Right": stylesheet.float_right,
};

const classes = {
  "App": "container",
  "Grandkids": "row",
  "Grandkids > Child": "col-sm-12 col-md-6 col-lg-4",
  "Nav": "navbar navbar-default",
  "Nav > Container": "container",
  "Nav > Home": "navbar-brand",
  "Nav > Right": "nav navbar-nav navbar-right",
  "Textarea": "form-control",
};

const get = (component, inline_styles) => {
  var results = [];

  var component_class = classes[component];
  if (component_class != null) {
    results.push(component_class);
  }

  var component_style = styles[component];
  results.push(css(component_style, inline_styles));

  return results.join(" ");
};

export default get;
