exports['reporter retries can injest events #1'] = [
  [
    "start",
    null
  ],
  [
    "suite",
    "{Suite}"
  ],
  [
    "suite",
    "{Suite}"
  ],
  [
    "hook",
    "{Object 50}"
  ],
  [
    "hook end",
    "{Object 50}"
  ],
  [
    "test",
    "{Test}"
  ],
  [
    "hook",
    "{Object 52}"
  ],
  [
    "hook end",
    "{Object 52}"
  ],
  [
    "pass",
    "{Test}"
  ],
  [
    "test end",
    "{Test}"
  ],
  [
    "hook",
    "{Object 53}"
  ],
  [
    "hook end",
    "{Object 53}"
  ],
  [
    "test:after:run",
    "{Test}"
  ],
  [
    "test",
    "{Test}"
  ],
  [
    "hook",
    "{Object 50}"
  ],
  [
    "hook end",
    "{Object 50}"
  ],
  [
    "pass",
    "{Test}"
  ],
  [
    "test end",
    "{Test}"
  ],
  [
    "hook",
    "{Object 53}"
  ],
  [
    "hook end",
    "{Object 53}"
  ],
  [
    "test:after:run",
    "{Test}"
  ],
  [
    "test",
    "{Test}"
  ],
  [
    "hook",
    "{Object 50}"
  ],
  [
    "hook end",
    "{Object 50}"
  ],
  [
    "pass",
    "{Test}"
  ],
  [
    "test end",
    "{Test}"
  ],
  [
    "hook",
    "{Object 53}"
  ],
  [
    "hook end",
    "{Object 53}"
  ],
  [
    "hook",
    "{Object 53}"
  ],
  [
    "hook end",
    "{Object 53}"
  ],
  [
    "test:after:run",
    "{Test}"
  ],
  [
    "suite end",
    "{Suite}"
  ],
  [
    "suite end",
    "{Suite}"
  ],
  [
    "end",
    null
  ]
]

exports['reporter retries can receive retry events #1'] = [
  [
    "test",
    {
      "title": "test 1",
      "fn": "[Function]",
      "_timeout": 2000,
      "_slow": 75,
      "_enableTimeouts": true,
      "_trace": "Error: done() called multiple times",
      "_retries": 2,
      "_currentRetry": 0,
      "pending": false,
      "type": "test",
      "body": "[body]",
      "duration": 1,
      "state": "passed",
      "parent": "{Suite}",
      "id": "r3",
      "wallClockStartedAt": "1970-01-01T00:00:00.000Z",
      "timings": {
        "lifecycle": 1,
        "before all": [
          {
            "hookId": "h1",
            "fnDuration": 1,
            "afterFnDuration": 1
          }
        ],
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": 1,
            "afterFnDuration": 1
          }
        ],
        "test": {
          "fnDuration": 1,
          "afterFnDuration": 1
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": 1,
            "afterFnDuration": 1
          }
        ]
      },
      "speed": "fast",
      "wallClockDuration": 1,
      "clone": "[Function]",
      "timeout": "[Function]",
      "slow": "[Function]",
      "enableTimeouts": "[Function]",
      "skip": "[Function]",
      "retries": "[Function]",
      "currentRetry": "[Function]",
      "fullTitle": "[Function]",
      "clearTimeout": "[Function]",
      "inspect": "[Function]",
      "resetTimeout": "[Function]",
      "globals": "[Function]",
      "run": "[Function]",
      "titlePath": "[Function]",
      "setMaxListeners": "[Function]",
      "getMaxListeners": "[Function]",
      "emit": "[Function]",
      "addListener": "[Function]",
      "on": "[Function]",
      "prependListener": "[Function]",
      "once": "[Function]",
      "prependOnceListener": "[Function]",
      "removeListener": "[Function]",
      "removeAllListeners": "[Function]",
      "listeners": "[Function]",
      "listenerCount": "[Function]",
      "eventNames": "[Function]"
    }
  ],
  [
    "test",
    {
      "title": "test 3",
      "fn": "[Function]",
      "_timeout": 2000,
      "_slow": 75,
      "_enableTimeouts": true,
      "_trace": "Error: done() called multiple times",
      "_retries": 2,
      "_currentRetry": 0,
      "pending": false,
      "type": "test",
      "body": "[body]",
      "duration": 1,
      "state": "passed",
      "parent": "{Suite}",
      "id": "r5",
      "wallClockStartedAt": "1970-01-01T00:00:00.000Z",
      "timings": {
        "lifecycle": 1,
        "before each": [
          {
            "hookId": "h2",
            "fnDuration": 1,
            "afterFnDuration": 1
          }
        ],
        "test": {
          "fnDuration": 1,
          "afterFnDuration": 1
        },
        "after each": [
          {
            "hookId": "h3",
            "fnDuration": 1,
            "afterFnDuration": 1
          }
        ],
        "after all": [
          {
            "hookId": "h4",
            "fnDuration": 1,
            "afterFnDuration": 1
          }
        ]
      },
      "speed": "fast",
      "wallClockDuration": 1,
      "clone": "[Function]",
      "timeout": "[Function]",
      "slow": "[Function]",
      "enableTimeouts": "[Function]",
      "skip": "[Function]",
      "retries": "[Function]",
      "currentRetry": "[Function]",
      "fullTitle": "[Function]",
      "clearTimeout": "[Function]",
      "inspect": "[Function]",
      "resetTimeout": "[Function]",
      "globals": "[Function]",
      "run": "[Function]",
      "titlePath": "[Function]",
      "setMaxListeners": "[Function]",
      "getMaxListeners": "[Function]",
      "emit": "[Function]",
      "addListener": "[Function]",
      "on": "[Function]",
      "prependListener": "[Function]",
      "once": "[Function]",
      "prependOnceListener": "[Function]",
      "removeListener": "[Function]",
      "removeAllListeners": "[Function]",
      "listeners": "[Function]",
      "listenerCount": "[Function]",
      "eventNames": "[Function]"
    }
  ]
]
