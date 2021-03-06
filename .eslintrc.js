module.exports = {
    "extends": "airbnb",
    "rules":{
        "react/jsx-max-props-per-line": ["error", { "maximum": 1, "when": "always" }],
        'react/jsx-closing-bracket-location': ["error", {selfClosing: 'props-aligned', nonEmpty: 'props-aligned'}],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "a" ],
            "specialLink": [ "hrefLeft", "hrefRight" ],
            "aspects": [ "noHref", "invalidHref", "preferButton" ]
          }],
          "react/no-array-index-key":["warning"],
          "jsx-a11y/label-has-for": [ "warning"],
        'jsx-a11y/no-noninteractive-element-interactions': ['warning'],
        'jsx-a11y/click-events-have-key-events':['warning'],
        'jsx-a11y/no-static-element-interactions':['warning'],
        'jsx-a11y/anchor-is-valid':['warning'],
        "no-param-reassign": [2, {"props": false}],
        'max-len': 0,
        'react/no-did-mount-set-state': false,
        'no-console': 0,
        'no-script-url': 0,
        'react/no-danger': false,
        "linebreak-style": 0,
    },
    "globals": {
        'config': true,
        'describe': true,
        'it': true,
        'expect': true,
        'beforeEach': true,
        'afterEach': true,
        'document': true,
        'window': true,
        'navigator': true,
        'beforeAll': true,
        'jest': true,
        'mCustomScrollbar': true,
        '$': true,
    }
};
