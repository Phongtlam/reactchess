---
inject: true
to: src/store/actions/index.ts
after: getReturnOfExpression
skip_if: import { <%= name %>Actions }
---
import { <%= name %>Actions } from '@App/store/actions/<%= name %>/<%= name %>Actions';