import config from '~/config.json';

export const navLinks = [
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Details',
    pathname: '/#details',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'LinkedIn',
    url: `https://www.linkedin.com/in/kajal-gupta-275259256/`,
    icon: 'bluesky',
  },
  {
    label: 'LeetCode',
    url: `https://leetcode.com/Kethup/`, // Replace with your username
    icon: 'leetcode', // Make sure your icon set supports this
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];
