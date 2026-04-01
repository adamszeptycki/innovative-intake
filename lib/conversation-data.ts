import type { Conversation } from "./types";

export const conversations: Conversation[] = [
  // 1 — Jonathan Sterling | Talc Class Action | Agent: Sarah Jenkins | AI Score: 88
  // Rebuttals: Immaterially Why, Service Proof, Legal Standing, Cost Clarity
  {
    id: "conv-1",
    prospectId: "1",
    date: "March 15, 2026",
    duration: "6m 18s",
    messages: [
      {
        id: "1-1",
        sender: "agent",
        text: "Good afternoon, Mr. Sterling. My name is Sarah Jenkins from The Editorial Juris. I'm calling regarding the talc class action. How are you today?",
        timestamp: "2:34 PM",
      },
      {
        id: "1-2",
        sender: "prospect",
        text: "I'm alright, thanks. I saw your ad and figured I'd look into it. I used talcum powder for years, but I'm not sure my situation really matters in something this big.",
        timestamp: "2:34 PM",
      },
      {
        id: "1-3",
        sender: "agent",
        text: "That's a very common concern, and I'm glad you brought it up. In mass tort cases like this, every individual's exposure history contributes to the overall body of evidence. Even if your specific health impact feels minor compared to others, your long-term exposure from 2014 onward is exactly the kind of documentation that strengthens the case for everyone involved.",
        timestamp: "2:35 PM",
        rebuttalUsed: "Immaterially Why",
      },
      {
        id: "1-4",
        sender: "prospect",
        text: "Okay, that makes sense. But how do you even prove I was exposed? I don't have receipts from ten years ago.",
        timestamp: "2:36 PM",
      },
      {
        id: "1-5",
        sender: "agent",
        text: "Great question. Proof of exposure doesn't require purchase receipts. We work with your medical records, employment history, and sworn testimony. Additionally, the manufacturers' own internal documents — many of which have already been subpoenaed — establish that these products were widely distributed. We build the evidentiary chain from multiple sources, not just one.",
        timestamp: "2:37 PM",
        rebuttalUsed: "Service Proof",
      },
      {
        id: "1-6",
        sender: "prospect",
        text: "I see. And what about my actual legal standing here? I never filed anything before, and I wasn't part of the original class.",
        timestamp: "2:38 PM",
      },
      {
        id: "1-7",
        sender: "agent",
        text: "You don't need to have been part of the original filing. The class action is still accepting new claimants, and your exposure history and medical records from 2014 give you a strong basis for inclusion. We handle all the filing and procedural requirements — you wouldn't need to navigate any of that yourself.",
        timestamp: "2:38 PM",
        rebuttalUsed: "Legal Standing",
      },
      {
        id: "1-8",
        sender: "prospect",
        text: "That's reassuring. My last concern is honestly the cost. I've heard lawyers can be expensive, and I'm not in a position to pay upfront for something that might take years.",
        timestamp: "2:39 PM",
      },
      {
        id: "1-9",
        sender: "agent",
        text: "Completely understandable. We work on a contingency fee basis, which means you pay absolutely nothing upfront. Our fee is a percentage of the settlement only if we win. If there's no recovery, you owe us nothing. There are no hidden fees, no retainers, and no hourly billing.",
        timestamp: "2:40 PM",
        rebuttalUsed: "Cost Clarity",
      },
      {
        id: "1-10",
        sender: "prospect",
        text: "Alright, that actually sounds reasonable. What would the next steps be?",
        timestamp: "2:40 PM",
      },
      {
        id: "1-11",
        sender: "agent",
        text: "I'll send you a secure intake form to collect your basic information and medical history. Once we review that, one of our attorneys will schedule a brief consultation to assess your case. The whole process is straightforward, and you can reach out to me directly if you have any questions along the way.",
        timestamp: "2:41 PM",
      },
      {
        id: "1-12",
        sender: "prospect",
        text: "Sounds good, Sarah. Let's move forward with it.",
        timestamp: "2:41 PM",
      },
    ],
    feedback: {
      toneScore: 9,
      complianceScore: 8,
      objectionHandlingScore: 9,
      outcomeScore: 10,
      notes: "Excellent call. Sarah addressed every concern with empathy and clarity. Prospect moved to intake willingly. Strong use of rebuttals — all felt natural, not scripted.",
      reviewerName: "Michael Torres",
      submittedAt: "2026-03-15T18:45:00Z",
    },
  },

  // 2 — Eleanor Vance | Hernia Mesh | Agent: null (Unassigned) | AI Score: 94
  // Rebuttals: Recall Status
  {
    id: "conv-2",
    prospectId: "2",
    date: "March 16, 2026",
    duration: "4m 05s",
    messages: [
      {
        id: "2-1",
        sender: "agent",
        text: "Hello, Ms. Vance. Thank you for calling The Editorial Juris. I understand you're reaching out about a hernia mesh issue. Can you tell me a bit about your situation?",
        timestamp: "10:15 AM",
      },
      {
        id: "2-2",
        sender: "prospect",
        text: "Yes, I had hernia mesh surgery in 2019, and I've been experiencing significant pain ever since. My doctor says the mesh may have eroded. I want to know if I have a case.",
        timestamp: "10:15 AM",
      },
      {
        id: "2-3",
        sender: "agent",
        text: "I'm sorry to hear about your ongoing pain. Mesh erosion is one of the most commonly reported complications, and it's a central issue in the current litigation. Can you tell me which mesh product was used in your surgery?",
        timestamp: "10:16 AM",
      },
      {
        id: "2-4",
        sender: "prospect",
        text: "I believe it was a Physiomesh product. But I checked online and I couldn't find it on the recall list. Does that mean I can't pursue anything?",
        timestamp: "10:17 AM",
      },
      {
        id: "2-5",
        sender: "agent",
        text: "Not at all. While Physiomesh was voluntarily withdrawn from the market in 2016, many mesh products involved in litigation were never formally recalled by the FDA. A product doesn't need to be on an official recall list for you to have a valid claim. The lawsuits focus on design defects, inadequate warnings, and documented complications — all of which apply regardless of recall status.",
        timestamp: "10:18 AM",
        rebuttalUsed: "Recall Status",
      },
      {
        id: "2-6",
        sender: "prospect",
        text: "Oh, I didn't know that. So the fact that I'm still in pain three years later is enough?",
        timestamp: "10:18 AM",
      },
      {
        id: "2-7",
        sender: "agent",
        text: "Your documented complications — the ongoing pain, the specialist's erosion diagnosis — are exactly the kind of evidence that forms the basis of a strong claim. The longer the complications persist, the more it demonstrates the severity of the harm caused by the device.",
        timestamp: "10:19 AM",
      },
      {
        id: "2-8",
        sender: "prospect",
        text: "That's a relief. I've been dealing with this for so long and felt like nobody could help. What do I need to do next?",
        timestamp: "10:19 AM",
      },
      {
        id: "2-9",
        sender: "agent",
        text: "I'll collect some basic information from you today, and then we'll request your surgical and medical records. One of our attorneys will review your case and get back to you within 48 hours. You don't need to do anything complicated on your end.",
        timestamp: "10:20 AM",
      },
      {
        id: "2-10",
        sender: "prospect",
        text: "That sounds perfect. Let's get started.",
        timestamp: "10:20 AM",
      },
    ],
  },

  // 3 — Marcus Thorne | Talc Class Action | Agent: David Miller | AI Score: 72
  // Rebuttals: Timeline Obj, Cost Clarity
  {
    id: "conv-3",
    prospectId: "3",
    date: "March 14, 2026",
    duration: "5m 42s",
    messages: [
      {
        id: "3-1",
        sender: "agent",
        text: "Good morning, Mr. Thorne. This is David Miller from The Editorial Juris. I'm following up on your inquiry about the talc class action. Do you have a few minutes to discuss?",
        timestamp: "11:02 AM",
      },
      {
        id: "3-2",
        sender: "prospect",
        text: "Yeah, I guess. Look, I'll be honest with you — I've been thinking about this, and I'm really hesitant. These big lawsuits take forever. I don't want to sign up for something that drags on for five or ten years.",
        timestamp: "11:02 AM",
      },
      {
        id: "3-3",
        sender: "agent",
        text: "I completely understand that concern, Mr. Thorne. Litigation timelines can feel daunting. However, the talc cases have moved significantly faster than many people expect. With the recent consolidation of cases and several major settlements already reached, many claimants have seen resolution within 12 to 18 months of filing. The judicial process has been streamlined specifically to avoid the kind of decade-long delays people fear.",
        timestamp: "11:03 AM",
        rebuttalUsed: "Timeline Obj",
      },
      {
        id: "3-4",
        sender: "prospect",
        text: "12 to 18 months isn't bad. But still, what's this going to cost me? I'm not exactly flush with cash right now.",
        timestamp: "11:04 AM",
      },
      {
        id: "3-5",
        sender: "agent",
        text: "That's the other piece I want to make clear. We work strictly on contingency — meaning there is zero cost to you upfront. We only collect a fee if we secure a settlement or judgment on your behalf. If we don't win, you don't pay a single dollar. There are no retainers, no billing surprises.",
        timestamp: "11:04 PM",
        rebuttalUsed: "Cost Clarity",
      },
      {
        id: "3-6",
        sender: "prospect",
        text: "Okay, that's better than I thought. But what are the realistic chances here? I don't want to waste my time if the odds are slim.",
        timestamp: "11:05 AM",
      },
      {
        id: "3-7",
        sender: "agent",
        text: "Based on the cases we've handled in this area, claimants with documented exposure histories like yours have had strong outcomes. I can't guarantee a specific result, but the precedent is favorable, and the manufacturer has already agreed to multiple settlement rounds.",
        timestamp: "11:06 AM",
      },
      {
        id: "3-8",
        sender: "prospect",
        text: "Alright. I'm still a bit on the fence, but I'll at least hear you out on next steps.",
        timestamp: "11:06 AM",
      },
      {
        id: "3-9",
        sender: "agent",
        text: "Of course. There's no pressure to commit today. I can send you the intake materials for review, and you can take your time looking them over. If you decide to proceed, we'll be ready to move quickly on your behalf.",
        timestamp: "11:07 AM",
      },
      {
        id: "3-10",
        sender: "prospect",
        text: "Fine, send them over. I'll take a look.",
        timestamp: "11:07 AM",
      },
    ],
  },

  // 4 — Amara Okafor | Auto Accident | Agent: Sarah Jenkins | AI Score: 91
  // Rebuttals: Fault Proof, Medical Lien, Insurance Gap
  {
    id: "conv-4",
    prospectId: "4",
    date: "March 17, 2026",
    duration: "7m 10s",
    messages: [
      {
        id: "4-1",
        sender: "agent",
        text: "Good afternoon, Ms. Okafor. This is Sarah Jenkins from The Editorial Juris. I see you've reached out about a multi-vehicle collision. First, I hope you're recovering well. Can you walk me through what happened?",
        timestamp: "3:20 PM",
      },
      {
        id: "4-2",
        sender: "prospect",
        text: "Thank you. It was a three-car pileup on the interstate two weeks ago. I was rear-ended, which pushed me into the car ahead. The police report says the driver behind me was at fault, but his insurance company is now claiming I share some of the blame because I was 'following too closely.'",
        timestamp: "3:21 PM",
      },
      {
        id: "4-3",
        sender: "agent",
        text: "That's a tactic insurance companies use frequently to reduce their payout. The police report is a critical piece of evidence here, and if it establishes the other driver as the primary cause, that carries significant weight. We also work with accident reconstruction specialists who can analyze the collision dynamics, vehicle damage patterns, and witness statements to build a clear picture of fault attribution.",
        timestamp: "3:22 PM",
        rebuttalUsed: "Fault Proof",
      },
      {
        id: "4-4",
        sender: "prospect",
        text: "That's good to know. My other worry is the medical bills. I had to go to the ER and then follow up with an orthopedic specialist. My health insurance covered some of it, but they sent me a letter saying they expect to be reimbursed if I get a settlement. Can they do that?",
        timestamp: "3:23 PM",
      },
      {
        id: "4-5",
        sender: "agent",
        text: "Yes, that's called a medical lien, and it's very common in personal injury cases. Your health insurer has a subrogation right — meaning they can seek repayment from any settlement proceeds. However, these liens are negotiable. Our attorneys routinely negotiate lien reductions, often significantly, which maximizes the amount you ultimately take home. It's a standard part of the settlement process we handle for you.",
        timestamp: "3:24 PM",
        rebuttalUsed: "Medical Lien",
      },
      {
        id: "4-6",
        sender: "prospect",
        text: "Okay. There's one more thing — the other driver's insurance policy might not be enough to cover all my damages. My medical bills alone are already over $30,000, and I'm still in treatment.",
        timestamp: "3:25 PM",
      },
      {
        id: "4-7",
        sender: "agent",
        text: "That's a legitimate concern and something we see in multi-vehicle accidents. When the at-fault driver's policy limits are insufficient, we pursue additional avenues: your own underinsured motorist coverage, any commercial or fleet policies if applicable, and in some cases, claims against other involved parties. We do a thorough policy audit to make sure no source of recovery is left on the table.",
        timestamp: "3:26 PM",
        rebuttalUsed: "Insurance Gap",
      },
      {
        id: "4-8",
        sender: "prospect",
        text: "That's a relief. I didn't even know I could use my own underinsured coverage. My agent never mentioned it.",
        timestamp: "3:27 PM",
      },
      {
        id: "4-9",
        sender: "agent",
        text: "Many people don't realize it's available to them. That's exactly why having legal representation matters — we identify every potential recovery source. Given the severity of your injuries and the clear police report, I'd say your case has strong potential.",
        timestamp: "3:27 PM",
      },
      {
        id: "4-10",
        sender: "prospect",
        text: "I appreciate you explaining all of this. I'm ready to move forward. What do you need from me?",
        timestamp: "3:28 PM",
      },
      {
        id: "4-11",
        sender: "agent",
        text: "I'll need the police report number, your insurance information, and authorization to request your medical records. I'll send everything over securely, and our team will begin the case evaluation immediately.",
        timestamp: "3:28 PM",
      },
    ],
  },

  // 5 — Diane Prescott | Medical Malpractice | Agent: David Miller | AI Score: 85
  // Rebuttals: Standard of Care, Causation
  {
    id: "conv-5",
    prospectId: "5",
    date: "March 13, 2026",
    duration: "5m 55s",
    messages: [
      {
        id: "5-1",
        sender: "agent",
        text: "Good morning, Ms. Prescott. This is David Miller from The Editorial Juris. Thank you for reaching out. I understand you experienced complications after a surgical procedure. Can you tell me more about what happened?",
        timestamp: "9:45 AM",
      },
      {
        id: "5-2",
        sender: "prospect",
        text: "Yes. I had a routine gallbladder removal last year, and during the surgery, my bile duct was damaged. I ended up back in the hospital for three weeks with infections and had to have two additional corrective surgeries. It's been a nightmare.",
        timestamp: "9:46 AM",
      },
      {
        id: "5-3",
        sender: "agent",
        text: "I'm very sorry you went through that, Ms. Prescott. Bile duct injuries during cholecystectomy, while not unheard of, are considered a deviation from the standard of care when they occur due to surgical error. The fact that you required extended hospitalization and corrective procedures suggests the initial surgery may not have been performed with the expected level of skill and caution. We would have a medical expert review your surgical records to assess exactly where the deviation occurred.",
        timestamp: "9:47 AM",
        rebuttalUsed: "Standard of Care",
      },
      {
        id: "5-4",
        sender: "prospect",
        text: "But my surgeon told me that complications like this 'just happen sometimes' and that it's a known risk of the procedure. He made it sound like nobody did anything wrong.",
        timestamp: "9:48 AM",
      },
      {
        id: "5-5",
        sender: "agent",
        text: "Surgeons often frame complications that way, and while bile duct injury is a recognized risk, that doesn't automatically absolve the surgeon of responsibility. The key question is causation — was the injury a result of a specific surgical error, or was it truly an unavoidable complication despite proper technique? Our medical experts review the operative notes, imaging, and pathology to determine exactly what happened. In many cases, what surgeons call 'a known risk' turns out to be a preventable error.",
        timestamp: "9:49 AM",
        rebuttalUsed: "Causation",
      },
      {
        id: "5-6",
        sender: "prospect",
        text: "That makes sense. I've always felt like something went wrong, but I didn't know how to challenge what the doctor said.",
        timestamp: "9:50 AM",
      },
      {
        id: "5-7",
        sender: "agent",
        text: "You don't have to challenge it alone. That's what our team and our medical consultants are for. We review the records independently and objectively. If the evidence supports a malpractice claim, we'll present you with a clear assessment and recommended path forward.",
        timestamp: "9:50 AM",
      },
      {
        id: "5-8",
        sender: "prospect",
        text: "I'd like that. The medical bills from the corrective surgeries have been overwhelming, and I missed months of work.",
        timestamp: "9:51 AM",
      },
      {
        id: "5-9",
        sender: "agent",
        text: "Those are exactly the kinds of damages — medical expenses, lost wages, pain and suffering — that a malpractice claim can address. Let me get your records request started so our medical team can begin their review. I'll walk you through every step.",
        timestamp: "9:51 AM",
      },
      {
        id: "5-10",
        sender: "prospect",
        text: "Thank you, David. I appreciate you taking the time to explain everything. Let's proceed.",
        timestamp: "9:52 AM",
      },
    ],
  },

  // 6 — Rafael Gutierrez | Auto Accident | Agent: null (Unassigned) | AI Score: 67
  // Rebuttals: (none)
  {
    id: "conv-6",
    prospectId: "6",
    date: "March 18, 2026",
    duration: "3m 22s",
    messages: [
      {
        id: "6-1",
        sender: "agent",
        text: "Hello, Mr. Gutierrez. Thank you for contacting The Editorial Juris. I understand you were involved in a rear-end collision on I-95. How are you feeling?",
        timestamp: "1:10 PM",
      },
      {
        id: "6-2",
        sender: "prospect",
        text: "Not great. I've got whiplash and my back has been killing me. It happened about a week ago. The other driver clearly hit me from behind — there's no dispute about that.",
        timestamp: "1:10 PM",
      },
      {
        id: "6-3",
        sender: "agent",
        text: "I'm sorry to hear you're dealing with that. Whiplash and back injuries from rear-end collisions can be more serious than they initially seem, so it's important you're getting consistent medical treatment. Have you been seeing a doctor regularly since the accident?",
        timestamp: "1:11 PM",
      },
      {
        id: "6-4",
        sender: "prospect",
        text: "I went to the ER the day it happened, and I've had one follow-up with my primary care doctor. He referred me to a specialist but I haven't gone yet.",
        timestamp: "1:11 PM",
      },
      {
        id: "6-5",
        sender: "agent",
        text: "I'd strongly recommend following through with that specialist referral as soon as possible. Consistent medical documentation is one of the most important factors in building a strong personal injury claim. Gaps in treatment can be used by insurance companies to argue the injuries aren't as serious as claimed.",
        timestamp: "1:12 PM",
      },
      {
        id: "6-6",
        sender: "prospect",
        text: "Yeah, I figured that. I'll make the appointment. So what happens from your end? Do you think I have a case?",
        timestamp: "1:12 PM",
      },
      {
        id: "6-7",
        sender: "agent",
        text: "Based on what you've described — a clear rear-end collision, documented injuries, and ongoing symptoms — you have a solid foundation for a claim. We'll need the police report, your medical records, and your insurance details. From there, our team evaluates the full scope of damages and handles all communication with the insurance companies.",
        timestamp: "1:13 PM",
      },
      {
        id: "6-8",
        sender: "prospect",
        text: "Alright. I'll get those documents together and send them over. Thanks for the information.",
        timestamp: "1:13 PM",
      },
      {
        id: "6-9",
        sender: "agent",
        text: "You're welcome, Mr. Gutierrez. I'll email you the intake form shortly. And please do see that specialist — it matters more than you might think. Take care.",
        timestamp: "1:14 PM",
      },
    ],
  },

  // 7 — Priya Sharma | Hernia Mesh | Agent: Sarah Jenkins | AI Score: 96
  // Rebuttals: Device ID, Recall Status, Statute Check
  {
    id: "conv-7",
    prospectId: "7",
    date: "March 12, 2026",
    duration: "6m 48s",
    messages: [
      {
        id: "7-1",
        sender: "agent",
        text: "Good afternoon, Ms. Sharma. This is Sarah Jenkins from The Editorial Juris. I see you've contacted us about a hernia mesh complication. A specialist has confirmed mesh erosion — is that correct?",
        timestamp: "4:00 PM",
      },
      {
        id: "7-2",
        sender: "prospect",
        text: "Yes, that's right. I had the mesh implanted in 2018, and last month my specialist confirmed the mesh has eroded into surrounding tissue. I'm in constant pain and may need revision surgery. I want to join the class action, but I'm not even sure which exact device was used in my surgery.",
        timestamp: "4:01 PM",
      },
      {
        id: "7-3",
        sender: "agent",
        text: "That's actually more common than you'd think. Many patients aren't told the specific product name during their surgery. We can identify the exact device through your surgical records — specifically the operative report and the implant log, which hospitals are required to maintain. We request these on your behalf and match the product to the manufacturer and model number.",
        timestamp: "4:02 PM",
        rebuttalUsed: "Device ID",
      },
      {
        id: "7-4",
        sender: "prospect",
        text: "Okay, good. My other question is about the recall status. I looked up hernia mesh recalls and the results were confusing — some products were recalled, others weren't. If mine wasn't officially recalled, can I still pursue a claim?",
        timestamp: "4:03 PM",
      },
      {
        id: "7-5",
        sender: "agent",
        text: "Absolutely. FDA recall status and legal liability are two separate things. Many mesh products that are the subject of lawsuits were never formally recalled. The litigation is based on design defects, failure to warn, and documented adverse outcomes — not on whether the FDA issued a recall. Your confirmed erosion and ongoing complications are the evidentiary foundation, regardless of recall classification.",
        timestamp: "4:04 PM",
        rebuttalUsed: "Recall Status",
      },
      {
        id: "7-6",
        sender: "prospect",
        text: "That clears things up. One more thing — my surgery was in 2018. Am I still within the time limit to file? I've heard there's a statute of limitations on these things.",
        timestamp: "4:05 PM",
      },
      {
        id: "7-7",
        sender: "agent",
        text: "Great question. The statute of limitations for medical device cases typically begins when you discover — or reasonably should have discovered — the injury, not when the device was implanted. Since your mesh erosion was only confirmed last month, your discovery date is recent, which means you're well within the filing window. That said, it's always best to act promptly, as these windows can vary by jurisdiction.",
        timestamp: "4:06 PM",
        rebuttalUsed: "Statute Check",
      },
      {
        id: "7-8",
        sender: "prospect",
        text: "That's exactly what I needed to hear. I was worried I'd waited too long.",
        timestamp: "4:06 PM",
      },
      {
        id: "7-9",
        sender: "agent",
        text: "Not at all. Your timing is fine, and your case is strong — confirmed erosion, documented specialist assessment, and ongoing complications. Let me start the intake process. We'll request your surgical records, identify the device, and have our medical team review everything.",
        timestamp: "4:07 PM",
      },
      {
        id: "7-10",
        sender: "prospect",
        text: "Perfect. I really appreciate how thorough you've been, Sarah. Let's move forward immediately.",
        timestamp: "4:07 PM",
      },
      {
        id: "7-11",
        sender: "agent",
        text: "Wonderful. I'll send the authorization forms right away. We'll have an update for you within the week. Thank you for trusting us with your case, Ms. Sharma.",
        timestamp: "4:08 PM",
      },
    ],
    feedback: {
      toneScore: 10,
      complianceScore: 9,
      objectionHandlingScore: 10,
      outcomeScore: 9,
      notes: "Outstanding performance. Sarah handled three complex rebuttals seamlessly. Prospect was highly engaged and moved to immediate action.",
      reviewerName: "Michael Torres",
      submittedAt: "2026-03-13T09:20:00Z",
    },
  },

  // 8 — Thomas Whitfield | Medical Malpractice | Agent: David Miller | AI Score: 79
  // Rebuttals: Timeline Obj
  {
    id: "conv-8",
    prospectId: "8",
    date: "March 11, 2026",
    duration: "4m 50s",
    messages: [
      {
        id: "8-1",
        sender: "agent",
        text: "Good morning, Mr. Whitfield. This is David Miller from The Editorial Juris. I understand you're looking into a potential medical malpractice claim related to a misdiagnosis. Can you tell me what happened?",
        timestamp: "10:30 AM",
      },
      {
        id: "8-2",
        sender: "prospect",
        text: "Yes. About two years ago, I went to my doctor with symptoms that turned out to be cancer. He diagnosed me with acid reflux and sent me home with antacids. By the time another doctor caught it eight months later, the cancer had progressed significantly. I had to go through much more aggressive treatment than I would have needed if it had been caught early.",
        timestamp: "10:31 AM",
      },
      {
        id: "8-3",
        sender: "agent",
        text: "I'm very sorry to hear that, Mr. Whitfield. Delayed cancer diagnosis is one of the most impactful forms of medical malpractice, and the difference between early and late-stage treatment can be substantial — both medically and financially.",
        timestamp: "10:32 AM",
      },
      {
        id: "8-4",
        sender: "prospect",
        text: "It definitely has been. But honestly, my biggest hesitation is the timeline. This all started two years ago. I'm worried that if I pursue this, it'll drag on for years while I'm trying to focus on my health and recovery.",
        timestamp: "10:32 AM",
      },
      {
        id: "8-5",
        sender: "agent",
        text: "That's a completely valid concern. Medical malpractice cases do require thorough preparation, but they don't have to consume your life. Our team handles all the heavy lifting — record reviews, expert consultations, and legal filings. Most of our malpractice clients spend very little of their own time on the case after the initial intake. The process is designed to run in the background while you focus on what matters most, which is your recovery.",
        timestamp: "10:33 AM",
        rebuttalUsed: "Timeline Obj",
      },
      {
        id: "8-6",
        sender: "prospect",
        text: "That's good to hear. I don't want this to add more stress to an already stressful situation.",
        timestamp: "10:34 AM",
      },
      {
        id: "8-7",
        sender: "agent",
        text: "Completely understood. Our goal is to reduce your burden, not add to it. The first step is gathering your medical records — the initial diagnosis, the subsequent pathology reports, and your treatment history. Our medical consultants will review everything and provide an expert opinion on the diagnostic error.",
        timestamp: "10:34 AM",
      },
      {
        id: "8-8",
        sender: "prospect",
        text: "I have most of those records already since I requested them when I switched doctors. Would that help speed things up?",
        timestamp: "10:35 AM",
      },
      {
        id: "8-9",
        sender: "agent",
        text: "Absolutely. Having your records readily available can accelerate the review process significantly. If you can send those to us, we'll have our medical team start the evaluation right away.",
        timestamp: "10:35 AM",
      },
      {
        id: "8-10",
        sender: "prospect",
        text: "Alright, I'll send everything over today. Thank you, David.",
        timestamp: "10:36 AM",
      },
    ],
  },
];

export function getConversationByProspectId(
  prospectId: string
): Conversation | undefined {
  return conversations.find((c) => c.prospectId === prospectId);
}
