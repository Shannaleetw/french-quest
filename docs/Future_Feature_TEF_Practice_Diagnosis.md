# Future Feature: TEF Practice Diagnosis

Saved: 2026-08-14

## Status

Future feature idea. Do not build now.

This should be kept as a roadmap concept while French Quest continues focusing on the current MVP loop:

```text
Coffee Shop live onboarding mission
Grocery Store content prepared but not opened
Teaching Style Guide established
Small, feedback-informed iterations
```

## Core Idea

After users complete several practice sessions, French Quest can diagnose their strongest and weakest TEF-style practice areas.

The diagnosis should be based on user behavior, not only final score.

Possible signals:

- Wrong answers
- Questions marked with `I guessed this`
- Time spent per question
- Repeated weak question tags
- Improvement across sessions

## Product Purpose

This feature would turn French Quest from a simple practice website into a teacher-like learning companion.

The goal is not to predict an official TEF score.

The goal is to tell learners:

```text
Based on your practice, here is what you should focus on next.
```

## Suggested Naming

Avoid names that sound like official test prediction, such as `TEF Readiness`.

Better options:

- TEF Practice Focus
- Learning Diagnosis
- Practice Profile
- Weak Spot Report
- Your French Quest Learning Profile

Preferred working name:

```text
TEF Practice Focus
```

## Example Output

```text
Strongest area:
You are good at understanding short staff-customer interactions.

Weakest area:
You often miss signs and notices with conditions, such as `seulement`, `avec reçu`, or `carte requise`.

TEF Practice Focus:
Practice reading small public signs, store notices, and short service instructions.
```

## Future Data Tags

Future question banks may include extra diagnostic tags such as:

```text
tef_focus:
- signs_notices
- price_time_numbers
- staff_interaction
- conditions_rules
- payment_receipt
- daily_life_vocabulary
```

The system could then calculate:

- Which tags the user gets wrong most often
- Which tags the user often guesses on
- Which tags take the longest time
- Which tags are the user's strongest areas

## MVP Version Later

The first version does not need AI.

It can be rule-based:

```text
If many `signs_notices` questions are wrong:
→ Focus on signs and short public notices.

If the user often guesses `payment_receipt` questions:
→ Practice payment and receipt phrases.

If `staff_interaction` is consistently strong:
→ Staff-customer interaction is one of your stronger areas.
```

## Why This Fits French Quest

This feature supports the French Quest core formula:

```text
Real Canadian life mission
+ TEF-style comprehension
+ teacher-style Traditional Chinese support
+ metacognitive learning design
```

It also builds on the existing `I guessed this` idea: guessing is not failure; it is useful learning data.

## Do Not Do Yet

Do not implement this before the core mission system is stable.

Do not rename current practice progress into an official-sounding score predictor.

Do not claim to predict official TEF or CLB performance.

Recommended timing:

```text
After users have at least 2-3 missions and multiple sessions to generate meaningful behavior data.
```
