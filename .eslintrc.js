module.exports = {
    "extends": "react-app",

    "globals": {
        "describe": true,
        "it": true,
        "sinon": true
    },

    "settings": {
      'import/extensions': ['.js', '.jsx'],
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.json']
        }
      }
    },

    "rules": {
        "comma-dangle": 2,
        "no-cond-assign": [
            1,
            "except-parens"
        ],
        "no-console": 1,
        "no-constant-condition": 2,
        "no-control-regex": 2,
        "no-debugger": 2,
        "no-dupe-args": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-empty-character-class": 2,
        "no-empty": 2,
        "no-ex-assign": 2,
        "no-extra-boolean-cast": 2,
        "no-extra-parens": 0,
        "no-extra-semi": 2,
        "no-func-assign": 2,
        "no-inner-declarations": [
            2,
            "functions"
        ],
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 2,
        "no-negated-in-lhs": 2,
        "no-obj-calls": 2,
        "no-regex-spaces": 2,
        "no-sparse-arrays": 2,
        "no-unexpected-multiline": 2,
        "no-unreachable": 2,
        "use-isnan": 2,
        "valid-jsdoc": [
            2,
            {
                "requireReturnDescription": false,
                "requireParamDescription": false,
                "requireReturn": false
            }
        ],
        "require-jsdoc": 0,
        "accessor-pairs": 0,
        "block-scoped-var": 0,
        "complexity": 0,
        "consistent-return": 0,
        "curly": [
            1,
            "all"
        ],
        "default-case": 0,
        "dot-notation": [
            1,
            {
                "allowKeywords": true,
                "allowPattern": ""
            }
        ],
        "eqeqeq": 1,
        "guard-for-in": 0,
        "no-alert": 1,
        "no-div-regex": 1,
        "no-else-return": 1,
        "no-eq-null": 0,
        "no-eval": 2,
        "no-fallthrough": 0,
        "no-floating-decimal": 1,
        "no-multi-spaces": 1,
        "no-new": 1,
        "no-param-reassign": 0,
        "no-process-env": 0,
        "no-proto": 2,
        "no-return-assign": 1,
        "no-unused-expressions": 0,
        "no-void": 2,
        "no-warning-comments": [
            1,
            {
                "terms": [
                    "todo",
                    "tofix"
                ],
                "location": "start"
            }
        ],
        "vars-on-top": 1,
        "wrap-iife": [
            1,
            "inside"
        ],
        "yoda": [
            1,
            "never"
        ],
        "strict": [
            2,
            "never"
        ],
        "no-catch-shadow": 0,
        "no-shadow": 1,
        "no-undef-init": 2,
        "no-undefined": 0,
        "no-unused-vars": [
            1,
            {
                "vars": "local",
                "args": "after-used"
            }
        ],
        "no-use-before-define": 0,
        "handle-callback-err": 1,
        "no-mixed-requires": 1,
        "no-new-require": 1,
        "no-path-concat": 1,
        "no-process-exit": 1,
        "no-restricted-modules": [
            1,
            ""
        ],
        "no-sync": 1,
        "array-bracket-spacing": [
            1,
            "never"
        ],
        "brace-style": [
            1,
            "stroustrup",
            {
                "allowSingleLine": true
            }
        ],
        "camelcase": [
            1,
            {
                "properties": "always"
            }
        ],
        "comma-spacing": [
            1,
            {
                "before": false,
                "after": true
            }
        ],
        "comma-style": [
            1,
            "last"
        ],
        "computed-property-spacing": 0,
        "consistent-this": 0,
        "func-names": 1,
        "func-style": 0,
        "indent": [
            2,
            4
        ],
        "key-spacing": [
            2,
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "max-nested-callbacks": [
            0,
            3
        ],
        "new-cap": 0,
        "newline-after-var": 0,
        "no-array-constructor": 2,
        "no-continue": 2,
        "no-inline-comments": 0,
        "no-lonely-if": 1,
        "no-mixed-spaces-and-tabs": 2,
        "no-multiple-empty-lines": [
            2,
            {
                "max": 1
            }
        ],
        "no-nested-ternary": 0,
        "no-new-object": 2,
        "no-spaced-func": 2,
        "no-ternary": 0,
        "no-trailing-spaces": 2,
        "no-underscore-dangle": 0,
        "no-unneeded-ternary": 1,
        "object-curly-spacing": 0,
        "one-var": [
            1,
            "never"
        ],
        "padded-blocks": [
            0,
            "never"
        ],
        "quote-props": [
            2,
            "as-needed",
            {
                "keywords": true
            }
        ],
        "quotes": [
            2,
            "single"
        ],
        "semi-spacing": [
            2,
            {
                "before": false,
                "after": true
            }
        ],
        "semi": [
            2,
            "always"
        ],
        "sort-vars": 0,
        "space-after-keywords": 0,
        "space-before-blocks": [
            1,
            "always"
        ],
        "space-before-function-paren": [
            2,
            "never"
        ],
        "space-in-parens": [
            1,
            "never"
        ],
        "space-infix-ops": 1,
        "keyword-spacing": 2,
        "space-unary-ops": 0,
        "spaced-comment": [
            1,
            "always"
        ],
        "wrap-regex": 0,
        "react/display-name": 0,
        "react/forbid-prop-types": 0,
        "react/jsx-boolean-value": 1,
        "react/jsx-closing-bracket-location": 1,
        "react/jsx-curly-spacing": 0,
        "react/jsx-handler-names": 1,
        "react/jsx-indent-props": 1,
        "react/jsx-indent": 1,
        "react/jsx-key": 1,
        "react/jsx-max-props-per-line": 1,
        "react/jsx-no-bind": 1,
        "react/jsx-no-literals": 1,
        "jsx-quotes": 1,
        "react/sort-prop-types": 2,
        "react/jsx-sort-props": 1,
        "react/no-danger": 1,
        "react/no-did-mount-set-state": 1,
        "react/no-did-update-set-state": 1,
        "react/no-multi-comp": 0,
        "react/no-set-state": 0,
        "react/no-string-refs": 1,
        "react/no-unknown-property": 1,
        "react/prefer-es6-class": 2,
        "react/prefer-stateless-function": 2,
        "react/prop-types": 2,
        "import/extensions": 1,
        "react/self-closing-comp": 1,
        "react/sort-comp": [
            2,
            {
                "order": [
                    "render",
                    "lifecycle",
                    "static-methods",
                    "everything-else"
                ],
                "groups": {
                    "lifecycle": [
                        "componentWillMount",
                        "componentDidMount",
                        "componentWillReceiveProps",
                        "shouldComponentUpdate",
                        "componentWillUpdate",
                        "componentDidUpdate",
                        "componentWillUnmount",
                        "getChildContext",
                        "contextTypes",
                        "childContextTypes",
                        "mixins",
                        "state",
                        "statics",
                        "displayName",
                        "propTypes",
                        "defaultProps",
                        "constructor",
                        "getDefaultProps",
                        "getInitialState"
                    ]
                }
            }
        ],
        "react/jsx-wrap-multilines": 1,
        "constructor-super": 1,
        "generator-star-spacing": 0,
        "no-var": 2,
        "object-shorthand": 0,
        "prefer-const": 2,
        "max-depth": [
            0,
            3
        ],
        "max-len": [
            2,
            80,
            4
        ],
        "max-params": 0,
        "max-statements": 0,
        "no-bitwise": 1,
        "no-plusplus": 0
    }
}
