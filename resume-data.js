window.RESUME_DATA = {
  contact: {
    name: "James Nesta",
    city: "Bedford",
    state: "MA",
    email: "j.nesta@gmail.com",
    websiteDisplay: "jamesnesta.com",
  },

  competencies: [
    "DevOps lead with 20+ years in software and infrastructure, focused on automating all the things.",
    "Runs production systems across Azure, AWS, and on-premises environments. Hands dirty with Kubernetes, Docker, NixOS, virtual machines on vSphere and Nutanix, and good old-fashioned bare metal.",
    "Builds secure CI/CD pipelines with automated tests, linting, and code-review controls. Adores type safety.",
    "Automates infrastructure deployment and configuration with Terraform, Pulumi, Ansible, and Puppet. When the tools fall short, writes the missing pieces in TypeScript, Python, and Go.",
    "Eclectic background spanning the infrastructure trifecta: server ops, networking, and information security.",
    {
      parts: [
        "Superb communicator, both in writing and on the mic: ",
        {
          text: "a technical essay on developer tooling",
          href: "https://dev.to/james_nesta_5ae4292330e7e/test-5ge1",
        },
        " and ",
        {
          text: "charity speedrun co-commentary (left commentator) viewed over 1 million times",
          href: "https://www.youtube.com/watch?v=wVvBld8bVdc",
        },
        ".",
      ],
    },
  ],

  experience: [
    {
      organization: "LogixHealth",
      role: "DevOps Lead",
      dates: "2024-Present",
      bullets: [
        "Led a team to deploy Azure Kubernetes Service clusters and migrate on-premises Windows servers to containerized Linux workloads, modernizing the company's application infrastructure.",
        "Rebuilt the company's CI/CD platform around a centralized container, expanding basic compilation checks to 53 linters, type checkers, security scanners, and custom tools, including ESLint, Ruff, Gitleaks, and TFLint.",
        "Authored Azure DevOps tooling that emulates GitHub CODEOWNERS, enforcing over 500 granular ownership rules across the company's monorepos and strengthening security through required code review.",
        "Consolidated scattered SharePoint documentation into a centralized Docusaurus site backed by Git and Markdown, creating a searchable, version-controlled source of truth.",
      ],
    },
    {
      organization: "MITRE",
      role: "Senior InfoSec Engineer",
      dates: "2017-2023",
      bullets: [
        "Operated MITRE's InfoSec production fleet across datacenters and the cloud, protecting employees and sponsors from nation-state and criminal cyber threats.",
        "Engineered and implemented the Puppet infrastructure for InfoSec, providing configuration management for over 300 production systems, resulting in automated pushes to Git and historical tracking of changes.",
        "Managed a 32-node Elasticsearch cluster with custom tooling written to automate deployment and upgrades, providing over 100 terabytes of data for InfoSec analysts.",
        "Authored software to create custom environments in a sensitive InfoSec lab by interfacing with software-defined networking in Cisco Nexus, pfSense routers, and vSphere ESXi hosts, speeding up lab operations by an order of magnitude.",
      ],
    },
    {
      organization: "Symantec",
      role: "Full Stack Engineer",
      dates: "2013-2017",
      bullets: [
        "Architected and implemented the Symantec Cyber Readiness Challenge and the Symantec Cyber War Games, a series of over 50 offensive hacking challenges that have been held both online and in over 30 locations around the world.",
        "Authored in-house solutions including customer-facing web applications (PHP & JavaScript), datacenter provisioning (Perl & vSphere CLI), and automated cloud deployment (Packer & Ansible in AWS EC2).",
      ],
    },
    {
      organization: "United States Air Force",
      role: "Staff Sergeant Select",
      qualifier: "Honorably Separated",
      dates: "2005-2010",
      bullets: [
        "Rapid-response communications technician, prepared to deploy anywhere in Europe or Africa within 72 hours to support military and humanitarian missions.",
        "Responsible for maintenance and deployment of eight network infrastructure and computer system suites worth $3,700,000.",
        "Deployed on missions to Baumholder, Bosnia-Herzegovina, and Hungary, requiring a Top Secret security clearance.",
      ],
    },
  ],

  education: [
    {
      institution:
        "College of Information Science and Technology, University of Nebraska",
      location: "NE",
      dates: "2009-2013",
      bullets: [
        "Bachelor's degree in Information Assurance with a minor in Computer Science.",
      ],
    },
  ],

  interests:
    "Avid reader of Astral Codex Ten, pickleball maniac, creator of the biggest Hanabi website, and 10% Pledger.",
};
