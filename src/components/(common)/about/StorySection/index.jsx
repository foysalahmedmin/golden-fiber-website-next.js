import Image from "next/image";

const StorySection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
          <div className="text-center md:text-left">
            <h1 className="mb-6 text-3xl font-bold uppercase md:mb-8 xl:text-5xl">
              Our Story
            </h1>
            <p className="mb-4">
              Golden Fiber Asia began with a vision to bring sustainable living
              into everyday life through beautifully crafted jute products.
              Rooted in local craftsmanship and natural materials, we aim to
              blend tradition with modern lifestyle needs.
            </p>
            <p>
              From home essentials to fashion accessories, every product we
              offer is made with care, using eco-friendly processes that respect
              both nature and people. We believe in supporting local artisans,
              promoting biodegradable alternatives, and offering products that
              are both functional and meaningful.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/images/about/story.jpg"
              alt="Our story - jute products"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
