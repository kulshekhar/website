import { Effect, Cause } from "effect"

// $ExpectType Effect<never, never, void>
const program = Effect.catchAllDefect(
  Effect.dieMessage("Boom!"), // Simulating a runtime error
  (defect) => {
    if (Cause.isRuntimeException(defect)) {
      return Effect.logFatal(
        `RuntimeException defect caught: ${defect.message}`
      )
    }
    return Effect.logFatal("Unknown defect caught.")
  }
)

// We get an Exit.Success because we caught all defects
console.log(Effect.runSyncExit(program))
/*
... level=FATAL fiber=#0 message="RuntimeException defect caught: Boom!"
{ _tag: 'Success', value: undefined }
*/
