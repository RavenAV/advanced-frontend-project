/**
 * @fileoverview layer imports
 * @author raven
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/layer-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const aliasOptions = [
  {
    alias: '@'
  }
]

const ruleTester = new RuleTester();
ruleTester.run("layer-imports", rule, {
  valid: [
    {
      // из shared слоя импортируем внутрь feature
      filename: 'D:\\AdvancedFrontend\\production\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
      errors: [],
      options: aliasOptions,
    },
    {
      // из entity слоя импортируем внутрь feature
      filename: 'D:\\AdvancedFrontend\\production\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      // из widgets слоя импортируем внутрь app
      filename: 'D:\\AdvancedFrontend\\production\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      // в widget импортируем внутрь библиотеку 
      filename: 'D:\\AdvancedFrontend\\production\\src\\widgets\\pages',
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: aliasOptions,
    },
    {
      // в app импортируем внутрь библиотеку 
      filename: 'D:\\AdvancedFrontend\\production\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
      errors: [],
      options: aliasOptions,
    },
    {
      // из app слоя импортируем внутрь src index.tsx
      filename: 'D:\\AdvancedFrontend\\production\\src\\index.tsx',
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: aliasOptions,
    },
    {
      // из app слоя импортируем внутрь entity
      filename: 'D:\\AdvancedFrontend\\production\\src\\entities\\Article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ],
    },
  ],

  invalid: [
    {
      filename: 'D:\\AdvancedFrontend\\production\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Articl'",
      errors: [{ messageId: "layer-imports-rule" }],
      options: aliasOptions,
    },
    {
      filename: 'D:\\AdvancedFrontend\\production\\src\\features\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
      errors: [{ messageId: "layer-imports-rule" }],
      options: aliasOptions,
    },
    {
      filename: 'D:\\AdvancedFrontend\\production\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
      errors: [{ messageId: "layer-imports-rule" }],
      options: aliasOptions,
    },
  ],
});
