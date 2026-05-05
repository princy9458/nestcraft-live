import MainHeroSlider from "./MainHeroSlider";

const Hero = ({ section }: { section: any }) => {
  return (
    <section data-annotate-id="home-hero-section">
      <MainHeroSlider initialSlides={section?.content} />
    </section>
  );
};

export default Hero;