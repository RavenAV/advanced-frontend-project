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
  ],
});
