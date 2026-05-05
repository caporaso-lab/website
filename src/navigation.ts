import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Team',
      href: getPermalink('/team'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
    {
      text: 'Jobs',
      href: getPermalink('/jobs'),
    },
    {
      text: 'Projects',
      links: [
        { text: 'QIIME 2', href: getPermalink('/projects/qiime2') },
        { text: 'Compost Microbiome Lab', href: getPermalink('/projects/compost-microbiome-lab') },
        { text: 'Vermicomposting', href: getPermalink('/projects') },
        { text: 'Space Agriculture', href: getPermalink('/projects/space-agriculture') },
        { text: 'Undergraduate Research', href: getPermalink('/projects') },
        { text: '4CSCC', href: getPermalink('/projects') },
      ],
    },
    {
      text: 'Professional Services',
      href: getPermalink('/professional-services'),
    },
  ],
};

export const footerData = {
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/qiime2' },
    { ariaLabel: 'Youtube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/qiime2' },
    { ariaLabel: 'Bluesky', icon: 'tabler:brand-bluesky', href: 'https://bsky.app/profile/qiime2.org' },
  ],
  footNote: `
    Original template by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · Maintained by the Caporaso Lab · © 2025 Caporaso Lab · All rights reserved.


  `,
};
