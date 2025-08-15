import { Icon } from '@iconify/react';

export const Icons = {
  logo: () => <Icon icon="heroicons:currency-dollar" className="h-6 w-6" />,
  spinner: () => <Icon icon="heroicons:arrow-path-20-solid" className="animate-spin" />,
  login: () => <Icon icon="heroicons:arrow-right-on-rectangle" />,
  google: () => <Icon icon="flat-color-icons:google" />,
  apple: () => <Icon icon="logos:apple" />,
};