module.exports = (api) => {
  const isTest = api.env("test");
  return {
    presets: [
      [
        "@babel/env",
        isTest
          ? { targets: { node: "current" }, modules: "commonjs" }
          : { loose: true, modules: false },
      ],
      [
        "@babel/preset-typescript",
        {
          allExtensions: true,
          isTSX: true,
          jsxPragma: "preserve",
        },
      ],
    ],
    plugins: [
      ["@babel/plugin-transform-runtime"],
      [
        "@ant-design-vue/babel-plugin-jsx",
        {
          transformOn: true,
          usePatchFlag: true,
        },
      ],
      ["@babel/plugin-syntax-dynamic-import"],
      ["@babel/plugin-proposal-export-default-from"],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      // 支持 optional chaining (.?)
      ["@babel/plugin-proposal-optional-chaining"],
      // 支持 ?? operator
      ["@babel/plugin-proposal-nullish-coalescing-operator"],
    ],
  };
};
