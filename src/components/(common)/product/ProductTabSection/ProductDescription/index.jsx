import { SectionTitle, Title } from "@/components/ui/SectionTitle";

const ProductDescription = ({ product }) => {
  const { description } = product;
  return (
    <div>
      <SectionTitle>
        <Title className="short-underline pb-1 after:border-b-4">
          Description
        </Title>
      </SectionTitle>
      <div>
        <div dangerouslySetInnerHTML={{ __html: description || "" }} />
      </div>
    </div>
  );
};

export default ProductDescription;
