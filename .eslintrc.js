module.exports = {
    extends: [
        'alloy',
        'alloy/react',
    ],
    rules: {
        'react/static-property-placement': 0,
        'jsx-quotes': ['error', 'prefer-single'],
        'quotes': ['error', 'single'],
        'semi-style': ['error', 'last'],
        "comma-dangle": ["error", {
            "arrays": "always",
            "objects": "always",
            "imports": "never",
            "exports": "never",
            "functions": "never"
        }]
    }
};
