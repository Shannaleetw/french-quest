# French Quest Daily Save — 2026-08-14

Saved by: Jarvis  
Local time: 2026-08-14 16:18 EDT

## Current Product Status

Coffee Shop Mission is still the live onboarding mission.

Grocery Store is still Coming Soon and has not been opened to users.

Banking is still Coming Soon and has not been opened to users.

The live site is stable after today’s homepage copy polish and review-flow fixes.

## Completed Today

### 1. Future Feature Recorded: TEF Practice Diagnosis

A future feature document was added.

File:

```text
docs/Future_Feature_TEF_Practice_Diagnosis.md
```

Commit SHA:

```text
9e31865
```

Purpose:

After users complete multiple practice sessions, French Quest may diagnose their strongest and weakest TEF-style practice areas based on wrong answers, guessed answers, time spent, and question tags.

Important framing:

- This should not be called official TEF score prediction.
- This should not be called CLB prediction.
- Preferred framing: TEF Practice Focus / Learning Diagnosis / Practice Profile.
- Suggested message: “Based on your practice, here is what you should focus on next.”
- Do not build now. Revisit after at least 2–3 missions and more user practice data.

### 2. Coming Soon Mission Cards Polish

Grocery Store and Banking Coming Soon cards were polished.

Commit SHA:

```text
5c5584b
```

Changes:

- Grocery Store remains Coming Soon.
- Banking remains Coming Soon.
- Grocery Store preview copy was added, then later shortened.
- Banking preview copy was added, then later shortened.
- Coffee Shop remained playable.
- Grocery Store JSON was not connected.

### 3. Homepage Mandarin Positioning + Shorter Coming Soon Cards

Homepage positioning was updated to clarify the target audience.

Commit SHA:

```text
8d5789a
```

Changes:

- Added Chinese positioning line:

```text
為中文使用者設計的 TEF Canada 法文情境練習工具。
```

- Grocery / Banking card copy was shortened.
- Grocery Store remains Coming Soon.
- Grocery Store was not opened.
- Coffee Shop remained playable.
- Live site updated successfully.
- Console had no errors.

### 4. Founder Review Read and Triage Completed

Founder review file read:

```text
260813_French Quest 第二輪審查（Jennie）.pdf
```

Main public-before-launch findings from founder review:

1. Interface language strategy still needs more Traditional Chinese alignment.
2. Review Mode weak spots did not clear after review.
3. Early Access Form had a stray “選項 4”.

Actions taken today:

- “選項 4” was fixed manually in Google Forms by Shanna.
- Review Mode weak spots clearing was fixed.
- Mission Complete Review button was added.

Google Forms note:

- Early Access Form and Feedback Form should eventually be converted to Traditional Chinese.
- Shanna decided to discuss the two Google Forms later, not today.

### 5. Review Mode Weak Spots Clearing Fixed

Review Mode now clears weak spots correctly.

Commit SHA:

```text
a21c518
```

Behavior verified by 光希:

- Review Mode all correct → weak spots are cleared.
- Review Mode with 1 wrong answer → that question remains in weak spots.
- Coffee Shop remains playable.
- Retake remains usable.
- Grocery Store remains Coming Soon and unopened.
- Grocery Store JSON was not connected.
- Live site updated successfully.
- Console had no errors.
- git status was clean.

### 6. Mission Complete Review Button Added

Mission Complete page now has a direct Review Weak Spots entry when weak spots exist.

Commit SHA:

```text
ff47be9
```

Behavior verified by 光希:

- Mission Complete page shows `Review N Weak Spots` when weak spots exist.
- N uses `getReviewQuestions().length`, based on deduplicated wrong + guessed questions.
- Clicking the button enters Review Mode directly.
- Review Complete page text was corrected:

```text
Great work — you cleared your weak spots for this mission. Next mission: Grocery Store — coming soon.
```

- Review all correct clears weak spots.
- Review with 1 wrong keeps that question in weak spots.
- Coffee Shop remains playable.
- Retake remains usable.
- Grocery Store remains Coming Soon and unopened.
- Live site updated successfully.
- Console had no errors.
- git status was clean.

## Key Product Decisions Today

### Language Strategy

French Quest’s target users remain:

```text
Mandarin-speaking TEF Canada learners
```

Current interface strategy is still evolving.

Shanna and Jarvis agreed:

- Do not immediately turn the entire homepage into Chinese without planning.
- Add clear Chinese positioning first.
- Later discuss whether to convert the full interface, mission flow, summary pages, and Google Forms to Traditional Chinese.
- Google Forms should eventually be localized to Traditional Chinese, but this is deferred.

### Founder Review Triage

Founder review is useful and concrete, but it should be translated into product actions rather than treated as unlimited scope.

Completed / addressed:

- Early Access Form “選項 4” fixed.
- Review Mode weak spots clearing fixed.
- Mission Complete Review button added.
- Homepage now has at least one clear Mandarin positioning line.

Still open:

- Full or partial Traditional Chinese interface plan.
- Early Access Form Traditional Chinese version.
- Feedback Form Traditional Chinese version.

### Product Scope Guardrails

Do not open Grocery Store yet.

Do not connect `data/grocery_store.json` yet.

Do not add payments yet.

Do not build member login yet.

Do not heavily redesign Coffee Shop yet.

Do not redo positioning because of one piece of feedback.

## Current Repo / Live Site Status

Known latest completed commits today:

```text
9e31865 — Add future feature note for TEF Practice Diagnosis
5c5584b — Polish Coming Soon mission cards
8d5789a — Add Mandarin positioning and shorten cards
 a21c518 — Fix Review Mode weak spots clearing
ff47be9 — Add Mission Complete Review button
```

Note: commit `a21c518` should be recorded without the leading space above if copied into command-line tools.

Live site should currently have:

- Coffee Shop playable.
- Grocery Store Coming Soon.
- Banking Coming Soon.
- Chinese positioning line on homepage.
- Shorter Grocery / Banking cards.
- Review Mode weak spots clearing.
- Mission Complete Review button.

## Next Recommended Steps

### Option A — Language / Localization Plan

Plan the Traditional Chinese interface strategy before asking 光希 to implement it.

Questions to decide:

- Full Traditional Chinese interface or bilingual interface?
- Which strings should stay English for product/tool feel?
- Should buttons be Chinese, English, or bilingual?
- Should mission questions remain English + French, or shift to Chinese instructions?
- How should Google Forms be localized?

### Option B — Google Forms Chinese Version

Later discussion item:

- Convert Early Access Form to Traditional Chinese.
- Convert Feedback Form to Traditional Chinese.
- Preserve the same data goals but make the questions feel natural to Mandarin-speaking TEF learners.

### Option C — Save and QA Confirmation

Ask 光希 to verify current live site once more:

- Coffee Shop works.
- Review button appears after wrong / guessed questions.
- Review clears weak spots after all correct.
- Grocery Store remains Coming Soon.
- Console has no errors.

## Do Not Do Next Without Decision

- Do not open Grocery Store.
- Do not connect Grocery Store JSON.
- Do not translate the entire website without a localization plan.
- Do not create paid flow.
- Do not create login/member system.
- Do not build TEF Practice Diagnosis yet.
- Do not create audio system yet.

## Tomorrow Start Prompt

Shanna can say:

```text
Jarvis, read the 2026-08-14 daily save. Let’s continue French Quest.
```

Suggested next conversation:

```text
Let’s decide the Traditional Chinese / bilingual interface strategy before asking 光希 to change anything.
```
