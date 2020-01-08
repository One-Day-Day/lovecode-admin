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
            "arrays": "only-multiline",
            "objects": "only-multiline",
            "imports": "never",
            "exports": "only-multiline",
            "functions": "only-multiline"
        }]
    }
};
