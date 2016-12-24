# Most Clock Multiplier

> Clock multiplier or periodic functions

Measures the time between stream events, and uses a fraction of that period to schedule new events.

This implementation uses only the previous period to calculate when to schedule events. After those scheduled events occur, the stream will be inactive until the next event from the source.
