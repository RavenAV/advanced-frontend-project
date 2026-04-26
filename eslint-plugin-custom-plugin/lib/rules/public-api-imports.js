/**
 * @fileoverview check imports
 * @author raven
 */
"use strict";

const { isPathRelative } = require('../helpers')
const micromatch = require('micromatch')
const path = require('path')

const PUBLIC_ERROR = 'import-from-public-api-rule'
const TESTING_PUBLIC_ERROR = 'import-from-testing-public-api-rule'

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "check imports",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
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
      [PUBLIC_ERROR]: "Абсолютный импорт разрешен только из public API (index.ts) ^.^",
      [TESTING_PUBLIC_ERROR]: "Тестовые данные необходимо импортировать из тестового public API (testing.ts) ^.^",
      //"import-from-public-api-rule": "Абсолютный импорт разрешен только из public API (index.ts) ^.^",
      //"import-from-testing-public-api-rule": "Тестовые данные необходимо импортировать из тестового public API (testing.ts) ^.^",
    }, // Add messageId and message
  },

  create(context)
  {
    const { alias = '', testFilesPatterns = [] } = context.options[0] ?? {}

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

        if (isPathRelative(importTo))
        {
          return
        }

        // [entities, acrticle, model, types]
        const segments = importTo.split('/')
        const isImportNotFromPublicApi = segments.length > 2
        // [entities, acrticle, testing]
        const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4

        const layer = segments[0]
        const slice = segments[1]
        if (!checkingLayers[layer])
        {
          return
        }

        if (isImportNotFromPublicApi && !isTestingPublicApi)
        {
          context.report({
            node,
            messageId: PUBLIC_ERROR,
            fix: (fixer) => {
              return fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`)
            }
          })
        }

        if (isTestingPublicApi)
        {
          const currentFilePath = context.getFilename()
          const normalizedPath = path.toNamespacedPath(currentFilePath)
          const isCurrentFileTesting = testFilesPatterns.some(pattern => micromatch.isMatch(normalizedPath, pattern))

          if (!isCurrentFileTesting)
          {
            context.report({
              node,
              messageId: TESTING_PUBLIC_ERROR,
            })
          }
        }
      }
    };
  },
};
