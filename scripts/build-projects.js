const projectData = require("../src/public/project-data.json");

const set1 = projectData.slice(0, 4);
const set2 = projectData.slice(4, projectData.length);
const sets = [set1, set2];

const buildProjectSection = (templateCheerio, set, setIndex) => {
  const projectsSection = templateCheerio(
    `[data-projects-section-${setIndex}]`
  );

  projectsSection.empty();

  set.forEach((project, index) => {
    const isEven = index % 2 === 0;
    const lineDirection = isEven ? "left" : "right";
    const scrollSpeed = isEven ? 8 : -8;
    const scrollDirection = isEven ? "right" : "left";
    const featured = setIndex === 1 && index === 0;

    // Add line before project
    const lineBefore = `<span class="home__projects__line ${lineDirection}"><span></span></span>`;
    projectsSection.append(lineBefore);

    const labelInner = featured
      ? `<div class="label__inner label-1">
         <p>FEATURED <br /> PROJECTS (${projectData.length})</p>
         <p>${project.role}</p>
       </div>`
      : `<div class="label__inner">
         <p>${project.role}</p>
       </div>`;

    const label = `
    <div class="home__projects__project__label">
      ${labelInner}
    </div>`;

    const title = `
    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="home__projects__project__link">
      <h1 class="home__projects__project__title"
          data-scroll=""
          data-scroll-direction="horizontal"
          data-scroll-speed="${scrollSpeed}">
        <span class="inline-ovh">
          <div class="title__main ${scrollDirection}">
            <span class="slide-up"
                  data-content="${project.title}"
                  aria-hidden="true"></span>
            ${project.title}
          </div>
        </span>
      </h1>
    </a>`;

    const button = `
    <div class="project__link">
      <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="c-button">
        <span class="c-link">
          <span class="c-link__inner">
            <span>
              Visit Site
              <span class="share-icon">
                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.337 7.845l-7.173 7.173-1.178-1.179 7.172-7.172H5.837V5h9.166v9.167h-1.666V7.845z" fill="#777"/>
                </svg>
              </span>
            </span>
          </span>
        </span>
      </a>
    </div>`;

    // Build project block
    const projectEl = `<div class="home__projects__project ${scrollDirection}">
      ${label}
      ${title}
      ${button}
    </div>`;
    projectsSection.append(projectEl);
  });

  // Add final line
  const finalLine = `<span class="home__projects__line ${
    set.length % 2 === 0 ? "left" : "right"
  }"><span></span></span>`;
  projectsSection.append(finalLine);
};

const buildProjectsSection = async (templateCheerio) => {
  sets.forEach((set, index) => {
    buildProjectSection(templateCheerio, set, index + 1);
  });
};

module.exports = {
  buildProjectsSection,
};
