// src/components/Testimonials.jsx
import "../assets/style.css";

const testimonials = [
  { name: "Alicia", text: "This platform made my event a hit!", image: "https://thispersondoesnotexist.com/" },
  { name: "Dev", text: "Super easy to discover fun events nearby.", image: "https://thispersondoesnotexist.com/" },
  { name: "Priya", text: "Loved the interface and support.", image: "https://thispersondoesnotexist.com/" }
];

export default function Testimonials() {
  return (
    <div className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonial-cards">
        {testimonials.map((t, i) => (
          <div className="testimonial" key={i}>
            <img src={t.image} alt={t.name} />
            <p>"{t.text}"</p>
            <h4>– {t.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
