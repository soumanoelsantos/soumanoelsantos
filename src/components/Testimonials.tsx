
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "CEO, TechPro",
      text: "O programa superou todas as expectativas. Conseguimos triplicar nosso faturamento em apenas 8 meses.",
      rating: 5,
      company: "TechPro Solutions"
    },
    {
      name: "Ana Beatriz",
      role: "Diretora, InnovateX",
      text: "A metodologia é transformadora. Nossa equipe está mais produtiva e alinhada com os objetivos.",
      rating: 5,
      company: "InnovateX"
    },
    {
      name: "Roberto Santos",
      role: "Fundador, RS Group",
      text: "Melhor investimento que já fiz no meu desenvolvimento empresarial. Resultados impressionantes.",
      rating: 5,
      company: "RS Group"
    }
  ];

  return (
    <div className="py-32 bg-gradient-to-b from-black to-dark-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-dark-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-dark-primary text-sm font-medium tracking-widest uppercase">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-serif text-dark-text">
            O Que Dizem Nossos <span className="text-dark-primary">Clientes</span>
          </h2>
          <div className="w-20 h-1 bg-dark-primary mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-glow">
              <Card className="p-8 bg-transparent backdrop-blur-xl border border-dark-primary/20 h-full hover-scale">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-dark-primary text-dark-primary" />
                  ))}
                </div>
                <p className="text-lg text-dark-text/90 mb-6 italic">"{testimonial.text}"</p>
                <div className="mt-auto">
                  <p className="font-semibold text-dark-primary">{testimonial.name}</p>
                  <p className="text-dark-text/70 text-sm">{testimonial.role}</p>
                  <p className="text-dark-text/60 text-xs">{testimonial.company}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
