# French Quest Teaching Style Guide v0.1

## Purpose

This guide defines the teaching and question-writing style for future French Quest missions, including Grocery Store, Banking, Renting, Healthcare, and other real Canadian life missions.

Use this guide when creating new mission question banks, reviewing draft questions, or preparing a mission for learner testing.

## Target Users

French Quest is designed for Mandarin-speaking TEF Canada learners.

Learners may:
- understand some basic French but feel unsure in real-life situations
- need practical reading and response practice for Canadian daily life
- benefit from teacher-style Traditional Chinese support
- need clear feedback that explains why an answer works, not only whether it is correct

## Mission Design Principles

Each mission should be built around a real Canadian life situation.

Examples:
- ordering at a coffee shop
- shopping at a grocery store
- using a bank
- renting an apartment
- visiting a clinic or pharmacy

Each mission should feel practical, realistic, and useful for TEF Canada learners, without claiming to predict official TEF or CLB results.

## TEF-Style Comprehension

Questions should practice TEF-style comprehension skills:
- understanding signs, notices, short messages, and everyday documents
- identifying key information such as time, price, location, rule, condition, or required action
- choosing the best response in a realistic daily-life exchange
- noticing vocabulary, patterns, and context clues

Do not copy official TEF questions, official prep materials, copyrighted passages, or protected test content.

All questions must be original.

## Question Format

Each question should include:
- `id`
- `mission`
- `part`
- `question_type`
- `question`
- `options`
- `answer`
- `vocabulary`
- `pattern`
- `tef_tip`
- `skill`
- `difficulty`
- `status`

Each question should have exactly four answer options: A, B, C, and D.

## Feedback Style

Every question feedback must include:
- vocabulary
- pattern
- TEF tip

Feedback should feel like a calm teacher explaining the question to a Mandarin-speaking learner.

Use Traditional Chinese for teaching support when helpful, especially in `tef_tip`.

Good feedback should:
- explain the key word or phrase
- show the useful sentence pattern
- point out the test-taking clue
- avoid over-explaining grammar unless it helps comprehension
- help learners understand the situation, not just memorize the answer

## Answer Balance

A/B/C/D answer distribution should be balanced across each mission.

For a 25-question mission, avoid overusing one correct answer letter.

Before finalizing a mission, check:
- how many answers are A
- how many answers are B
- how many answers are C
- how many answers are D

Small variation is okay, but the distribution should not look accidental or biased.

## Distractor Rules

Distractors should be reasonable.

Good distractors:
- are plausible in the same setting
- use related vocabulary
- reflect common learner confusion
- are clearly wrong after reading the question carefully

Avoid distractors that are:
- silly or obviously unrelated
- grammatically impossible when the question is about meaning
- too close to the correct answer without a fair clue
- based on tricks that do not teach useful comprehension

## Difficulty

Use difficulty labels such as:
- A1
- A2
- B1

Most early French Quest missions should stay around A1-A2, with some gentle B1-style comprehension only when the context is clear.

Difficulty should come from realistic comprehension, not from obscure vocabulary.

## Skills

Use skill labels consistently:
- `vocabulary`
- `reading`
- `response`
- `situation`

Only use a skill label if the mission actually teaches or tracks that skill.

Do not add skill categories that the current product does not support.

## Language and Tone

The English question text should be clear and simple.

The French examples should sound natural for Canadian daily life where possible.

Traditional Chinese support should be:
- friendly
- direct
- teacher-like
- practical
- not overly academic

Avoid official-score language.

Do not say:
- this predicts CLB level
- this guarantees TEF results
- this is official TEF content

## Copyright and Safety Rules

Do not use:
- official TEF questions
- official TEF reading passages
- paid prep book content
- copyrighted test materials
- copied website notices unless they are rewritten into original educational examples

French Quest examples should be original, realistic, and inspired by daily-life situations, not copied from protected sources.

## Mission QA Checklist

Before a mission goes live, check:

- The JSON is valid.
- The mission has the expected number of questions.
- Every question has four options.
- Every question has one correct answer.
- A/B/C/D answer distribution is reasonably balanced.
- Every question has vocabulary, pattern, and TEF tip feedback.
- Distractors are plausible and fair.
- The mission uses original content only.
- No official TEF or copyrighted material is included.
- The mission title, route label, and completion page copy are accurate.
- Start, Submit, Next Question, Retake, and Review Weak Spots work.
- Wrong-question tracking works.
- Guessed-question tracking works.
- Completion summary appears correctly.
- Mobile layout is usable.
- No JavaScript console errors appear during normal use.

## Version Notes

v0.1 is the first internal teaching style guide for French Quest mission creation.

Update this guide after friend testing, learner feedback, or new mission design decisions.
