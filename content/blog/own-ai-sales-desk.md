---
title: 'Own the sales desk: WhatsApp answers, outbound books'
date: '2026-11-22'
updated: '2026-11-22'
slug: own-ai-sales-desk
seoTitle: 'Own the Sales Desk'
description: 'Self-hosted AI sales desk for roofing and service firms: DeskcommCRM answers WhatsApp first, AgentSDR runs outbound, and a person approves every reply.'
cluster: 'AI and Automation'
keyword: 'self-hosted AI sales desk'
author: 'Manuel Diprés'
published: true
takeaways:
  - 'DeskcommCRM is an open-source MIT CRM that runs on the firm own VPS, where AI agents answer, qualify, and sell on WhatsApp, with no subscription and no per-seat fee.'
  - 'AgentSDR is a free, MIT-licensed AI SDR you host yourself, running email, LinkedIn, and WhatsApp outreach from one workspace, where every reply lands in one Action required queue and nothing is sent until a person approves it.'
  - 'The software costs nothing, but the cost moves to the services you connect, your server, your mailboxes, Unipile, your OpenRouter AI usage, and Resend, so Dipriva builds the desk with the approval queue and the backups included.'
faq:
  - q: 'What is DeskcommCRM?'
    a: 'DeskcommCRM is an open-source MIT CRM that runs on the firm own server, where AI agents answer, qualify, and sell on WhatsApp. It installs on a Docker VPS, needs a domain, a free Supabase account, and an AI key from OpenRouter, Anthropic, or OpenAI, and connects the firm WhatsApp number by QR code during onboarding or through Meta official channel.'
  - q: 'What is AgentSDR?'
    a: 'AgentSDR is a free, MIT-licensed AI SDR you host yourself. It runs email sequences, LinkedIn campaigns, and WhatsApp messages and calls from one workspace, with a built-in AI CRM that classifies every reply and drafts the answer. Every reply lands in one Action required queue, and nothing is sent until a person approves it.'
  - q: 'Is the software really free?'
    a: 'Yes for the software itself. DeskcommCRM and AgentSDR are both open source under the MIT License, with no seats, tiers, or per-contact fees. You pay for your own server, the accounts you connect, and your own AI usage, so the cost moves to the services you connect instead of disappearing.'
  - q: 'What are the risks to name before installing either tool?'
    a: 'DeskcommCRM WhatsApp QR pairing runs through WAHA, an unofficial protocol, so the ban risk is yours, and the official Cloud API is the scaling path. Supabase free tier takes no backups, so the firm must schedule its own. AgentSDR is a very young project, first public release on October 6, 2026, still pre-1.0, and LinkedIn and WhatsApp automation carry account-restriction risk.'
sources:
  - url: 'https://github.com/melgarafael/deskcommcrm/blob/HEAD/README.en.md'
    publisher: 'GitHub'
    title: 'DeskcommCRM README.en.md'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'AI agents that answer, qualify and sell on WhatsApp'
  - url: 'https://github.com/melgarafael/deskcommcrm/blob/HEAD/README.en.md'
    publisher: 'GitHub'
    title: 'DeskcommCRM README.en.md'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'No subscription, no gated features, your data stays yours.'
  - url: 'https://frontiernow.dev/en/github/deskcommcrm/'
    publisher: 'Frontier Now'
    title: 'DeskcommCRM: AI agents run WhatsApp sales'
    published: '2026-09-30'
    retrieved: '2026-11-22'
    quote: 'Two WhatsApp paths: QR pairing through WAHA (multi-number, with anti-ban throttling, jitter and sending windows) or Meta official Cloud API with template approval and sync'
  - url: 'https://frontiernow.dev/en/github/deskcommcrm/'
    publisher: 'Frontier Now'
    title: 'DeskcommCRM: AI agents run WhatsApp sales'
    published: '2026-09-30'
    retrieved: '2026-11-22'
    quote: 'the repo sits at 4,270 stars as of September 30, 2026.'
  - url: 'https://agentsdr.ai/solutions/founders'
    publisher: 'AgentSDR'
    title: 'AI SDR for founders: founder-led outbound'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'AgentSDR is open source under the MIT License. There are no seats, tiers or per-contact fees, so a team of one pays the same as a team of ten: nothing for the software.'
  - url: 'https://agentsdr.ai/solutions/founders'
    publisher: 'AgentSDR'
    title: 'AI SDR for founders: founder-led outbound'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'No. The AI classifies replies and drafts answers, but nothing is sent until a person approves it. It applies a classification on its own only when it is confident (85% by default), and holds anything else as a proposal for you to accept or change.'
    figures: ['85%']
  - url: 'https://agentsdr.ai/solutions/founders'
    publisher: 'AgentSDR'
    title: 'AI SDR for founders: founder-led outbound'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'Sequences send on their own inside sending hours, replies from every channel land in one Action required queue, and the AI classifies each one and drafts an answer. Your job is to review drafts and send them, not to chase tabs.'
  - url: 'https://www.aiagentslist.io/agents/agentsdr'
    publisher: 'AIAgentsList'
    title: 'AgentSDR Review 2026: Open-Source, Self-Hosted AI SDR'
    published: '2026-11-22'
    retrieved: '2026-11-22'
    quote: 'A very young project: first public release on October 6, 2026, still pre-1.0, and the project says minor releases may include breaking changes'
