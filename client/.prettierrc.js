module.exports = {
    printWidth: 120,
    // Tab字符的空格数量，默认值2
    tabWidth: 4,
    semi: true,
    overrides: [
        {
            files: ["*.wxss", "*.acss"],
            options: {
                parser: "css",
            },
        },
        {
            files: ["*.wxml", "*.axml"],
            options: {
                parser: "html",
            },
        },
    ],
};
