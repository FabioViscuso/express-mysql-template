module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    overrides: [
        {
            files: ["*.ts"],
            rules: {
                "no-undef": "off",
            }
        },
        {
            files: ["*.test.ts"],
            env: {
                node: true,
                jest: true,
            }
        },
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment": "off"
    },
};