---

A self-hosted AI sales desk is the work that turns two new open-source tools into one sales operation a firm owns. This post covers DeskcommCRM, an open-source CRM where AI agents run WhatsApp sales, and AgentSDR, a free AI SDR you host yourself. One answers the customer who messaged first. The other reaches the prospect who has not heard from you yet. Both run on the firm own server, both draft with AI, and both stop at a human approval. A roofing or service firm that runs both owns the desk instead of renting it by the seat.

## DeskcommCRM answers the customer who messaged first

For roofing and service firms, the first message usually arrives on WhatsApp. A homeowner sends a photo of a leak, asks for a quote, or asks when a crew can come. The firm that answers first usually wins the job, and the firm that answers at midnight usually does not exist yet. DeskcommCRM is built for that first message.

DeskcommCRM is an open-source CRM where AI agents run your WhatsApp sales. The project describes itself in one line: AI agents that answer, qualify and sell on WhatsApp. The agents live inside a CRM that runs on the firm own server, not on a vendor cloud. The same line adds the commercial point: no subscription, no gated features, your data stays yours. It is the open alternative to Kommo, Octadesk, and Intercom, and it is written in TypeScript under the MIT license. The repo sits at 4,270 stars as of September 30, 2026, according to Frontier Now, which checked the project that day.

The install is the main path, and it is short. The CRM installs on a Docker VPS with one command, 4 GB of RAM recommended. What the firm needs on hand is a VPS with Docker, a domain pointed at it, a free Supabase account, and one AI key, from OpenRouter, Anthropic, or OpenAI. The installer generates the secrets, applies the database schema, creates the first admin, and brings the stack up with HTTPS. Then the firm connects its WhatsApp number, by scanning a QR code during onboarding, or through Meta official channel. The agent answers from that number, inside the CRM, with the pipeline, the agenda, and the contacts in front of it.

What the agent does is more than chat. The agents reach the CRM over MCP, so the funnel, the agenda, and the contacts are things they operate, not text they mime. Each agent carries a per-tenant knowledge base, organization memory, and executable skills. When something needs a human, it opens a case, keeps talking to the customer while it waits, and the whole handoff is audited. Follow-up revives a cold conversation on adaptive timing, triggered by funnel stage, and a radar screen lists the threads at risk of dying unanswered. Resolved conversations become new knowledge, and the agent own improvement proposals only ship after a human signs off. That last point matters: the agent suggests, the human approves, and the improvement lands as a new version.

The project started as an e-commerce CRM, and the open-source community pushed it further. Today it runs in clinics, real-estate agencies, info-product businesses, agencies, stores, and service providers, any business that sells over WhatsApp. A roofing firm is the same shape: the customer messages first, the agent answers, qualifies, and books, and the crew handles only the cases the agent opens.

Two cautions belong here, stated plainly. First, the WhatsApp connection has two paths, and they are not equal. Two WhatsApp paths: QR pairing through WAHA (multi-number, with anti-ban throttling, jitter and sending windows) or Meta official Cloud API with template approval and sync. The QR route is an unofficial protocol. It is throttled and jittered to reduce bans, but the risk is yours, and the official Cloud API is the scaling path. A firm that plans to run its main number on DeskcommCRM should use the official channel, and keep the QR route for a pilot or a second number. Second, the Supabase free tier takes no backups, so the firm must schedule its own backup daily. The installer ships a backup command for that, and the update path takes a backup before every update, but the daily backup is the firm job. Third, the UI plus most docs are in Portuguese, though the README ships English and Spanish versions. A bilingual firm will read the README fine and will meet Portuguese in the interface, so the setup should be done by someone comfortable with that, or with the English guide open beside it.

