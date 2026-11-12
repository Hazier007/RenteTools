import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculatorEducationalContent } from "@/seo/calculator-content/types";

interface EducationalSectionsProps {
  content: CalculatorEducationalContent;
  faqTitle?: string;
}

/**
 * Rendert de uitlegsecties en FAQ's uit client/src/seo/calculator-content/<slug>.ts
 * in de React-pagina, zodat bezoekers exact dezelfde inhoud zien als Google in de
 * server-side HTML (server/seo-config.ts#generateSSRContent).
 */
export default function EducationalSections({ content, faqTitle = "Veelgestelde vragen" }: EducationalSectionsProps) {
  return (
    <>
      {content.sections.map((section) => (
        <Card key={section.heading}>
          <CardHeader>
            <CardTitle className="text-xl">{section.heading}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            {section.blocks.map((block, index) => {
              if (block.kind === "p") return <p key={index}>{block.text}</p>;
              if (block.kind === "formula") {
                return (
                  <p key={index} className="bg-muted rounded-md px-4 py-3 font-mono text-sm">
                    {block.text}
                  </p>
                );
              }
              return (
                <ul key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              );
            })}
          </CardContent>
        </Card>
      ))}

      {content.faqs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{faqTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {content.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
