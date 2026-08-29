"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { useT } from "@/i18n/client";

const FAQ_KEYS = ["1", "2", "3", "4"] as const;

export default function Faq() {
  const t = useT();

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 mb-10">
            {t("faq.title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion.Root type="single" collapsible className="flex flex-col">
            {FAQ_KEYS.map((n) => (
              <Accordion.Item
                key={n}
                value={n}
                className="border-b border-slate-200 py-2"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-3 text-left font-medium text-slate-900 outline-none">
                    {t(`faq.q${n}`)}
                    <ChevronDown
                      className="h-4 w-4 text-slate-400 transition-transform group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="text-sm text-slate-600 pb-4 pr-8">
                  {t(`faq.a${n}`)}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