## AgentSDR reaches the prospect who has not heard from you

Outbound is the other side of the desk. A firm that only answers inbound waits for the phone to ring. A firm that also runs outbound picks its next customers. AgentSDR is the outbound side, and it is built for a founder or a small team doing its own outbound, not for a call center.

AgentSDR is a free, MIT-licensed AI SDR you host yourself. It runs email, LinkedIn, and WhatsApp outreach from one lead database, enriches lists with your own data-provider accounts, and has an AI CRM that classifies every reply and drafts the answer for a person to approve. It suits founders, agencies, and small sales teams who want to own their outbound stack and are willing to connect and pay for the underlying services themselves.

The workspace is one place for three channels. One workspace for email, LinkedIn, and WhatsApp campaigns. One Action required queue, every reply classified with a draft attached. One lead record per person, whichever channel they answer on. A person is one record across channels, so a reply on email, LinkedIn, or WhatsApp marks their campaign enrollments as replied, and the firm stops writing to someone who has answered.

The day looks like this. Sequences send on their own inside sending hours, replies from every channel land in one Action required queue, and the AI classifies each one and drafts an answer. Your job is to review drafts and send them, not to chase tabs. That sentence is the whole job description for the person running it: a few minutes a day in the queue, approving drafts that are already classified and grounded in the firm own pricing and scheduling notes.

The approval rule is the point of the tool, and it is stated plainly on the AgentSDR page. No. The AI classifies replies and drafts answers, but nothing is sent until a person approves it. It applies a classification on its own only when it is confident (85% by default), and holds anything else as a proposal for you to accept or change. The AI can move a lead forward in the pipeline on its own when it is confident, and it marks a person Do Not Contact immediately when they ask to stop. Backward moves, low-confidence calls, and every new Customer are held for a person. The human stays in charge of what goes out, and the queue is where that charge is exercised.

The setup is one app and one PostgreSQL database, started by the project Docker Compose file. After that, every service is connected from guided Settings pages: Google Workspace for the mailboxes, Unipile for LinkedIn and WhatsApp, OpenRouter for the AI key, and Cloudflare R2 for call recordings. The AI agent can also phone leads over WhatsApp, book meetings through Cal.com, and chase the ones who said yes.

Two cautions belong here too. First, the project is very young. A very young project: first public release on October 6, 2026, still pre-1.0, and the project says minor releases may include breaking changes. A firm should run it on a small campaign before moving its whole pipeline, and should expect updates to need attention. Second, the LinkedIn and WhatsApp channels carry account risk. The project own docs say LinkedIn User Agreement does not allow automated messaging and that any automation can get an account restricted or banned. WhatsApp also bans numbers that send unsolicited bulk messages. The built-in defaults are conservative, 30 emails a day per mailbox with a gap between sends, 30 LinkedIn invitations a day on Premium accounts and 5 on free ones, and sending only inside working hours, and those limits reduce the risk but do not remove it. A firm should run outbound from accounts it can afford to lose, or from a dedicated sender identity, and never from the owner personal LinkedIn or the main WhatsApp number.

## One desk, two sides of the conversation

The two tools look different, and they are. One answers inbound WhatsApp. The other runs outbound across email, LinkedIn, and WhatsApp. But the pattern is the same, and the pattern is the point.

First, the firm owns the server. DeskcommCRM runs on the firm VPS, and the conversations never leave its server. AgentSDR runs on the firm server, with leads and conversations in its own PostgreSQL database and recordings in its own storage bucket. No vendor holds the pipeline, and no vendor sets the per-seat price.

Second, the AI drafts, and the human approves. DeskcommCRM agents answer and qualify, and open a case when something needs a human, with the handoff audited. AgentSDR classifies every reply and drafts the answer, and nothing is sent until a person approves it. In both cases the approval is built into the workflow, not added after the fact.

Third, the conversation is one record. In DeskcommCRM, the agent works the pipeline, the agenda, and the contacts through the CRM, so the deal moves in one place. In AgentSDR, a person is one record across channels, so a reply anywhere stops the outreach everywhere. In both cases the firm sees the whole conversation, not three inboxes and a spreadsheet.

