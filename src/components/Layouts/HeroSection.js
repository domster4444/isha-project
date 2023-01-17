import HeroIllustrator from "../../images/hero-illustrator.svg";
import Button from "../Button/Button";

const HeroSection = () => {
  return (
    <>
      <div class='hero-section'>
        <div class='division'>
          <h1 className='playfair_medium'>
            Generate Your Desired CV
            <br />
            <Button name='Generate CV' bg='#9b371e'></Button>
          </h1>
        </div>
        <div class='division'>
          <img src={HeroIllustrator} alt='' />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
