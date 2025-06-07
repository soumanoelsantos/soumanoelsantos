
import React from "react";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ana Paula Silva",
      company: "Escola de Idiomas Premium",
      text: "O Acelerador Empresarial foi uma revolução no meu negócio. Consegui estruturar processos que me deram liberdade para focar no estratégico.",
      segment: "Educação"
    },
    {
      name: "Carlos Eduardo",
      company: "Tech Solutions",
      text: "Antes mesmo de terminar o programa, o investimento já estava pago. Os resultados apareceram em menos de 30 dias.",
      segment: "Tecnologia"
    },
    {
      name: "Douglas Oliveira",
      company: "Consultoria Financeira",
      text: "Não é só os recursos e ferramentas que o programa entrega, é ajudar a melhorar a mentalidade do empresário.",
      segment: "Finanças"
    },
    {
      name: "Paulo e Elisa",
      company: "Instituto Educacional",
      text: "Hoje conseguimos delegar e liderar de maneira correta, nos livrando da escravidão que éramos mantidos na empresa.",
      segment: "Educação"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Veja o que alguns empresários dizem sobre o <span className="text-dark-primary">Acelerador Empresarial</span>
            </h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-300 ml-2">Mais de 15.000 empresários satisfeitos</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-dark-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <Quote className="h-8 w-8 text-dark-primary flex-shrink-0 mt-1" />
                  <p className="text-gray-300 text-lg italic leading-relaxed">"{testimonial.text}"</p>
                </div>
                
                <div className="border-t border-white/20 pt-6">
                  <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                  <p className="text-dark-primary font-medium">{testimonial.company}</p>
                  <span className="inline-block bg-dark-primary/20 text-dark-primary px-3 py-1 rounded-full text-sm mt-2">
                    {testimonial.segment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
