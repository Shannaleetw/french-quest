# Future Feature — Vocabulary Memory Engine

Date: 2026-08-19

## Product idea

Add a vocabulary reinforcement system to French Quest that connects mission practice with spaced repetition and active recall.

The learning loop should be:

Mission Practice → Identify unfamiliar vocabulary → Save word → Spaced Review → Active Recall → Reapply in context

This feature is inspired by Ebbinghaus forgetting research, but the product should preferably describe the method as **Spaced Repetition + Active Recall** rather than claiming a fixed “Ebbinghaus method.”

## In-mission interaction

During a mission, users should be able to mark vocabulary they do not know or are unsure about.

Possible UI:
- ☆ Save word
- Remember this word

Example:
- addition
- tasse
- reçu
- monnaie

Saved words go into a personal vocabulary review queue.

## Review progression

Vocabulary practice should gradually move from recognition toward recall and contextual use.

Suggested stages:

### 1. Recognition
Which word means 「帳單」?
- addition
- sucre
- tasse

### 2. Partial recall
`a _ _ _ _ _ n`
帳單

### 3. Full recall
「帳單」
`________`

### 4. Context cloze
`L'________, s'il vous plaît.`

### 5. Situation application
You are ready to pay at a café. Which phrase should you use?

The goal is not only to recognize isolated vocabulary, but to retrieve and reuse it in realistic French Quest situations.

## Spaced review logic

The review interval should eventually adapt to user performance rather than use only a rigid fixed-day schedule.

General behavior:
- new / unfamiliar word → review soon
- incorrect recall → shorten interval
- guessed / uncertain recall → medium interval
- repeated confident correct recall → gradually lengthen interval

Possible home prompt:

**Review today — 6 words**

## Distinguish two weak-spot systems

French Quest should treat these as separate concepts:

### Question Weak Spots
The learner struggles with a question type, comprehension pattern, or situation.

### Vocabulary Memory
The learner does not yet reliably remember a word or expression.

These systems may interact, but should not be merged into one list.

## Free / Paid direction

Possible future model:

### Free
- save vocabulary
- basic daily vocabulary review
- basic review queue
- number of words due for review

### Paid
- adaptive spaced repetition
- richer cloze and context recall exercises
- recurring weak-word analysis
- vocabulary retention trends
- personalized vocabulary recommendations
- integration with mission and readiness roadmap

Example paid insight:

**12 words need reinforcement**

5 are from payment situations.

Recurring weak vocabulary:
- addition
- monnaie
- reçu

Recommended next:
**Payment Vocabulary Review**

## Product role

This feature should become the French Quest **Memory Engine**.

It answers a different question from the TEF Readiness Roadmap:

- Roadmap = Where should I go next?
- Memory Engine = How do I actually retain what I learned?

## Important product principle

The Memory Engine should reinforce vocabulary learned through real-life missions, not turn French Quest into a generic flashcard app.

Context should remain central to the product experience.
