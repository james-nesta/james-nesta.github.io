(function renderResume() {
  "use strict";

  const data = window.RESUME_DATA;
  const headerRoot = document.getElementById("resume-header");
  const contentRoot = document.getElementById("resume-content");
  const printButton = document.getElementById("print-resume");
  const printError = document.getElementById("print-error");

  if (!data || !headerRoot || !contentRoot) {
    return;
  }

  function element(tagName, options = {}) {
    const node = document.createElement(tagName);

    if (options.className) {
      node.className = options.className;
    }

    if (options.text !== undefined) {
      node.textContent = options.text;
    }

    if (options.attributes) {
      for (const [name, value] of Object.entries(options.attributes)) {
        node.setAttribute(name, value);
      }
    }

    if (options.children) {
      node.append(...options.children);
    }

    return node;
  }

  function contactItem(node) {
    return element("span", {
      className: "contact-item",
      children: [node],
    });
  }

  function createHeader() {
    const { contact } = data;
    const location = `${contact.city}, ${contact.state}`;

    const name = element("h1", {
      className: "resume-name",
      text: contact.name,
      attributes: { id: "resume-name" },
    });

    const address = element("span", {
      text: location,
    });

    const email = element("a", {
      text: contact.email,
      attributes: {
        href: `mailto:${contact.email}`,
      },
    });

    const website = element("a", {
      text: contact.websiteDisplay,
      attributes: {
        href: `https://${contact.websiteDisplay}`,
      },
    });

    const contactLine = element("address", {
      className: "contact-line",
      attributes: { "aria-label": "Contact information" },
      children: [
        contactItem(address),
        contactItem(email),
        contactItem(website),
      ],
    });

    return [name, contactLine];
  }

  function createSection(title, className = "") {
    const id = `section-${title.toLowerCase().replaceAll(/\s+/g, "-")}`;
    const heading = element("h2", {
      className: "section-heading",
      text: title,
      attributes: { id },
    });

    const section = element("section", {
      className: ["resume-section", className].filter(Boolean).join(" "),
      attributes: { "aria-labelledby": id },
      children: [heading],
    });

    return section;
  }

  function createBulletList(items, className = "") {
    const list = element("ul", {
      className: ["resume-list", className].filter(Boolean).join(" "),
    });

    for (const item of items) {
      if (typeof item === "string") {
        list.append(element("li", { text: item }));
        continue;
      }

      const children = item.parts.map((part) => {
        if (typeof part === "string") {
          return document.createTextNode(part);
        }

        return element("a", {
          text: part.text,
          attributes: {
            href: part.href,
            target: "_blank",
            rel: "noreferrer",
          },
        });
      });

      list.append(element("li", { children }));
    }

    return list;
  }

  function createEntryHeader({
    role,
    organization,
    qualifier,
    location,
    dates,
    level = 3,
  }) {
    const titleParts = [];

    if (role) {
      titleParts.push(
        element("span", {
          className: "entry-role",
          text: role,
        }),
      );
    }

    if (organization) {
      titleParts.push(
        element("span", {
          className: "entry-organization",
          text: `${role ? ", " : ""}${organization}`,
        }),
      );
    }

    if (qualifier) {
      titleParts.push(
        element("span", {
          className: "entry-qualifier",
          text: ` (${qualifier})`,
        }),
      );
    }

    if (location) {
      titleParts.push(
        element("span", {
          className: "entry-location",
          text: `${role || organization ? ", " : ""}${location}`,
        }),
      );
    }

    const title = element(`h${level}`, {
      className: "entry-title",
      children: titleParts,
    });

    const headerChildren = [title];

    if (dates) {
      headerChildren.push(
        element("span", {
          className: "entry-dates",
          text: dates,
        }),
      );
    }

    return element("header", {
      className: "entry-header",
      children: headerChildren,
    });
  }

  function createExperienceEntry(item) {
    const entry = element("article", {
      className: "resume-entry experience-entry",
    });

    entry.append(
      createEntryHeader({
        role: item.role,
        organization: item.organization,
        qualifier: item.qualifier,
        dates: item.dates,
      }),
    );

    if (item.bullets) {
      entry.append(createBulletList(item.bullets));
    }

    return entry;
  }

  function createEducationEntry(item) {
    return element("article", {
      className: "resume-entry education-entry",
      children: [
        createEntryHeader({
          organization: item.institution,
          location: item.location,
          dates: item.dates,
        }),
        createBulletList(item.bullets, "education-list"),
      ],
    });
  }

  function createContent() {
    const competencies = createSection("Key Competencies", "competencies");
    competencies.append(createBulletList(data.competencies));

    const experience = createSection("Work Experience", "experience");
    for (const item of data.experience) {
      experience.append(createExperienceEntry(item));
    }

    const education = createSection("Education", "education");
    for (const item of data.education) {
      education.append(createEducationEntry(item));
    }

    const interests = createSection("Interests", "interests");
    interests.append(
      element("p", {
        className: "interests-copy",
        text: data.interests,
      }),
    );

    return [competencies, experience, education, interests];
  }

  function cssInchesToPixels(propertyName) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();

    return Number.parseFloat(value) * 96;
  }

  function resumeFitsOnOnePage() {
    const pageHeight = cssInchesToPixels("--page-height");
    const pageMargin = cssInchesToPixels("--page-margin-block");
    const printableHeight = pageHeight - pageMargin * 2;
    const finalSection = contentRoot.lastElementChild;

    if (!finalSection) {
      return true;
    }

    const contentHeight =
      finalSection.getBoundingClientRect().bottom -
      headerRoot.getBoundingClientRect().top;

    return contentHeight <= printableHeight + 1;
  }

  headerRoot.replaceChildren(...createHeader());
  contentRoot.replaceChildren(...createContent());
  document.title = `${data.contact.name} — Resume`;

  if (printButton) {
    printButton.addEventListener("click", function printResume() {
      if (!resumeFitsOnOnePage()) {
        if (printError) {
          printError.textContent =
            "This resume exceeds one printed page. Trim the content before saving it as a PDF.";
          printError.hidden = false;
        }
        return;
      }

      if (printError) {
        printError.hidden = true;
      }

      window.print();
    });
  }
})();
