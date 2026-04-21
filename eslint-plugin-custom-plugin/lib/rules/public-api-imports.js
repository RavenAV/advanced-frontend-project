/**
 * @fileoverview check imports
 * @author raven
 */
"use strict";

const { isPathRelative } = require('../helpers');

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "check imports",
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
    ],
    messages: {
      "import-from-public-api-rule": "Абсолютный импорт разрешен только из публичного API (index.ts) ^.^"
    }, // Add messageId and message
  },

  create(context)
  {
    const alias = context.options[0]?.alias || ''

    const checkingLayers = {
      'entities': 'entities',
      'features': 'features',
      'widgets': 'widgets',
      'pages': 'pages'
    }

    return {
      ImportDeclaration(node)
      {
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value;

        if (isPathRelative(importTo)) {
          return
        }

        // [entities, acrticle, model, types]
        const segments = importTo.split('/')
        const isImportNotFromPublicApi = segments.length > 2

        const layer = segments[0]
        if (!checkingLayers[layer])
        {
          return
        }

        if (isImportNotFromPublicApi)
        {
          context.report({
            node,
            messageId: "import-from-public-api-rule",
          });
        }
      }
    };
  },
};
