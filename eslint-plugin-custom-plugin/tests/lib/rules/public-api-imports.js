/**
 * @fileoverview check imports
 * @author raven
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { addCommentFormActions } from '../../model/slices/addCommentFormSlice';",
      errors: []
    },
    {
      code: "import { addCommentFormActions } from '@/features/AddCommentForm';",
      options: [{ alias: '@' }],
      errors: []
    },
    {
      filename: 'D:\\AdvancedFrontend\\production\\src\\entities\\file.test.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'D:\\AdvancedFrontend\\production\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    }
  ],

  invalid: [
    {
      code: "import { addCommentFormActions } from 'features/AddCommentForm/model/slices/addCommentFormSlice';",
      errors: [{ messageId: "import-from-public-api-rule" }],
    },
    {
      code: "import { addCommentFormActions } from '@/features/AddCommentForm/model/slices/addCommentFormSlice';",
      errors: [{ messageId: "import-from-public-api-rule" }],
      options: [{ alias: '@' }]
    },
    {
      filename: 'D:\\AdvancedFrontend\\production\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
      errors: [{ messageId: 'import-from-public-api-rule' }],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'D:\\AdvancedFrontend\\production\\src\\entities\\forbidden.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [{ messageId: 'import-from-testing-public-api-rule' }],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    }
  ],
});
