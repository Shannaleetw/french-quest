# French Quest — Product Lessons from Lily / 刷刷庫

Date: 2026-08-23
Source basis: interview transcript provided by Shanna, "What's Next? EP10" with Chen Lily.

## Why this note exists

This is not a blueprint to copy 刷刷庫. The goal is to extract lessons that can help French Quest avoid expensive detours, especially as a language-learning product led by a non-engineering founder.

## 1. Do not confuse a good learning product with a complete business product

Lily’s biggest retrospective lesson was that monetization features were not ready on Day One. She spent too much time perfecting onboarding and product details while free trial, pricing presentation, promotion mechanisms, and funnel design were delayed.

For French Quest:

- Do not spend endless cycles polishing content while postponing conversion design.
- Free / Paid logic should be designed early, even if payments are not implemented immediately.
- Important commercial flows should be treated as core product design, not something added after launch.

Working principle:

> French Quest is not only a teaching tool. It must be designed as a learning product + retention system + conversion system.

## 2. Avoid polishing from 90 to 95 when another system is still missing

Lily described an MVP that focused too much on small question/product refinements that had little impact on revenue, while monetization infrastructure remained incomplete.

For French Quest:

Once content reaches a trustworthy and useful standard, do not keep using most product time on micro-copy or tiny content refinements if larger systems are still undefined.

Priority categories should include:

- acquisition
- activation
- learning value
- retention
- conversion
- monetization

Content quality is essential, but it cannot be the only thing being optimized.

## 3. Define product logic before coding

Lily said that if she rebuilt the app, she would first spend much more time completing the design document, flow, wireframes, and feature logic before handing work to engineers.

Her earlier back-and-forth between founder, designer, and developer caused rework and unnecessary cost.

For French Quest, keep this workflow:

1. Founder identifies problem / idea.
2. Product logic is clarified first.
3. User-facing behavior is defined.
4. Edge cases and persistence rules are defined.
5. Only then give 光希 a precise implementation spec.

This is especially important for systems such as:

- XP
- skill performance
- weak spots
- Review Mode
- Readiness Roadmap
- Vocabulary Memory Engine
- Free / Paid differences

## 4. The founder’s moat is not code

Lily emphasized that although she was new to software, she already understood English learners, the exam market, and which products people were willing to use or buy.

For French Quest, the core advantage should not be “we can build a website.”

The stronger moat is learning design for Mandarin-speaking TEF Canada learners:

- knowing where Chinese-speaking learners misread French
- identifying useful TEF-style clues
- building realistic Canadian-life situations
- writing explanations that help comprehension rather than merely translating
- turning mistakes and uncertainty into actionable review
- connecting test practice with usable French

Technology supports this value; it is not the value itself.

## 5. Do not let content expertise become a trap

Lily said content was the largest cost in 刷刷庫. High-quality test content required writers, teachers, reviewers, audio work, and visual production.

For French Quest, future cost is also likely to grow through content rather than code alone:

- mission writing
- answer design
- explanations
- TEF Tips
- audio
- images / documents / signs
- review content
- calibration

Therefore:

- use a repeatable content system
- define templates and QA rules
- avoid bespoke production when reusable structures work
- distinguish “content required for learner value” from “content added because it feels more complete”

## 6. Use simple tools when they solve the real problem

Lily described using WordPress rather than building an expensive custom backend for article editing.

For French Quest:

Do not custom-build infrastructure merely because it sounds more professional.

Prefer the simplest solution that safely supports the product requirement.

Examples of this principle:

- static data when a database is not yet needed
- existing services for forms / email / payments where appropriate
- simple admin workflows before custom CMS
- clear JSON/content schemas before building complex content tooling

## 7. Founder–developer communication must be understandable

Lily’s standard was effectively “explain it to me like I’m five.” She needed technical partners who could translate constraints into language she could evaluate.

For French Quest:

- technical explanations should be converted into product consequences
- specs should describe expected behavior, not only implementation
- founder should be able to answer: what changes for the learner, what can break, and why this approach is being chosen

The founder does not need to become the engineer in order to own the product decision.

## 8. Do not blindly copy 刷刷庫’s growth assumptions

Important difference:

Lily already had a large audience, brand recognition, extensive English-market experience, and strong distribution before the app launch.

French Quest does not currently have the same starting conditions.

Therefore we cannot assume:

- good conversion automatically solves growth
- TEF demand automatically means users will pay
- a subscription model proven in TOEIC Taiwan will transfer directly to TEF Canada
- the same pricing / trial / content-volume model will work

French Quest still needs its own evidence for:

- acquisition
- willingness to pay
- repeat usage
- retention
- perceived value of roadmap / diagnosis / review features

## 9. Monetization should answer a learner problem, not merely lock features

Lily’s lesson about monetization reinforces the current French Quest strategy:

Free should provide real learning value.

Paid should provide deeper decision support.

Current thesis:

- Free = practice + basic feedback
- Paid = diagnosis + direction + progression

Paid value can answer:

1. Where am I now?
2. Why am I stuck?
3. What should I do next?

Potential paid layers:

- full Readiness Roadmap
- weak-point analysis
- performance trends
- personalized recommendations
- deeper Memory Engine features
- larger mission/content access

XP should remain an engagement metric rather than a language-level claim.

## 10. Product principle to revisit before major feature work

Before building a major new feature, ask:

1. What learner problem does this solve?
2. Is this core learning value, retention, conversion, or monetization?
3. Are we improving a meaningful system or polishing a detail?
4. Can the product logic be defined before implementation?
5. Is there a simpler existing tool that can solve it?
6. Does this strengthen French Quest’s real moat?

## One-sentence takeaway

> Do not only build a better worksheet. Build a complete learning product whose content, feedback, retention, and business model reinforce one another.