That pattern is why the two tools belong in one post. A firm that buys a chatbot without a CRM buys answers with no record. A firm that buys an SDR without an approval queue buys outreach with no control. A firm that buys the pattern, own server, AI draft, human approval, buys speed with the record and the control held.

## Free software, paid services: the honest cost

The cost question is where most posts about free tools go wrong, so this post states it plainly. The software costs nothing. The desk does not.

AgentSDR states its cost on its own page. AgentSDR is open source under the MIT License. There are no seats, tiers or per-contact fees, so a team of one pays the same as a team of ten: nothing for the software. Then it lists what the firm pays for, in a table the post repeats here. The firm pays for its server and PostgreSQL, one app process and one database, started by Docker Compose. It pays for Google Workspace mailboxes, the mailboxes it already owns, for cold email. It pays for Unipile, the LinkedIn and WhatsApp accounts it links. It pays for OpenRouter usage, its own key, for every AI step, billed by the model provider. It pays for Resend, for sign-in, password-reset, and invitation emails, required in production.

DeskcommCRM states the same shape in different words. No subscription, no gated features, your data stays yours. The firm pays for the VPS, the domain, the AI key, and its own time to run it. The Supabase account is free, and the WhatsApp number is the firm own number, connected by QR code or through Meta official channel. The cost that disappears is the per-seat SaaS bill. The cost that remains is the server, the accounts, and the AI usage, all billed by their own vendors, with no markup from the tool.

As an illustration, not a client result and not a statistic: a roofing firm installs DeskcommCRM on its VPS, connects its WhatsApp number, and trains the agent on its services, its prices, and its booking rules. A homeowner messages on WhatsApp with a photo of a leak. The agent answers, qualifies, and books the estimate, and the crew handles the case the agent opened. In the same week, the firm runs an AgentSDR campaign to property managers, from its own mailboxes and LinkedIn accounts. The replies land in one Action required queue. The owner spends a few minutes a day approving drafts, and the meetings book through Cal.com. The firm did not hire a receptionist for WhatsApp, and it did not hire an SDR for outbound. It spent its week on estimates, on crews, and on the approvals, which is the work only the firm can do. The illustration serves because it shows the desk, not because it promises a result. The result comes from repetition, and repetition comes from a queue with a named approver and a daily time.

That is the cost argument, stated without jargon. Free software does not mean free sales. It means the firm pays the vendors directly, keeps its data on its own server, and keeps the approval. A firm that wants that trade should count the connected services before it installs, not after. A firm that does not want that trade should buy the hosted seat instead, and pay for someone else to run the server.

## Two risks to name before you install

Both tools carry risks the firm should name before it installs, not after it learns them.

The first risk is the account. WhatsApp and LinkedIn both restrict automation, and both can restrict or ban an account that automates. DeskcommCRM QR pairing runs through WAHA, an unofficial protocol, and the ban risk is yours. AgentSDR LinkedIn automation runs against the LinkedIn User Agreement, and WhatsApp bans numbers that send unsolicited bulk messages. The safe way to run both is to separate the identities: run the main WhatsApp number on the official Cloud API, run outbound from dedicated sender accounts, and keep the owner personal LinkedIn and the main number out of the automation entirely. The built-in limits, 30 emails a day per mailbox, 30 LinkedIn invitations a day on Premium accounts, and sending only inside working hours, reduce the risk, and they do not remove it.

The second risk is the age of the tools. DeskcommCRM is the older of the two, with thousands of stars and commits on the same day as the September 30 check, and a tagged release path for updates. AgentSDR is days old, first public release on October 6, 2026, still pre-1.0, with breaking changes already in its first week. A firm should install DeskcommCRM as the desk and pilot AgentSDR on one small campaign, with one named owner, before it moves its whole pipeline. A pilot that fails on a small campaign costs a week. A rollout that fails on the whole pipeline costs the pipeline.

The third risk is the backup, and it belongs to the firm. Supabase free tier takes no backups, so the firm must schedule its own daily backup of the DeskcommCRM database and WhatsApp sessions. AgentSDR keeps its leads and conversations in its own PostgreSQL database, and the firm must back that up too. A desk with no backup is a desk that can lose every conversation in one bad update. The update path takes a backup before every update, and that is not a substitute for a daily backup.

## Dipriva builds the desk for your firm

