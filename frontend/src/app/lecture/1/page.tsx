// Observable 기초

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GenerateObservables } from './_components/generate-observables';

export default function page() {
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-center py-8">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger>1. Observable 스트림 생성기</AccordionTrigger>
          <AccordionContent>
            <GenerateObservables />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="2">
          <AccordionTrigger>2. Observable 구독자</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
