import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import Reveal from '../components/Reveal.jsx';

export default function BeforeAfterPage() {
  return (
    <section className="section pt-36">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Before & After</p>
          <h1 className="headline mt-4 max-w-5xl">Drag through the transformation.</h1>
          <p className="subhead mt-6 max-w-3xl">Compare the original file with a polished Riwaz Studio edit. The glow, contrast, skin texture, and color balance are tuned to feel premium without looking artificial.</p>
        </Reveal>
        <Reveal className="mt-12">
          <BeforeAfterSlider />
        </Reveal>
      </div>
    </section>
  );
}
