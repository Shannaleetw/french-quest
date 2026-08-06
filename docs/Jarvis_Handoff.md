# French Quest — Jarvis Handoff

Last updated: 2026-08-06 16:31 EDT
Owner: Shanna Lee
Jarvis role: product strategy, learning design, copy, launch planning, handoff notes
光希 role: local developer, local testing, repo maintenance, code execution

---

## 1. Current Project Status

French Quest is a TEF Canada French practice website based on real Canadian life missions.

Current live site:
https://shannaleetw.github.io/french-quest/

GitHub repo:
https://github.com/Shannaleetw/french-quest

Branch:
main

Current launch stage:
Friend testing / early validation

Current status:
- Coffee Shop Mission is complete with 25 original questions.
- Early Access Google Form is connected.
- Feedback Google Form is connected.
- Homepage has launch copy, About section, Early Access section, and Disclaimer.
- Grocery Store and Banking are currently marked as Coming Soon.

---

## 2. Product Positioning

Main message:
Practice TEF Canada French through real Canadian life missions.

Friendly version:
Learn French through real Canadian situations.

French Quest is NOT:
- an official TEF website
- a grammar-drill-only site
- a Duolingo clone
- a CLB score predictor

French Quest is:
- a practical TEF Canada preparation tool
- based on real-life Canadian situations
- built around original TEF-style practice questions
- designed to help learners notice wrong answers, guessed answers, timing, vocabulary, patterns, and test-style thinking

---

## 3. Non-Negotiable Rules

Do not use official TEF copyrighted content.

Do not claim that users are CLB 4 / CLB 5 / CLB 7, etc.

Do not say French Quest guarantees official TEF results.

Use TEF Readiness / Practice Readiness only as a practice indicator.

Keep the disclaimer visible and honest.

Do not build full login, password accounts, Stripe subscription, or backend database unless Shanna explicitly approves.

Do not make large product-direction changes without checking with Shanna first.

---

## 4. Current Files to Know

Main app files:
- index.html
- style.css
- mobile-fixes.css
- script.js

Data:
- data/coffee_shop.json

Docs:
- docs/Product_Vision.md
- docs/MVP_Roadmap.md
- docs/Jarvis_Handoff.md

Progress storage:
- localStorage key: frenchQuestProgressV03

---

## 5. Current Features

Already built:
- Start Coffee Shop Mission
- 25-question Coffee Shop practice
- Instant feedback after each question
- Vocabulary notes
- Pattern notes
- TEF tips
- Time spent per question
- Mission Complete summary
- Wrong-question tracking
- I guessed this tracking
- Review Weak Spots
- Retake with randomized question order and randomized answer options
- TEF Readiness practice indicator
- Early Access form button
- Feedback form button

External form links:

Early Access:
https://forms.gle/cgmTvvnV7hXWH4gQ8

Feedback:
https://forms.gle/qqwyvQ2wFDUZEk8bA

---

## 6. Current Developer Task for 光希

Please pull the latest repo and test the current site before Shanna shares it with friends.

Do not modify files yet.

Test locally and, if possible, compare with the live GitHub Pages site.

Please test:
1. Homepage loads correctly.
2. Join Early Access List opens the Early Access Google Form.
3. Give Feedback opens the Feedback Google Form.
4. Start Coffee Shop Mission works.
5. Options can be selected.
6. Submit works.
7. Next Question works.
8. I guessed this can be toggled.
9. Feedback page shows correct / incorrect, question, user answer, time spent, vocabulary, pattern, TEF tip.
10. Mission Complete page appears after the final question.
11. Mission Complete page shows score, XP, TEF Readiness, wrong questions, guessed questions, total time, average time.
12. Retake appears after completion and randomizes question / option order.
13. Review Weak Spots appears when there are wrong or guessed questions.
14. Mobile layout is usable.
15. No JavaScript console errors appear during normal use.

Report back:
- What you tested
- Any bugs found
- Whether links open correctly
- Whether mobile looks usable
- Whether any files were changed
- If any files were changed, list files and commit message

---

## 7. Testing Message for Friends

Suggested message Shanna can send to friends:

Hi! I’m testing an early version of a small French practice website I’m building for TEF Canada learners.

It is called French Quest. The first mission is Coffee Shop.

Could you try it for 3–5 minutes and tell me what feels clear, confusing, useful, or missing?

Website:
https://shannaleetw.github.io/french-quest/

Feedback form:
https://forms.gle/qqwyvQ2wFDUZEk8bA

This is still an early test version, so honest feedback is more useful than polite feedback.

---

## 8. Next Product Priorities

Near-term priority:
Friend testing and feedback collection.

Do not expand too fast before feedback.

After friend testing, decide based on feedback:
- whether homepage copy is clear
- whether users understand the mission concept
- whether Coffee Shop feels useful
- whether TEF Readiness is confusing
- whether Review Weak Spots is useful
- whether users want Grocery Store / Banking next
- whether anyone joins Early Access

Likely next content tasks:
1. Grocery Store Mission outline
2. Grocery Store 25-question data
3. Banking Mission outline
4. Banking 25-question data

Likely next technical tasks:
1. Improve friend-testing UX if bugs appear
2. Possibly add clearer CTA after mission completion
3. Possibly add a reset-progress button for testers, if needed

---

## 9. How Jarvis and 光希 Should Coordinate

Jarvis should handle:
- product direction
- feature prioritization
- learning design
- mission structure
- wording and copy
- launch checklist
- feedback interpretation
- handoff updates

光希 should handle:
- local repo access
- local test run
- debugging
- JS / CSS / HTML edits
- commit / push
- technical implementation

Recommended workflow:
1. Shanna discusses product direction with Jarvis.
2. Jarvis updates docs/Jarvis_Handoff.md with the current decision and task.
3. 光希 pulls latest repo and reads docs/Jarvis_Handoff.md.
4. 光希 executes the current developer task.
5. 光希 reports back to Shanna.
6. Shanna asks Jarvis to interpret results and decide the next move.

---

## 10. Current Instruction to 光希

光希，請先不要大改。

你的第一個任務是：
Pull latest repo, read this handoff file, test the site, and report bugs.

Do not change product direction.
Do not add new features yet.
Do not replace TEF Readiness with CLB score.
Do not remove the disclaimer.
