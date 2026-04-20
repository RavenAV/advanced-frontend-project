/**
 * @fileoverview feature sliced relative path checker
 * @author Raven
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  //parserOptions: {ecmaVersion: 6, sourceType: "module"},
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: 'D:\\AdvancedFrontend\\...\\src\\features\\AddCommentForm',
      code: "import { addCommentFormActions } from '../../model/slices/addCommentFormSlice';"
    }
  ],

  invalid: [
    {
      filename: 'D:\\AdvancedFrontend\\production\\src\\features\\AddCommentForm',
      code: "import { addCommentFormActions } from 'features/AddCommentForm/model/slices/addCommentFormSlice';",
      errors: [{ messageId: "relative-paths-rule" /*В рамках одного слайса все пути должны быть относительными ^.^*/ }],
    },
    {
      filename: 'D:\\AdvancedFrontend\\production\\src\\features\\AddCommentForm',
      code: "import { addCommentFormActions } from '@/features/AddCommentForm/model/slices/addCommentFormSlice';",
      errors: [{ messageId: "relative-paths-rule" /*В рамках одного слайса все пути должны быть относительными ^.^*/ }],
      options: [{ alias: '@' }]
    },
  ],
});
