import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../utils/routes';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('notFoundPage.title')}</h1>
      <Link to={routes.home}>{t('notFoundPage.link')}</Link>
    </>
  );
};

export default NotFoundPage;
