"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const FAQS = [
  {
    q: "Is this connected to real EPFO systems?",
    a: "No. This is an independent hackathon prototype, not affiliated with or endorsed by EPFO. It never connects to any real government or financial system.",
  },
  {
    q: "Is my data real?",
    a: "No. Every member record, balance, and claim on this site is synthetic — generated for this demo, not pulled from any real person or account.",
  },
  {
    q: "What's actually real here vs. mocked?",
    a: "The name-matching algorithm, date-of-exit eligibility rules, and readiness logic are real code that genuinely runs. Login, bank verification, and claim settlement are simulated.",
  },
  {
    q: "Why does this look different from EPFO's actual site?",
    a: "Deliberately. This explores what a pre-flight check for a PF claim could look like — it's not a redesign of EPFO's website, just one flow built around one real problem.",
  },
];

export default function Faq() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 mb-10">
            Questions
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion.Root type="single" collapsible className="flex flex-col">
            {FAQS.map((item) => (
              <Accordion.Item
                key={item.q}
                value={item.q}
                className="border-b border-slate-200 py-2"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-3 text-left font-medium text-slate-900 outline-none">
                    {item.q}
                    <ChevronDown
                      className="h-4 w-4 text-slate-400 transition-transform group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="text-sm text-slate-600 pb-4 pr-8">
                  {item.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
