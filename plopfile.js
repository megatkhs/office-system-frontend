import Handlebars from "handlebars";

/** @param {import("plop").NodePlopAPI} plop  */
export default function (plop) {
  plop.setHelper("ifCond", function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  plop.setHelper("surroundWithCurlyBraces", function (text) {
    var result = "{" + text + "}";
    return new Handlebars.SafeString(result);
  });

  plop.setGenerator("component", {
    description: "コンポーネントのファイル作成",
    async prompts({ prompt, prompts, Separator }) {
      const { name } = await prompt({
        name: "name",
        message: "コンポーネントの名前は？",
        type: "input",
        hint: "Button",
        validate: (name) => {
          return Boolean(name) || "コンポーネント名は必須です";
        },
      });

      const { path } = await prompt({
        name: "path",
        message: `"${name}"コンポーネントの種類は？`,
        type: "list",
        choices: [
          `src/components/elements/${name}`,
          `src/components/composites/${name}`,
          `src/components/domains/${name}`,
        ],
      });

      const { needed } = await prompt({
        message: `"${name}"コンポーネントと一緒に生成するものは？`,
        name: "needed",
        type: "checkbox",
        choices: [
          {
            name: "カスタムフック(dependencies.ts)",
            value: "dependencies",
            checked: true,
          },
          {
            name: `スタイル(${name}.module.css)`,
            value: "style",
            checked: true,
          },
          new Separator(),
          {
            name: `スタイルブック(${name}.stories.mdx,${name}.stories.tsx)`,
            value: "story",
            checked: true,
          },
        ],
        multiple: true,
      });

      const neededDependencies = needed.includes("dependencies");
      const neededStyle = needed.includes("style");
      const neededStory = needed.includes("story");
      const tag = prompts.tag ?? "div";
      const [, group] = path.match(/^src\/(components\/.*?)\/.*$/);

      return {
        name,
        path,
        group,
        tag,
        neededDependencies,
        neededStyle,
        neededStory,
      };
    },
    actions(answer) {
      return (
        answer &&
        [
          answer.neededStyle && {
            type: "add",
            path: `{{path}}/{{name}}.module.css`,
            templateFile: "./.plop/component/Component.module.css.hbs",
          },
          answer.neededStory && {
            type: "add",
            path: `{{path}}/{{name}}.stories.mdx`,
            templateFile: "./.plop/component/Component.stories.mdx.hbs",
          },
          answer.neededStory && {
            type: "add",
            path: `{{path}}/{{name}}.stories.tsx`,
            templateFile: "./.plop/component/Component.stories.tsx.hbs",
          },
          answer.neededDependencies && {
            type: "add",
            path: `{{path}}/dependencies.ts`,
            templateFile: "./.plop/component/dependencies.ts.hbs",
          },
          {
            type: "add",
            path: `{{path}}/{{name}}.tsx`,
            templateFile: "./.plop/component/Component.tsx.hbs",
          },
          {
            type: "add",
            path: `{{path}}/index.tsx`,
            templateFile: "./.plop/component/index.tsx.hbs",
          },
        ].filter(Boolean)
      );
    },
  });
}
