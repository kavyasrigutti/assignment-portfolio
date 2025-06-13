import React from 'react';
import { Code, Palette, Zap, Globe } from 'lucide-react';

const About = () => {
  const skills = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Frontend Development',
      description: 'HTML, CSS, Tailwind CSS, React, JavaScript, and modern web frameworks'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive user interfaces with attention to detail'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: '3D Graphics',
      description: 'Three.js, WebGL, and interactive 3D experiences for the web'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Web Technologies',
      description: 'HTML5, CSS3, Tailwind CSS, and responsive design principles'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Full Stack Development',
      description: 'HTML, CSS, Javascript, ReactJS, NodeJS, ExpressJS'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="text-blue-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 ">
                <div className="w-full h-full   flex items-center justify-center">
                  <img
                    src="https://img.freepik.com/free-vector/professional-woman-business-attire_1308-176775.jpg"
                    alt="kavya"
                    className="w-50 h-50 rounded-full object-cover"
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="prose prose-lg prose-invert">
              <p className="text-gray-300 leading-relaxed text-lg">
                I'm a passionate frontend developer with a keen eye for design and a love for creating 
                interactive web experiences. With expertise in modern JavaScript frameworks and 3D graphics, 
                I bring ideas to life through clean, efficient code and beautiful user interfaces.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                My journey in web development started with a fascination for how technology can enhance 
                human experiences. I specialize in React, JavaScript, and Three.js, always staying 
                current with the latest web technologies and best practices.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-6 border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-blue-400 mb-4">{skill.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{skill.title}</h3>
                  <p className="text-gray-400 text-sm">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;