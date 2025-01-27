import { memo } from "react";
import Link from "next/link";

interface PageTitleProps {
  title: string;
  backTo?: {
    label: string;
    href: string;
  };
}

export const PageTitle = memo(function PageTitle({
  title,
  backTo,
}: PageTitleProps) {
  return (
    <nav aria-label="Breadcrumb">
      <div className="mb-6 flex items-center gap-2 text-gray-600">
        {backTo ? (
          <>
            <Link
              href={backTo.href}
              className="hover:text-[#8200FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8200FF] focus-visible:ring-offset-2"
              aria-label={`Voltar para ${backTo.label}`}
            >
              {backTo.label}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        ) : null}
        <span className="text-[#8200FF]" aria-current="page">
          {title}
        </span>
      </div>
      <div className="mb-6 h-px bg-gray-200" role="presentation" />
    </nav>
  );
});
