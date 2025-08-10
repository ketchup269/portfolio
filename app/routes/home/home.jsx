import gamestackTexture2Large from '~/assets/Screenshot 2025-08-10 100633.png';
import gamestackTexture2Placeholder from '~/assets/Screenshot 2025-08-10 100633.png';
import gamestackTexture2 from '~/assets/Screenshot 2025-08-10 100633.png';
import gamestackTextureLarge from '~/assets/Screenshot 2025-08-10 101817.png';
import gamestackTexturePlaceholder from '~/assets/Screenshot 2025-08-10 101817.png';
import gamestackTexture from '~/assets/Screenshot 2025-08-10 101817.png';
import sliceTextureLarge from '~/assets/image.png';
import sliceTexturePlaceholder from '~/assets/image.png';
import sliceTexture from '~/assets/image.png';
import sprTextureLarge from '~/assets/gamestack-list-large.png';
import sprTexturePlaceholder from '~/assets/gamestack-list-large.png';
import sprTexture from '~/assets/gamestack-list-large.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Software X Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Prompt to Website Genei"
        description="Helping people build websites from their ideas with a prompt-based interface"
        buttonText="View project"
        buttonLink="https://bolt-clone-orcin.vercel.app/"
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: `${sprTexture} 1280w, ${sprTextureLarge} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={2}
        title="CCM - College Complaint Management"
        description="A web application for students to raise complaints and track their resolution"
        buttonText="Ongoing..."
        buttonLink=""
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: `${sliceTexture} 800w, ${sliceTextureLarge} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
        <ProjectSummary
          id="project-3"
          alternate
          sectionRef={projectTwo}
          visible={visibleSections.includes(projectTwo.current)}
          index={3}
          title="Flappy-bird"
          description="Basic flappy-bird game built using java for conceptual understanding of game development"
          buttonText="View code"
          buttonLink="https://github.com/ketchup269/flappy-bird-java"
          model={{
            type: 'phone',
            alt: 'App login screen',
            textures: [
              {
                srcSet: `${gamestackTexture} 375w, ${gamestackTextureLarge} 750w`,
                placeholder: gamestackTexturePlaceholder,
              },
              {
                srcSet: `${gamestackTexture2} 375w, ${gamestackTexture2Large} 750w`,
                placeholder: gamestackTexture2Placeholder,
              },
            ],
          }}
        />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