This is the selling point, stated plainly: Dipriva can help a roofing or service firm build this desk and use automation inside it. DeskcommCRM supplies the WhatsApp desk. AgentSDR supplies the outbound. Dipriva supplies the install, the training, the approval queue, and the handoff, for firms with 10 to 500 employees, including roofing and service firms whose customers message on WhatsApp first.

The work starts with an audit of what the firm already runs. Dipriva lists the channels customers use, the WhatsApp number and who answers it today, the services and prices the agent must know, the booking rules, and the outbound lists the firm already owns. That audit prevents the most common setup error: training an agent on prices the firm has not written down, or connecting an outbound tool to a list the firm has not cleaned, and then maintaining a faster version of the same mess.

Then, Dipriva sets up the desk in the order the firm will use it. First, the VPS and the DeskcommCRM install, with the domain, the database, and the HTTPS in place. Second, the WhatsApp connection, on the official channel for the main number, with the QR route kept for a pilot or a second number. Third, the agent training, on the firm services, prices, booking rules, and handoff cases, with the knowledge base versioned so a bad answer can be traced to the note it came from. Fourth, the AgentSDR setup, with the mailboxes, the Unipile accounts, the OpenRouter key, and the sending rules set to the conservative defaults. Fifth, the approval queue, with one named approver and a daily time, because a queue with no fixed time does not get worked. Sixth, the backups, scheduled daily for both databases, because the desk is only as safe as its last backup. Seventh, the measures, because the firm needs its own numbers to judge both tools: replies answered, leads qualified, meetings booked, and drafts approved without rewrites.

The work of Dipriva in this area forms part of its [AI and automation engagements](/services/ai-automation/). The engagement is not a tool sale. It is a setup and automation build, measured by whether WhatsApp replies go out on time, whether leads get qualified, whether meetings get booked, whether approvals happen every day, and whether the desk keeps running after Dipriva leaves. Those are operational measures, and they are the measures the handoff document tracks.

The 90-day execution roadmap Dipriva uses starts with diagnosis, then prioritization, then building, then handoff. Diagnosis finds where sales leak: messages answered late, leads never qualified, follow-ups never sent, and outbound that never starts. Prioritization picks the workflows that remove the largest leak first, not the workflows that look most impressive in a demo. Building creates the desk, the agent training, and the queue. Handoff gives the desk a named owner and a date, so the firm keeps it after Dipriva leaves. A tool without that sequence is a trial. A tool with that sequence is a system.

## Seven steps that put the desk to work

1. Audit the sales channels and list only the WhatsApp number, the services, the prices, and the booking rules the agent must know. Write down what is missing before you train anything.
2. Set up the VPS, the domain, and the database, and install DeskcommCRM on the firm server. Confirm the stack is up with HTTPS before you connect WhatsApp.
3. Connect WhatsApp on the official channel for the main number. Keep the QR route for a pilot or a second number, and never run the main number on an unofficial protocol.
4. Train the agent on the firm services, prices, and booking rules, and test it with ten real customer messages before it answers a live one. Fix the answers that fail, and version the knowledge base.
5. Set up AgentSDR with the mailboxes, the Unipile accounts, the OpenRouter key, and the sending rules at the conservative defaults. Run one small campaign first, and read every reply in the Action required queue.
6. Fix the approval routine at one time each day, with one named approver, and schedule a daily backup for both databases. A queue with no fixed time does not get worked, and a desk with no backup can lose everything.
7. Write the desk down, train the team, and review it after the first month. Correct the desk where replies stall or drafts sit unapproved, then hand it to the named owners with dates.

That list is the whole desk in miniature. It does not require a new department, a new hire, or a per-seat SaaS bill. It requires a server, a WhatsApp number, an agent trained on real prices, a queue with a named approver, and a daily backup. Firms that complete those seven steps have a desk they own. Firms that skip them have two tools they can demo.

If you want that desk built for your firm, start with [Where to Automate First](/ai-automation/). That page is the lead step for AI and automation work at Dipriva. From there, you can [book a 30-minute strategy session](/schedule/) and bring the WhatsApp number, the services and prices, and the point where replies stall today. Dipriva will audit that workflow, build the desk and its automation in the order above, and hand you a workflow with owners and dates. DeskcommCRM answers WhatsApp. AgentSDR runs outbound. Dipriva builds the desk that makes both work every day.

Dipriva Consulting Group, 2435 Eastern Ave SE Suite 202, Grand Rapids, MI 49507
