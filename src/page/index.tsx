import { useTranslation } from 'react-i18next';

const PageIndex = () => {
  const { t } = useTranslation();

  return <h1>{t('hello')}</h1>;
};
PageIndex.displayName = 'PageIndex';
export default PageIndex;
