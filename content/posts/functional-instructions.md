+++
date = '2026-02-03T08:25:51-08:00'
draft = false
title = 'Coding Assistant Instructions for Learning'
+++

## When the journey matters more than the destination

Coding agents like Claude Code are cool, but it's no fun if you want to learn to write code yourself. 

If you’re using coding agents but still want to learn, this pattern may help. Below is a set of instructions I include in the agent config file (`CLAUDE.md` for Claude Code) to help it **help me** learn functional programming in my personal projects. The principles are sourced from the book [Mastering JavaScript Functional Programming](https://www.packtpub.com/en-us/product/mastering-javascript-functional-programming-9781804610411) by Federico Kereki. I used AI to refine them to be Python-specific for a project I'm working on.   

Link to GitHub gist [here](https://gist.github.com/rogerthatdev/3c2109fd09a5f2ccd6c2be4c058e0454).

```
## Functional Programming Principles in Python

*   **Pure Functions:** A pure function **always returns the same result given the same arguments** and causes **no observable side effects** (no modifying global variables, mutating objects, or performing I/O). Python doesn't enforce purity, so discipline is required. Pure functions are easier to test and reason about.

*   **Immutability:** Use **data structures that cannot be changed after creation**. Python's immutable types include `tuple`, `frozenset`, `str`, and `NamedTuple`. For custom types, use `@dataclass(frozen=True)`. Prefer creating new data over mutating existing data.

*   **First-Class Functions:** Python treats functions as first-class citizens—they can be **stored in variables, passed as arguments, and returned from functions**. This enables patterns like callbacks, decorators, and dependency injection.

*   **Higher-Order Functions (HOFs):** Functions that **take or return other functions**. Python provides `map()`, `filter()`, and `functools.reduce()`. List comprehensions and generator expressions often serve as more Pythonic alternatives to `map`/`filter`.

*   **Declarative Programming:** Focus on **"what" to compute rather than "how"**. Prefer comprehensions over manual loops, and compose functions rather than writing step-by-step imperative code.

*   **Function Composition:** **Chain simple functions together** to build complex operations. Python lacks a built-in compose operator, but you can chain function calls or use `functools.reduce` to compose functions programmatically.

*   **Recursion:** Recursive functions call themselves with simpler inputs until reaching a base case. **Python caveat:** The default recursion limit is ~1000 and Python has **no tail-call optimization**. For deep recursion, prefer iteration or generators.

*   **Referential Transparency:** An expression is referentially transparent if it can be **replaced by its value without changing program behavior**. This requires pure functions. Python's `@functools.lru_cache` leverages this for memoization.

*   **Partial Application:** Fix some arguments of a function to create a specialized version. Use `functools.partial()` to create partially applied functions. True currying requires a custom decorator or library.

*   **Lazy Evaluation:** Delay computation until results are needed. Python supports this natively via **generators** (`yield`), **generator expressions** `(x for x in items)`, and the **`itertools`** module. This enables memory-efficient processing of large or infinite sequences.

## Teaching Style

- When reviewing code, explicitly label which FP principle applies
- Use the Socratic method: ask guiding questions before giving answers
- Compare imperative vs functional approaches when illustrating concepts
```