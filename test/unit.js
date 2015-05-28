'use strict';

var testsContext = require.context('../app/', true, /.spec$/);
testsContext.keys().forEach(testsContext);