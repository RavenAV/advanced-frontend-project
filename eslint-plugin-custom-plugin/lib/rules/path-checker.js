/**
 * @fileoverview feature sliced relative path checker
 * @author Raven
 */
"use strict";

const path = require('path');
const { isPathRelative } = require('../helpers');

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "feature sliced relative path checker",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ], // Add a schema if the rule has options
    messages: {
      "relative-paths-rule": "В рамках одного слайса все пути должны быть относительными ^.^"
    }, // Add messageId and message
  },

  create(context)
  {
    const alias = context.options[0]?.alias || ''

    return {
      ImportDeclaration(node)
      {
        // exp: app/entities/Article
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value;
        // exp: D:/AdvancedFrontend/.../src/app/entities/Article
        const fromFileName = context.getFilename()
        if (shouldBeRelative(fromFileName, importTo))
        {
          context.report({
            node,
            messageId: "relative-paths-rule",
          });
        }
      }
    };
  },
};

// словарь с сегментами
const layers = {
  'entities': 'entities',
  'features': 'features',
  'widgets': 'widgets',
  'shared': 'shared',
  'pages': 'pages'
}

function shouldBeRelative(from, to)
{
  if (isPathRelative(to))
  {
    return false;
  }

  // exp: app/entities/Article
  const toArray = to.split('/');
  const toLayer = toArray[0]; // entities
  const toSlice = toArray[1]; // Article
  // если нет нужного слоя в словарике, нет слоя или нет слайса
  if (!toLayer || !toSlice || !layers[toLayer])
  {
    return false;
  }

  // exp: D:/AdvancedFrontend/.../src/app/entities/Article
  const normalizedPath = path.toNamespacedPath(from)
  const projectPath = normalizedPath.split('src')[1] //интересует то, что справа от src
  const fromArray = projectPath.split('\\');

  const fromLayer = fromArray[1]; // entities
  const fromSlice = fromArray[2]; // Article
  // если нет нужного слоя в словарике, нет слоя или нет слайса
  if (!fromLayer || !fromSlice || !layers[fromLayer])
  {
    return false;
  }

  return fromLayer === toLayer && fromSlice === toSlice
}
