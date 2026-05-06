import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculatorEducationalContent } from "./calculator-content/types";

interface RelatedLink {
  href: string;
  label: string;
}

interface Props {
  title: string;
  content: CalculatorEducationalContent;
  related?: RelatedLink[];
}

export default function EducationalDeepDive({ title, content, related }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-slate dark:prose-invert max-w-none space-y-4">
        {content.sections.map((section, i) => (
          <div key={i}>
            <h3>{section.heading}</h3>
            {section.blocks.map((block, j) => {
              if (block.kind === "p") {
                return <p key={j}>{block.text}</p>;
              }
              if (block.kind === "formula") {
                return (
                  <p key={j} className="bg-muted px-3 py-2 rounded font-mono text-sm">
                    {block.text}
                  </p>
                );
              }
              return (
                <ul key={j}>
                  {block.items.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              );
            })}
          </div>
        ))}
        <div>
          <h3>Veelgestelde vragen</h3>
          {content.faqs.map((faq, i) => (
            <div key={i}>
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
        {related && related.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Verder rekenen:{" "}
            {related.map((link, i) => (
              <span key={i}>
                {i > 0 && " · "}
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
            .
          </p>
        )}
      </CardContent>
    </Card>
  );
}
