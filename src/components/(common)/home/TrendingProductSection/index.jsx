import { SectionTitle, Subtitle, Title } from "@/components/ui/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { getAllCategories } from "@/network/categories/api";
import TrendingProductTabItem from "./TrendingProductTabItem";

const TrendingProductSection = async () => {
  const { data: categories } = await getAllCategories();
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-6 md:mb-8">
          {categories?.length > 0 && (
            <Tabs value={categories[0]?._id}>
              <div className="mb-6 flex flex-wrap items-end gap-4 md:mb-8">
                <SectionTitle className="mb-0 md:mb-0">
                  <Subtitle>New Products</Subtitle>
                  <Title>Trending Products</Title>
                </SectionTitle>
                <TabsList className="relative mb-0 inline-flex gap-0 overflow-visible">
                  {categories?.map((item, i) => (
                    <TabsTrigger
                      activeClassName="shadow-inner"
                      key={i}
                      value={item?._id}
                    >
                      <span className="inline-block px-2 text-sm font-semibold capitalize md:text-base">
                        {item?.name}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <TabsContent>
                {categories?.map((item, i) => (
                  <TrendingProductTabItem key={i} value={item?._id} />
                ))}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingProductSection;
