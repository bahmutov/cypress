exports['mocha events simple #1'] = [
  [
    "mocha",
    "start",
    {
      "start": "2019-04-02T22:18:38.975Z"
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r3",
      "title": "test 1",
      "body": "function () {\n      debug(\"test pass: \".concat(name));\n      win.assert(true, name);\n    }",
      "type": "test",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "function () {\n      debug(\"test pass: \".concat(name));\n      win.assert(true, name);\n    }",
      "type": "test",
      "duration": 139,
      "wallClockStartedAt": "2019-04-02T22:18:39.150Z",
      "timings": {
        "lifecycle": 101,
        "test": {
          "fnDuration": 33,
          "afterFnDuration": 5
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "function () {\n      debug(\"test pass: \".concat(name));\n      win.assert(true, name);\n    }",
      "type": "test",
      "duration": 139,
      "wallClockStartedAt": "2019-04-02T22:18:39.150Z",
      "timings": {
        "lifecycle": 101,
        "test": {
          "fnDuration": 33,
          "afterFnDuration": 5
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "function () {\n      debug(\"test pass: \".concat(name));\n      win.assert(true, name);\n    }",
      "type": "test",
      "duration": 139,
      "wallClockStartedAt": "2019-04-02T22:18:39.150Z",
      "wallClockDuration": 190,
      "timings": {
        "lifecycle": 101,
        "test": {
          "fnDuration": 33,
          "afterFnDuration": 5
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "end",
    {
      "end": "2019-04-02T22:18:39.399Z"
    }
  ]
]

exports['src/cypress/runner isolated test runner mocha events 2 #1'] = [
  [
    "mocha",
    "start",
    {
      "start": "match.date"
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r5",
      "title": "test 3",
      "body": "[body]",
      "type": "test",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r5",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r5",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r5",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r5",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r5",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r5",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "end",
    {
      "end": "match.date"
    }
  ]
]

exports['src/cypress/runner isolated test runner mocha events simple #1'] = [
  [
    "mocha",
    "start",
    {
      "start": "2019-04-02T22:14:33.119Z"
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r3",
      "title": "test 1",
      "body": "function () {\n      debug(\"test pass: \".concat(name));\n      win.assert(true, name);\n    }",
      "type": "test",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "function () {\n      debug(\"test pass: \".concat(name));\n      win.assert(true, name);\n    }",
      "type": "test",
      "duration": 146,
      "wallClockStartedAt": "2019-04-02T22:14:33.236Z",
      "timings": {
        "lifecycle": 94,
        "test": {
          "fnDuration": 43,
          "afterFnDuration": 9
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "function () {\n      debug(\"test pass: \".concat(name));\n      win.assert(true, name);\n    }",
      "type": "test",
      "duration": 146,
      "wallClockStartedAt": "2019-04-02T22:14:33.236Z",
      "timings": {
        "lifecycle": 94,
        "test": {
          "fnDuration": 43,
          "afterFnDuration": 9
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "function () {\n      debug(\"test pass: \".concat(name));\n      win.assert(true, name);\n    }",
      "type": "test",
      "duration": 146,
      "wallClockStartedAt": "2019-04-02T22:14:33.236Z",
      "wallClockDuration": 202,
      "timings": {
        "lifecycle": 94,
        "test": {
          "fnDuration": 43,
          "afterFnDuration": 9
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "end",
    {
      "end": "2019-04-02T22:14:33.520Z"
    }
  ]
]

exports['src/cypress/runner isolated test runner test events fail pass #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events hook failures fail in [afterEach] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "hookName": "after each",
      "err": "{Object 6}",
      "state": "failed",
      "failedFromHookId": "h1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events hook failures fail in [after] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "hookName": "after all",
      "err": "{Object 6}",
      "state": "failed",
      "failedFromHookId": "h1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events hook failures fail in [beforeEach] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "hookName": "before each",
      "err": "{Object 6}",
      "state": "failed",
      "failedFromHookId": "h1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events hook failures fail in [before] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "hookName": "before all",
      "err": "{Object 6}",
      "state": "failed",
      "failedFromHookId": "h1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events mocha grep fail with [only] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 2",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 2",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events mocha grep pass with [only] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events no tests #1'] = [
  [
    "run:start"
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events pass fail pass fail #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run",
    {
      "id": "r6",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r6",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r6",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r6",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run",
    {
      "id": "r7",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r7",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r7",
      "title": "test 2",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r7",
      "title": "test 2",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events retries retries from [beforeEach] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h3",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          },
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          },
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h3",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          },
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          },
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h5",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h6",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h5",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h6",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          },
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          },
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h5",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h6",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events retries test retry with [only] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 2",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 2",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events retries test retry with hooks #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events retries test retry with many hooks #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 1,
      "_retries": 1
    }
  ],
  [
    "test:before:run",
    {
      "id": "r5",
      "title": "test 3",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r5",
      "title": "test 3",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r5",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r5",
      "title": "test 3",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r5",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r5",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 1
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events simple 1 #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events simple 3 tests #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run",
    {
      "id": "r5",
      "title": "test 3",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r5",
      "title": "test 3",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r5",
      "title": "test 3",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events simple fail #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events simple fail, catch cy.on(fail) #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": false,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events test failures w/ hooks fail with [after] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events test failures w/ hooks fail with [before] #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        }
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['src/cypress/runner isolated test runner test events test failures w/ hooks fail with all hooks #1'] = [
  [
    "run:start"
  ],
  [
    "test:before:run",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "test:before:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "fail",
    {
      "name": "AssertionError",
      "message": "[error message]",
      "showDiff": false,
      "actual": null,
      "onFail": "[Function]",
      "stack": "match.string"
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "runnable:after:run:async",
    {
      "id": "r3",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "run:end"
  ]
]

exports['threeTestsWithHooks_mocha'] = [
  [
    "mocha",
    "start",
    {
      "start": "match.date"
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r5",
      "title": "test 3",
      "body": "[body]",
      "type": "test",
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r5",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r5",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r5",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r5",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r5",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r5",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 0
    }
  ],
  [
    "mocha",
    "end",
    {
      "end": "match.date"
    }
  ]
]

exports['threeTestsWithHooks_set_runnables'] = [
  [
    "set:runnables",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 0,
      "tests": [],
      "suites": [
        {
          "id": "r2",
          "title": "suite 1",
          "root": false,
          "type": "suite",
          "_retries": 0,
          "tests": [
            {
              "id": "r3",
              "title": "test 1",
              "body": "[body]",
              "type": "test",
              "_currentRetry": 0,
              "_retries": 0
            },
            {
              "id": "r4",
              "title": "test 2",
              "body": "[body]",
              "type": "test",
              "_currentRetry": 0,
              "_retries": 0
            },
            {
              "id": "r5",
              "title": "test 3",
              "body": "[body]",
              "type": "test",
              "_currentRetry": 0,
              "_retries": 0
            }
          ],
          "suites": []
        }
      ]
    },
    "[Function]"
  ]
]

exports['threeTestsWithRetry_mocha'] = [
  [
    "mocha",
    "start",
    {
      "start": "match.date"
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 2
    }
  ],
  [
    "mocha",
    "suite",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 2
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r3",
      "title": "\"before all\" hook",
      "hookName": "before all",
      "hookId": "h1",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r3",
      "title": "test 1",
      "body": "[body]",
      "type": "test",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r3",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r3",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r3",
      "title": "test 1",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r4",
      "title": "test 2",
      "body": "[body]",
      "type": "test",
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "err": "{Object 6}",
      "state": "failed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 1,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 2,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 2,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r4",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r4",
      "title": "test 2",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 2,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "test",
    {
      "id": "r5",
      "title": "test 3",
      "body": "[body]",
      "type": "test",
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r5",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r5",
      "title": "\"before each\" hook",
      "hookName": "before each",
      "hookId": "h2",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "pass",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "test end",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r5",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r5",
      "title": "\"after each\" hook",
      "hookName": "after each",
      "hookId": "h3",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook",
    {
      "id": "r5",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "hook end",
    {
      "id": "r5",
      "title": "\"after all\" hook",
      "hookName": "after all",
      "hookId": "h4",
      "body": "[body]",
      "type": "hook",
      "duration": "match.number",
      "_currentRetry": 0,
      "_retries": -1
    }
  ],
  [
    "mocha",
    "test:after:run",
    {
      "id": "r5",
      "title": "test 3",
      "state": "passed",
      "body": "[body]",
      "type": "test",
      "duration": "match.number",
      "wallClockStartedAt": "match.date",
      "wallClockDuration": "match.number",
      "timings": {
        "lifecycle": "match.number",
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "test": {
          "fnDuration": "match.number",
          "afterFnDuration": "match.number"
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": "match.number",
            "afterFnDuration": "match.number"
          }
        ]
      },
      "_currentRetry": 0,
      "_retries": 2
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r2",
      "title": "suite 1",
      "root": false,
      "type": "suite",
      "_retries": 2
    }
  ],
  [
    "mocha",
    "suite end",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 2
    }
  ],
  [
    "mocha",
    "end",
    {
      "end": "match.date"
    }
  ]
]

exports['threeTestsWithRetry_set_runnables'] = [
  [
    "set:runnables",
    {
      "id": "r1",
      "title": "",
      "root": true,
      "type": "suite",
      "_retries": 2,
      "tests": [],
      "suites": [
        {
          "id": "r2",
          "title": "suite 1",
          "root": false,
          "type": "suite",
          "_retries": 2,
          "tests": [
            {
              "id": "r3",
              "title": "test 1",
              "body": "[body]",
              "type": "test",
              "_currentRetry": 0,
              "_retries": 2
            },
            {
              "id": "r4",
              "title": "test 2",
              "body": "[body]",
              "type": "test",
              "_currentRetry": 0,
              "_retries": 2
            },
            {
              "id": "r5",
              "title": "test 3",
              "body": "[body]",
              "type": "test",
              "_currentRetry": 0,
              "_retries": 2
            }
          ],
          "suites": []
        }
      ]
    },
    "[Function]"
  ]
]
